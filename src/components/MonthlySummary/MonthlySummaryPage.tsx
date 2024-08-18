import React, { useState } from "react";
import BarAnalysis from "./ChartAnalysis/BarAnalysis";
import DailyRecordsList from "./DailyRecordsList/DailyRecordsList";
import PieAnalysis from "./ChartAnalysis/PieAnalysis";
import MonthlySummarySection from "./MonthlySummarySection/MonthlySummarySection";

import "./MonthlySummaryPage.css";
const MonthlySummaryPage = () => {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
    });
  });
  return (
    <div className="MonthlySummary row">
      <div className="col-8">
        {BarAnalysis(currentMonth)}
        {DailyRecordsList(currentMonth)}
      </div>
      <div className="col-4">
        {PieAnalysis(currentMonth)}
        {MonthlySummarySection(currentMonth)}
      </div>
    </div>
  );
};

export default MonthlySummaryPage;
