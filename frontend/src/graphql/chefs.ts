import { API } from "aws-amplify";

export type SaveChefProps = {
    name: string;
    bio: string;
    email: string;
    location: string;
    tags: string[];
    imageUrl?: File;
    backgroundImageUrl?: File;
    chefId?: string;
}
// ==============
// CREATE CHEF
// ==============

const createChefQuery = `
mutation createChef($chefInput: ChefInput!) {
    createChef(chefInput: $chefInput) {
      chefId
      name
      bio
      location
      tags
      createdAt
      updatedAt
      imageUrl
      backgroundImageUrl
      followers
      accolades
    }
  }
`
export const ddbCreateChef = async (chefInput: SaveChefProps) => {
    const resp = await API.graphql({
        query: createChefQuery,
        variables: {
          chefInput: {
            name: chefInput.name,
            email: chefInput.email,
            bio: chefInput.bio,
            location: chefInput.location,
            tags: chefInput.tags,
            imageUrl: chefInput.imageUrl,
            backgroundImageUrl: chefInput.backgroundImageUrl,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
      return resp;
    
}

// ==============
// GET CHEF BY ID
// ==============

const getChefByIdQuery = `
query getChefById($name: String!, $chefId: String!) {
    getChefById(name: $name, chefId: $chefId) {
      chefId
      name
      bio
      location
      tags
      createdAt
      updatedAt
      imageUrl
      backgroundImageUrl
      followers
      accolades
    }
  }
`

export const ddbGetChefById = async (name: string, chefId: string) => {
    const resp = await API.graphql({
      query: getChefByIdQuery,
      variables: {
        name,
        chefId,
      },
      authMode: "API_KEY"
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    const question = resp.data.getChefById;
    // console.log(`post.content: ${post.content}`);
    return question;
  };

// ==============
// GET ALL CHEFS
// ==============

  const getAllChefsQuery = `
  query getAllChefs {
      getAllChefs {
        chefId
        name
        bio
        location
        tags
        createdAt
        updatedAt
        imageUrl
        backgroundImageUrl
        followers
        accolades
      }
    }
  `
  export const ddbGetAllChefs = async () => {
    const resp = await API.graphql({ 
      query: getAllChefsQuery,
      authMode: "API_KEY"
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    return resp.data.getAllChefs;
  }; 

// ===========
// UPDATE CHEF
// ===========

const updateChefQuery = `
    mutation updateChef($name: String!, $chefId: String!, $chefInput: ChefInput!) {
      updateChef(name: $name, chefId: $chefId, chefInput: $chefInput) {
        chefId
        name
        bio
        location
        tags
        createdAt
        updatedAt
        imageUrl
        backgroundImageUrl
        followers
        accolades
      }
    }
  `;

  export const ddbUpdateChef = async (chefInput: SaveChefProps) => {
    const resp = await API.graphql({
      query: updateChefQuery,
      variables: {
        name: chefInput.name,
        chefId: chefInput.chefId,
        chefInput: {
          name: chefInput.name,
          bio: chefInput.bio,
          location: chefInput.location,
          tags: chefInput.tags,
          email: chefInput.email,
          imageUrl: chefInput.imageUrl,
          backgroundImageUrl: chefInput.backgroundImageUrl,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  };

// ===========
// DELETE CHEF
// ===========

const deleteChefQuery = `
  mutation deleteChef($name: String!, $chefId: String!) {
    deleteChef(name: $name, chefId: $chefId)
  }
`;

export const ddbDeleteChef = async (chefId: string, name: string) => {
    console.log(`delete called for question ${chefId}`);
    const resp = await API.graphql({
      query: deleteChefQuery,
      variables: {
        name,
        chefId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
    console.log(`successfully deleted: ${resp.data.deleteChef}`);
  };
