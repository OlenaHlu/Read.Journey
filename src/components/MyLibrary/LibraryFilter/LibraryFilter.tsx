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
    <div>
      <button>{selectedFilters}</button>
    </div>
  );
};

export default LibraryFilter;
