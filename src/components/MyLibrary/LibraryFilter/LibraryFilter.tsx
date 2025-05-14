import css from "./LibraryFilter.module.css";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { selectFiltersLib } from "../../../redux/library/selectors";
import { setFiltersLib, resetFiltersLib } from "../../../redux/books/slice";
import Icon from "../../common/Icon";

const LibraryFilter = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const useFilters = useAppSelector(selectFiltersLib);

  const filters = ["Unread", "In progress", "Done", "All books"];

  const togggleDropDown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    dispatch(resetFiltersLib());
  }, [dispatch]);

  const handleFiltersClick = (filter: string) => {
    dispatch(setFiltersLib(filter));
    setIsOpen(false);
  };
  return (
    <div className={css.filterContainer}>
      <h2 className={css.filterTitle}>My library</h2>
      <button className={css.filterBtn} onClick={togggleDropDown}>
        {useFilters}
        <span>
          {isOpen ? (
            <Icon iconName="chevron-down" className={css.iconUp} />
          ) : (
            <Icon iconName="chevron-down" className={css.iconDown} />
          )}
        </span>
      </button>
      {isOpen && (
        <ul className={css.filterList}>
          {filters.map((filter) => (
            <li
              key={filter}
              className={`${css.filterItem} ${
                useFilters === filter ? css.active : ""
              }`}
              onClick={() => {
                handleFiltersClick(filter);
              }}
            >
              {filter}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibraryFilter;
