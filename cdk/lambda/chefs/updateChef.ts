const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Chef, ChefInput } from "../types";
import getChefById from "./getChefById";

const updateChef = async (
    name: string,
    chefId: string,
    chefInput: ChefInput
) => {

    if (!chefInput) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    };
    
    if (!name || !chefId) {
        return { statusCode: 400, body: 'invalid request, you are missing the pk or sk.' };
    }

    const retrievedChef = await getChefById(name, chefId);

        const chef: Chef = {
            chefId,
            name: chefInput.name,
            bio: chefInput.bio,
            location: chefInput.location,
            tags: chefInput.tags,
            email: chefInput.email,
            imageUrl: chefInput.imageUrl,
            updatedAt: new Date().toISOString(),
            createdAt: retrievedChef.createdAt,
            followers: retrievedChef.followers,
            accolades: retrievedChef.accolades
        };

        console.log(`UPDATE question called with:` + JSON.stringify(` UserPK: ${name} and UserSk: ${chefId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF QUESTIONINPUT --------- ${typeof (chefInput)}`);
    
        const params = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `CHEF#${name}`,
            SK: `CHEF#${chefId}`,
        },
        UpdateExpression:
            "set #name = :name, #bio = :bio,  #location = :location,  #email = :email,  #imageUrl = :imageUrl, #updatedAt = :updatedAt, #tags = :tags, #createdAt = :createdAt, #accolades = :accolades, #chefId = :chefId",
        ExpressionAttributeNames: {
            "#name": "name",
            "#bio": "bio",
            "#location": "location",
            "#tags": "tags",
            "#email": "email",
            "#imageUrl": "imageUrl",
            "#backgroundImageUrl": "backgroundImageUrl",
            "#updatedAt": "updatedAt",
            "#createdAt": "createdAt",
            "#accolades": "accolades",
            "#chefId": "chefId",
        },
        ExpressionAttributeValues: {
            ":name": chef.name,
            ":bio": chef.bio,
            ":location": chef.location,
            ":tags": chef.tags,
            ":email": chef.email,
            ":imageUrl": chef.imageUrl,
            ":updatedAt": chef.updatedAt,
            ":createdAt": chef.createdAt,
            ":chefId": chef.chefId,
            ":accolades": chef.accolades,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const additionalParams = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `CHEFS`,
            SK: `CHEF#${name}`,
        },
        UpdateExpression:
            "set #name = :name, #bio = :bio,  #location = :location,  #email = :email,  #imageUrl = :imageUrl, #updatedAt = :updatedAt, #tags = :tags, #createdAt = :createdAt, #accolades = :accolades, #chefId = :chefId",
        ExpressionAttributeNames: {
            "#name": "name",
            "#bio": "bio",
            "#location": "location",
            "#tags": "tags",
            "#email": "email",
            "#imageUrl": "imageUrl",
            "#updatedAt": "updatedAt",
            "#createdAt": "createdAt",
            "#accolades": "accolades",
            "#chefId": "chefId",
        },
        ExpressionAttributeValues: {
            ":name": chef.name,
            ":bio": chef.bio,
            ":location": chef.location,
            ":tags": chef.tags,
            ":email": chef.email,
            ":imageUrl": chef.imageUrl,
            ":updatedAt": chef.updatedAt,
            ":createdAt": chef.createdAt,
            ":chefId": chef.chefId,
            ":accolades": chef.accolades,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`additionalParams: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedChef = await docClient.update(params).promise();

        console.log(`updatedChef: ${JSON.stringify(updatedChef, null, 2)}`);

        if(updatedChef) {
            await docClient.update(additionalParams).promise();
        }
        return updatedChef.Attributes;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateChef;