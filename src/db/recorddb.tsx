import { dbPromise } from "./db";
import { getTypePicbyname } from "./typedb";
import { addDays, endOfMonth, startOfMonth } from "date-fns";
import { FinancialEntry, totalEntry } from "../interface/financialentry";

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
export const editRecord = async (item: FinancialEntry) => {
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
      const p = await getTypePicbyname(entry.type);
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
