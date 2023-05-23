import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITokenResponse} from "../../types/auth.types";

export interface IAuthSlice {
  isAuthenticated: boolean;
  tokens?: ITokenResponse;
}

const initialState: IAuthSlice = {
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ITokenResponse>) => {
      state.isAuthenticated = true;
      state.tokens = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.tokens = undefined;
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice;
