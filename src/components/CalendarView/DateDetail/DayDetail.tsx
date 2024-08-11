import axios from "axios";
import { FinancialEntry } from "../CalendarView";
import React, { useState, useEffect } from "react";

const DayDetail = (trigger: boolean, date: string) => {
  const [dateDatas, setdateDatas] = useState<FinancialEntry[]>([]);
  const getDetail = async () => {
    setdateDatas([]);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/data/read/date/${date}`
      );
      const datas = response.data.datas;
      setdateDatas(datas);
    } catch (error) {
      console.log("Error fetching joke:");
    }
  };
  useEffect(() => {
    getDetail();
  }, [date, trigger]);
  return (
    <div className="datedetail">
      {dateDatas.length === 0 ? " No item" : null}
      {dateDatas.map((dateData, index) => (
        <div key={index} className={dateData.income_or_expenditure}>
          <div className="row border">
            <div className="item-row col-sm-8">
              <p>項目: {dateData.type}</p>
              <p>金額: {dateData.cost}</p>
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
