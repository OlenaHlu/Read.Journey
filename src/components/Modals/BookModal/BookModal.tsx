import css from "./BookModal.module.css";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { type Book } from "../../../redux/books/types";
import { type addBooksId } from "../../../redux/library/operations";
import { selectUser } from "../../../redux/auth/selectors";
import { addBooks } from "../../../redux/library/operations";
import { selectUserBooks } from "../../../redux/library/selectors";
import Icon from "../../../components/common/Icon";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import SuccessModal from "../SuccessModal/SuccessModal";
import InfoModal from "../InfoModal/InfoModal";

type bookModalProps = {
  book: Book;
  closeModal: () => void;
};

const BookModal = ({ book, closeModal }: bookModalProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userId = user?._id;
  const userBooks = useAppSelector((state) =>
    selectUserBooks(state, userId || "")
  ) as addBooksId[];
  const [modalType, setModalType] = useState<"success" | "info" | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const isAlreadyInLibrary = userBooks.some((b) => b.bookId === book._id);

  useEffect(() => {
    console.log("Current User in BookModal:", user);
    console.log("Current UserId in BookModal:", userId);
  }, [user, userId]);

  const handleAddToLibrary = async () => {
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    if (isAlreadyInLibrary) {
      setModalType("info");
      return;
    }

    setIsAdding(true);
    setAddError(null);

    try {
      const result = await dispatch(
        addBooks({ userId, bookId: book._id })
      ).unwrap();
      console.log("Book added:", result);
      setModalType("success");
    } catch (error: any) {
      setAddError(error?.message || "Failed to add book to library");
    } finally {
      setIsAdding(false);
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
              disabled={isAdding}
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
