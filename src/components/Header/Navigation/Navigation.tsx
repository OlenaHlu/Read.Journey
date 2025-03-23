import css from "./Navigation.module.css";

import { NavLink } from "react-router-dom";
import clsx from "clsx";

const Navigation = () => {
  function getClassActiveLink({ isActive }: { isActive: boolean }) {
    return clsx(css.link, isActive && css.active);
  }

  return (
    <nav className={css.navContainer}>
      <ul className={css.navList}>
        <li>
          <NavLink className={getClassActiveLink} to="/recommended">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={getClassActiveLink} to="/library">
            My library
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
