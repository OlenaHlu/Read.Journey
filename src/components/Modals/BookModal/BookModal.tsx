import css from "./BookModal.module.css";
import { useState } from "react";
import Icon from "../../../components/common/Icon";
import { type Book } from "../../../redux/books/types";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import SuccessModal from "../SuccessModal/SuccessModal";
import InfoModal from "../InfoModal/InfoModal";
import { addToLibrary } from "../../../redux/books/slice";
import { selectFavoritesBook } from "../../../redux/books/selectors";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";

type bookModalProps = {
  book: Book;
  closeModal: () => void;
};

const BookModal = ({ book, closeModal }: bookModalProps) => {
  const dispatch = useAppDispatch();
  const favoriteBook = useAppSelector(selectFavoritesBook);
  const [modalType, setModalType] = useState<"success" | "info" | null>(null);

  const isAlreadyInLibrary = favoriteBook.some((b) => b._id === book._id);

  const handleAddToLibrary = () => {
    if (isAlreadyInLibrary) {
      setModalType("info");
    } else {
      dispatch(addToLibrary(book));
      setModalType("success");
    }
  };

  const handleClose = () => {
    setModalType(null);
    closeModal();
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      {modalType === "success" && <SuccessModal closeModal={handleClose} />}
      {modalType === "info" && (
        <InfoModal
          message="This book is already in your library!"
          closeModal={handleClose}
        />
      )}
      {!modalType && (
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
