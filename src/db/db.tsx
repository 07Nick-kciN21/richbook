// db.ts
import { addDays, endOfMonth, startOfMonth } from "date-fns";
import {
  FinancialEntry,
  totalEntry,
  typeEntry,
  financeDB,
} from "../interface/financialentry";

import { openDB } from "idb";

const dbPromise = openDB<financeDB>("my-database", 5, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("recordClusters")) {
      db.createObjectStore("recordClusters", {
        keyPath: "id",
      });
    }
    if (!db.objectStoreNames.contains("typeClusters2")) {
      db.createObjectStore("typeClusters2", {
        keyPath: "name",
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
  const total = await db.get("totalCluster", record.date);

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
  const allRecords = await db.getAll("recordClusters");
  let pic: string[] = allRecords.map((element) => element.type);

  // 创建一个返回对象
  let data_pic = {
    data: allRecords,
    pic: pic,
  };

  return data_pic;
};

// FinancialEntry[]
export const getRecordsByDate = async (date: string) => {
  const db = await dbPromise;
  const allRecords = await db.getAll("recordClusters");
  const allRecordsByDate = allRecords.filter((record) => record.date === date);
  // 使用 Promise.all 确保所有图片异步加载完成
  const pics: string[] = await Promise.all(
    allRecordsByDate.map(async (entry) => {
      const p = await getType(entry.type);
      return p;
    })
  );
  // 创建一个返回对象
  let data_pic = {
    data: allRecordsByDate,
    pics: pics,
  };

  return data_pic;
};

// RecordsByMonth
export const getRecordsByMonth = async (month: string) => {
  let day = startOfMonth(month);
  const lastday = endOfMonth(month);
  let Records = [];
  while (day <= lastday) {
    const date = day.toLocaleDateString("en-CA");
    const { data, pics } = await getRecordsByDate(date);
    Records.push({
      date: date,
      data: data,
      pic: pics,
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
  filteredRecordsbyI_E.forEach((record: FinancialEntry) => {
    const { type, cost } = record;
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
    percent: ((value / totalCost) * 100).toFixed(2),
  }));
  result.sort((a, b) => b.value - a.value);
  return result;
};

export const addType = async (typeEntry: typeEntry) => {
  const db = await dbPromise;
  await db.add("typeClusters2", typeEntry);
};

export const getType = async (name: string) => {
  const db = await dbPromise;
  const result = await db.get("typeClusters2", name);

  return result?.pic;
};

// 获取所有 `typeEntry`
export const getTypeEntries = async () => {
  const db = await dbPromise;
  return db.getAll("typeClusters2");
};
