import { useSelector, useDispatch } from "react-redux";
import { register,login, logout } from "../store/auth.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useAuth() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const signUp = (user,path) => {
       dispatch(register(user))
         .unwrap()
         .then(() => {
         toast.success("The acount was created successfully 👌");
         navigate(path);
         })
         .catch(toast.error);
  }
  
  const signIn = (user) => {
    dispatch(login(user))
      .unwrap()
      .then(() => {
        toast.success(`Logged in as`);
        navigate("/");
      })
      .catch(toast.error);
  };

  const signout = () => {
    dispatch(logout());
  };

  return [user, signIn, signout,signUp];
}

export default useAuth;
