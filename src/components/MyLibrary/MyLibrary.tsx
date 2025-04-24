import css from "./MyLibrary.module.css";

import LibraryFilter from "./LibraryFilter/LibraryFilter";
import { Link } from "react-router-dom";
import booksIcon from "../../assets/book.png";
import { useAppSelector } from "../../redux/reduxHook";
import { selectFavoritesBook } from "../../redux/books/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const MyLibrary = () => {
  const favoriteBooks = useAppSelector(selectFavoritesBook);
  const isLogedIn = useAppSelector(selectIsLoggedIn);

  return (
    <div className={css.libraryContainer}>
      <LibraryFilter />
      {isLogedIn ? (
        <>
          {favoriteBooks.length === 0 ? (
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
            <div>
              <ul>
                {favoriteBooks.map((book) => (
                  <li key={book._id}>
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className={css.notLoggedInMessage}>
          <p>Please log in to view your library.</p>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
