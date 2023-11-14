import { useState, useEffect } from "react";
import userService from "../../api-request/users";
function useUser(id) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await userService.getCard(id);
      setUser(data);
    })();
  }, [id]);

  return user;
}

export default useUser;
