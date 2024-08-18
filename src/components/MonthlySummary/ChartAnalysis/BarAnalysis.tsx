import React, { useEffect, useState } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
} from "recharts";

import { getTotalbymonth, getTotalPercentbymonth } from "../../../db/db";
import { totalEntry } from "../../../interface/financialentry";

const ChartAnalysis = (month: string) => {
  const [data, setData] = useState<totalEntry[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTotalbymonth(month);
      setData(result);
    };

    fetchData();
  }, [month]);

  return (
    <ComposedChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="income" barSize={5} fill="red" />
      <Bar dataKey="expenditure" barSize={5} fill="green" />
    </ComposedChart>
  );
};

export default ChartAnalysis;
