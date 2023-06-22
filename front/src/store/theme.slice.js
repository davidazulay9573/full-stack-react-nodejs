import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme:localStorage.getItem("theme") || 'light',
  },

  reducers: {
    changeThemeMode(state) {
       const newThemeMode = state.theme === "light" ? "dark" : "light";
        state.theme = newThemeMode;
        localStorage.setItem('theme',newThemeMode);
    },
  },
});

export const { changeThemeMode} = themeSlice.actions;

export default themeSlice.reducer;
