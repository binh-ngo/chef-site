const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteChef = async (name: string, chefId: string) => {
  console.log(
    `deleteChef invocation event: ${JSON.stringify(`Chef Name: ${name}, QuesId: ${chefId}`, null, 2)}`
  );

  try {
    const batchWriteParams = {
      RequestItems: {
        "ChefSiteChefSiteBackendStackC0C43B6F-ChefSiteTable50DF745C-1I4475MN7CYKZ": [
          {
            DeleteRequest: {
              Key: {
                PK: `CHEFS#`,
                SK: `CHEF#${name}`,
              },
            },
          },
          {
            DeleteRequest: {
              Key: {
                PK: `CHEF${name}`,
                SK: `CHEF#${chefId}`,
              },
            },
          },
          // add a batch delete that removes all posts from 
          // the chef after deleting the account
        ],
      },
    };
    console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)
    // Perform the batch write operation
    await docClient.batchWrite(batchWriteParams).promise();

    return `Deleted ChefId: ${chefId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteChef;