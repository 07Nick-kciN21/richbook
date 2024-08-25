import React, {
  FormEvent,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import { FinancialEntry } from "@interface/financialentry";
import { editRecord } from "@db/recorddb";
import { EditProps } from "@interface/DateDetail";
import { getTypeEntries } from "@db/typedb";
import { typeEntry } from "@interface/financialentry";
import Select from "react-select";

const Edit: React.FC<EditProps> = ({
  setAdd_or_Edit,
  setTrigger,
  editData,
}) => {
  // 用來偵測提交
  const [submit, setSubmit] = useState(false);
  // 用來偵測初次渲染
  const hasMounted = useRef(false);
  const [typeEntries, setTypeEntries] = useState<typeEntry[]>([]);
  const [formData, setFormData] = useState<FinancialEntry>({
    income_or_expenditure: editData.income_or_expenditure,
    date: editData.date,
    type: editData.type,
    cost: editData.cost,
    remark: editData.remark,
    id: editData.id,
  });
  const [selectData, setSelectData] = useState<typeEntry>();
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = async (selectedOption) => {
    setFormData({
      ...formData,
      ["type"]: selectedOption.value,
    });
    const newSelection = typeEntries.find(
      (entry) => entry.name === selectedOption.value
    );
    setSelectData(newSelection);
  };

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    hasMounted.current = true;
    setSubmit((prev: boolean) => !prev);
  };

  const Edit = async () => {
    await editRecord(formData);
    setAdd_or_Edit(true);
  };

  useEffect(() => {
    const fetchFormData = async () => {
      const entries = await getTypeEntries();
      setTypeEntries(entries);
      setSelectData(entries.find((entry) => entry.name === formData.type));
    };
    fetchFormData();
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      Edit();
      setTrigger((prev: boolean) => !prev);
    }
  }, [submit]);

  // 當點選不同資料的編輯時，Edit form會跟著改變
  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  return (
    <form className="Edit-form" onSubmit={handleSubmit}>
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
                      src={entry?.pic}
                      alt={entry?.name}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                    />
                    {entry?.name}
                  </div>
                ),
              }))}
              onChange={handleSelectChange}
              value={
                selectData
                  ? {
                      value: formData.type,
                      label: (() => {
                        return (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={selectData?.pic}
                              alt={selectData?.name}
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "10px",
                              }}
                            />
                            {selectData?.name}
                          </div>
                        );
                      })(),
                    }
                  : null
              }
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
            value={formData.cost}
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
            value={formData.remark}
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
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => {
              setAdd_or_Edit(true);
            }}
          >
            取消
          </button>
        </div>
      </div>
    </form>
  );
};

export default Edit;
