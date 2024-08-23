import { FinancialEntry } from "./financialentry";

export interface DailyRecordItemModel{
    date: string;
    data: FinancialEntry[];
    pic: string[];
}

export interface DailyRecordsListModel{
    date: string;
    data: FinancialEntry[];
}