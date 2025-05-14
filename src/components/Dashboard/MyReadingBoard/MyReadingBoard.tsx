import css from "./MyReadingBoard.module.css";
import { useState } from "react";
import starIcon from "../../../assets/star.png";
import Icon from "../../..//components/common/Icon";
import Diary from "./Diary/Diary";
import Statistics from "./Statistics/Statistics";

const MyReadingBoard = () => {
  const [activeTab, setActiveTab] = useState<"diary" | "statistics">("diary");

  const handleTabClick = (tab: "diary" | "statistics") => {
    setActiveTab(tab);
  };
  return (
    <div className={css.readingBoard}>
      <div className={css.formPart}>
        <h3 className={css.formTitle}>Start page:</h3>
        <form>
          <div className={css.inputGroup}>
            <label htmlFor="startPage" className={css.inputLabel}>
              Page number:
            </label>
            <input
              type="number"
              id="startPage"
              placeholder=""
              className={css.inputField}
            />
          </div>
          <button type="button" className={css.startBtn}>
            To start
          </button>
        </form>
      </div>
      {/* <div>
        <h3 className={css.formTitle}>Stop page:</h3>
        <form>
          <div className={css.inputGroup}>
            <label htmlFor="stopPage" className={css.inputLabel}>
              Page number:
            </label>
            <input
              type="number"
              id="stopPage"
              placeholder=""
              className={css.inputField}
            />
          </div>
          <button type="button" className={css.stopBtn}>
            To start
          </button>
        </form>
      </div> */}
      <div className={css.progressContainer}>
        <h3 className={css.progressTitle}>Progress</h3>
        <p className={css.progressText}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <img src={starIcon} alt="star" className={css.progressImg} />
      </div>
      {/* <div className={css.diaryAndStats}>
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
              Each page, each chapter is a new round of knowledge, a new step
              towards understanding. By rewriting statistics, we create our own
              reading history.
            </p>
            <Statistics />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default MyReadingBoard;
