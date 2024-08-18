import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

import { getTotalPercentbymonth } from "../../../db/db";

const PieAnalysis = (month: string) => {
  const [data, setData] = useState([]);
  const RADIAN = Math.PI / 180;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTotalPercentbymonth(month);
      setData(result);
    };

    fetchData();
  }, [month]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${data[index].name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        labelLine={false}
        label={renderCustomizedLabel} // 使用自定义的 label 函数
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => `${value}`} />
    </PieChart>
  );
};

export default PieAnalysis;
