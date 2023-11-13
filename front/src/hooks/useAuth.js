import { register, login, logout } from "../store/slices/auth.slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useAuth() {
 
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (user, path ='/') => {
    try {
      await dispatch(login(user)).unwrap();
      navigate(path);
    } catch (error) {
      toast.error(error);
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  
  const signUp = async (user, path = "/sign-in") => {
    try {
      await dispatch(register(user)).unwrap();
      toast.success("The acount was created successfully 👌");
      if (user.biz) {
        const { email, password } = user;
        signIn({ email, password }, path);
      }
      navigate(path);
    } catch (error) {
      toast.error(error);
    }
  };

  return [user, isLoading, signIn, signOut, signUp];
}

export default useAuth;
