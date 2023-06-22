import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import themeReducer from './theme.slice'

export default configureStore({
  reducer: {
    auth: authReducer,
    theme:themeReducer,
  },
});
