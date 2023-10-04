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
        // Upload the image files to S3
        // const imageUrl = await uploadImageToS3(chefId, "profile-image.jpg", chefInput.imageUrl);
        const imageUrl = await generateUploadURL();

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

// const uploadImageToS3 = async (chefId: string, imageName: string, fileData: any) => {
//     const buffer = Buffer.from(fileData, 'base64'); // Convert the string to a buffer

//     const params = {
//         Bucket: "chef-site-images",
//         Key: `${chefId}-${imageName}`,
//         Body: buffer,
//         ContentType: 'image/jpeg', 
//         ACL: 'public-read'
//     };

//     const result = await s3.upload(params).promise();
//     return result.Location; // Return the S3 URL
// };
export async function generateUploadURL() {

    const params = ({
      Bucket: 'chef-site-images',
      Key: `${ulid()}.jpg`,
      Expires: 60
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  }
export default createChef;
