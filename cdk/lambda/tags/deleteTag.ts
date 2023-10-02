const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteTag = async (tagName: string, postId: string) => {
  console.log(
    `deleteTag invocation event: ${JSON.stringify(`Tag Name: ${tagName}`, null, 2)}`
  );

  const params = {
        TableName: process.env.CHEFS_TABLE,
        Key: {
            PK: `TAG#${tagName}`,
            SK: `POST#${postId}`,
        },
        ReturnConsumedCapacity: "TOTAL",
    }

  try {
    await docClient.delete(params).promise();
    return `Deleted TagName: ${tagName}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteTag;