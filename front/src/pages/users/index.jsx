import UserCard from "../../components/UserCard";
import useUsers from "../../lib/hooks/users/useUsers";
import PageHeader from "../../components/PageHeader";
import { useSearchParams } from "react-router-dom";

function Users() {
 
   const [searchParams] = useSearchParams();
   const users = useUsers(searchParams.get("search"));
  
  return (
    <div className="text-center" >
      <PageHeader title='Users' description='Heare you can see all users'/>
      {users.length ? users.map((user, index) => {
        return <UserCard key={index} id={user._id} />;
      }) : <h3> Dont Have Users</h3>}
    </div>
  );
}

export default Users;
