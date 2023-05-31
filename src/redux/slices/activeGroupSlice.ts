import {GroupType} from "../../types/group.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IActiveGroupSlice {
  isLoading: boolean;
  isLoaded: boolean;
  data?: GroupType;
  isMember?: boolean;
}

const initialState: IActiveGroupSlice = {
  isLoading: true,
  isLoaded: false,
  data: undefined
}

const activeGroupSlice = createSlice({
  name: "activeGroup",
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<GroupType>) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.data = action.payload;
    },
    removeGroup: (state) => {
      state.isLoading = true;
      state.isLoaded = false;
      state.data = undefined;
    },
    setIsMember: (state, action: PayloadAction<boolean>) => {
      state.isMember = action.payload;
    },
  },
});

export const activeGroupActions = activeGroupSlice.actions;
export default activeGroupSlice;
