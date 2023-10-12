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
        
        const tagPutRequests = post.tags!.flatMap(tag => [
            {
                PutRequest: {
                    Item: {
                        PK: `TAG#${tag}`,
                        SK: `POST#${post.postId}`,
                        type: 'post',
                        ...post
                    },
                },
            },
        ]);
        const batchWriteParams = {
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
                                PK: `CHEF#${postAuthor}`,
                                SK: `POST#${postId}`,
                                type: 'post',
                                ...post,
                            },
                        },
                    },
                    ...tagPutRequests
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

    console.log(`batchWriteParams: ${JSON.stringify(batchWriteParams, null, 2)}`);

    try {
        const updatedPost = await docClient.batchWrite(batchWriteParams).promise();

        console.log(`updatedPost: ${JSON.stringify(updatedPost, null, 2)}`);
        
        return post;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updatePost;