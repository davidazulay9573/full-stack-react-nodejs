import { register, login, logout } from "../store/slices/auth.slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useAuth() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = async (user, path) => {
    try {
      await dispatch(register(user)).unwrap();
      toast.success("The acount was created successfully 👌");
      const { email, password } = user;
      signIn({ email, password });
      navigate(path);
    } catch (error) {
      toast.error(error);
    }
  };

  const signIn = async (user) => {
    try {
      await dispatch(login(user)).unwrap();
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  return [user, isLoading, signIn, signOut, signUp];
}

export default useAuth;
