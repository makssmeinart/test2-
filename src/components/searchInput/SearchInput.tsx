import s from "styles/searchInput/searchInput.module.css";
import searchIcon from "assets/images/icons/search.png";
import {SuperInputText} from "../common/superInput/SuperInput";
import {useDispatch, useSelector} from "react-redux";
import {
  findRepos,
  findUser,
  nullRepositoryState,
  setUserSearch,
} from "reducers/user";
import {AppDispatch} from "../../app/store";
import React, {useCallback, useEffect} from "react";
import {selectSearchValue} from "../../select/select";
import {setAppError} from "../../reducers/app";

export const SearchInput = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);

  // This fixed the bug: if we had error and deleted searchValue we don't want to type and get error back
  useEffect(() => {
    if (searchValue.length === 0) {
      dispatch(setAppError(null));
    }
  }, [searchValue]);

  const searchUserHandler = useCallback(async () => {
    const payload = {
      username: searchValue,
    };
    // Null repos so the previous repos don't appear next to loading when we searching for a new user
    dispatch(nullRepositoryState(null));
    const action = await dispatch(findUser(payload));
    // If we find user I want to get his repository as well
    // There is most likely better way of doing it but I will roll with this...
    if (action.payload) {
      dispatch(setAppError(null));
      dispatch(findRepos(payload));
    }
  }, [searchValue]);

  const updateSearchInputValue = useCallback((value: string) => {
    const payload = {
      value,
    };
    dispatch(setUserSearch(payload));
  }, []);

  return (
    <div className={s.wrapper}>
      <img className={s.logo} src={searchIcon} alt="" />
      <SuperInputText
        onChangeText={updateSearchInputValue}
        type="text"
        onEnter={searchUserHandler}
      />
    </div>
  );
});
