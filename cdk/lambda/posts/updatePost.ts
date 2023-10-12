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
            authorId: retrievedPost.authorId,
            body: postInput.body ? postInput.body : retrievedPost.body,
            tags: postInput.tags ? postInput.tags : retrievedPost.tags,
            imageUrl: postInput.imageUrl ? postInput.imageUrl : retrievedPost.imageUrl,
            likes: retrievedPost.likes,
            createdAt: retrievedPost.createdAt,
            updatedAt: new Date().toISOString(),
            published: retrievedPost.published,
            publishDate: retrievedPost.publishDate
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
            "set #body = :body, #tags = :tags, #imageUrl = :imageUrl, #updatedAt = :updatedAt",
        ExpressionAttributeNames: {
            "#body": "body",
            "#tags": "tags",
            "#imageUrl": "imageUrl",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":body": post.body,
            ":tags": post.tags,
            ":imageUrl": post.imageUrl,
            ":updatedAt": post.updatedAt,
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