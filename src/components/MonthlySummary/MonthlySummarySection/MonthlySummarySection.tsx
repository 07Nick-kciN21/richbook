import React, { useEffect, useState } from "react";
import { MonthlySummary } from "../../../interface/MonthlySummary";
import { getIncomeAndExpensesbymonth } from "../../../db/db";

const MonthlySummarySection = (month: string) => {
  const [total, setTotal] = useState<MonthlySummary>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIncomeAndExpensesbymonth(month);
      setTotal(data);
    };
    fetchData();
  }, [month]);
  return (
    <div>
      <div>Income:{total?.income}</div>
      <div>Expense:{total?.expense}</div>
    </div>
  );
};

export default MonthlySummarySection;
