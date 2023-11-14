import { useState } from "react";
import useAuth from "../lib/hooks/global-states/useAuth";
import useTheme from "../lib/hooks/global-states/useTheme";
import dateFormat from "../lib/utils/date-format";
import postService from "../lib/api-request/posts";
import useUser from "../lib/hooks/users/useUser";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const [theme] = useTheme();
  const [userAuth] = useAuth();
  const userPost = useUser(post.user_id);
  const [likes, setLikes] = useState(post?.likes || []);
  const [activeTab, setActiveTab] = useState(null);
  const [comments, setComments] = useState(0);

  const isLiked = () => {
    return likes.find((like) => like.user_id === userAuth._id);
  };

  const handleLike = async () => {
    const response = await postService.LikeAndDisLike(post._id);
    const likesRes = await response.data;
    setLikes(likesRes || []);
  };

  return (
    <div className={`container mt-5 p-3 rounded ${theme}`}>
      <div className="row align-items-start">
        <Link to={`/users/${post.user_id}`} className="col-auto">
          <img
            src={userPost?.image}
            className="rounded-circle"
            alt="Profile"
            style={{ width: "3rem", height: "3rem" }}
          />
          <p>{userPost?.name}</p>
        </Link>
        <div className="col">
          {post?.image && (
            <img
              src={post?.image}
              className="card-img-top img-fluid"
              alt="Post"
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{post?.title}</h5>
            <p className="card-text">{post?.description}</p>
          </div>
          <div className="card-footer text-muted">
            <div className="mb-2">Posted on {dateFormat(post?.createdAt)}</div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleLike}
              >
                <i
                  className={`bi bi-hand-thumbs-up${isLiked() ? "-fill" : ""}`}
                ></i>
                {likes.length}
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setActiveTab("comments")}
              >
                <i className="bi bi-chat-right-text"></i>{" "}
                {post?.comments.length}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostCard;
