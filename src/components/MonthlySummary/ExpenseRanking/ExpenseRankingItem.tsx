import { ExpenseRankingModule } from "../../../interface/MonthlySummary";

const ExpenseRankingItem = (entry: ExpenseRankingModule, index: number) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9F4D95"];
  return (
    <div class="row align-items-center" style={{ color: COLORS[index % 5] }}>
      <div class="col-2">{index + 1}</div>
      <div class="col-3">{entry.name}</div>
      <div class="col-2">{entry.value}</div>
      <div class="col-2">{entry.percent + "%"}</div>
    </div>
  );
};

export default ExpenseRankingItem;
