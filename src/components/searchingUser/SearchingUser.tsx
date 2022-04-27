import s from "styles/searchingUser/searchingUser.module.css"
import searchIcon from "assets/images/icons/searchIcon.png"

export const SearchingUser = () => {
    return (
        <div className={s.container}>
            <img className={s.icon} src={searchIcon} alt="Search"/>
            <p className={s.text}>Start with searching <br/>
                a GitHub user</p>
        </div>
    )
}