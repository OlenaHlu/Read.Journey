import css from "./SuccessModal.module.css";
import Icon from "../../../components/common/Icon";

type SuccessModalProps = {
  closeModal: () => void;
};

const SuccessModal = ({ closeModal }: SuccessModalProps) => {
  return (
    <div className={css.successContainer}>
      <button onClick={closeModal} type="button" className={css.closeBtn}>
        <Icon iconName="close" className={css.icon} />
      </button>
      <div className={css.content}>
        <span className={css.emoji}>👍</span>
        <h2 className={css.title}>Good job</h2>
        <p className={css.text}>
          Your book is now in <strong>the library!</strong> The joy knows no
          bounds and now you can start your training.
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
