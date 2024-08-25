import React from "react";
import { format, addMonths } from "date-fns";

const SwitchMonth = (
  currentMonth: string,
  setCurrentMonth: React.Dispatch<React.SetStateAction<string>>
) => {
  const nextMonth = () => {
    const fetchMonth = (Month: string) => {
      return addMonths(Month, 1).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
      });
    };
    setCurrentMonth(fetchMonth(currentMonth));
  };

  const prevMonth = () => {
    const fetchMonth = (Month: string) => {
      return addMonths(Month, -1).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
      });
    };
    setCurrentMonth(fetchMonth(currentMonth));
  };
  const renderHeader = () => {
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
  return <div>{renderHeader()}</div>;
};

export default SwitchMonth;
