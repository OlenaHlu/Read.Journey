import css from "./ModalWrapper.module.css";
import { useEffect, useState } from "react";

type ModalWrapperProps = {
  children: React.ReactNode;
  closeModal: () => void;
};

const ModalWrapper = ({ children, closeModal }: ModalWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      clearTimeout(timer);
    };
  }, [closeModal]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div
      className={`${css.modal} ${isOpen ? css.open : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={css.modalContent}>{children}</div>
    </div>
  );
};

export default ModalWrapper;
