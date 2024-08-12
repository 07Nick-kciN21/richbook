import axios from "axios";
import { FinancialEntry } from "../CalendarView";
import React, { useState, useEffect } from "react";
import Add from "./Add";
import Edit from "./Edit";
const DayDetail = (date: string) => {
  // 該日的所有資料
  const [dateDatas, setdateDatas] = useState<FinancialEntry[]>([]);
  // 編輯或新增
  const [add_or_edit, setAdd_or_Edit] = useState(true);
  // 新增資料時刷新detail的觸發器
  const [trigger, setTrigger] = useState(false);
  // 點選編輯時被編輯的資料
  const [editData, setEditData] = useState<FinancialEntry>();
  // 取得當日資料列表
  const getDetail = async () => {
    setdateDatas([]);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/data/read/date/${date}`
      );
      const datas = response.data.datas;
      setdateDatas(datas);
    } catch (error) {
      console.log("Error fetching joke:", error);
    }
  };

  const edit = (dateData: FinancialEntry) => {
    setEditData(dateData);
  };

  const del = async (dateData: FinancialEntry) => {
    try {
      await axios
        .post(`http://localhost:3000/api/data/delete/date/${date}`, dateData)
        .then((response) => {
          if (response.status == 200) {
            console.log("delete success");
            setTrigger((prev: boolean) => !prev);
          }
        });
    } catch (error) {
      console.log("Error fetching joke:", error);
    }
  };

  useEffect(() => {
    getDetail();
    setAdd_or_Edit(true);
  }, [date, trigger]);

  useEffect(() => {
    if (editData != undefined) {
      console.log(editData);
      setAdd_or_Edit(false);
    }
  }, [editData]);
  return (
    <>
      <div className="detail-item col-md-6">
        {dateDatas.length === 0 ? " No item" : null}
        {dateDatas.map((dateData, index) => (
          <div key={index} className={dateData.income_or_expenditure}>
            <div className="row border">
              <div className="item-row col-sm-8">
                <p>項目: {dateData.type}</p>
                <p>金額: {dateData.cost}</p>
              </div>
              <div className="edit_delete col-sm-4 row-cols-1">
                <button
                  onClick={() => {
                    edit(dateData);
                  }}
                >
                  編輯
                </button>
                <button
                  onClick={() => {
                    del(dateData);
                  }}
                >
                  刪除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-6">
        {add_or_edit ? (
          <Add setTrigger={setTrigger} date={date} />
        ) : (
          <Edit
            setAdd_or_Edit={setAdd_or_Edit}
            setTrigger={setTrigger}
            editData={editData}
            date={date}
          />
        )}
      </div>
    </>
  );
};

export default DayDetail;
