import css from "./MyReadingBoard.module.css";
import starIcon from "../../../assets/star.png";

const MyReadingBoard = () => {
  return (
    <div className={css.readingBoard}>
      <div>
        <h3>Start page:</h3>
        <form>
          <label htmlFor="startPage">Page number:</label>
          <input
            type="number"
            id="startPage"
            placeholder=""
            className={css.inputField}
          />
          <button type="button" className={css.startBtn}>
            To start
          </button>
        </form>
      </div>
      <div className={css.progressContainer}>
        <h3 className={css.progressTitle}>Progress</h3>
        <p className={css.progressText}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <img src={starIcon} alt="star" className={css.progressImg} />
      </div>
      {/* <div>
        <h3>Stop page:</h3>
        <form>
          <label htmlFor="stopPage">Page number:</label>
          <input
            type="number"
            id="stopPage"
            placeholder=""
            className={css.inputField}
          />
          <button type="button" className={css.stopBtn}>
            To start
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default MyReadingBoard;
