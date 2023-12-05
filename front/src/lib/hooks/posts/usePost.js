/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import useAuth from "../global-states/useAuth";
import postService from "../../api-request/posts";
import userService from "../../api-request/users";

function usePost(id) {
  const [post, setPost] = useState([]);
  const [userPost, setUserPost] = useState(null);
  const [userAuth] = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await postService.getPost(id);
      setPost(data);
      setUserPost((await userService.getUser(data.user_id)).data);
    })();
  }, []);


  const handleLike = async () => {
    const response = await postService.LikeAndDisLike(id);
    const likesRes = await response.data;
    setPost((post) => ({ ...post, likes: likesRes }));
  };
  
  const isLiked = post?.likes?.find((like) => like.user_id === userAuth._id);

  const isOwner = post?.user_id === userAuth._id;

  return [post, userPost, handleLike, isLiked, isOwner];
}

export default usePost;
