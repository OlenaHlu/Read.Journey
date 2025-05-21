import css from "./MyReadingBoard.module.css";
import { useState, useEffect } from "react";
import starIcon from "../../../assets/star.png";
import Icon from "../../..//components/common/Icon";
import Diary from "./Diary/Diary";
import Statistics from "./Statistics/Statistics";

import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { setIsReadingActive } from "../../../redux/reading/slice";
import {
  selectIsReadingActive,
  selectCurrentReadingBook,
} from "../../../redux/reading/selector";
import {
  startReadingBook,
  finishReadingBook,
} from "../../../redux/reading/operations";

type MyReadingBoardProps = {
  mode: "start" | "stop";
  setMode: (mode: "start" | "stop") => void;
};

const MyReadingBoard: React.FC<MyReadingBoardProps> = ({ mode, setMode }) => {
  const dispatch = useAppDispatch();
  const isReadingActive = useAppSelector(selectIsReadingActive);
  const readingBook = useAppSelector(selectCurrentReadingBook);

  const [startPageInput, setStartPageInput] = useState<string>("");
  const [stopPageInput, setStopPageInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"diary" | "statistics">("diary");

  useEffect(() => {
    if (isReadingActive && mode !== "stop") {
      setMode("stop");
    } else if (!isReadingActive && mode !== "start") {
      setMode("start");
    }
  }, [isReadingActive, mode, setMode]);

  const handleTabClick = (tab: "diary" | "statistics") => {
    setActiveTab(tab);
  };

  const handleStartReadingClick = async () => {
    if (!readingBook) {
      console.warn("Немає вибраної книги для початку читання.");
      return;
    }

    const pageNumber = parseInt(startPageInput, 10);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      console.warn("Будь ласка, введіть дійсний номер початкової сторінки.");
      return;
    }

    try {
      const resultAction = await dispatch(
        startReadingBook({ id: readingBook.bookId, page: pageNumber })
      );

      if (startReadingBook.fulfilled.match(resultAction)) {
        setStartPageInput("");
        setMode("stop");
      } else {
        console.error("Помилка початку читання:", resultAction.payload);
      }
    } catch (error) {
      console.error("Помилка відправки startReadingBook:", error);
    }
  };

  const handleStopReadingClick = async () => {
    if (!readingBook) {
      console.warn("Немає вибраної книги для зупинки читання.");
      return;
    }

    const pageNumber = parseInt(stopPageInput, 10);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      console.warn("Будь ласка, введіть дійсний номер сторінки зупинки.");
      return;
    }

    try {
      const resultAction = await dispatch(
        finishReadingBook({ id: readingBook.bookId, page: pageNumber })
      );

      if (finishReadingBook.fulfilled.match(resultAction)) {
        setStopPageInput("");
        setMode("start");
        console.error("Помилка зупинки читання:", resultAction.payload);
      }
    } catch (error) {
      console.error("Помилка відправки finishReadingBook:", error);
    }
  };

  return (
    <div className={css.readingBoard}>
      <div className={css.formPart}>
        {mode === "start" ? (
          <>
            <h3 className={css.formTitle}>Start page:</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStartReadingClick();
              }}
            >
              <div className={css.inputGroup}>
                <label htmlFor="startPage" className={css.inputLabel}>
                  Page number:
                </label>
                <input
                  type="number"
                  id="startPage"
                  placeholder=""
                  className={css.inputField}
                  value={startPageInput}
                  onChange={(e) => setStartPageInput(e.target.value)}
                />
              </div>
              <button type="submit" className={css.startBtn}>
                To start
              </button>
            </form>
          </>
        ) : (
          <>
            <h3 className={css.formTitle}>Stop page:</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStopReadingClick();
              }}
            >
              <div className={css.inputGroup}>
                <label htmlFor="stopPage" className={css.inputLabel}>
                  Page number:
                </label>
                <input
                  type="number"
                  id="stopPage"
                  placeholder=""
                  className={css.inputField}
                  value={stopPageInput}
                  onChange={(e) => setStopPageInput(e.target.value)}
                />
              </div>
              <button type="submit" className={css.stopBtn}>
                To stop
              </button>
            </form>
          </>
        )}
      </div>

      <div className={css.progressContainer}>
        <h3 className={css.progressTitle}>Progress</h3>
        {isReadingActive ? (
          <div className={css.diaryAndStats}>
            <div className={css.titleAndTabs}>
              <h3 className={css.differentTitle}>
                {activeTab === "diary" ? "Diary" : "Statistics"}
              </h3>
              <div className={css.tabBlock}>
                <button
                  onClick={() => handleTabClick("diary")}
                  className={css.btnTab}
                >
                  <Icon
                    iconName="hourglass"
                    className={css.iconTab}
                    color={activeTab === "diary" ? "white" : "gray"}
                  />
                </button>
                <button
                  onClick={() => handleTabClick("statistics")}
                  className={css.btnTab}
                >
                  <Icon
                    iconName="pie-chart"
                    className={css.iconTab}
                    color={activeTab === "statistics" ? "white" : "gray"}
                  />
                </button>
              </div>
            </div>
            {activeTab === "diary" && <Diary />}
            {activeTab === "statistics" && (
              <div className={css.statsComponent}>
                <p className={css.statsText}>
                  Each page, each chapter is a new round of knowledge, a new
                  step towards understanding. By rewriting statistics, we create
                  our own reading history.
                </p>
                <Statistics />
              </div>
            )}
          </div>
        ) : (
          <>
            <p className={css.progressText}>
              Here you will see when and how much you read. To record, click on
              the red button above.
            </p>
            <img src={starIcon} alt="star" className={css.progressImg} />
          </>
        )}
      </div>
    </div>
  );
};

export default MyReadingBoard;
