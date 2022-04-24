import "../../styles/variables.css";
import logo from "../../assets/images/icons/githubLogo.png"
import s from "../../styles/header/header.module.css"

export const Header = () => {
  return (
      <header className={s.header}>
          <div className={s.container}>
              <img src={logo} alt="Logotype" className={s.logo}/>
              <input type="text" placeholder="Custom Input"/>
          </div>
      </header>
  );
};
