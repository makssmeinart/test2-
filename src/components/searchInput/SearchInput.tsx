import s from "styles/searchInput/searchInput.module.css";
import searchIcon from "assets/images/icons/search.png";
import { SuperInputText } from "../common/superInput/SuperInput";
import { useDispatch, useSelector } from "react-redux";
import { findRepos, findUser, setUserSearch } from "reducers/user";
import { AppDispatch } from "../../app/store";
import { useCallback } from "react";
import { selectSearchValue } from "../../select/select";

export const SearchInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);

  const searchUserHandler = useCallback(async () => {
    const payload = {
      username: searchValue,
    };
    const action = await dispatch(findUser(payload));
    // If we find user I want to get his repository as well
    // There is most likely better way of doing it but I will roll with this...
    if (action.payload) {
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
};
