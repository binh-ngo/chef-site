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
import getPublishedPosts from "./posts/getPublishedPosts";
import getUnpublishedPosts from "./posts/getUnpublishedPosts";
import publishPost from "./posts/publishPost";
import updatePost from "./posts/updatePost";
import createTag from "./tags/createTag";
import deleteTag from "./tags/deleteTag";
import getAllTags from "./tags/getAllTags";
import getTagById from "./tags/gettagById";
import { ChefAppSyncEvent, PostAppSyncEvent, TagAppSyncEvent } from "./types";

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
        else if(eventType === "Tag") {
        return handleTagEvent(event);
      } 
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
      case "getPublishedPosts":
      case "getUnpublishedPosts":
      case "getAllPostsFromAllChefs":
      case "getPostById":
      case "createPost":
      case "publishPost":
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
        return getPostById(event.arguments.postAuthor!, event.arguments.postId!);
      case "getAllPosts":
        return getAllPosts(event.arguments.postAuthor!);
      case "getAllPostsFromAllChefs":
        return getAllPostsFromAllChefs();
      case "getPublishedPosts":
        return getPublishedPosts();
      case "getUnpublishedPosts":
        return getUnpublishedPosts();
      case "createPost":
        return createPost(event.arguments.postInput!);
      case "publishPost":
        return publishPost(event.arguments.postId!, event.arguments.published!);
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

  function handleTagEvent(event: TagAppSyncEvent) {
    switch (event.info.fieldName) {
      case "getTagById":
        return getTagById(event.arguments.tagName!);
      case "getAllTags":
        return getAllTags();
      case "deleteTag":
        return deleteTag(event.arguments.tagName!, event.arguments.postId!);
      default:
        throw new Error(`Unknown field name: ${event.info.fieldName}`);
    }
  }