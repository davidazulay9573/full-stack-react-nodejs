import { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePostActions from "../../lib/hooks/posts/usePostActions";
function DeletePost() {
  const { id } = useParams();
  const [, , deletePost] = usePostActions();
  useEffect(() => {
    deletePost(id);
  }, [id, deletePost]);
  return null;
}

export default DeletePost;
