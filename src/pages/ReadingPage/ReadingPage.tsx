import css from "../MainLayout.module.css";
import { useState } from "react";
import Header from "../../components/Header/Header";
import MyReadingBoard from "../../components/Dashboard/MyReadingBoard/MyReadingBoard";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyReading from "../../components/MyReading/MyReading";

const ReadingPage = () => {
  const [myReadingBoardMode, setMyReadingBoardMode] = useState<
    "start" | "stop"
  >("start");
  return (
    <>
      <Header />
      <main className={css.main}>
        <Dashboard>
          <MyReadingBoard
            mode={myReadingBoardMode}
            setMode={setMyReadingBoardMode}
          />
        </Dashboard>
        <MyReading onSetMyReadingBoardMode={setMyReadingBoardMode} />
      </main>
    </>
  );
};
export default ReadingPage;
