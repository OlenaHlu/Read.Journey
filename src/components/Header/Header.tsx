import css from "./Header.module.css";

import logo from "../../assets/logo.svg";
import Icon from "../common/Icon";
import Navigation from "./Navigation/Navigation";
import UserLayout from "./UserLayout/UserLayout";

const Header = () => {
  return (
    <header className={css.headerContainer}>
      <div className={css.logoContainer}>
        <img className={css.logo} src={logo} />
        <p className={css.logoName}>read journey</p>
      </div>
      <Navigation />
      <div className={css.userContent}>
        <UserLayout />
        <button className={css.btn} type="button">
          <Icon className={css.icon} iconName="burger" />
        </button>
      </div>
    </header>
  );
};

export default Header;
