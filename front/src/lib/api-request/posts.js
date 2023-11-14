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

function getPost(id) {
  return httpRequest.get(`/posts/${id}`);
}

function getPosts(userId) {
  const path = userId ? `/posts/?user=${userId}` : "/posts";
  return httpRequest.get(path);
}

function getLikedPosts(){
  return httpRequest.get('/posts/liked');
}

function LikeAndDisLike(id){
  return httpRequest.patch(`/posts/${id}`); 
}

const postService = {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getPosts,
  getLikedPosts,
  LikeAndDisLike
};

export default postService;
