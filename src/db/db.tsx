// db.ts
import {
  FinancialEntry,
  typeEntry,
  financeDB,
} from "../interface/financialentry";
import { openDB, DBSchema } from "idb";

const dbPromise = openDB<financeDB>("my-database", 1, {
  upgrade(db) {
    db.createObjectStore("recordClusters", {
      keyPath: "id",
    });
    db.createObjectStore("typeClusters", {
      keyPath: "id",
    });
  },
});

export const addRecord = async (item: FinancialEntry) => {
  const db = await dbPromise;
  await db.add("recordClusters", item);
};

export const getRecords = async () => {
  const db = await dbPromise;
  return db.getAll("recordClusters");
};

export const getRecordsByDate = async (date: string) => {
  const db = await dbPromise;
  const allRecords = await db.getAll("recordClusters");
  return allRecords.filter((record) => record.date === date);
};

export const deleteRecord = async (id: string) => {
  const db = await dbPromise;
  await db.delete("recordClusters", id);
};

export const editItem = async (item: FinancialEntry) => {
  const db = await dbPromise;
  await db.put("recordClusters", item);
};
