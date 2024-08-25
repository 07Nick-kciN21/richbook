// db.ts
import { financeDB } from "../interface/financialentry";

import { openDB } from "idb";

export const dbPromise = openDB<financeDB>("my-database", 5, {
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
