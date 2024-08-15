import { FinancialEntry } from "../../../interface/financialentry";
import React, { useState, useEffect } from "react";
import { getRecordsByDate, deleteRecord } from "../../../db/db";
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
    setdateDatas(await getRecordsByDate(date));
  };

  const edit = (dateData: FinancialEntry) => {
    setEditData(dateData);
  };

  const del = async (dateData: FinancialEntry) => {
    deleteRecord(dateData.id);
    setTrigger((prev: boolean) => !prev);
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
          />
        )}
      </div>
    </>
  );
};

export default DayDetail;
