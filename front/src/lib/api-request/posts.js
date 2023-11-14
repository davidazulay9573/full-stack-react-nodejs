import httpRequest from "./http-request";

function createPost(post) {
  return httpRequest.post("/posts", post);
}

function updatePost(id, post) {
  return httpRequest.put(`/posts/${id}`, post);
}

export function deletePost(id) {
  return httpRequest.delete(`/posts/${id}`);
}

function getPosts() {
  return httpRequest.get("/posts");
}

function getPost(id) {
  return httpRequest.get(`/posts/${id}`);
}

const postService = {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getPosts,
};

export default postService;
