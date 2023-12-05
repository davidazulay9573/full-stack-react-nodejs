import { useState } from "react";
import useTheme from "../../lib/hooks/global-states/useTheme";
import dateFormat from "../../lib/utils/date-format";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import usePost from "../../lib/hooks/posts/usePost";

function PostCard({ id }) {
  const [post, userPost, handleLike, isLiked, isOwner] = usePost(id);
  const [theme] = useTheme();
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className={`container mt-3 p-3 rounded shadow-sm ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="row g-3">
         <Link to={`/users/${post.user_id}`} className="text-decoration-none">
          <div className="d-flex flex-column align-items-center">
            <span
              className={`rounded-circle border border-2 ${theme === 'dark' ? 'border-light' : 'border-dark'}`}
              style={{ width: "4rem", height: "4rem"}}
            >
            <img
              src={userPost?.image}
              className="rounded-circle"
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: "cover" }}
            />
            </span>
            <p className={`mt-2 fw-bold ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
              {userPost?.name}
            </p>
          </div>
        </Link>
        <div className="col pb-4">
          {post?.image && (
            <img
              src={post?.image}
              className="card-img-top img-fluid rounded"
              alt="Post"
              style={{ height: "200px", objectFit: "cover" }}
            />
          )}
          <div className="card-body">
            <Link className={`text-decoration-none ${theme === 'dark' ? 'text-white' : 'text-dark'}`} to={`/posts/${post._id}`}>
              <h5 className="card-title">{post?.title}</h5>
              <p className="card-text">{post?.description}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className={`card-footer ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'} text-muted d-flex justify-content-between align-items-center `}>
        <div>  
         <button onClick={handleLike} className={`btn bi ${isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} ${theme === 'dark' ? 'text-white' : 'text-primary'} me-2`}></button>
         <span onClick={() => {setActiveTab((activeTab) =>  activeTab === 'likes' ? null : 'likes')}} className="">{post?.likes?.length}</span>
          {isOwner && (
            <span className="mx-3">
              <Link to={`/posts/edit/${id}`} className={`btn btn-outline-${theme === 'dark' ? 'light' : 'secondary'} me-2`}>
                <i className="bi bi-pencil-square"></i>
              </Link>
              <Link to={`/posts/delete/${id}`} className="btn btn-danger">
                <i className="bi bi-trash-fill"></i>
              </Link>
            </span>
          )}
        </div>
        <div>
          <small className="ms-2">Posted on {dateFormat(post?.createdAt)}</small>
        </div>
      </div>
      {activeTab === "likes" && (
        <div className="mt-3">
          {post?.likes.map((like, index) => (
            <UserCard key={index} id={like.user_id} buttonDisplay={false} />
          ))}
        </div>
      )}
    </div>
  );
}
export default PostCard;
