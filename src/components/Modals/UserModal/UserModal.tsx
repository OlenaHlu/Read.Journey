import css from "./UserModal.module.css";

import Navigation from "../../Header/Navigation/Navigation";
import Icon from "../../common/Icon";

type userModalProps = {
  closeModal: () => void;
};

const UserModal = ({ closeModal }: userModalProps) => {
  return (
    <div className={css.modalContainer}>
      <button className={css.closeBtn} onClick={closeModal}>
        <Icon className={css.icon} iconName="close" />
      </button>
      <Navigation />
      <button className={css.logoutBtn} type="submit">
        Log out
      </button>
    </div>
  );
};
export default UserModal;
