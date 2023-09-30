const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Chef, ChefInput } from "../types";
require("dotenv").config({ path: ".env" });

const createChef = async (chefInput: ChefInput) => {
    console.log(
        `createChef invocation event: ${JSON.stringify(chefInput, null, 2)}`
    );

    const chefId = ulid();

    const formattedChef = chefInput.name ? chefInput.name.trim().replace(/\s+/g, "") : "";

    const chef: Chef = {
        chefId,
        name: formattedChef,
        bio: chefInput.bio,
        location: chefInput.location,
        tags: chefInput.tags,
        email: chefInput.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrl: chefInput.imageUrl,
        backgroundImageUrl: chefInput.backgroundImageUrl,
        followers: 0,
        accolades: []
    };

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

    try {
        const data = await docClient.batchWrite(params).promise();
        console.log(`Created question: ${JSON.stringify(chef, null, 2)}`);
        return chef;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createChef;