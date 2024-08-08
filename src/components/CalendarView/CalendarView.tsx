import React, { useState } from "react";
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
import DayDetail from "./DayDetail/DayDetail";
import Add from "./DayDetail/Add";
import "./CalendarView.css";

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // 生成星期
  const renderDays = () => {
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

  // 生成日期格
  const renderCells = () => {
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

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="detail row">
        <div className="col-md-6">
          {DayDetail(selectedDate.toLocaleDateString("en-CA"))}
        </div>
        <div className="col-md-6">{Add()}</div>
      </div>
    </div>
  );
};

export default CalendarView;
