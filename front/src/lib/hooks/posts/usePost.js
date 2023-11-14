import { useState, useEffect } from "react";
import postService from "../../api-request/posts";
function usePost(id) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await postService.getPost(id);
      setPost(data);
    })();
  }, [id]);

  return post;
}

export default usePost;
