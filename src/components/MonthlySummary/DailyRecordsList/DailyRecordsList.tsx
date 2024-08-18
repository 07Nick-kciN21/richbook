import React, { useState, useEffect } from "react";
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
    <div>
      <h2>Daily Records for {currentMonth}</h2>
      <ul className="record-list">
        {recordsList.map((record) => DailyRecordItem(record))}
      </ul>
    </div>
  );
};

export default DailyRecordsList;
