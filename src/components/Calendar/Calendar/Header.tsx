import React from "react";
import { format, addDays } from "date-fns";

const Header = (
  currentMonth: Date,
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
) => {
  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };
  const dateFormat = "yyyy MMMM";
  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={() => prevMonth()}>
          &lt;
        </div>
      </div>
      <div className="col col-center">
        <span>{format(currentMonth, dateFormat)}</span>
      </div>
      <div className="col col-end" onClick={() => nextMonth()}>
        <div className="icon">&gt;</div>
      </div>
    </div>
  );
};

export default Header;
