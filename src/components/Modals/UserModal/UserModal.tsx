import css from "./UserModal.module.css";

import Icon from "../../common/Icon";
import { NavLink } from "react-router-dom";
import LogoutBtn from "../../AuthBlocks/LogoutBtn/LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import { selectToken } from "../../../redux/auth/selectors";

import clsx from "clsx";

type userModalProps = {
  closeModal: () => void;
};

const UserModal = ({ closeModal }: userModalProps) => {
  function getClassActiveLink({ isActive }: { isActive: boolean }) {
    return clsx(css.link, isActive && css.active);
  }
  const token = useAppSelector(selectToken);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={css.modal}>
      <div className={css.modalContainer}>
        <button className={css.closeBtn} onClick={closeModal}>
          <Icon className={css.icon} iconName="close" />
        </button>
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
        {token ? (
          <LogoutBtn isModal={true} />
        ) : (
          <div className={css.logRegContainer}>
            <button onClick={handleLogin} className={css.loginBtn}>
              Log in
            </button>
            <button onClick={handleRegister} className={css.registerBtn}>
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserModal;
