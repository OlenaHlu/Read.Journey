import css from "./MyLibrary.module.css";

import LibraryFilter from "./LibraryFilter/LibraryFilter";

const MyLibrary = () => {
  return (
    <div className={css.libraryContainer}>
      <div>
        <h2 className={css.titleLib}>My library</h2>
        <LibraryFilter />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default MyLibrary;
