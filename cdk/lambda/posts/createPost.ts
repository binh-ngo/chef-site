const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Post, PostInput } from "../types";
import createTag from "../tags/createTag";
require("dotenv").config({ path: ".env" });

const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
});

const createPost = async (postInput: PostInput) => {
    console.log(
        `createPost invocation event: ${JSON.stringify(postInput, null, 2)}`
    );

    const postId = ulid();
    const formattedAuthor = postInput.postAuthor ? postInput.postAuthor.trim().replace(/\s+/g, "") : "";

    try {

        const imageUrl = await generateUploadURL(formattedAuthor, postId);

        const post: Post = {
            postId,
            postAuthor: formattedAuthor,
            authorId: postInput.authorId,
            body: postInput.body,
            tags: postInput.tags,
            likes: 0,
            imageUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            published: false,
            publishDate: ''
        };

        const params = {
            RequestItems: {
                "ChefSiteChefSiteBackendStackC0C43B6F-ChefSiteTable50DF745C-1I4475MN7CYKZ": [
                    {
                        PutRequest: {
                            Item: {
                                PK: `POSTS`,
                                SK: `POST#${postId}`,
                                type: 'post',
                                ...post,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `POST#${postId}`,
                                SK: `POST#${postId}`,
                                type: 'post',
                                ...post,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `CHEF#${formattedAuthor}`,
                                SK: `POST#${postId}`,
                                type: 'post',
                                ...post,
                            },
                        },
                    },
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        const data = await docClient.batchWrite(params).promise();
        console.log(`Created post: ${JSON.stringify(post, null, 2)}`);
        if (data) {
            await createTag(post);
        }
        return post;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export async function generateUploadURL(postAuthor:string, postId:string) {

    const params = ({
      Bucket: process.env.BUCKET_NAME,
      Key: `images/post/${postAuthor}-${postId}.jpg`,
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  }
export default createPost;