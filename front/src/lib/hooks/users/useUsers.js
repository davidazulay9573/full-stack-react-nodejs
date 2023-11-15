import { useState, useEffect } from "react";
import userService from "../../api-request/users";

function useUsers(ids) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    (async () => {
      const { data } = !ids
        ? await userService.getUsers()
        : await userService.getUsers(ids); 
      setUsers(data);
    })();
  }, []);

  return users || [];
}

export default useUsers;
