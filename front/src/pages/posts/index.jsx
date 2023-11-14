import PageHeader from "../../components/PageHeader";
import PostCard from "../../components/PostCard";
import AddPost from "../../components/AddPost";
import usePosts from "../../lib/hooks/posts/usePosts";
import { Link } from "react-router-dom";

function Posts() {
  const posts = usePosts();
  return (
    <div className="text-center ">
      <PageHeader title="Here you can see all posts!"/>
      <AddPost />
      {posts.length ? (
        <div className="d-flex flex-wrap p-4 justify-content-center">
          {posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </div>
      ) : (
        <>
          <h4>No posts Yet! </h4>
          <p>
            <Link to="/add"> Click </Link>to add a new post!
          </p>
        </>
      )}
    </div>
  );
}

export default Posts;
