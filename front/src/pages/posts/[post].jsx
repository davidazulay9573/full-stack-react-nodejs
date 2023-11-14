import { useParams } from "react-router-dom";
import usePost from "../../lib/hooks/posts/usePost";
import useTheme from "../../lib/hooks/global-states/useTheme";
function Post() {
  const { id } = useParams();
  const post = usePost(id);
  const [theme] = useTheme();

  return (
    <div className=" text-center d-flex flex-wrap justify-content-center">
      <img src={post.image} alt="business view" className={`w-50 p-5 `} />
      <div
        className={`text-center p-5 m-5 border border-${
          theme === "dark" ? "light" : "dark"
        } rounded bg-${theme} `}
      >
        <h1 className="mt-4">{post.title}</h1>
        <p className="mt-4 mb-5">{post.description}</p>
        <p> {post.createdAt}</p>
      </div>
    </div>
  );
}
export default Post;
