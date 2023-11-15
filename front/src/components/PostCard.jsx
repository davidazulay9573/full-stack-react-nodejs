/* eslint-disable no-unused-vars */
import { useState } from "react";
import useTheme from "../lib/hooks/global-states/useTheme";
import dateFormat from "../lib/utils/date-format";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import usePost from "../lib/hooks/posts/usePost";

function PostCard({ id }) {
 
  const [post, userPost, likes, handleLike, isLiked, comments, handleComment] = usePost(id);
  const [theme] = useTheme();
  const [activeTab, setActiveTab] = useState(null);
  
  return (
    <div className={`container mt-3 p-2 rounded ${theme}`}>
      <div className="row">
        <div className="col-auto">
          <Link to={`/users/${post.user_id}`}>
            <img
              src={userPost?.image}
              className="rounded-circle"
              alt="Profile"
              style={{ width: "3rem", height: "3rem" }}
            />
            <p className="mt-2">{userPost?.name}</p>
          </Link>
        </div>
        <div className="col">
          {post?.image && (
            <img
              src={post?.image}
              className="card-img-top img-fluid"
              alt="Post"
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
          )}
          <Link to={`/posts/${post._id}`}>
            <div className="card-body">
              <h5 className="card-title">{post?.title}</h5>
              <p className="card-text">{post?.description}</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="card-footer text-muted">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-start align-items-center">
              <button
                onClick={() => setActiveTab("comments")}
                className="btn btn-outline-secondary me-2"
                title="Comments"
              >
                <i className="bi bi-chat-right-text"></i>
                <span className="ms-1">{comments.length}</span>
              </button>
              <button
                className={`btn ${
                  isLiked() ? "btn-primary" : "btn-outline-primary"
                }`}
                title="Like"
              >
                <i
                  onClick={handleLike}
                  className={`bi ${
                    isLiked() ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
                  }`}
                ></i>
                
                <span 
                  onClick={() => setActiveTab((activeTab) =>activeTab === "likes" ? null : "likes" )} 
                  className="ms-1">{likes.length}     
                </span>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="text-end">
              Posted on {dateFormat(post?.createdAt)}
            </div>
          </div>
        </div>
      </div>
      {activeTab === "likes" && (
        <div>
          {likes.map((like, index) => (
            <UserCard key={index} id={like.user_id} />
          ))}
        </div>
      )}
    </div>
  );
}
export default PostCard;
