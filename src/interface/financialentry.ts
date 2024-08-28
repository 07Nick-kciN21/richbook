import { DBSchema } from "idb";

export interface FinancialEntry {
  id: string;
  date: string;
  type: string;
  income_or_expenditure: string;
  cost: number;
  remark: string;
}

export interface typeEntry {
  id:number;
  name: string;
  pic: string;
}

export interface totalEntry{
  name: string;
  income: number;
  expenditure: number;
}



export interface financeDB extends DBSchema {
  recordClusters: {
    key: string;
    value: FinancialEntry;
  };
  typeClusters: {
    key: number;
    value: typeEntry;
  };
  totalCluster: {
    key:string;
    value: totalEntry;
  }
}