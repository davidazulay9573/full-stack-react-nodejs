import { useState, useEffect } from "react";
import postService from "../../api-request/posts";

function usePosts(userId) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => { 
     const { data } = userId
       ? await postService.getPosts(userId)
       : await postService.getPosts();
     setPosts(data);     
    })();
  }, [userId]);

  return posts || [];
}

export default usePosts;
