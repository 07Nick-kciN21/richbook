import { useEffect, useState } from "react";
import "./ExpenseRanking.css";
import ExpenseRankingItem from "./ExpenseRankingItem";
import { getTotalPercentbymonth } from "../../../db/totaldb";
import { ExpenseRankingModule } from "../../../interface/MonthlySummary";
const ExpenseRanking = (month: string, I_E: string) => {
  const [data, setData] = useState<ExpenseRankingModule[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTotalPercentbymonth(month, I_E);
      setData(result);
    };
    fetchData();
  }, [month]);
  return (
    <div>
      <h2>支出類別排行</h2>
      <div className="ExpenseRanking container">
        <div class="row align-items-start">
          <div class="col-2">#</div>
          <div class="col-3">類別</div>
          <div class="col-2">金額</div>
          <div class="col-2">比例</div>
        </div>
        {data.map((entry, index) => ExpenseRankingItem(entry, index))}
      </div>
    </div>
  );
};

export default ExpenseRanking;
