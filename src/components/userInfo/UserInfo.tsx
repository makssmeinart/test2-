import s from "styles/userInfo/userInfo.module.css";
import {useSelector} from "react-redux";
import {
    selectError,
    selectSearchValue,
    selectUserInfo,
} from "../../select/select";
import {SearchingUser} from "../searchingUser/SearchingUser";
import {UserNotFound} from "../userNotFound/UserNotFound";
import miniUserIcon from "assets/images/icons/miniUserIcon.png";
import {kFormatter} from "../../utils/numberFormatter";

export const UserInfo = () => {
  const userInfo = useSelector(selectUserInfo);
  const searchValue = useSelector(selectSearchValue);
  const error = useSelector(selectError);

  const searchValueEmpty = searchValue.length === 0;
  const userNotFound =
    searchValue.length > 0 && error === "Request failed with status code 404";
  const searchFoundSomething = userInfo && searchValue.length > 0;

  return searchValueEmpty ? (
    <SearchingUser />
  ) : userNotFound ? (
    <UserNotFound />
  ) : searchFoundSomething ? (
    <div className={s.container}>
      <img
        className={s.avatar}
        src={
          (userInfo && userInfo.avatar_url) ||
          "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
        }
        alt="Avatar"
      />
      <h1 className={s.name}>{userInfo.name}</h1>
      <a href={userInfo.html_url} target={"_blank"} className={s.username}>
        {userInfo.login}
      </a>
      <div className={s.followerWrapper}>
        <div className={s.followers}>
          <img className={s.miniIcon} src={miniUserIcon} alt="" />
          <span>{kFormatter(userInfo.followers)}</span>
          <span>followers</span>
        </div>
        <div className={s.following}>
          <img className={s.miniIcon} src={miniUserIcon} alt="" />
          <span>{kFormatter(userInfo.following)}</span>
          <span>following</span>
        </div>
      </div>
    </div>
  ) : (
    <SearchingUser />
  );
};
