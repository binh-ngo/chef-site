const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

// const incrementViews = async (author:string, postId:string) => {
// console.log(`invoking incrementViews on question (${author}, ${quesId})`)
//   const updateViewsParams = {
//     TableName: process.env.POSTS_TABLE,
//     Key: {
//       PK: `AUTHOR#${author}`,
//       SK: `QUESTION#${quesId}`    
//     },
//     UpdateExpression: "SET #views = #views + :i",
//     ExpressionAttributeNames: {
//       "#views": "views",
//       ":i": 1
//     },
//     ReturnValues: "UPDATED_NEW"
//   }
  
//   try {
//     const updatedQuestion = await docClient.update(updateViewsParams).promise();

//     console.log(`updatedQuestion: ${JSON.stringify(updatedQuestion, null, 2)}`);

//     return updatedQuestion.Attributes;
// } catch (err) {
//     console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

//     return null;
// }
// }

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