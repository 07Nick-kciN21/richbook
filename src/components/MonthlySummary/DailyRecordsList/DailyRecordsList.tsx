import { useState, useEffect } from "react";
import "./DailyRecordItem.css";
import DailyRecordItem from "./DailyRecordItem";
import { DailyRecordsListModel } from "../../../interface/View";
import { getRecordsByMonth } from "../../../db/db";

const DailyRecordsList = (currentMonth: string) => {
  const [recordsList, setRecordsList] = useState<DailyRecordsListModel[]>([]);
  useEffect(() => {
    async function getRecords(month: string) {
      const getRecordbyMoth = await getRecordsByMonth(month);
      setRecordsList(getRecordbyMoth);
    }

    getRecords(currentMonth);
  }, [currentMonth]);
  return (
    <div className="row justify-content-center w-100">
      <div className="col-8 record-list">
        <ul>{recordsList.map((record) => DailyRecordItem(record))}</ul>
      </div>
    </div>
  );
};

export default DailyRecordsList;
