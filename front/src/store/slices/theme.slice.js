import { createSlice } from "@reduxjs/toolkit";
const LS_KEY = 'theme';
export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme:localStorage.getItem(LS_KEY) || 'light',
  },

  reducers: {
    changeThemeMode(state) {
       const newThemeMode = state.theme === "light" ? "dark" : "light";
        state.theme = newThemeMode;
        localStorage.setItem(LS_KEY,newThemeMode);
    },
  },
});

export const { changeThemeMode} = themeSlice.actions;

export default themeSlice.reducer;
