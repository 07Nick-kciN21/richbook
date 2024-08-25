import { dbPromise } from "./db";
import { typeEntry } from "../interface/financialentry";

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

export const deleteType = async (name: string) => {
  const db = await dbPromise;
  db.delete("typeClusters2", name);
};
