import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
const Days = (
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
  currentMonth: Date
) => {
  // 這個月第一天的星期
  const monthStart = startOfMonth(currentMonth);
  // 這個月最後天的星期
  const monthEnd = endOfMonth(monthStart);
  // 這個月第一天所屬星期第一天的日期
  const startDate = startOfWeek(monthStart);
  // 這個月最後天的星期的最後天的日期
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          // 如果
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : selectedDate && isSameDay(day, selectedDate)
              ? "selected"
              : ""
          }`}
          key={day.toString()}
          // 點選時設置
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="number">{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="body">{rows}</div>;
};

export default Days;
