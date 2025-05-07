import css from "../BookModal/BookModal.module.css";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Icon from "../../../components/common/Icon";
import { Book } from "../../../redux/books/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/reduxHook";
import { setReadingBook } from "../../../redux/books/slice";

type ReadingModalProps = {
  book: Book;
  closeModal: () => void;
};

const ReadingModal = ({ book, closeModal }: ReadingModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStartReading = () => {
    dispatch(setReadingBook(book));
    navigate("/reading");
  };
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className={css.readContainer}>
        <button type="button" onClick={closeModal}>
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
            onClick={handleStartReading}
          >
            Start reading
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ReadingModal;
