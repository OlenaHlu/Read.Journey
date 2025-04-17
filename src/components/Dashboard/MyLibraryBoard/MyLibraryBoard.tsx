import css from "./MyLibraryBoard.module.css";

import { Link } from "react-router-dom";
import Icon from "../../../components/common/Icon";

const MyLibraryBoard = () => {
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
          <ul>
            <li>
              <div className={css.book1}></div>
              <p>The Orphanage</p>
            </li>
            <li>
              <div className={css.book2}></div>
            </li>
            <li>
              <div className={css.book3}></div>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/recommended" className={css.link}>
            Home
          </Link>
        </div>
        <Link to="/login" className={css.link}>
          <Icon iconName="login" className={css.icon} />
        </Link>
      </div>
    </div>
  );
};

export default MyLibraryBoard;
