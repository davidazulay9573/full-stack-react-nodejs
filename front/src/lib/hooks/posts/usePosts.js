import { useState, useEffect } from "react";
import postService from "../../api-request/posts";
import useAuth from "../useAuth";

function usePosts() {
  const [posts, setPosts] = useState([]);
  const [user] = useAuth();
  useEffect(() => {
    (async () => {
      if (user?.isBusiness) {
        const { data } = await postService.getPosts();
        setPosts(data);
      }
    })();
  }, [user]);

  return posts || [];
}

export default usePosts;
