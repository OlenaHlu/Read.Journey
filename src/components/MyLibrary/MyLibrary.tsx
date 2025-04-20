import css from "./MyLibrary.module.css";

import LibraryFilter from "./LibraryFilter/LibraryFilter";

const MyLibrary = () => {
  return (
    <div className={css.libraryContainer}>
      <LibraryFilter />
      <div></div>
      <div></div>
    </div>
  );
};

export default MyLibrary;
