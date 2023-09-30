import { ddbQueryPostsParams } from "../types";
require('dotenv').config()

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllChefs = async () => {
  console.log(`getAllChefs called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.POSTS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition",
    ExpressionAttributeNames: {
      "#PK": "PK",
    },
    ExpressionAttributeValues: {
      ":post_partition": "CHEFS",
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: false, // Set this to true for ascending order
  };
 
  try {
    const data = await docClient.query(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);

    return data.Items;

  } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default getAllChefs;
