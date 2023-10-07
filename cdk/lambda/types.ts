import { TagInput } from "aws-sdk/clients/resourcegroups";

export type ddbQueryPostsParams = {
    TableName: string;
    IndexName?: string;
    KeyConditionExpression?: string;
    ExpressionAttributeNames?: { [key: string]: string };
    ExpressionAttributeValues?: { [key: string]: any };
    FilterExpression?: string;
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
    ScanIndexForward?: boolean;
  };

//~~~~~~~~~~~~~~~~~~~~~~  //
//     AppSync Events     //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type ChefAppSyncEvent = {
    info: {
      fieldName: string;
    };
    arguments: {
      name?: string;
      chefId?: string;
      chefInput?: ChefInput;
    };
  };

export type PostAppSyncEvent = {
    info: {
      fieldName: string;
    };
    arguments: {
      postAuthor?: string;
      postId?: string;
      tagName?: string;
      postInput?: PostInput;
    };
  };

  export type CommentAppSyncEvent = {
    info: {
      fieldName: string;
    };
    arguments: {
      commId?: string;
      commAuthor?: string;
      quesId?: string;
      commentInput?: CommentInput;
    };
  };

  export type TagAppSyncEvent = {
    info: {
      fieldName: string;
    };
    arguments: {
        tagName?: string;
        count?: number;
        tagId?: string;
        postId?: string;
    };
  };

  export type ImageAppsyncEvent = {
    info: {
      fieldName: string;
    };
    arguments: {
      name: string;
      imageUrl: any;
      imageUsage: string;
    }
  }

  export type ReviewAppSyncEvent = {
    info: {
      fieldName: string;
    };
    arguments: {
        reviewId?: string;
        client: string;
        rating: number;
        reviewInput: ReviewInput;
    };
  };
//~~~~~~~~~~~~~~~~~~~~~~  //
//       Chef Types       //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Chef = {
    chefId: string;
    name: string;
    bio: string;
    location: string;
    tags: string[] | null;
    email: string;
    createdAt: string;
    updatedAt: string;
    imageUrl: string;
    followers: number;
    accolades: string[];
}

export type ChefInput = {
    name: string;
    bio: string;
    location: string;
    tags: string[];
    email: string;
    imageUrl: string;
    updatedAt?: string;
}

//~~~~~~~~~~~~~~~~~~~~~~  //
//       Post Types       //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Post = {
    postId: string;
    postAuthor: string;
    body: string;
    tags: string[];
    likes: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export type PostInput = {
    postAuthor: string;
    body: string;
    imageUrl: string;
    tags: string[];
}

export type PostUpdateableFields = {
    body: string;
    tags: string[];
    imageUrl: string;
}
//~~~~~~~~~~~~~~~~~~~~~~  //
//       Comment Types    //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Comment = {
    commentId: string;
    commAuthor: string;
    body: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
}

export type CommentInput = {
    body: string;
}

//~~~~~~~~~~~~~~~~~~~~~~  //
//       Tag Types       //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Tag = {
    tagId: string;
    tagName: string;
    count: number;
    createdAt: string;
}

//~~~~~~~~~~~~~~~~~~~~~~  //
//       Review Types       //
// ~~~~~~~~~~~~~~~~~~~~~~ //

export type Review = {
    reviewId: string;
    chefId: string;
    client: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export type ReviewInput = {
    chefId: string;
    client: string;
    rating: number;
}