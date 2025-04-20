import css from "./LibraryFilter.module.css";

import { useState } from "react";
import Icon from "../../common/Icon";

type LibraryFilterProps = {
  selectedFilters: string;
  onFilterChange: (filter: string) => void;
};

const LibraryFilter = ({
  selectedFilters,
  onFilterChange,
}: LibraryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const filters = ["Unread", "In progress", "Done", "All books"];

  const togggleDropDown = () => setIsOpen((prev) => !prev);

  const handleFiltersClick = (filter: string) => {
    onFilterChange(filter);
    setIsOpen(false);
  };
  return (
    <div className={css.filterContainer}>
      <h2 className={css.filterTitle}>My library</h2>
      <button className={css.filterBtn} onClick={togggleDropDown}>
        {selectedFilters}
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
                selectedFilters === filter ? css.active : ""
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
