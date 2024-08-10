import React, { useState, useEffect } from "react";
import axios from "axios";

interface FinancialEntry {
  type: string | null;
  income_or_expenditure: string | null;
  cost: number | null;
  remark: string | null;
}

const Add = (date: string) => {
  const [income_or_expenditure, setIncome_or_Expenditure] =
    useState<string>("");
  const [type, setType] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [remark, setRemark] = useState<string>("");
  const [data, setData] = useState<FinancialEntry>();
  const addData = async (newdata: FinancialEntry) => {
    const response = await axios.post(
      `http://localhost:3000/api/data/add/date/${date}`,
      newdata
    );
    console.log(response.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      type: type,
      income_or_expenditure: income_or_expenditure,
      cost: cost,
      remark: remark,
    });
  };
  useEffect(() => {
    if (
      data &&
      !isNaN(Number(data.cost)) &&
      data.cost !== "" &&
      typeof data.income_or_expenditure === "string" &&
      data.income_or_expenditure !== "" &&
      typeof data.type === "string" &&
      data.type !== "" &&
      typeof data.remark === "string" &&
      data.remark !== ""
    ) {
      addData(data);
    }
  }, [data]);
  return (
    <form className="Add-form" onSubmit={handleSubmit}>
      <div
        className="btn-group income_or_expenditure"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          id="btnradio1"
          value="income"
          name="income_or_expenditure"
          className="btn-check"
          autocomplete="off"
          checked={income_or_expenditure === "income"}
          onChange={(e) => setIncome_or_Expenditure(e.target.value)}
        ></input>
        <label className="btn btn-outline-primary" for="btnradio1">
          收入
        </label>
        <input
          type="radio"
          id="btnradio2"
          value="expenditure"
          name="income_or_expenditure"
          className="btn-check"
          autocomplete="off"
          checked={income_or_expenditure === "expenditure"}
          onChange={(e) => setIncome_or_Expenditure(e.target.value)}
        ></input>
        <label className="btn btn-outline-primary" for="btnradio2">
          支出
        </label>
      </div>
      <div className="row row-cols-2">
        <p className="row">金額</p>
        <input
          type="text"
          name="cost"
          className="cost row"
          onChange={(e) => setCost(e.target.value)}
        ></input>
        <p className="row">類別</p>
        <input
          type="text"
          name="type"
          className="type row"
          onChange={(e) => setType(e.target.value)}
        ></input>
        <p className="row">備註</p>
        <input
          type="text"
          name="remark"
          className="remark row"
          onChange={(e) => setRemark(e.target.value)}
        ></input>
      </div>
      <>
        <button type="button submit" class="btn btn-light">
          儲存
        </button>
        <button type="button" class="btn btn-dark">
          再記一筆
        </button>
      </>
    </form>
  );
};

export default Add;
