import postService from "../../api-request/posts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function usePostActions() {
  const navigate = useNavigate();

  const addPost = async (post) => {
    try {
      await postService.createPost(post);
      toast.success("The card was created successfully 👌");
      navigate("/posts");
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      toast.success("The card has been successfully deleted 👌");
      navigate("/posts");
    } catch {
      navigate("/posts");
    }
  };

  const editPost = async (post, id) => {
    try {
      const { image, ...body } = post;
      if (image) {
        body.image = image;
      }
      await postService.updatePost(id, body);
      navigate("/posts");
      toast.success("The card has been successfully updated 👌");
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  return [addPost, editPost, deletePost];
}

export default usePostActions;
