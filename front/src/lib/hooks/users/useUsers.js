/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import userService from "../../api-request/users";
import useAuth from "../global-states/useAuth";

function useUsers(search) {
  const [users, setUsers] = useState([]);
  const [userAuth] = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (search) {
        const { data } = await userService.getUsers(search);
        setUsers(data.filter((user) => user._id !== userAuth._id));
        setLoading(false);
        return;
      }
      const { data } = await userService.getUsers();
      setUsers(data.filter((user) => user._id !== userAuth._id));
      setLoading(false);
    })();
  }, []);

  return [users, isLoading];
}

export default useUsers;
