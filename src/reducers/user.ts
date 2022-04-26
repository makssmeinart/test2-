import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAppError, setAppStatus } from "./app";
import { AxiosError } from "axios";
import { GetUserPayloadType, userAPI } from "../api/userAPI";

export const findUser = createAsyncThunk(
  "user/find-user",
  async (payload: GetUserPayloadType, { dispatch }) => {
    dispatch(setAppStatus("loading"));

    try {
      const res = await userAPI.getUser(payload);
      const { following, followers, login, name, avatar_url } = res;
      return { following, followers, login, name, avatar_url };
    } catch (err) {
      const error = err as AxiosError;
      dispatch(setAppStatus("failed"));
      dispatch(setAppError(error.message));
    }
  }
);

export const findRepos = createAsyncThunk(
  "user/find-repos",
  async (payload: GetUserPayloadType, { dispatch }) => {
    dispatch(setAppStatus("loading"));

    try {
      const newArr: any = [];
      const res = await userAPI.getRepositories(payload);
      res.map((item) =>
        newArr.push({ name: item.name, description: item.description })
      );
      return newArr;
    } catch (err) {
      const error = err as AxiosError;
      dispatch(setAppStatus("failed"));
      dispatch(setAppError(error.message));
    }
  }
);

const initState: InitStateType = {
  searchValue: "",
  userInfo: null,
  repositories: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUserSearch: (state, action: PayloadAction<SearchInputPayloadType>) => {
      state.searchValue = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
      }
    });
    builder.addCase(findRepos.fulfilled, (state, action) => {
      state.repositories = action.payload;
    });
  },
});

// Actions

export const setUserSearch = userSlice.actions.setUserSearch;

// Reducer

export const userReducer = userSlice.reducer;

// Types

type InitStateType = {
  searchValue: string;
  userInfo: UserInfoType | null;
  repositories: RepositoryType[] | null;
};

type UserInfoType = {
  name: string;
  avatar_url: string;
  login: string;
  followers: number;
  following: number;
};

type RepositoryType = {
  name: string;
  description: string;
};

type SearchInputPayloadType = {
  value: string;
};
