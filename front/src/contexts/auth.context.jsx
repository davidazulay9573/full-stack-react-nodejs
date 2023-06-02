import {useState,createContext, useContext} from 'react'
import userService from '../services/userService'

const authContext = createContext({
  user: null,
  register: () => {},
  login: () => {},
  logOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const refreshUser = () => {
    setUser(userService.getUser());
  };
  
  async function login(user) {
    const response = await userService.login(user);
    refreshUser();
    return response;
  }

  function logOut() {
    userService.logOut();
    refreshUser();
  }

  return (
    <authContext.Provider value={{ user, register: userService.createUser, login, logOut }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () =>{
 return useContext(authContext);
};