import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import CryptoJS from "crypto-js";
import { FinancialEntry } from "../../../interface/financialentry";
import { typeEntry } from "../../../interface/financialentry";
import { Addprop } from "../../../interface/DateDetail";
import { addRecord } from "../../../db/recorddb";
import { getTypeEntries } from "../../../db/typedb";

import Select from "react-select";

const Add: React.FC<Addprop> = ({ setTrigger, date }) => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [typeEntries, setTypeEntries] = useState<typeEntry[]>([]);
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

  const handleSelectChange = async (selectedOption) => {
    console.log(selectedOption.value);
    setFormData({
      ...formData,
      ["type"]: selectedOption.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const entries = await getTypeEntries();
      setTypeEntries(entries);
    };

    fetchData();
  }, []);

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
      <div className="row align-items-center">
        <div className="col-md-6">
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
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="w-100">
            <Select
              options={typeEntries.map((entry) => ({
                value: entry.name,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={entry.pic}
                      alt={entry.name}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                    />
                    {entry.name}
                  </div>
                ),
              }))}
              onChange={handleSelectChange}
              placeholder="類別"
              name="type"
            />
          </div>
        </div>
      </div>

      <div className="row align-items-center mt-3">
        <div className="col-md-6">
          <p>金額</p>
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="cost"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="col-md-6">
          <p>備註</p>
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="remark"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <button type="button submit" class="btn btn-light">
            儲存
          </button>
          <button type="button" class="btn btn-dark">
            再記一筆
          </button>
        </div>
      </div>
    </form>
  );
};

export default Add;
