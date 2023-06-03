import {PageType} from "../../types/page.types";
import {GroupType} from "../../types/group.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IGroupSlice {
  isLoading: boolean;
  isLoaded: boolean;
  data: PageType<GroupType>;
}

const initialState: IGroupSlice = {
  isLoading: true,
  isLoaded: false,
  data: {
    pageSize: 0,
    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,
    content: [],
  }
}

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<PageType<GroupType>>) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.data = action.payload;
    },
    addGroup: (state, action: PayloadAction<GroupType>) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.data = {
        ...state.data,
        content: [action.payload, ...state.data.content],
      };
    },
    removeGroup: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.data = {
        ...state.data,
        content: state.data.content.filter(g => g.id !== action.payload),
      };
    }
  }
});

export const groupActions = groupSlice.actions;
export default groupSlice;
