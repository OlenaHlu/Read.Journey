import css from "./MyReading.module.css";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import { setIsReadingActive, setReadingBook } from "../../redux/reading/slice";
import {
  selectCurrentReadingBook,
  selectIsReadingActive,
} from "../../redux/reading/selector";
import Icon from "../common/Icon";
import ReadingTimer from "../common/ReadingTimer";
import { startReadingBook } from "../../redux/reading/operations";

const MyReading = () => {
  const dispatch = useAppDispatch();
  const readingBook = useAppSelector(selectCurrentReadingBook);
  const isReadingActive = useAppSelector(selectIsReadingActive);
  const [startReadingFromBeginning, setStartReadingFromBeginning] =
    useState(false);

  const handleStartReading = () => {
    if (readingBook) {
      dispatch(startReadingBook({ id: readingBook.bookId, page: 1 }));
    } else {
      console.warn("readingBook is null, cannot start reading.");
    }
  };

  const handleStopReading = () => {
    dispatch(setIsReadingActive(false));
  };

  return (
    <div className={css.readingContainer}>
      <h2 className={css.title}>My reading</h2>
      <div className={css.bookContainer}>
        {isReadingActive ? (
          <p>Reading...</p>
        ) : (
          <img
            src={readingBook?.imageUrl}
            className={css.bookCover}
            alt={readingBook?.title}
          />
        )}
        <div className={css.bookInform}>
          <h4 className={css.bookTitle}>{readingBook?.title}</h4>
          <p className={css.bookAuthor}>{readingBook?.author}</p>
        </div>
      </div>
      {isReadingActive && (
        <div className={css.timerContainer}>
          <ReadingTimer />
        </div>
      )}
      {isReadingActive ? (
        <button
          type="button"
          className={css.stopBtn}
          onClick={handleStopReading}
        >
          <Icon iconName="stop" className={css.iconPlay} />
        </button>
      ) : (
        <button
          type="button"
          className={css.readBtn}
          onClick={handleStartReading}
        >
          <Icon iconName="play" className={css.iconPlay} />
        </button>
      )}
    </div>
  );
};

export default MyReading;
