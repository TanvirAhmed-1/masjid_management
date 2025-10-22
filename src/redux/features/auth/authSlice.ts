import { createSlice } from "@reduxjs/toolkit";

type TAuthData = {
  username: string | null;
  password: string | null;
  token: string | null;
};

const initialState: TAuthData = {
  username: null,
  password: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, token, password } = action.payload;
      state.username = username;
      state.token = token;
      state.password = password;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.password = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
