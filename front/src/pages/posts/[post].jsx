import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard";

function Post() {
  const { id } = useParams();
  return <PostCard id={id} />;
}
export default Post;
