import css from "./MyLibraryBoard.module.css";

import { Link } from "react-router-dom";
import Icon from "../../../components/common/Icon";

const MyLibraryBoard = () => {
  const handleSubmit = () => {};
  return (
    <div className={css.libraryContainer}>
      <div className={css.libraryForm}>
        <h3 className={css.formTitle}>Create your library:</h3>
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
            <label htmlFor="author" className={css.label}>
              The author:
            </label>
            <input
              type="text"
              id="author"
              placeholder=" "
              className={css.inputField}
            />
          </div>
          <div className={css.inputGroup}>
            <label htmlFor="pages" className={css.label}>
              Number of pages:
            </label>
            <input
              type="text"
              id="pages"
              placeholder=" "
              className={css.inputField}
            />
          </div>
          <button type="submit" className={css.submitButton}>
            Add book
          </button>
        </form>
      </div>
      <div className={css.recomPart}>
        <h2 className={css.recomPartTitle}>Recommended books</h2>
        <div className={css.booksContainer}>
          <ul className={css.booksList}>
            <li className={css.booksItem}>
              <div className={css.book1}></div>
              <p className={css.bookName}>The Orphanage</p>
              <p className={css.bookAuthor}>Serhiy Zhadan</p>
            </li>
            <li>
              <div className={css.book2}></div>
              <p className={css.bookName}>Melodіja kavi...</p>
              <p className={css.bookAuthor}>Natalia Gurnyt...</p>
            </li>
            <li>
              <div className={css.book3}></div>
              <p className={css.bookName}>SIx doors</p>
              <p className={css.bookAuthor}>Irene Rozdobu...</p>
            </li>
          </ul>
        </div>

        <div className={css.navigate}>
          <Link to="/recommended" className={css.recomLink}>
            Home
          </Link>
          <Link to="/login">
            <Icon iconName="login" className={css.icon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyLibraryBoard;
