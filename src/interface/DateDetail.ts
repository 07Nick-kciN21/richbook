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
    dateDatas: FinancialEntry[];
    pics: string[];
  }