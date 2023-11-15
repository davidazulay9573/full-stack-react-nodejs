import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "../../lib/api-request/auth";

export const register = createAsyncThunk(
  "auth-register",
  async (user, thunkAPI) => {
    try {
      const { data } = await authService.createUser(user);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(extractErrorMessage(response));
    }
  }
);

export const login = createAsyncThunk("auth-login", async (user, thunkAPI) => {
  try {
    const { data } = await authService.login(user);
    return data;
  } catch ({ response }) {
    return thunkAPI.rejectWithValue(extractErrorMessage(response));
  }
});

export const logout = createAction("auth-logout", () => {
  authService.logOut();
  return {};
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: authService.getLoggedonUser(), isLoading: false },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.user = authService.getLoggedonUser();
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
