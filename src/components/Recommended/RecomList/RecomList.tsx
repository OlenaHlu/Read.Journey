import css from "./RecomList.module.css";

import RecomCard from "../RecomCard/RecomCard";
import { type Book } from "../../../redux/books/types";

type BooksListProps = {
  books: Book[];
};

const RecomList = ({ books }: BooksListProps) => {
  if (!books || books.length === 0) {
    return <div className={css.noBooksMessage}>No books available</div>;
  }
  return (
    <ul className={css.booksList}>
      {books.map((book) => (
        <li key={book._id}>
          <RecomCard book={book} />
        </li>
      ))}
    </ul>
  );
};

export default RecomList;
