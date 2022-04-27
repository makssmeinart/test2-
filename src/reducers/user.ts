import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAppError, setAppStatus } from "./app";
import { AxiosError } from "axios";
import { GetUserPayloadType, userAPI } from "../api/userAPI";
import { AppRootStateType } from "../app/store";

export const findUser = createAsyncThunk(
  "user/find-user",
  async (payload: GetUserPayloadType, { dispatch }) => {
    dispatch(setAppStatus("loading"));

    try {
      const res = await userAPI.getUser(payload);
      if (res) {
        dispatch(setAppStatus("completed"));
      }
      const {
        following,
        followers,
        login,
        name,
        avatar_url,
        html_url,
        public_repos,
      } = res;
      return {
        following,
        followers,
        login,
        name,
        avatar_url,
        html_url,
        public_repos,
      };
    } catch (err) {
      const error = err as AxiosError;
      dispatch(setAppStatus("failed"));
      dispatch(setAppError(error.message));
      return null;
    }
  }
);

export const findRepos = createAsyncThunk(
  "user/find-repos",
  async (payload: GetUserPayloadType, { dispatch, getState }) => {
    dispatch(setAppStatus("loading"));

    const state = getState() as AppRootStateType;

    const newPayload = {
      ...payload,
      page: state.user.currentPage,
    };

    try {
      const newArr: any = [];
      const res = await userAPI.getRepositories(newPayload);
      if (res) {
        dispatch(setAppStatus("completed"));
      }
      res.map((item) =>
        newArr.push({
          name: item.name,
          description: item.description,
          html_url: item.html_url,
        })
      );
      return {
        repositories: newArr,
      };
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
  currentPage: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUserSearch: (state, action: PayloadAction<SearchInputPayloadType>) => {
      // If search is empty I want to null the bll state
      if (action.payload.value === "") {
        state.repositories = null;
        state.userInfo = null;
      }
      state.searchValue = action.payload.value;
    },
    nullRepositoryState: (state, action: PayloadAction<null>) => {
      state.repositories = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(findUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
      }
      // If we get an error we want to reset bll state
      else {
        state.repositories = null;
        state.userInfo = null;
      }
    });
    builder.addCase(findRepos.fulfilled, (state, action) => {
      if (action.payload) {
        state.repositories = action.payload;
      }
    });
  },
});

// Actions

export const setUserSearch = userSlice.actions.setUserSearch;
export const nullRepositoryState = userSlice.actions.nullRepositoryState;
export const changePage = userSlice.actions.changePage

// Reducer

export const userReducer = userSlice.reducer;

// Types

type InitStateType = {
  searchValue: string;
  userInfo: UserInfoType | null;
  repositories: RepositoriesType | null;
  currentPage: number;
};

type UserInfoType = {
  name: string;
  avatar_url: string;
  login: string;
  followers: number;
  following: number;
  html_url: string;
  public_repos: number;
};

type RepositoriesType = {
  repositories: RepositoryType[];
};

type RepositoryType = {
  name: string;
  description: string;
  html_url: string;
};

type SearchInputPayloadType = {
  value: string;
};
