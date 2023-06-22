import { register, login, logout } from "../store/auth.slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useAuth() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = (user, path) => {
    dispatch(register(user))
      .unwrap()
      .then(() => {
        toast.success("The acount was created successfully 👌");
        const { email, password } = user;
        signIn({ email, password });
        navigate(path);
      })
      .catch(toast.error);
  };

  const signIn = (user) => {
    dispatch(login(user))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(toast.error);
  };

  const signOut = () => {
    dispatch(logout());
  };

  return [user, signIn, signOut, signUp];
}

export default useAuth;
