const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getPostById = async (postAuthor: string, postId: string) => {
  console.log(`getPostById called with: (${postAuthor}, ${postId})`);

  if (!postId) {
    return { statusCode: 400, body: `Error: You are missing the question ID` };
  }

  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: `CHEF#${postAuthor}`,
      SK: `POST#${postId}`,
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  
  try {
    const data = await docClient.get(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    // incrementViews(postAuthor, postId);
    return data.Item;

    } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};


export default getPostById;