import { createSlice } from "@reduxjs/toolkit";

type TAuthData = {
  username: string | null;
  password: string | null;
  token: string | null;
  role: string | null;
};

const initialState: TAuthData = {
  username: null,
  password: null,
  token: null,
  role: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, token, password, role } = action.payload;
      state.username = username;
      state.token = token;
      state.role = role || null;

       console.log("Login authslice payload:", action.payload);

      state.password = password;
      
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.password = null;
      state.role = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
