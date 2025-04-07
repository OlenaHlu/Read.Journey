import css from "./RecomList.module.css";

import RecomCard from "../RecomCard/RecomCard";
import { type Book } from "../../../redux/books/types";

type BooksListProps = {
  books: Book[];
};

const RecomList = ({ books }: BooksListProps) => {
  if (!books || books.length === 0) {
    return <div>No books available</div>; // Показуємо повідомлення, якщо books ще не визначено або порожнє
  }
  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          <RecomCard book={book} />
        </li>
      ))}
    </ul>
  );
};

export default RecomList;
