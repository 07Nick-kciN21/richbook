export interface MonthlySummary { 
    income: number; 
    expense: number;
}

export interface ExpenseRankingModule{
    name: string;
    value: number;
    totalCost: number;
    percent: string;
}