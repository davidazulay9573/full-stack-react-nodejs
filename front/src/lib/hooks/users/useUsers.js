import { useState, useEffect } from "react";
import userService from "../../api-request/users";

function useUsers(search) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      if (search) {
       const { data } = await userService.getUsers(search);
       setUsers(data);
        return;
      }
      const { data } = await userService.getUsers()
      setUsers(data);
    })();
  }, [search]);

  return users || [];
}

export default useUsers;
