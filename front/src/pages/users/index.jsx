import UserCard from "../../components/UserCard";
import useUsers from "../../lib/hooks/users/useUsers";

function Users(){
 const users = useUsers();
 return (
    <div>
        {users.map((user, index) => {
            return <UserCard key={index} id={user._id}/>
        })}
    </div>
 )
}

export default Users;