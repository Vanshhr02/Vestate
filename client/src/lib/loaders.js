import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

// Loader for a single post
export const singlePageLoader = async ({ params }) => {
  const response = await apiRequest(`/posts/${params.id}`);
  return response.data;
};

// Loader for a list of posts with query parameters
export const listPageLoader = async ({ request }) => {
  const query = new URL(request.url).search;  // Get query from URL
  const postPromise = apiRequest(`/posts${query}`);
  return defer({ postResponse: postPromise });
};

// Loader for profile page (profile posts and chats)
export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({ postResponse: postPromise, chatResponse: chatPromise });
};
