import css from "../MainLayout.module.css";

import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyLibraryBoard from "../../components/Dashboard/MyLibraryBoard/MyLibraryBoard";
import MyLibrary from "../../components/MyLibrary/MyLibrary";

const MyLibraryPage = () => {
  return (
    <>
      <Header />
      <main className={css.main}>
        <Dashboard>
          <MyLibraryBoard />
        </Dashboard>
        <MyLibrary />
      </main>
    </>
  );
};
export default MyLibraryPage;
