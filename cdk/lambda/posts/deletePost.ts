const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deletePost = async (postAuthor: string, postId: string) => {
  console.log(
    `deletePost invocation event: ${JSON.stringify(`Author: ${postAuthor}, QuesId: ${postId}`, null, 2)}`
  );

  try {
    // First, retrieve the question to get its tags
    const getItemParams = {
      TableName: process.env.POSTS_TABLE, 
      Key: {
        PK: `POST#${postId}`,
        SK: `POST#${postId}`,
      },
    };

    const { Item } = await docClient.get(getItemParams).promise();

    if (!Item) {
      console.log(`Question with QuesId ${postId} not found.`);
      return null;
    }

    const tagDeleteRequests = Item.tags.flatMap((tag: string) => [
      {
        DeleteRequest: {
          Key: {
            PK: `POST#${postId}`,
            SK: `TAG#${tag}`,
          },
        },
      },
      {
        DeleteRequest: {
          Key: {
            PK: `TAG#${tag}`,
            SK: `POST#${postId}`,
          },
        },
      },
    ])
    // Delete the question and associated tags in a batch write operation

    const batchWriteParams = {
      RequestItems: {
        "StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR": [
          {
            DeleteRequest: {
              Key: {
                PK: `CHEF#${postAuthor}`,
                SK: `POST#${postId}`,
              },
            },
          },
          {
            DeleteRequest: {
              Key: {
                PK: `POSTS`,
                SK: `POST#${postId}`,
              },
            },
          },
          {
            DeleteRequest: {
              Key: {
                PK: `POST#${postId}`,
                SK: `POST#${postId}`,
              },
            },
          },
          ...tagDeleteRequests
        ],
      },
    };
    console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)
    // Perform the batch write operation
    await docClient.batchWrite(batchWriteParams).promise();

    return `Deleted QuesId: ${postId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deletePost;