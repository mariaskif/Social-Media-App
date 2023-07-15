import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Info } from "./types";
import AuthActions from "./AuthActionString";
export const signup = createAsyncThunk(
  AuthActions.SIGN_UP_NORMAL_USER,
  async ({ name, pass }: Info) => {
    try {
      const res = await axios.post("http://localhost:3200/users", {
        name,
        pass,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState: Info = {
  name: "",
  pass: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.pass = action.payload.pass;
    });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
