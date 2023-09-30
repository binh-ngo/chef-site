const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Post, PostInput } from "../types";
import createTag from "../tags/createTag";
require("dotenv").config({ path: ".env" });

const createPost = async (postInput: PostInput) => {
    console.log(
        `createPost invocation event: ${JSON.stringify(postInput, null, 2)}`
    );

    const postId = ulid();

     const formattedAuthor = postInput.postAuthor ? postInput.postAuthor.trim().replace(/\s+/g, "") : "";

    const post: Post = {
        postId,
        postAuthor: formattedAuthor,
        body: postInput.body,
        tags: postInput.tags,
        likes: 0,
        imageUrl: postInput.imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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

    try {
        const data = await docClient.batchWrite(params).promise();
        console.log(`Created post: ${JSON.stringify(post, null, 2)}`);
        if(data) {
            await createTag(post);
        }
        return post;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createPost;