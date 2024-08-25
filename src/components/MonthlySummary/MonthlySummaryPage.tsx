import { useState } from "react";
import BarAnalysis from "./ChartAnalysis/BarAnalysis";
import DailyRecordsList from "./DailyRecordsList/DailyRecordsList";
import PieAnalysis from "./ChartAnalysis/PieAnalysis";
import MonthlySummarySection from "./MonthlySummarySection/MonthlySummarySection";
import ExpenseRanking from "./ExpenseRanking/ExpenseRanking";
import SwitchMonth from "./SwitchMonth/SwitchMonth";
import "./MonthlySummaryPage.css";

const MonthlySummaryPage = () => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
    });
  });
  return (
    <div className="MonthlySummary row">
      <div className="col-6">
        {BarAnalysis(currentMonth)}
        {MonthlySummarySection(currentMonth)}
        {DailyRecordsList(currentMonth)}
      </div>
      <div className="col-6 ">
        {SwitchMonth(currentMonth, setCurrentMonth)}
        {PieAnalysis(currentMonth, "expenditure")}
        {ExpenseRanking(currentMonth, "expenditure")}
      </div>
    </div>
  );
};

export default MonthlySummaryPage;
