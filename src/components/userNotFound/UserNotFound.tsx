import s from "styles/searchingUser/searchingUser.module.css"
import userIcon from "assets/images/icons/userIcon.png"

export const UserNotFound = () => {
    return (
        <div className={s.container}>
            <img src={userIcon} className={s.icon} alt="User"/>
            <p className={s.text}>User not found</p>
        </div>
    )
}