import UserCard from "../../components/UserCard";
import useUsers from "../../lib/hooks/users/useUsers";
import PageHeader from "../../components/PageHeader";
import { useSearchParams } from "react-router-dom";

function Users() {
 
   const [searchParams] = useSearchParams();
   const [users, isLoading] = useUsers(searchParams.get("search"));
  
  return (
    <div className="text-center" >
      <PageHeader title='Users' description='Heare you can see all users'/>
      {users.length ? users.map((user, index) => {
        return <UserCard key={index} id={user._id} />;
      
      }) : isLoading ? <h4>Loading...</h4> :  <h4> Dont Have Users</h4>}
    </div>
  );
}

export default Users;
