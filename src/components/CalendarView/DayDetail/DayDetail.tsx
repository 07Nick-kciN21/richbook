import axios from "axios";
import React, { useState, useEffect } from "react";

// Define the type for individual financial entries
interface FinancialEntry {
  type: string;
  income_or_expenditure: string;
  cost: number;
  remark: string;
}

const DayDetail = (day: string) => {
  const [dayDatas, setdayDatas] = useState<FinancialEntry[]>([]);
  const getDetail = async () => {
    setdayDatas([]);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/data/read/date/${day}`
      );
      const datas = response.data.datas;
      setdayDatas(datas);
    } catch (error) {
      console.log("Error fetching joke:");
    }
  };
  useEffect(() => {
    getDetail();
  }, [day]);
  return (
    <div className="daydetail">
      {dayDatas.length === 0 ? " No item" : null}
      {dayDatas.map((dayData, index) => (
        <div key={index} className={dayData.income_or_expenditure}>
          <div className="row border">
            <div className="item-row col-sm-8">
              <p>項目: {dayData.type}</p>
              <p>金額: {dayData.cost}</p>
            </div>
            <div className="edit_delete col-sm-4 row-cols-1">
              <button>編輯</button>
              <button>刪除</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayDetail;
