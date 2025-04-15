import css from "./MyLibraryPage.module.css";

import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyLibraryBoard from "../../components/Dashboard/MyLibraryBoard/MyLibraryBoard";

const MyLibraryPage = () => {
  return (
    <>
      <Header />
      <main className={css.recomMain}>
        <Dashboard>
          <MyLibraryBoard />
        </Dashboard>
      </main>
    </>
  );
};
export default MyLibraryPage;
