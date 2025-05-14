import css from "./MyReading.module.css";
import { useAppSelector } from "../../redux/reduxHook";
import { selectReadingBook } from "../../redux/books/selectors";
import Icon from "../common/Icon";

const MyReading = () => {
  const readingBook = useAppSelector(selectReadingBook);

  return (
    <div className={css.readingContainer}>
      <h2 className={css.title}>My reading</h2>
      <div className={css.bookContainer}>
        <img src={readingBook?.imageUrl} className={css.bookCover} />
        <div className={css.bookInform}>
          <h4 className={css.bookTitle}>{readingBook?.title}</h4>
          <p className={css.bookAuthor}>{readingBook?.author}</p>
        </div>
      </div>
      <button type="button" className={css.readBtn}>
        <Icon iconName="play" className={css.iconPlay} />
      </button>
    </div>
  );
};

export default MyReading;
