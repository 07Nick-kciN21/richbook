import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  PieLabelRenderProps,
} from "recharts";
import { PieChartformat } from "../../../interface/Chart";
import { getTotalPercentbymonth } from "../../../db/db";

const PieAnalysis = (month: string, I_E: string) => {
  const [data, setData] = useState<PieChartformat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTotalPercentbymonth(month, I_E);
      setData(result);
    };

    fetchData();
  }, [month]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9F4D95"];
  const renderCustomizedLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    const radius =
      Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={Number(x) > Number(cx) ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 1).toFixed(0)}%`}
      </text>
    );
  };
  return data.length === 0 ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style="width: 300px; height: 300px;"
    >
      <p>No data can display</p>
    </div>
  ) : (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        labelLine={false}
        label={renderCustomizedLabel} // 使用自定义的 label 函数
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => `${value}`} />
      <Legend layout="vertical" align="right" verticalAlign="middle" />{" "}
      {/* 添加图例 */}
    </PieChart>
  );
};

export default PieAnalysis;
