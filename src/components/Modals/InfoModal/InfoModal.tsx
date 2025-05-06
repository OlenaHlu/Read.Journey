import css from "./InfoModal.module.css";
import Icon from "../../../components/common/Icon";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

type InfoModalProps = {
  closeModal: () => void;
  message: string;
};

const InfoModal = ({ closeModal, message }: InfoModalProps) => {
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className={css.infoContainer}>
        <button onClick={closeModal} className={css.closeBtn}>
          <Icon iconName="close" className={css.icon} />
        </button>

        <span className={css.emoji}>❗️</span>
        <h2 className={css.title}>Already added</h2>
        <p className={css.text}>{message}</p>
      </div>
    </ModalWrapper>
  );
};

export default InfoModal;
