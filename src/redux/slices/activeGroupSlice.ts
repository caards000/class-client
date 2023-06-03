import {GroupType} from "../../types/group.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EmptyPage, PageType} from "../../types/page.types";
import {PostType} from "../../types/post.types";

export interface IActiveGroupSlice {
  isLoading: boolean;
  isLoaded: boolean;
  data?: GroupType;
  isMember?: boolean;
  posts: PageType<PostType>;
}

const initialState: IActiveGroupSlice = {
  isLoading: true,
  isLoaded: false,
  data: undefined,
  isMember: false,
  posts: EmptyPage,
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
    setPosts: (state, action: PayloadAction<PageType<PostType>>) => {
      state.posts = {
        ...action.payload,
        content: [...state.posts.content, ...action.payload.content],
      }
    },
    addPost: (state, action: PayloadAction<PostType>) => {
      state.posts = {
        totalElements: state.posts.totalElements + 1,
        totalPages: state.posts.totalPages || 1,
        pageNumber: 0,
        pageSize: 20,
        content: [action.payload, ...state.posts.content],
      }
    }
  },
});

export const activeGroupActions = activeGroupSlice.actions;
export default activeGroupSlice;
