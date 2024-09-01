import { dbPromise } from "./db";
import { typeEntry } from "../interface/financialentry";

export const addType = async (item: typeEntry) => {
  const db = await dbPromise;
  await db.add("typeClusters", item);
};

export const getType = async (id: number) => {
  const db = await dbPromise;
  const result = await db.get("typeClusters", id);
  return result;
};

export const getTypeNamebyId = async (
  id: number
): Promise<string | undefined> => {
  const db = await dbPromise;

  // Fetch the type entry by ID from typeClusters
  const typeEntry = await db.get("typeClusters", id);

  // If the typeEntry exists, return its name
  return typeEntry ? typeEntry.name : undefined;
};

export const getTypePicbyname = async (name: string) => {
  const db = await dbPromise;
  const alltype = await db.getAll("typeClusters");
  const result = alltype.find((x) => x.name === name);
  return result?.pic;
};

// 获取所有 `typeEntry`
export const getTypeEntries = async () => {
  const db = await dbPromise;
  return db.getAll("typeClusters");
};

export const deleteType = async (id: number) => {
  const db = await dbPromise;
  db.delete("typeClusters", id);
};

export const editTpye = async (item: typeEntry) => {
  const db = await dbPromise;
  db.put("typeClusters", item);
};
