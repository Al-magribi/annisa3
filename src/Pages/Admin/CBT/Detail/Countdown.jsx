import { Button } from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Countdown = () => {
  const { detail: exam } = useSelector((state) => state.detailExam);

  // COUNTDOWN
  const start = new Date(exam?.start).getTime();
  const end = new Date(exam?.end).getTime();
  const [timeLeft, setTimeLeft] = useState(start - end);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = end - now;

      if (timeRemaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(timeRemaining);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [end]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <Fragment>
      <Button variant="contained" color="error">
        <span style={{ width: "25px", display: "inline-block" }}>
          {hours.toString().padStart(2, "0")}:
        </span>
        <span style={{ width: "25px", display: "inline-block" }}>
          {minutes.toString().padStart(2, "0")}:
        </span>
        <span style={{ width: "25px", display: "inline-block" }}>
          {seconds.toString().padStart(2, "0")}
        </span>
      </Button>
    </Fragment>
  );
};

export default Countdown;
