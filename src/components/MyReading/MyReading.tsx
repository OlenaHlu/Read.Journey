import css from "./MyReading.module.css";
import { useAppSelector } from "../../redux/reduxHook";
import {
  selectCurrentReadingBook,
  selectIsReadingActive,
} from "../../redux/reading/selector";
import Icon from "../common/Icon";
import ReadingTimer from "../common/ReadingTimer";

type MyReadingProps = {
  onSetMyReadingBoardMode: (mode: "start" | "stop") => void;
};

const MyReading = ({ onSetMyReadingBoardMode }: MyReadingProps) => {
  const readingBook = useAppSelector(selectCurrentReadingBook);
  const isReadingActive = useAppSelector(selectIsReadingActive);

  const handlePlayButtonClick = () => {
    onSetMyReadingBoardMode("start");
  };

  const handleStopButtonClick = () => {
    onSetMyReadingBoardMode("stop");
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
          onClick={handleStopButtonClick}
        >
          <Icon iconName="stop" className={css.iconPlay} />
        </button>
      ) : (
        <button
          type="button"
          className={css.readBtn}
          onClick={handlePlayButtonClick}
        >
          <Icon iconName="play" className={css.iconPlay} />
        </button>
      )}
    </div>
  );
};

export default MyReading;
