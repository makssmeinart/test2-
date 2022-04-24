import { createSlice } from "@reduxjs/toolkit";

const initState: InitStateType = {
  searchValue: "",
  userInfo: {
    name: "Makss Meinarts",
    avatarUrl:
      "https://10-raisons.fr/wp-content/uploads/2022/02/10-raisons-s-interesser-aux-nft.jpg",
    username: "makssmeinart",
    followers: 2,
    following: 0,
  },
  repositories: [
    {
      title: "Pet Project",
      description: "Good pet project",
    },
    {
      title: "Netflix Clone",
      description: "My netflix clone",
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {},
});

// Reducer

export const userReducer = userSlice.reducer;

// Types

type InitStateType = {
  searchValue: string;
  userInfo: UserInfoType;
  repositories: RepositoryType[];
};

type UserInfoType = {
  name: string;
  avatarUrl: string;
  username: string;
  followers: number;
  following: number;
};

type RepositoryType = {
  title: string;
  description: string;
};
