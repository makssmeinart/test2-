import { AppRootStateType } from "../app/store";

export const selectSearchValue = (state: AppRootStateType) =>
  state.user.searchValue;
export const selectError = (state: AppRootStateType) => state.app.error;
export const selectUserInfo = (state: AppRootStateType) => state.user.userInfo;
export const selectLoading = (state: AppRootStateType) => state.app.status;
export const selectRepositories = (state: AppRootStateType) =>
  state.user.repositories;
export const selectCurrentPage = (state: AppRootStateType) => state.user.currentPage;
