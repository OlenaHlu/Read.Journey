import css from "./RecommendedBoard.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import booksIcon from "../../../assets/books.png";

const RecommendedBoard = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = () => {};

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
              // value={bookTitle}
              placeholder=" "
              // onChange={() => {}}
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
              // value={author}
              placeholder=" "
              // onChange={() => {}}
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
        <img src={booksIcon} alt="Book" className={css.booksImage} />
        <p className={css.quoteText}>
          "Books are <span className={css.quoteSpan}> windows </span> to the
          world, and reading is a journey into the unknown."
        </p>
      </div>
    </div>
  );
};

export default RecommendedBoard;
