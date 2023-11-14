import { changeThemeMode } from "../../store/slices/theme.slice";
import { useSelector, useDispatch } from "react-redux";

function useTheme() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const changeTheme = () => {
    dispatch(changeThemeMode());
  };

  return [theme, changeTheme];
}

export default useTheme;
