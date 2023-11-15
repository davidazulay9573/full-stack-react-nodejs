import { useState, useEffect } from "react";
import useAuth from "../global-states/useAuth";
import postService from "../../api-request/posts";
import userService from "../../api-request/users";

function usePost(id) {

  const [post, setPost] = useState([]);
  const [userPost, setUserPost] = useState(null);
  const [likes, setLikes] = useState(post?.likes || []);
  const [comments, setComments] = useState(0);
  const [userAuth] = useAuth();
  
  useEffect(() => {
   
    (async () => {
      const { data } = await postService.getPost(id);
      setPost(data);
      ;
       setUserPost((await userService.getUser(data.user_id)).data);
    })();
  }, [id]);
   
  const isLiked = () => {
    return likes?.find((like) => like.user_id === userAuth._id);
  };

  const handleLike = async () => {
    const response = await postService.LikeAndDisLike(id);
    const likesRes = await response.data;
    setLikes(likesRes || []);
  };
  
  const handleComment = () => {
  }
  return [post, userPost, likes, handleLike, isLiked, comments, handleComment];
}

export default usePost;
