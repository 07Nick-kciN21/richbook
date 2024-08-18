// db.ts
import { addDays, endOfMonth, startOfMonth } from "date-fns";
import {
  FinancialEntry,
  typeEntry,
  totalEntry,
  financeDB,
} from "../interface/financialentry";

import { openDB } from "idb";

const dbPromise = openDB<financeDB>("my-database", 3, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("recordClusters")) {
      db.createObjectStore("recordClusters", {
        keyPath: "id",
      });
    }
    if (!db.objectStoreNames.contains("typeClusters")) {
      db.createObjectStore("typeClusters", {
        keyPath: "id",
      });
    }
    if (!db.objectStoreNames.contains("totalCluster")) {
      db.createObjectStore("totalCluster", {
        keyPath: "name",
      });
    }
  },
});

// void
export const addRecord = async (item: FinancialEntry) => {
  const db = await dbPromise;
  const date = item.date;
  const total = await db.get("totalCluster", date);
  await db.add("recordClusters", item);
  if (total) {
    // 更新现有的 totalEntry
    if (item.income_or_expenditure === "income") {
      total.income += Number(item.cost);
    } else if (item.income_or_expenditure === "expenditure") {
      total.expenditure += Number(item.cost);
    }
    await db.put("totalCluster", total);
  } else {
    // 创建新的 totalEntry
    const newTotal: totalEntry = {
      name: date,
      income: item.income_or_expenditure === "income" ? Number(item.cost) : 0,
      expenditure:
        item.income_or_expenditure === "expenditure" ? Number(item.cost) : 0,
    };
    await db.add("totalCluster", newTotal);
  }
};

// void
export const deleteRecord = async (id: string) => {
  const db = await dbPromise;
  const record = await db.get("recordClusters", id);

  if (!record) return;
  const month = record.date.substring(0, 7);
  const total = await db.get("totalCluster", month);

  if (total) {
    if (record.income_or_expenditure === "income") {
      total.income -= record.cost;
    } else if (record.income_or_expenditure === "expenditure") {
      total.expenditure -= record.cost;
    }
    await db.put("totalCluster", total);
  }
  await db.delete("recordClusters", id);
};

// void
export const editItem = async (item: FinancialEntry) => {
  const db = await dbPromise;
  const record = await db.get("recordClusters", item.id);
  if (!record) return;
  const date = item.date;
  const total = await db.get("totalCluster", date);

  if (total) {
    if (record.income_or_expenditure === "income") {
      total.income -= record.cost;
      total.income += Number(item.cost);
    } else if (record.income_or_expenditure === "expenditure") {
      total.expenditure -= record.cost;
      total.expenditure += Number(item.cost);
    }
    await db.put("totalCluster", total);
  }
  await db.put("recordClusters", item);
};

// FinancialEntry[]
export const getRecords = async () => {
  const db = await dbPromise;
  return db.getAll("recordClusters");
};

// FinancialEntry[]
export const getRecordsByDate = async (date: string) => {
  const db = await dbPromise;
  const allRecords = await db.getAll("recordClusters");
  return allRecords.filter((record) => record.date === date);
};

// RecordsByMonth
export const getRecordsByMonth = async (month: string) => {
  let day = startOfMonth(month);
  const lastday = endOfMonth(month);
  let Records = [];
  while (day <= lastday) {
    const date = day.toLocaleDateString("en-CA");
    const data = await getRecordsByDate(date);
    Records.push({
      date: date,
      data: data,
    });
    day = addDays(day, 1);
  }

  return Records;
};

export const getRecordsByYear = async (year: string) => {
  const db = await dbPromise;
  const allRecords = await db.getAll("recordClusters");
  // 过滤出符合指定月份的记录
  const filteredRecords = allRecords.filter((record) =>
    record.date.startsWith(year)
  );

  return filteredRecords.sort(
    (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
  );
};

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

export const getTotalPercentbymonth = async (month: string) => {
  // [{name:"飲食", value:20}]
  const db = await dbPromise;
  const allRecords = await db.getAll("recordClusters");
  const filteredRecords = allRecords.filter((record) =>
    record.date.startsWith(month)
  );
  // 初始化一个对象来保存每个 type 的总和
  const totalCostByType: { [key: string]: number } = {};
  let totalCost = 0;
  // 遍历所有记录，按 type 累加 cost
  filteredRecords.forEach((record: FinancialEntry) => {
    const { income_or_expenditure, type, cost } = record;
    if (income_or_expenditure === "income") {
      return;
    }
    if (!totalCostByType[type]) {
      totalCostByType[type] = 0;
    }

    totalCostByType[type] += Number(cost);
    totalCost += Number(cost);
  });

  // 将结果转换为所需格式
  const result = Object.entries(totalCostByType).map(([name, value]) => ({
    name,
    value,
    totalCost: totalCost,
    percentage: ((value / totalCost) * 100).toFixed(2),
  }));
  return result;
};
