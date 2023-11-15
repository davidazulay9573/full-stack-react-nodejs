import { useState, useEffect } from "react";
import postService from "../../api-request/posts";

function usePosts(userId, search) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => { 
      if(userId){
         const { data } =  await postService.getPosts(userId);
         setPosts(data); 
         return;    
      }
      if(search){
         const { data } = (await postService.getPosts(null, search));
         setPosts(data);   
         return;
      }

       const { data } = (await postService.getPosts());
       setPosts(data);   
    })();
  }, [userId, search]);

  return posts || [];
}

export default usePosts;
