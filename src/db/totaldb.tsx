import { dbPromise } from "./db";
import { addDays, endOfMonth, startOfMonth } from "date-fns";
import { FinancialEntry } from "../interface/financialentry";
import { getTypeNamebyId, getTypePicbyname } from "./typedb";

export const getTotalbydate = async (date: string) => {
  const db = await dbPromise;
  return await db.get("totalCluster", date);
};

export const getTotalbymonth = async (month: string) => {
  let day = startOfMonth(month);
  const lastday = endOfMonth(month);
  let datas = [];
  while (day <= lastday) {
    const data = await getTotalbydate(day.toLocaleDateString("en-CA"));
    if (data) {
      datas.push(data);
    } else {
      // 如果没有数据，可以选择推入一个默认值
      datas.push({
        name: day.toLocaleDateString("en-CA"),
        income: 0,
        expenditure: 0,
      });
    }
    day = addDays(day, 1);
  }
  return datas;
};

export const getIncomeAndExpensesbymonth = async (month: string) => {
  const db = await dbPromise;
  const allRecords = await db.getAll("recordClusters");
  const filteredRecords = allRecords.filter((record) =>
    record.date.startsWith(month)
  );
  const IncomeAndExpense = { income: 0, expense: 0 };
  filteredRecords.forEach((record: FinancialEntry) => {
    const { income_or_expenditure, cost } = record;
    if (income_or_expenditure === "income") {
      IncomeAndExpense.income += Number(cost);
    } else {
      IncomeAndExpense.expense += Number(cost);
    }
  });
  return IncomeAndExpense;
};

export const getTotalPercentbymonth = async (month: string, I_E: string) => {
  // [{name:"飲食", value:20}]
  const db = await dbPromise;
  const allRecords = await db.getAll("recordClusters");
  const filteredRecords = allRecords.filter((record) =>
    record.date.startsWith(month)
  );
  const filteredRecordsbyI_E = filteredRecords.filter(
    (record) => record.income_or_expenditure === I_E
  );
  // 初始化一个对象来保存每个 type 的总和
  const totalCostByType: { [key: string]: number } = {};
  let totalCost = 0;
  // 遍历所有记录，按 type 累加 cost
  for (const record of filteredRecordsbyI_E) {
    const { type, cost } = record;

    // Convert type ID to type name asynchronously
    const typename = await getTypeNamebyId(type);

    if (typename) {
      if (!totalCostByType[typename]) {
        totalCostByType[typename] = 0;
      }

      totalCostByType[typename] += Number(cost);
    } else {
      console.warn(`Type ID ${type} not found.`);
    }

    totalCost += Number(cost);
  }

  // 将结果转换为所需格式
  const result = Object.entries(totalCostByType).map(([name, value]) => ({
    name,
    value,
    totalCost: totalCost,
    percent: ((value / totalCost) * 100).toFixed(2),
  }));
  result.sort((a, b) => b.value - a.value);
  console.log(result);
  return result;
};
