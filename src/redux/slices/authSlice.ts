import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITokenResponse, UserType} from "../../types/auth.types";
import {IInterest} from "../../types/interest.types";

export interface IAuthSlice {
  isAuthenticated: boolean;
  tokens?: ITokenResponse;
  user?: UserType;
  interests: IInterest[];
}

const initialState: IAuthSlice = {
  isAuthenticated: false,
  interests: [],
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
      state.interests = [];
    },
    setUserDetails: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setUserInterests: (state, action: PayloadAction<IInterest[]>) => {
      state.interests = action.payload;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice;
