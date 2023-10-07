import { API } from "aws-amplify";

// ===========
// CREATE POST
// ===========

export type SavePostProps = {
    postAuthor: string;
    authorId?: string;
    postId?: string;
    body: string;
    imageUrl?: File;
    tags?: string[];
  };

const createPostQuery = `
  mutation createPost($postInput: PostInput!) {
    createPost(postInput: $postInput) {
      postId
      postAuthor
      authorId
      body
      tags
      likes
      imageUrl
      createdAt
      updatedAt
    }
  }
`;

export const ddbCreatePost = async (postInput: SavePostProps) => {
// const contentString = JSON.stringify(value).replace(/"/g, '\\"');
// const bodyString = JSON.stringify(postInput.body);
// console.log(`contentString: ${contentString}`);
const resp = await API.graphql({
  query: createPostQuery,
  variables: {
    postInput: {
      postAuthor: postInput.postAuthor,
      authorId: postInput.authorId,
      body: postInput.body,
      tags: postInput.tags,
      imageUrl: postInput.imageUrl
    },
  },
  authMode: "AMAZON_COGNITO_USER_POOLS",
});
console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
return resp;
  };
  

  // ==============
// GET Post By ID
// ==============

const getPostByIdQuery = `
    query getPostById($postAuthor: String!, $postId: String!) {
      getPostById(postAuthor: $postAuthor, postId: $postId) {
        postId
        postAuthor
        authorId
        body
        tags
        likes
        imageUrl
        createdAt
        updatedAt
      }
    }
  `;

export const ddbGetPostById = async (postAuthor: string, postId: string) => {
  const resp = await API.graphql({
    query: getPostByIdQuery,
    variables: {
      postAuthor,
      postId,
    },
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  const question = resp.data.getPostById;
  // console.log(`post.content: ${post.content}`);
  return question;
};

// =========
// GET POSTS
// =========

const getAllPostsQuery = `
query getAllPosts($postAuthor: String!) {
  getAllPosts(postAuthor: $postAuthor) {
    postId
    postAuthor
    authorId
    body
    tags
    likes
    imageUrl
    createdAt
    updatedAt
  }
}
`;

export const ddbGetAllPosts = async (postAuthor: string) => {
  const resp = await API.graphql({ 
    query: getAllPostsQuery,
    variables: {
      postAuthor
    },
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllPosts;
};

const getAllPostsFromAllChefsQuery = `
query getAllPostsFromAllChefs {
  getAllPostsFromAllChefs {
    postId
    postAuthor
    authorId
    body
    tags
    likes
    imageUrl
    createdAt
    updatedAt
  }
}
`;
export const ddbGetAllPostsFromAllChefs = async () => {
  const resp = await API.graphql({ 
    query: getAllPostsFromAllChefsQuery,
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllPostsFromAllChefs;
};


// ===========
// UPDATE POST
// ===========

const updatePostQuery = `
    mutation updatePost($postAuthor: String!, $postId: String!, $postInput: PostInput!) {
      updatePost(postAuthor: $postAuthor, postId: $postId, postInput: $postInput) {
        postId
        postAuthor
        authorId
        body
        tags
        likes
        imageUrl
        createdAt
        updatedAt
      }
    }
  `;

export const ddbUpdatePost = async (postInput: SavePostProps) => {
  const contentString = JSON.stringify(postInput.body);
  // console.log(`contentString: ${contentString}`);
  const resp = await API.graphql({
    query: updatePostQuery,
    variables: {
      postAuthor: postInput.postAuthor,
      postId: postInput.postId,
      postInput: {
        postAuthor: postInput.postAuthor,
        imageUrl: postInput.imageUrl,
        body: contentString,
        tags: postInput.tags,
      },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
};

// ===========
// DELETE POST
// ===========

const deleteQuery = `
  mutation deletePost($postAuthor: String!, $postId: String!) {
    deletePost(postAuthor: $postAuthor, postId: $postId)
  }
`;

export const ddbDeletePost = async (postId: string, postAuthor: string) => {
  console.log(`delete called for question ${postId}`);
  const resp = await API.graphql({
    query: deleteQuery,
    variables: {
      postAuthor,
      postId,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  console.log(`successfully deleted: ${resp.data.deletePost}`);
};


