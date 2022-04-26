import "styles/variables.css";
import logo from "assets/images/icons/githubLogo.png"
import s from "styles/header/header.module.css"
import {SearchInput} from "components";

export const Header = () => {
  return (
      <header className={s.header}>
          <div className={s.container}>
              <img src={logo} alt="Logotype" className={s.logo}/>
              <SearchInput />
          </div>
      </header>
  );
};
