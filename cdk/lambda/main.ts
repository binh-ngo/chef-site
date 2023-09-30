import createChef from "./chefs/createChef";
import deleteChef from "./chefs/deleteChef";
import getAllChefs from "./chefs/getAllChefs";
import getChefById from "./chefs/getChefById";
import updateChef from "./chefs/updateChef";
import createPost from "./posts/createPost";
import deletePost from "./posts/deletePost";
import getAllPosts from "./posts/getAllPosts";
import getAllPostsFromAllChefs from "./posts/getAllPostsFromAllChefs";
import getPostById from "./posts/getPostById";
import updatePost from "./posts/updatePost";
import { ChefAppSyncEvent, ChefInput, PostAppSyncEvent } from "./types";

export async function handler(event: any): Promise<any> {
    console.log(`EVENT --- ${JSON.stringify(event)}`);
    const eventType = getEventType(event);

    if (eventType === "Chef") {
        return handleChefEvent(event);
      } else if (eventType === "Post") {
        return handlePostEvent(event);
      } 
    //   else if (eventType === "Comment") {
    //     return handleCommentEvent(event);
    //   } 
    //     else if(eventType === "Tag") {
    //     return handleTagEvent(event);
    //   } 
    //   else if (eventType === "Review") {
    //     return handleReviewEvent(event)
    //   } 
      else {
        throw new Error(`Unknown event type.`);
      }
}  

// Function to determine the event type based on the field name
function getEventType(event: any): "Chef" | "Post" | "Comment" | "Tag" | "Review" {
    switch (event.info.fieldName) {
      case "getAllChefs":
      case "getChefById":
      case "createChef":
      case "deleteChef":
      case "updateChef":
        return "Chef";
      case "getAllPosts":
      case "getAllPostsFromAllChefs":
      case "getPostById":
      case "createPost":
      case "deletePost":
      case "updatePost":
        return "Post";
      case "getCommentById":
      case "createComment":
      case "updateComment":
      case "deleteComment":
        return "Comment";
      case "getAllTags":
      case "getTagById":
      case "createTag":
      case "deleteTag":
        return "Tag";
      case "getReviewById":
      case "getAllReviews":
      case "createReview":
      case "deleteReview":
      case "updateReview":
        return "Review";
      default:
        throw new Error(`Unknown field name: ${event.info.fieldName}`);
    }
  }

  // Handler function for Chef events
function handleChefEvent(event: ChefAppSyncEvent) {
    switch (event.info.fieldName) {
      case "getChefById":
        // console.log(`QUESTION ---${JSON.stringify(event)}`);
        return getChefById(event.arguments.name!, event.arguments.chefId!);
      case "getAllChefs":
        // console.log(`QUESTION ---${JSON.stringify(event)}`);
        return getAllChefs();
      case "createChef":
        // const chefInput: ChefInput = {
        //   name: event.arguments.name!,
        //   bio: event.arguments.chefInput!.bio,
        //   location: event.arguments.chefInput!.location,
        //   tags: event.arguments.chefInput!.tags,
        //   email: event.arguments.chefInput!.email,
        //   imageUrl: event.arguments.chefInput!.imageUrl,
        //   backgroundImageUrl: event.arguments.chefInput!.backgroundImageUrl,
        // };
        return createChef(event.arguments.chefInput!);
      case "updateChef":
        return updateChef(
          event.arguments.name!,
          event.arguments.chefId!,
          event.arguments.chefInput!
        );
      case "deleteChef":
        return deleteChef(event.arguments.name!, event.arguments.chefId!);
      default:
        throw new Error(`Unknown field name: ${event.info.fieldName}`);
    }
  }

  // Handler function for Post events
function handlePostEvent(event: PostAppSyncEvent) {
    switch (event.info.fieldName) {
      case "getPostById":
        // console.log(`QUESTION ---${JSON.stringify(event)}`);
        return getPostById(event.arguments.postAuthor!, event.arguments.postId!);
      case "getAllPosts":
        // console.log(`QUESTION ---${JSON.stringify(event)}`);
        return getAllPosts(event.arguments.postAuthor!);
      case "getAllPostsFromAllChefs":
        // console.log(`QUESTION ---${JSON.stringify(event)}`);
        return getAllPostsFromAllChefs();
      case "createPost":
        return createPost(event.arguments.postInput!);
      case "updatePost":
        return updatePost(
          event.arguments.postAuthor!,
          event.arguments.postId!,
          event.arguments.postInput!
        );
      case "deletePost":
        return deletePost(event.arguments.postAuthor!, event.arguments.postId!);
      default:
        throw new Error(`Unknown field name: ${event.info.fieldName}`);
    }
  }