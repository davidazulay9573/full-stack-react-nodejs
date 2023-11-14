import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "../../lib/api-request/users";

export const register = createAsyncThunk(
  "auth-register",
  async (user, thunkAPI) => {
    try {
      const { data } = await userService.createUser(user);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(extractErrorMessage(response));
    }
  }
);

export const login = createAsyncThunk("auth-login", async (user, thunkAPI) => {
  try {
    const { data } = await userService.login(user);
    return data;
  } catch ({ response }) {
    return thunkAPI.rejectWithValue(extractErrorMessage(response));
  }
});

export const logout = createAction("auth-logout", () => {
  userService.logOut();
  return {};
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: userService.getLoggeronUser(), isLoading: false },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.user = userService.getLoggeronUser();
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

function extractErrorMessage(response) {
  if ((response && response.status === 400) || response.status === 401) {
    return response.data;
  }
}

export default authSlice.reducer;
