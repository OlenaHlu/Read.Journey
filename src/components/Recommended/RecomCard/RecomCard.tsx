import css from "./RecomCard.module.css";

import { type Book } from "../../../redux/books/types";
import { useState } from "react";
import BookModal from "../../../components/Modals/BookModal/BookModal";

type RecomCardProps = {
  book: Book;
};

const RecomCard = ({ book }: RecomCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => {
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.cardContainer}>
      <button type="button" onClick={modalOpen}>
        <img src={book.imageUrl} alt={book.title} className={css.imgBook} />
      </button>
      <div className={css.descrContainer}>
        <p className={css.bookTitle}>{book.title}</p>
        <p className={css.bookAuthor}>{book.author}</p>
      </div>
      {isOpen && <BookModal closeModal={modalClose} book={book} />}
    </div>
  );
};

export default RecomCard;
