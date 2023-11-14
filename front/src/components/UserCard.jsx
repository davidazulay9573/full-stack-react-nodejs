
const UserCard = ({ name, email, profileImageUrl }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={profileImageUrl} className="card-img-top" alt="Profile" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{email}</p>
      </div>
    </div>
  );
};

export default UserCard;











