import { useParams } from "react-router-dom";
import PostCard from "../../components/common/PostCard";

function Post() {
  const { id } = useParams();
  return <PostCard id={id} />;
}
export default Post;
