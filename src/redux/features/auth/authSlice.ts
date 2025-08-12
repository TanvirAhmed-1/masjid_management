import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthData = {
  username: string | null;
  token: string | null;
  category?: string | null;
};

const initialState: TAuthData = {
  username: null,
  token: null,
  category: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<TAuthData>) => {
      state.username = action.payload.username ?? null;
      state.token = action.payload.token ?? null;
      state.category = action.payload.category ?? null;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.category = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
