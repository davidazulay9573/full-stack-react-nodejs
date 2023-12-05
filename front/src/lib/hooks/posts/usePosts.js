/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useAuth from "../global-states/useAuth";
import postService from "../../api-request/posts";
import userService from "../../api-request/users";

function usePosts(userId, search) {
  const [userAuth] = useAuth()
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => { 
      if(userId){
         const { data } =  await postService.getPosts(userId);
         setPosts(data);
         setLoading(false);
         return;    
      }
      if(search){
         const { data } = (await postService.getPosts(null, search));
         setPosts(data);   
         setLoading(false);
         return;
      }
   if (!search && !userId) {
     const { data: posts } = await postService.getPosts();
     const postsHashMap = {}; 

     for (const post of posts) {
       if (postsHashMap[post._id]) {
         continue;
       }

       const { data: userPost } = await userService.getUser(post.user_id);
       if (
         userPost.followers.some(
           (follower) => follower.user_id === userAuth._id
         ) ||
         post.user_id === userAuth._id
       ) {
         postsHashMap[post._id] = post; 
       }
     }
     setPosts(Object.values(postsHashMap));
     setLoading(false);
     }
    })();
  }, [userId]);

  return [posts, isLoading] ;
}

export default usePosts;
