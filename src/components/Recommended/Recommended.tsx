import css from "./Recommended.module.css";
import Icon from "../common/Icon";
import RecomList from "./RecomList/RecomList";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import {
  selectBooks,
  selectCurrentPage,
  selectTotalPages,
  selectPerPage,
} from "../../redux/books/selectors";
import { selectToken } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchBooks } from "../../redux/books/operations";
import {
  incrementPage,
  decrementPage,
  setPerPage,
} from "../../redux/books/slice";
import useWindowSize from "../../components/hooks/useWindowSize";

const Recommended = () => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector(selectBooks);
  const token = useAppSelector(selectToken);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const perPage = useAppSelector(selectPerPage);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 375) {
      dispatch(setPerPage(2));
    } else if (windowSize.width <= 768) {
      dispatch(setPerPage(8));
    } else if (windowSize.width <= 1440) {
      dispatch(setPerPage(10));
    }
  }, [windowSize.width, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchBooks({ page: currentPage, limit: perPage }));
    }
  }, [dispatch, token, currentPage, perPage]);

  const handlePrevPage = () => {
    dispatch(decrementPage());
  };

  const handleNextPage = () => {
    dispatch(incrementPage(currentPage + 1));
  };

  console.log("Books:", books);
  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);
  console.log("Per Page:", perPage);

  return (
    <div className={css.recomContainer}>
      {token ? (
        <>
          <div className={css.topPart}>
            <h2 className={css.title}>Recommended</h2>
            <div className={css.paginationBlock}>
              <button
                type="button"
                className={`${css.btn} ${
                  currentPage === 1 ? css.disabled : ""
                }`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <Icon className={css.iconLeft} iconName="chevron" />
              </button>
              {/* <span>{`${currentPage} / ${totalPages}`}</span> */}
              <button
                type="button"
                className={`${css.btn} ${
                  currentPage === totalPages ? css.disabled : ""
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <Icon className={css.iconRight} iconName="chevron" />
              </button>
            </div>
          </div>
          <div>
            <RecomList books={books} />
          </div>
        </>
      ) : (
        <div className={css.notLoggedInMessage}>
          <p>Please log in to see recommended books.</p>
        </div>
      )}
    </div>
  );
};

export default Recommended;
