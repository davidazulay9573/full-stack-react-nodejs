import { useState, useEffect } from "react";
import userService from "../../api-request/users";
function useUser(id) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await userService.getUser(id);
      setUser(data);
    })();
  }, [id]);
  return user;
}

export default useUser;
