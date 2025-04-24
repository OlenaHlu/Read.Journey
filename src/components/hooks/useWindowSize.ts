import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/reduxHook";
import { setPerPage, resetPage } from "../../redux/books/slice";

const useWindowSize = () => {
  const dispatch = useAppDispatch();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(resetPage());
    if (windowSize.width <= 375) {
      dispatch(setPerPage(2));
    } else if (windowSize.width <= 768) {
      dispatch(setPerPage(8));
    } else if (windowSize.width <= 1024) {
      dispatch(setPerPage(8));
    } else if (windowSize.width <= 1440) {
      dispatch(setPerPage(10));
    }
  }, [windowSize.width, dispatch]);

  return windowSize;
};

export default useWindowSize;
