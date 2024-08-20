import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import CryptoJS from "crypto-js";
import { FinancialEntry } from "../../../interface/financialentry";
import { Addprop } from "../../../interface/DateDetail";
import { addRecord } from "../../../db/db";
const Add: React.FC<Addprop> = ({ setTrigger, date }) => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [formData, setFormData] = useState<FinancialEntry>({
    income_or_expenditure: "income",
    date: date,
    type: "",
    cost: 0,
    remark: "",
    id: "",
  });

  function generateGUID(date: string) {
    const timestamp = Date.now();
    const combinedString = date + timestamp;
    const hash = CryptoJS.SHA256(combinedString).toString(CryptoJS.enc.Hex);
    return hash;
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubmit((prev: boolean) => !prev);
  };

  const addData = async (newdata: FinancialEntry) => {
    newdata.id = generateGUID(date);
    newdata.date = date;
    await addRecord(newdata);
    setTrigger((prev: boolean) => !prev);

    // console.log(response.data);
  };

  useEffect(() => {
    if (
      formData &&
      !isNaN(Number(formData.cost)) &&
      formData.cost !== 0 &&
      typeof formData.income_or_expenditure === "string" &&
      formData.income_or_expenditure !== "" &&
      typeof formData.type === "string" &&
      formData.type !== "" &&
      typeof formData.remark === "string" &&
      formData.remark !== ""
    ) {
      addData(formData);
    }
    // console.log(formData);
  }, [submit]);
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
          checked={formData.income_or_expenditure === "income"}
          onChange={handleChange}
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
          checked={formData.income_or_expenditure === "expenditure"}
          onChange={handleChange}
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
          className="row"
          onChange={handleChange}
        ></input>
        <p className="row">類別</p>
        <input
          type="text"
          name="type"
          className="row"
          onChange={handleChange}
        ></input>
        <p className="row">備註</p>
        <input
          type="text"
          name="remark"
          className="row"
          onChange={handleChange}
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
