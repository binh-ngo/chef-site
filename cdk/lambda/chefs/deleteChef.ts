import deletePost from "../posts/deletePost";
import getAllPosts from "../posts/getAllPosts";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteChef = async (name: string, chefId: string) => {
  console.log(
    `deleteChef invocation event: ${JSON.stringify(`Chef Name: ${name}, chefId: ${chefId}`, null, 2)}`
  );

  const batchWriteParams = {
    RequestItems: {
      "ChefSiteChefSiteBackendStackC0C43B6F-ChefSiteTable50DF745C-1I4475MN7CYKZ": [
        {
          DeleteRequest: {
            Key: {
              PK: `CHEFS`,
              SK: `CHEF#${name}`,
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              PK: `CHEF#${name}`,
              SK: `CHEF#${chefId}`,
            },
          },
        },
      ],
    },
  };

  console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)

  try {
    // Perform the batch write operation
    await docClient.batchWrite(batchWriteParams).promise();

    const chefPosts = await getAllPosts(name);

    for(let i=0; i < chefPosts.length; i++ ) {
      await deletePost(name, chefPosts[i].postId);
    }
    
    return `Deleted ChefId: ${chefId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
};

export default deleteChef;