const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ChefInput } from "../types";

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
    
        const chef: ChefInput = {
            name: chefInput.name,
            bio: chefInput.bio,
            location: chefInput.location,
            tags: chefInput.tags,
            email: chefInput.email,
            imageUrl: chefInput.imageUrl,
            backgroundImageUrl: chefInput.backgroundImageUrl,
            updatedAt: new Date().toISOString(),
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
            "set #name = :name, #bio = :bio,  #location = :location,  #email = :email,  #imageUrl = :imageUrl, #backgroundImageUrl = :backgroundImageUrl, #updatedAt = :updatedAt, #tags = :tags",
        ExpressionAttributeNames: {
            "#name": "name",
            "#bio": "bio",
            "#location": "location",
            "#tags": "tags",
            "#email": "email",
            "#imageUrl": "imageUrl",
            "#backgroundImageUrl": "backgroundImageUrl",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":name": chef.name,
            ":bio": chef.bio,
            ":location": chef.location,
            ":tags": chef.tags,
            ":email": chef.email,
            ":imageUrl": chef.imageUrl,
            ":backgroundImageUrl": chef.backgroundImageUrl,
            ":updatedAt": chef.updatedAt,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedQuestion = await docClient.update(params).promise();

        console.log(`updatedQuestion: ${JSON.stringify(updatedQuestion, null, 2)}`);

        return updatedQuestion.Attributes;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateChef;