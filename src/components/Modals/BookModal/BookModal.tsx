import css from "./BookModal.module.css";
import { useState } from "react";
import Icon from "../../../components/common/Icon";
import { type Book } from "../../../redux/books/types";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import SuccessModal from "../SuccessModal/SuccessModal";
import { addToLibrary } from "../../../redux/books/slice";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";

type bookModalProps = {
  book: Book;
  closeModal: () => void;
};

const BookModal = ({ book, closeModal }: bookModalProps) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToLibrary = () => {
    if (isLoggedIn) {
      dispatch(addToLibrary(book));

      setShowSuccess(true);
    } else {
      alert("Please log in to add books to your library.");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    closeModal();
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      {showSuccess ? (
        <SuccessModal closeModal={handleCloseSuccess} />
      ) : (
        <div className={css.bookContainer}>
          <button onClick={closeModal} type="button" className={css.closeBtn}>
            <Icon iconName="close" className={css.icon} />
          </button>
          <div className={css.modalContent}>
            <img
              src={book.imageUrl}
              alt={book.title}
              className={css.modalImage}
            />
            <h4 className={css.bookTitle}>{book.title}</h4>
            <p className={css.bookAuthor}>{book.author}</p>
            <p className={css.bookPages}>{book.totalPages} pages</p>
            <button
              className={css.addBtn}
              type="button"
              onClick={handleAddToLibrary}
            >
              Add to library
            </button>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};

export default BookModal;
