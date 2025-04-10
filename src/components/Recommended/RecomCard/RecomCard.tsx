import css from "./RecomCard.module.css";

import { type Book } from "../../../redux/books/types";

type RecomCardProps = {
  book: Book;
};

const RecomCard = ({ book }: RecomCardProps) => {
  return (
    <div className={css.cardContainer}>
      <div>
        <img src={book.imageUrl} alt={book.title} className={css.imgBook} />
      </div>
      <div className={css.descrContainer}>
        <p className={css.bookTitle}>{book.title}</p>
        <p className={css.bookAuthor}>{book.author}</p>
      </div>
    </div>
  );
};

export default RecomCard;
