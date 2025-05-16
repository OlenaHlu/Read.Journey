import css from "./RecommendedBoard.module.css";

import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import booksIcon from "../../../assets/book.png";
import { useAppDispatch } from "../../../redux/reduxHook";
import { setInputFilters } from "../../../redux/books/slice";

const RecommendedBoard = () => {
  const dispatch = useAppDispatch();
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitleFilter(event.target.value);
    },
    []
  );

  const handleAuthorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuthorFilter(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      dispatch(setInputFilters({ title: titleFilter, author: authorFilter }));
    },
    [titleFilter, authorFilter, dispatch]
  );

  return (
    <div className={css.boardRec}>
      <div className={css.formContainer}>
        <h3 className={css.formTitle}>Filters:</h3>
        <form onSubmit={handleSubmit} className={css.filterForm}>
          <div className={css.inputGroup}>
            <label htmlFor="bookTitle" className={css.label}>
              Book title:
            </label>
            <input
              type="text"
              id="bookTitle"
              value={titleFilter}
              placeholder=" "
              onChange={handleTitleChange}
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
              value={authorFilter}
              placeholder=" "
              onChange={handleAuthorChange}
              className={`${css.inputField} ${css.inputNext}`}
            />
          </div>
          <button type="submit" className={css.submitButton}>
            To apply
          </button>
        </form>
      </div>
      <div className={css.describeContainer}>
        <h2 className={css.describeTitle}>Start your workout</h2>
        <ul className={css.describeList}>
          <li className={css.listItem}>
            <div className={css.itemNumber}>
              <p className={css.number}>1</p>
            </div>
            <p className={css.itemText}>
              Create a personal library:{" "}
              <span className={css.itemSpan}>
                add the books you intend to read to it.
              </span>
            </p>
          </li>
          <li className={css.listItem}>
            <div className={css.itemNumber}>
              <p className={css.number}>2</p>
            </div>
            <p className={css.itemText}>
              Create your first workout:{" "}
              <span className={css.itemSpan}>
                define a goal, choose a period, start training.
              </span>
            </p>
          </li>
        </ul>
        <Link className={css.libraryLink} to="/library">
          My library
        </Link>
      </div>
      <div className={css.quote}>
        <span className={css.booksImage}>📚</span>
        {/* <img src={booksIcon} alt="Books" className={css.booksImage} /> */}
        <p className={css.quoteText}>
          "Books are <span className={css.quoteSpan}> windows </span> to the
          world, and reading is a journey into the unknown."
        </p>
      </div>
    </div>
  );
};

export default RecommendedBoard;
