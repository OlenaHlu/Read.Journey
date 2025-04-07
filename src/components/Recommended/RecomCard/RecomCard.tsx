import css from "./RecomCard.module.css";

import { type Book } from "../../../redux/books/types";

type RecomCardProps = {
  book: Book;
};

const RecomCard = ({ book }: RecomCardProps) => {
  return (
    <div>
      <div>
        <img src={book.imageUrl} alt={book.title} />
      </div>
      <h4>{book.title}</h4>
      <p>{book.author}</p>
    </div>
  );
};

export default RecomCard;
