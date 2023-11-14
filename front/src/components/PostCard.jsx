import { useState } from "react";
import useTheme from "../lib/hooks/useTheme";
import dateFormat from "../lib/utils/date-format";

function PostCard({ post }) {
  const [theme] = useTheme();
  const [likes, setLikes] = useState(0); 
  const [comments, setComments] = useState(0); 

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    setComments(comments + 1);
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
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleLike}
          >
            <i className="bi bi-hand-thumbs-up"></i> {likes}
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleComment}
          >
            <i className="bi bi-chat-right-text"></i> {comments}
          </button>
        </div>
      </div>
    </div>
  );
}
export default PostCard;