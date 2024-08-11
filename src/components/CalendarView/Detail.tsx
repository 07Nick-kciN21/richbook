import React, { useState } from "react";
import Add from "./DateDetail/Add";
import Edit from "./DateDetail/Edit";
import DayDetail from "./DateDetail/DayDetail";
import { FinancialEntry } from "./CalendarView";
const Detail = (date: string) => {
  return <div className="detail row">{DayDetail(date)}</div>;
};

export default Detail;
