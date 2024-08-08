// Define the type for individual financial entries
interface FinancialEntry {
  type: string;
  income_or_expenditure: string;
  cost: number;
  remark: string;
}

// Define the overall data type, where each date maps to a DayDetailData object
interface Data {
  [date: string]: FinancialEntry[];
}

// Import the data and assume the structure
import data from "./data/datas.json";

const DayDetail = (day: string) => {
  const dayData = (data as Data)[day];
  if (!dayData) {
    return <div className="daydetail">No data available</div>;
  }
  return (
    <>
      {Object.entries(dayData).map(([key, value]) => (
        <div key={key} className={value.income_or_expenditure}>
          <div className="row">
            <div className="item-row col-sm-8">
              <p>項目: {value.type}</p>
              <p>金額: {value.cost}</p>
              <p>備註: {value.remark}</p>
            </div>
            <div className="edit_delete col-sm-4 row-cols-1">
              <button>編輯</button>
              <button>刪除</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DayDetail;
