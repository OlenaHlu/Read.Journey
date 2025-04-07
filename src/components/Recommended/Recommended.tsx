import css from "./Recommended.module.css";

import Icon from "../common/Icon";
import RecomList from "./RecomList/RecomList";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { selectBooks } from "../../redux/books/selectors";
import { useEffect } from "react";
import { fetchBooks } from "../../redux/books/operations";

const Recommended = () => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector(selectBooks);

  useEffect(() => {
    console.log("Fetching books...");
    dispatch(fetchBooks());
  }, [dispatch]);

  console.log("Books:", books);

  return (
    <div className={css.recomContainer}>
      <div className={css.topPart}>
        <h2 className={css.title}>Recommended</h2>
        <div className={css.paginationBlock}>
          <button type="button" className={css.btn}>
            <Icon className={css.iconLeft} iconName="chevron" />
          </button>
          <button type="button" className={css.btn}>
            <Icon className={css.iconRight} iconName="chevron" />
          </button>
        </div>
      </div>
      <div>
        <RecomList books={books} />
      </div>
    </div>
  );
};

export default Recommended;
