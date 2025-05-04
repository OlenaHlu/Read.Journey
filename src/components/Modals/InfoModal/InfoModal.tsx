import css from "./InfoModal.module.css";
import Icon from "../../../components/common/Icon";

type InfoModalProps = {
  closeModal: () => void;
  message: string;
};

const InfoModal = ({ closeModal, message }: InfoModalProps) => {
  return (
    <div className={css.infoContainer}>
      <button onClick={closeModal} className={css.closeBtn}>
        <Icon iconName="close" className={css.icon} />
      </button>
      <div className={css.content}>
        <span className={css.emoji}>📚</span>
        <h2 className={css.title}>Already added</h2>
        <p className={css.text}>{message}</p>
      </div>
    </div>
  );
};

export default InfoModal;
