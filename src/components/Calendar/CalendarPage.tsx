import React, { useState } from "react";

import Detail from "./Detail";
import Days from "./Calendar/Days";
import Header from "./Calendar/Header";
import Week from "./Calendar/Week";
import "./CalendarPage.css";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="calendar">
      {Header(currentMonth, setCurrentMonth)}
      {Week(currentMonth)}
      {Days(selectedDate, setSelectedDate, currentMonth)}
      {Detail(selectedDate.toLocaleDateString("en-CA"))}
    </div>
  );
};

export default CalendarPage;
