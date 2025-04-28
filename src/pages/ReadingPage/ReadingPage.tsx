import css from "../MainLayout.module.css";
import Header from "../../components/Header/Header";
import MyReadingBoard from "../../components/Dashboard/MyReadingBoard/MyReadingBoard";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyReading from "../../components/MyReading/MyReading";

const ReadingPage = () => {
  return (
    <>
      <Header />
      <main className={css.main}>
        <Dashboard>
          <MyReadingBoard />
        </Dashboard>
        <MyReading />
      </main>
    </>
  );
};
export default ReadingPage;
