import css from "./RecommendedPage.module.css";

import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import RecommendedBoard from "../../components/Dashboard/RecommendedBoard/RecommendedBoard";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";

const RecommendedPage = () => {
  return (
    <>
      <Header />
      <main className={css.recomMain}>
        <Dashboard>
          <RecommendedBoard />
        </Dashboard>
        <RecommendedBooks />
      </main>
    </>
  );
};
export default RecommendedPage;
