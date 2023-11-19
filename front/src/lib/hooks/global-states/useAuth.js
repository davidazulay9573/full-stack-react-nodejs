import { register, login, logout } from "../../../store/slices/auth.slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useAuth() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (user, path = "/") => {
    try {
      await dispatch(login(user)).unwrap();
      navigate(path);
      window.location.reload();
    } catch (error) {
      toast.error(error);
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  const signUp = async (user, path = "/auth/sign-in") => {
    try {
      const data = await dispatch(register(user)).unwrap();
      toast.success("The acount was created successfully 👌");
      console.log(user.isContentEditor);
      if (user.isContentEditor) {
        const { email, password } = user;
        signIn({ email, password }, path);
      }
      navigate(path);
      console.log(data);
    } catch (error) {
      toast.error(error);
    }
  };

  return [user, isLoading, signIn, signOut, signUp];
}

export default useAuth;
