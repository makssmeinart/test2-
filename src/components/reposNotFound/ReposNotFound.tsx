import s from "styles/searchingUser/searchingUser.module.css";
import reposIcon from "assets/images/icons/reposIcon.png";

export const ReposNotFound = () => {
  return (
    <div className={s.container}>
      <img src={reposIcon} className={s.icon} alt="" />
      <p className={s.text}>Repository list is empty</p>
    </div>
  );
};
