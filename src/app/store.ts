import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "../reducers/app";
import { userReducer } from "../reducers/user";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//@ts-ignore
window.store = store;
