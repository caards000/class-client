import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITokenResponse, UserType} from "../../types/auth.types";

export interface IAuthSlice {
  isAuthenticated: boolean;
  tokens?: ITokenResponse;
  user?: UserType;
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
      state.user = undefined;
    },
    setUserDetails: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice;
