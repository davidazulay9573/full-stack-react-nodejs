/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useAuth from "../global-states/useAuth";
import postService from "../../api-request/posts";
import userService from "../../api-request/users";

function usePosts(userId, search) {
  const [userAuth] = useAuth()
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
       if(!search && !userId){
         const { data: posts } = await postService.getPosts();

         for (const post of posts) {
           const { data: userPost } = await userService.getUser(post.user_id);
           if (
             userPost.followers.some(
               (follower) => follower.user_id === userAuth._id
             )
           ) {
            setPosts((posts) => [...posts, post]);
           }
         }  
       }     
    })();
  }, []);

  return posts || [];
}

export default usePosts;
