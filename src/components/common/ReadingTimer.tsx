import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/reduxHook";
import {
  selectProgress,
  selectIsReadingActive,
} from "../../redux/reading/selector";

const ReadingTimer = () => {
  const progress = useAppSelector(selectProgress);
  const isReadingActive = useAppSelector(selectIsReadingActive);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isReadingActive && progress.length > 0) {
      const activeSession = [...progress]
        .reverse()
        .find((session) => session.status === "active");

      if (activeSession?.startReading) {
        intervalId = setInterval(() => {
          const start = new Date(activeSession.startReading).getTime();
          const now = new Date().getTime();
          setElapsedTime(Math.floor((now - start) / 1000));
        }, 1000);
      }
    } else {
      setElapsedTime(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isReadingActive, progress]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return <div>Reading time: {formatTime(elapsedTime)}</div>;
};

export default ReadingTimer;
