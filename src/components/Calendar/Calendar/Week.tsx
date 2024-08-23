import React from "react";
import { startOfWeek, format, addDays } from "date-fns";

const Week = (currentMonth: Date) => {
  const dateFormat = "EEEE";
  const days = [];

  let startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col col-center" key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

export default Week;
