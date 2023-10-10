import { Post, PostInput } from "../types";
import getPostById from "./getPostById";

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
    const retrievedPost = await getPostById(postAuthor, postId);

        const post: Post = {
            postId,
            postAuthor,
            authorId: postInput.authorId,
            body: postInput.body,
            tags: postInput.tags,
            imageUrl: postInput.imageUrl,
            likes: retrievedPost.likes,
            createdAt: retrievedPost.createdAt,
            updatedAt: new Date().toISOString()
        };

        console.log(`UPDATE question called with:` + JSON.stringify(` UserPK: ${postAuthor} and UserSk: ${postId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF QUESTIONINPUT --------- ${typeof (postInput)}`);
    const params = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `POST#${postId}`,
            SK: `POST#${postId}`,
        },
        UpdateExpression:
            "set #postId = :postId, #postAuthor = :postAuthor, #body = :body, #tags = :tags, #imageUrl = :imageUrl, #likes = :likes, #createdAt = :createdAt, #updatedAt = :updatedAt",
        ExpressionAttributeNames: {
            "#postId": "postId",
            "#postAuthor": "postAuthor",
            "#body": "body",
            "#tags": "tags",
            "#imageUrl": "imageUrl",
            "#likes": "likes",
            "#createdAt": "createdAt",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":postId": post.postId,
            ":postAuthor": post.postAuthor,
            ":body": post.body,
            ":tags": post.tags,
            ":imageUrl": post.imageUrl,
            ":likes": post.likes,
            ":createdAt": post.createdAt,
            ":updatedAt": post.updatedAt,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const additionalParams = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `POST#${postId}`,
            SK: `POST#${postId}`,
        },
        UpdateExpression:
            "set #postId = :postId, #postAuthor = :postAuthor, #body = :body, #tags = :tags, #imageUrl = :imageUrl, #likes = :likes, #createdAt = :createdAt, #updatedAt = :updatedAt",
        ExpressionAttributeNames: {
            "#postId": "postId",
            "#postAuthor": "postAuthor",
            "#body": "body",
            "#tags": "tags",
            "#imageUrl": "imageUrl",
            "#likes": "likes",
            "#createdAt": "createdAt",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":postId": post.postId,
            ":postAuthor": post.postAuthor,
            ":body": post.body,
            ":tags": post.tags,
            ":imageUrl": post.imageUrl,
            ":likes": post.likes,
            ":createdAt": post.createdAt,
            ":updatedAt": post.updatedAt,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`additionalParams: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedPost = await docClient.update(params).promise();

        console.log(`updatedPost: ${JSON.stringify(updatedPost, null, 2)}`);

        if(updatedPost) {
            await docClient.update(additionalParams).promise();
        }
        return updatedPost.Attributes;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updatePost;