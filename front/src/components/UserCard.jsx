
const UserCard = ({user }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={user?.image} className="card-img-top" alt="Profile" />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;











