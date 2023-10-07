// Lambda function code
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Chef, ChefInput } from "../types";
require("dotenv").config({ path: ".env" });

const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
});
const createChef = async (chefInput: ChefInput) => {
    const chefId = ulid();
    const formattedChef = chefInput.name ? chefInput.name.trim().replace(/\s+/g, "") : "";

    try {
        const imageUrl = await generateUploadURL(formattedChef, chefId);

        // Create the Chef object with S3 URLs
        const chef: Chef = {
            chefId,
            name: formattedChef,
            bio: chefInput.bio,
            location: chefInput.location,
            tags: chefInput.tags,
            email: chefInput.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            imageUrl,
            followers: 0,
            accolades: []
        };

        // Store Chef data in DynamoDB
        const params = {
            RequestItems: {
                "ChefSiteChefSiteBackendStackC0C43B6F-ChefSiteTable50DF745C-1I4475MN7CYKZ": [
                    {
                        PutRequest: {
                            Item: {
                                PK: `CHEFS`,
                                SK: `CHEF#${formattedChef}`,
                                type: "chef",
                                ...chef
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                PK: `CHEF#${formattedChef}`,
                                SK: `CHEF#${chefId}`,
                                type: 'chef',
                                ...chef,
                            },
                        },
                    },
                ],
            },
            ReturnConsumedCapacity: "TOTAL",
        };

        await docClient.batchWrite(params).promise();
        console.log(`Created chef: ${JSON.stringify(chef, null, 2)}`);
        return chef;
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export async function generateUploadURL(name:string, chefId:string) {

    const params = ({
      Bucket: process.env.BUCKET_NAME,
      Key: `images/chef/${name}-${chefId}.jpg`,
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  }
export default createChef;
