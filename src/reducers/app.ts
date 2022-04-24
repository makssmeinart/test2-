import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState: InitStateType = {
  status: "idle",
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setAppStatusAC(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload;
    },
  },
});

// Reducer

export const appReducer = appSlice.reducer

// types

type InitStateType = {
  status: RequestStatusType;
  error: string | null;
};

type RequestStatusType = "idle" | "loading" | "completed" | "failed";
