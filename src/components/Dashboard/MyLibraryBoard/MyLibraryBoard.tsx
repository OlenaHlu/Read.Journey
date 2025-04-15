import css from "./MyLibraryBoard.module.css";

import RecomList from "../../../components/Recommended/RecomList/RecomList";
import { useAppSelector } from "../../../redux/reduxHook";
import { selectBooks } from "../../../redux/books/selectors";
import { Link } from "react-router-dom";
import Icon from "../../../components/common/Icon";

const MyLibraryBoard = () => {
  const { books } = useAppSelector(selectBooks);

  const handleSubmit = () => {};
  return (
    <div className={css.libraryContainer}>
      <div className={css.libraryForm}>
        <h3 className={css.formTitle}>Filters:</h3>
        <form onSubmit={handleSubmit} className={css.filterForm}>
          <div className={css.inputGroup}>
            <label htmlFor="bookTitle" className={css.label}>
              Book title:
            </label>
            <input
              type="text"
              id="bookTitle"
              placeholder=" "
              className={css.inputField}
            />
          </div>
          <div className={css.inputGroup}>
            <label className={css.label}></label>
            <input
              type="text"
              id="author"
              placeholder=" "
              className={css.inputField}
            />
          </div>
          <div className={css.inputGroup}>
            <label htmlFor="author" className={css.label}>
              The author:
            </label>
            <input />
          </div>
          <button type="submit" className={css.submitButton}>
            Add book
          </button>
        </form>
      </div>
      <div className={css.recomPart}>
        <h2 className={css.recomPartTitle}>Recommended books</h2>
        <div className={css.booksContainer}>
          <RecomList books={books} />
        </div>
        <div>
          <Link to="/" className={css.link}>
            Home
          </Link>
          <button type="button" className={css.btnErrow}>
            <Icon iconName="login" className={css.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyLibraryBoard;
