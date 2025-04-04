import css from "./UserModal.module.css";

import Icon from "../../common/Icon";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

type userModalProps = {
  closeModal: () => void;
};

const UserModal = ({ closeModal }: userModalProps) => {
  function getClassActiveLink({ isActive }: { isActive: boolean }) {
    return clsx(css.link, isActive && css.active);
  }
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
        <button className={css.logoutBtn} type="submit">
          Log out
        </button>
      </div>
    </div>
  );
};
export default UserModal;
