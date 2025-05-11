import css from "./MyLibrary.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import booksIcon from "../../assets/book.png";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import {
  selectCurrentPage,
  selectTotalPages,
  selectPerPage,
} from "../../redux/books/selectors";
import {
  incrementPage,
  decrementPage,
  resetPage,
} from "../../redux/books/slice";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { type Book } from "../../redux/books/types";
import { type addBooksId, removeBook } from "../../redux/library/operations";
import { selectUserBooks } from "../../redux/library/selectors";
import Icon from "../common/Icon";
import LibraryFilter from "./LibraryFilter/LibraryFilter";
import useWindowSize from "../hooks/useWindowSize";
import ReadingModal from "../Modals/ReadingModal/ReadingModal";

const MyLibrary = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const userId = user?._id;
  const userBooks = useAppSelector((state) =>
    selectUserBooks(state, userId || "")
  );
  const isLogedIn = useAppSelector(selectIsLoggedIn);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const perPage = useAppSelector(selectPerPage);
  const [bookToOpen, setBookToOpen] = useState<
    (addBooksId & Partial<Book>) | null
  >(null);

  useEffect(() => {
    dispatch(resetPage());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("userBooks in MyLibrary:", userBooks);
  // }, [userBooks]);

  useWindowSize();

  const handleRemoveFromLibrary = (id: string) => {
    dispatch(removeBook({ id }));
  };

  const handlePrevPage = () => {
    dispatch(decrementPage());
  };

  const handleNextPage = () => {
    dispatch(incrementPage(currentPage + 1));
  };

  const modalOpen = (book: addBooksId) => {
    setBookToOpen({ ...book, recommend: undefined });
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedBooks = Array.isArray(userBooks)
    ? userBooks.slice(startIndex, endIndex)
    : [];
  const calculatedTotalPages = Array.isArray(userBooks)
    ? Math.ceil(userBooks.length / perPage)
    : 0;

  return (
    <div className={css.libraryContainer}>
      <LibraryFilter />
      {isLogedIn ? (
        <>
          {Array.isArray(userBooks) && userBooks.length === 0 ? (
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
            <>
              <ul className={css.libraryList}>
                {displayedBooks.map((book) => {
                  console.log("Current book:", book);
                  return (
                    <li key={book.bookId} className={css.libraryItem}>
                      <button type="button" onClick={() => modalOpen(book)}>
                        <img src={book.imageUrl} className={css.bookCover} />
                      </button>
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
                    </li>
                  );
                })}
              </ul>
              <div className={css.paginationBlock}>
                <button
                  type="button"
                  className={`${css.btn} ${
                    currentPage === 1 ? css.disabled : ""
                  }`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <Icon className={css.iconLeft} iconName="chevron" />
                </button>
                <span
                  className={css.pageOfPages}
                >{`${currentPage} of ${calculatedTotalPages}`}</span>
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
            </>
          )}
        </>
      ) : (
        <div className={css.notLoggedInMessage}>
          <p>Please log in to view your library.</p>
        </div>
      )}
      {isOpen && bookToOpen && (
        <ReadingModal closeModal={modalClose} book={bookToOpen as Book} />
      )}
    </div>
  );
};

export default MyLibrary;
