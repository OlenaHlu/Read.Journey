import logo from "../../assets/logo.svg";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <img src={logo} className={css.logo} />
      <div></div>
    </header>
  );
};

export default Header;
