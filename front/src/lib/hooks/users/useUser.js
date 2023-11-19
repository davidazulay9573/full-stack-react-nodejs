/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import userService from "../../api-request/users";
import useAuth from "../global-states/useAuth";
function useUser(id) {
   
   const [userCard, setUserCard] = useState(null);
   const [userAuth ,,, signOut] = useAuth()
    
   useEffect(() => {
    (async () => {
      if(!id) {
      setUserCard(null);
       return;    
      }
      const { data } = await userService.getUser(id);
      setUserCard(data);
    })();
  }, []);

  const handleFollow = async() => {
    const response = await userService.followAndDisFollow(id);
    const followers = await response.data;
    setUserCard({...userCard, followers : followers});
  }
  
  const isFollow = () => {
   return userCard?.followers?.find((user) => user.user_id === userAuth._id);
  }

  const handleSwitchEditorStatus = async () => {
    const response = await userService.switchEditorStatus(id);
    if(response){
     signOut();
    }
  }

  return [userCard, handleFollow, isFollow, handleSwitchEditorStatus];
}

export default useUser;
