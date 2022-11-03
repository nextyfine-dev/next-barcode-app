import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { jwtLogin, signIn, signUp, verify } from "../../services/authService";

const initialState = {
  isLogin: false,
  user: {},
  successMessage: "",
  isFetching: false,
  isError: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const data = await signIn(values);
      if (data.status !== "success") return rejectWithValue(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  "auth/login-with-token",
  async (values, { rejectWithValue }) => {
    try {
      const data = await jwtLogin(values);
      if (data.status !== "success") return rejectWithValue(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const data = await signUp(values);
      if (data.status !== "success") return rejectWithValue(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "auth/verify",
  async (values, { rejectWithValue }) => {
    try {
      const data = await verify(values);
      if (data.status !== "success") return rejectWithValue(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.isLogin = false;
      state.user = {};
      state.successMessage = "";
      state.isFetching = false;
      state.isError = false;
      state.error = null;
      return state;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isFetching = true;
      state.isLogin = false;
      state.isError = false;
      state.user = {};
      state.successMessage = "";

      return state;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      state.user = payload.data.user;
      state.successMessage = payload.message;
      state.isFetching = false;
      state.isError = false;
      state.error = null;
      return state;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLogin = false;
      state.user = {};
      state.isFetching = false;
      state.isError = true;
      state.error = payload;
      state.successMessage = "";
      return state;
    },

    [loginWithToken.pending]: (state) => {
      state.isFetching = true;
      state.isLogin = false;
      state.isError = false;
      state.user = {};
      state.successMessage = "";

      return state;
    },
    [loginWithToken.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      state.user = payload.data.user;
      state.successMessage = payload.message;
      state.isFetching = false;
      state.isError = false;
      state.error = null;
      return state;
    },
    [loginWithToken.rejected]: (state, { payload }) => {
      state.isLogin = false;
      state.user = {};
      state.isFetching = false;
      state.isError = true;
      state.error = payload;
      state.successMessage = "";
      return state;
    },

    [register.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.user = {};
      state.successMessage = "";
      return state;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user = payload.data.user;
      state.successMessage = payload.message;
      state.isFetching = false;
      state.isError = false;
      state.error = null;
      return state;
    },
    [register.rejected]: (state, { payload }) => {
      state.user = {};
      state.isFetching = false;
      state.isError = true;
      state.error = payload;
      state.successMessage = "";
      return state;
    },

    [verifyAccount.pending]: (state) => {
      state.isFetching = true;
      state.isLogin = false;
      state.isError = false;
      return state;
    },
    [verifyAccount.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      state.user = payload.data.user;
      state.successMessage = payload.message;
      state.isFetching = false;
      state.isError = false;
      state.error = null;
      return state;
    },
    [verifyAccount.rejected]: (state, { payload }) => {
      state.isLogin = false;
      state.isFetching = false;
      state.isError = true;
      state.error = payload;
      state.successMessage = "";

      return state;
    },
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
