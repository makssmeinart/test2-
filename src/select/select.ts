import { AppRootStateType } from "../app/store";

export const selectSearchValue = (state: AppRootStateType) =>
  state.user.searchValue;

export const error = (state: AppRootStateType) => state.app.error