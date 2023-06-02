import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const initialState = {
  user: userService.getUser(),
  isLoading: false,
};


export const register = createAsyncThunk("auth-register", async (user, thunkAPI) => {
  try {
    return (await userService.createUser(user)).data;
  } catch ({ response }) {
    return thunkAPI.rejectWithValue(extractErrorMessage(response));
  }
});

export const login = createAsyncThunk("auth-login", async (user, thunkAPI) => {
  try {
    return (await userService.login(user)).data;
  } catch ({ response }) {
    return thunkAPI.rejectWithValue(extractErrorMessage(response));
  }
});

export const logout = createAction("auth/logout", () => {
  userService.logOut();
  return {};
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const {logOut} = authSlice.actions;
export default authSlice.reducer;
