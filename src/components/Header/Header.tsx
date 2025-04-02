import css from "./Header.module.css";

import { useState } from "react";
import logo from "../../assets/logo.svg";
import Icon from "../common/Icon";
import Navigation from "./Navigation/Navigation";
import UserLayout from "./UserLayout/UserLayout";
import UserModal from "../Modals/UserModal/UserModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openMenu = () => {
    setIsModalOpen(true);
  };

  const closeMenu = () => {
    setIsModalOpen(false);
  };
  return (
    <header className={css.headerContainer}>
      <div className={css.logoContainer}>
        <img className={css.logo} src={logo} />
        <p className={css.logoName}>read journey</p>
      </div>
      <Navigation />
      <div className={css.userContent}>
        <UserLayout />
        <button onClick={openMenu} className={css.btn} type="button">
          <Icon className={css.icon} iconName="burger" />
        </button>
      </div>
      {isModalOpen && <UserModal closeModal={closeMenu} />}
    </header>
  );
};

export default Header;
