import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getPublishedPosts = async () => {
  console.log(`getPublishedPosts called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.POSTS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition",
    FilterExpression: "#published = :published",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#published": "published",
    },
    ExpressionAttributeValues: {
      ":post_partition": `POSTS`,
      ":published": true,
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: false,
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

export default getPublishedPosts;