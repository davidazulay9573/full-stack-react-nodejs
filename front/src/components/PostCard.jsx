import { useState } from "react";
import useAuth from "../lib/hooks/global-states/useAuth";
import useTheme from "../lib/hooks/global-states/useTheme";
import dateFormat from "../lib/utils/date-format";
import postService from "../lib/api-request/posts";

function PostCard({ post }) {
  const [theme] = useTheme();
  const [user] = useAuth();
  const [likes, setLikes] = useState(post?.likes || []);
  const [activeTab, setActiveTab] = useState(null);
  const [comments, setComments] = useState(0);

  const isLiked = () => {
    return likes.find((like) => like.user_id === user._id);
  };

  const handleLike = async () => {
    const response = await postService.LikeAndDisLike(post._id);
    const likesRes = await response.data;
    setLikes(likesRes || []);
  };

  return (
    <div
      className={`card ms-2 me-2 mt-3 mb-3 shadow p-3 bg-body-tertiary rounded ${theme}`}
    >
      {post?.image && (
        <img
          src={post?.image}
          className="card-img-top img-fluid"
          alt="Post"
          style={{ maxHeight: "150px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{post?.title}</h5>
        <p className="card-text">{post?.description}</p>
      </div>
      <div className="card-footer text-muted">
        <div className="mb-2">
          Posted by {post?.author} on {dateFormat(post?.createdAt)}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-secondary btn-sm">
            <i
              onClick={handleLike}
              className={`bi bi-hand-thumbs-up${isLiked() ? "-fill" : ""}`}
            ></i>
            {likes.length}
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setActiveTab("comments")}
          >
            <i className="bi bi-chat-right-text"></i> {comments}
          </button>
        </div>
      </div>
    </div>
  );
}
export default PostCard;
