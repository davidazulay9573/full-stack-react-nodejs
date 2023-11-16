import PageHeader from "../../components/PageHeader";
import PostCard from "../../components/PostCard";
import usePosts from "../../lib/hooks/posts/usePosts";
import { useSearchParams } from "react-router-dom";

function SearchPosts() {
  const [searchParams] = useSearchParams();
  const [posts, isLoading] = usePosts(null, searchParams.get('search'));

  return (
    <div className="text-center ">
      <PageHeader title="Posts" description="Here you can see all posts!" />
      {posts.length ? (
        <div className="d-flex flex-wrap p-4 justify-content-center">
          {posts.map((post, index) => {
            return <PostCard key={index} id={post._id} />;
          })}
        </div>
      ) : (
        isLoading ? <h4>Loading...</h4> : <h4> No posts yet <br />Find user with posts that you like and sdd followers! <br /> Or search in the header tab .</h4>
      )}
    </div>
  );
}

export default SearchPosts;
