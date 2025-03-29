import css from "./RecommendedPage.module.css";

import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import RecommendedBoard from "../../components/Dashboard/RecommendedBoard/RecommendedBoard";
import Recommended from "../../components/Recommended/Recommended";

const RecommendedPage = () => {
  return (
    <>
      <Header />
      <main className={css.recomMain}>
        <Dashboard>
          <RecommendedBoard />
        </Dashboard>
        <Recommended />
      </main>
    </>
  );
};
export default RecommendedPage;
