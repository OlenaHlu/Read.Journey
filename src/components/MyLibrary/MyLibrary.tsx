import css from "./MyLibrary.module.css";

import LibraryFilter from "./LibraryFilter/LibraryFilter";
import { Link } from "react-router-dom";
import booksIcon from "../../assets/book.png";

const MyLibrary = () => {
  return (
    <div className={css.libraryContainer}>
      <LibraryFilter />
      <div className={css.informBlock}>
        <Link to="/recommended" className={css.imgContainer}>
          <img src={booksIcon} alt="Books" className={css.booksImage} />
        </Link>
        <p className={css.libText}>
          To start training, add{" "}
          <span className={css.textSpan}>some of your books</span> or from the
          recommended ones
        </p>
      </div>
    </div>
  );
};

export default MyLibrary;
