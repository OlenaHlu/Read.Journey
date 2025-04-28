import css from "./MyReadingBoard.module.css";
import starIcon from "../../../assets/star.png";

const MyReadingBoard = () => {
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
    </div>
  );
};

export default MyReadingBoard;
