import { FinancialEntry } from "./financialentry";

export interface DailyRecordItemModel{
    date: string;
    data: FinancialEntry[];
}

export interface DailyRecordsListModel{
    date: string;
    data: FinancialEntry[];
}