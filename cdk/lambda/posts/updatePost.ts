import { PostInput, PostUpdateableFields } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const updatePost = async (
    postAuthor: string,
    postId: string,
    postInput: PostInput
) => {

    if (!postInput) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    };
    
    if (!postAuthor || !postId) {
        return { statusCode: 400, body: 'invalid request, you are missing the pk or sk.' };
    }
    
        const post: PostUpdateableFields = {
            body: postInput.body,
            tags: postInput.tags,
            imageUrl: postInput.imageUrl,
        };

        console.log(`UPDATE question called with:` + JSON.stringify(` UserPK: ${postAuthor} and UserSk: ${postId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF QUESTIONINPUT --------- ${typeof (postInput)}`);
    const params = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `CHEF#${postAuthor}`,
            SK: `POST#${postId}`,
        },
        UpdateExpression:
            "set #body = :body, #tags = :tags, #imageUrl = :imageUrl",
        ExpressionAttributeNames: {
            "#title": "title",
            "#body": "body",
            "#updatedAt": "updatedAt",
            "#tags": "tags",
        },
        ExpressionAttributeValues: {
            ":body": post.body,
            ":tags": post.tags,
            ":imageUrl": post.imageUrl,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedPost = await docClient.update(params).promise();

        console.log(`updatedPost: ${JSON.stringify(updatedPost, null, 2)}`);

        return updatedPost.Attributes;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updatePost;