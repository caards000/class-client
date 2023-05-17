import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ICounterSlice {
  count: number;
  fullName: string;
  isAuthenticated: boolean;
}

const initialState: ICounterSlice = {
  count: 0,
  fullName: "",
  isAuthenticated: false,
}

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    incrementCount: (state)=>{
      state.count = state.count + 1;
    },
    decrementCount: (state)=>{
      state.count = state.count - 1;
    },
    setCount: (state, action:PayloadAction<number>)=>{
      state.count = action.payload;
    },
    setName: (state, action: PayloadAction<string>)=>{
      state.fullName = action.payload;
    },
  }
});

export const counterActions = counterSlice.actions;

export default counterSlice;
