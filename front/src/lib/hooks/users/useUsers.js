import { useState, useEffect } from "react";
import userService from "../../api-request/users";

function useUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await userService.getUsers()
      setUsers(data);
    })();
  }, []);

  return users || [];
}

export default useUsers;
