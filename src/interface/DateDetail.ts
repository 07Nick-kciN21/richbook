import { FinancialEntry } from "./financialentry";

export interface Addprop {
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    date: string;
}
export interface EditProps {
    setAdd_or_Edit: React.Dispatch<React.SetStateAction<boolean>>;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    editData: FinancialEntry;
    date: string;
}

export interface DateDetailState {
    dateDatas: {
        id: string;
        date: string;
        type: string;
        income_or_expenditure: string;
        cost: number;
        remark: string;
    }[];
    pics: string[];
  }