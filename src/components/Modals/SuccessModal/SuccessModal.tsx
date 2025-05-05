import css from "./SuccessModal.module.css";
import Icon from "../../../components/common/Icon";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

type SuccessModalProps = {
  closeModal: () => void;
};

const SuccessModal = ({ closeModal }: SuccessModalProps) => {
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className={css.successContainer}>
        <button onClick={closeModal} type="button" className={css.closeBtn}>
          <Icon iconName="close" className={css.icon} />
        </button>
        <span className={css.emoji}>👍</span>
        <h2 className={css.title}>Good job</h2>
        <p className={css.text}>
          Your book is now in{" "}
          <span className={css.different}>the library!</span> The joy knows no
          bounds and now you can start your training.
        </p>
      </div>
    </ModalWrapper>
  );
};

export default SuccessModal;
