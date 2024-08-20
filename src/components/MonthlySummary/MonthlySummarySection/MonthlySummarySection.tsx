import { useEffect, useState } from "react";
import { MonthlySummary } from "../../../interface/MonthlySummary";
import { getIncomeAndExpensesbymonth } from "../../../db/db";

const MonthlySummarySection = (month: string) => {
  const [total, setTotal] = useState<MonthlySummary>({
    income: 0,
    expense: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIncomeAndExpensesbymonth(month);
      setTotal(data);
    };
    fetchData();
  }, [month]);
  return (
    <div className="MonthlySummarySection row">
      <div className="col">
        <div>
          <h3 style={{ color: "green" }}>{total?.income}</h3>
        </div>
        <div>
          <p>收入</p>
        </div>
      </div>
      <div className="col">
        <div>
          <h3 style={{ color: "red" }}>{total?.expense}</h3>
        </div>
        <div>支出</div>
      </div>
      <div className="col">
        <div>
          <h3
            style={{
              color: total.income - total.expense > 0 ? "green" : "red",
            }}
          >
            {total.income - total.expense}
          </h3>
        </div>
        <div>合計</div>
      </div>
    </div>
  );
};

export default MonthlySummarySection;
