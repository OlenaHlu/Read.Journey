import css from "./MyLibrary.module.css";

import LibraryFilter from "./LibraryFilter/LibraryFilter";
import { Link } from "react-router-dom";
import booksIcon from "../../assets/book.png";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import {
  selectFavoritesBook,
  selectCurrentPage,
  selectTotalPages,
  selectPerPage,
} from "../../redux/books/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Icon from "../common/Icon";
import { removeFromLibrary } from "../../redux/books/slice";
import useWindowSize from "../hooks/useWindowSize";
import { incrementPage, decrementPage } from "../../redux/books/slice";

const MyLibrary = () => {
  const dispatch = useAppDispatch();
  const favoriteBooks = useAppSelector(selectFavoritesBook);
  const isLogedIn = useAppSelector(selectIsLoggedIn);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const perPage = useAppSelector(selectPerPage);

  useWindowSize();

  const handleRemoveFromLibrary = (bookId: string) => {
    dispatch(removeFromLibrary(bookId));
  };

  const handlePrevPage = () => {
    dispatch(decrementPage());
  };

  const handleNextPage = () => {
    dispatch(incrementPage(currentPage + 1));
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedBooks = Array.isArray(favoriteBooks)
    ? favoriteBooks.slice(startIndex, endIndex)
    : [];
  const calculatedTotalPages = Array.isArray(favoriteBooks)
    ? Math.ceil(favoriteBooks.length / perPage)
    : 0;

  return (
    <div className={css.libraryContainer}>
      <LibraryFilter />
      {isLogedIn ? (
        <>
          {Array.isArray(favoriteBooks) && favoriteBooks.length === 0 ? (
            <div className={css.informBlock}>
              <Link to="/recommended" className={css.imgContainer}>
                <img src={booksIcon} alt="Books" className={css.booksImage} />
              </Link>
              <p className={css.libText}>
                To start training, add{" "}
                <span className={css.textSpan}>some of your books</span> or from
                the recommended ones
              </p>
            </div>
          ) : (
            <ul className={css.libraryList}>
              {displayedBooks.map((book) => (
                <li key={book._id} className={css.libraryItems}>
                  <div>
                    <img src={book.imageUrl} className={css.bookCover} />
                    <div className={css.itemFooter}>
                      <div className={css.aboutBook}>
                        <h4 className={css.bookTitle}>{book.title}</h4>
                        <p className={css.bookAuthor}>{book.author}</p>
                      </div>
                      <button
                        className={css.deleteBtn}
                        onClick={() => handleRemoveFromLibrary(book._id)}
                        type="button"
                      >
                        <Icon iconName="trash-2" className={css.iconTrash} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className={css.notLoggedInMessage}>
          <p>Please log in to view your library.</p>
        </div>
      )}
      <div className={css.paginationBlock}>
        <button
          type="button"
          className={`${css.btn} ${currentPage === 1 ? css.disabled : ""}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Icon className={css.iconLeft} iconName="chevron" />
        </button>
        <span>{`${currentPage} / ${calculatedTotalPages}`}</span>
        <button
          type="button"
          className={`${css.btn} ${
            currentPage === totalPages ? css.disabled : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === calculatedTotalPages}
        >
          <Icon className={css.iconRight} iconName="chevron" />
        </button>
      </div>
    </div>
  );
};

export default MyLibrary;
