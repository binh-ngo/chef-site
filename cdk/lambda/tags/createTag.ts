const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Post } from "../types";
require("dotenv").config({ path: ".env" });

const createTag = async (postInput: Post) => {
    console.log(
        `createTag invocation event: ${JSON.stringify(postInput, null, 2)}`
    );
    
    // Needed to separate this put request because in batchWrite operations,
    // if one fails, all fail. We had to further separate each request for each
//  tag with individual put requests for the same reason

const promises = postInput.tags!.map(async (tag) => {

    const tagId = ulid();
    
    const putRequestParams = {
      TableName: process.env.CHEFS_TABLE,
      Item: {
        PK: `TAGS`,
        SK: `TAG#${tag}`,
        tagId: tagId,
        type: "tag",
        tagName: tag,
        count: 0,
      },
    };

    try {
      const tagExists = await docClient.query({
          TableName: process.env.CHEFS_TABLE,
          KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :sk_prefix)",
          ExpressionAttributeNames: {
            "#PK": "PK",
            "#SK": "SK",
          },
          ExpressionAttributeValues: {
            ":PK": `TAGS`,
            ":sk_prefix": `TAG#${tag}`,
          },
        })
        .promise();

      if (tagExists.Count > 0) {
        console.log(`Tag already exists: ${putRequestParams.Item.tagName}`);
      } else {
        const response = await docClient.put(putRequestParams).promise();
        console.log(`Successfully added tag: ${putRequestParams.Item.tagName}`);
        console.log(response);
      }
    } catch (err) {
      console.error(`Error processing tag: ${tag}`);
      console.error(err);
    }
  });
  
  const tagPutRequests = postInput.tags!.flatMap(tag => [
        {
            PutRequest: {
                Item: {
                    PK: `TAG#${tag}`,
                    SK: `POST#${postInput.postId}`,
                    type: 'post',
                    postId: postInput.postId,
                    postAuthor: postInput.postAuthor,
                    authorId: postInput.authorId,
                    body: postInput.body,
                    tags: postInput.tags,
                    likes: postInput.likes,
                    imageUrl: postInput.imageUrl,
                    createdAt: postInput.createdAt,
                    updatedAt: postInput.updatedAt,
                    published: postInput.published,
                    publishDate: postInput.publishDate,
                },
            },
        },
    ]);
    
    const batchWriteParams = {
        RequestItems: {
            "ChefSiteChefSiteBackendStackC0C43B6F-ChefSiteTable50DF745C-1I4475MN7CYKZ": tagPutRequests,
        },
        ReturnConsumedCapacity: "TOTAL",
    };
    
    console.log("tagPutRequests:", JSON.stringify(tagPutRequests, null, 2));
    console.log("params:", JSON.stringify(batchWriteParams, null, 2));
    
    try {
        const data = await docClient.batchWrite(batchWriteParams).promise();
        console.log("Success", data);
    } catch (err) {
        console.log("Error", err);
    }
    
  // Wait for all promises to resolve
  await Promise.all(promises);
};

export default createTag;