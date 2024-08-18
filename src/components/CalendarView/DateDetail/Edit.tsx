import React, {
  FormEvent,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import { FinancialEntry } from "../../../interface/financialentry";
import { editItem } from "../../../db/db";
import { EditProps } from "../../../interface/DateDetail";
const Edit: React.FC<EditProps> = ({
  setAdd_or_Edit,
  setTrigger,
  editData,
}) => {
  // 用來偵測提交
  const [submit, setSubmit] = useState(false);
  // 用來偵測初次渲染
  const hasMounted = useRef(false);

  const [formData, setFormData] = useState<FinancialEntry>({
    income_or_expenditure: editData.income_or_expenditure,
    date: editData.date,
    type: editData.type,
    cost: editData.cost,
    remark: editData.remark,
    id: editData.id,
  });
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    hasMounted.current = true;
    setSubmit((prev: boolean) => !prev);
  };

  const Edit = async () => {
    await editItem(formData);
    setAdd_or_Edit(true);
  };

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
      <div className="row row-cols-2">
        <p className="row">金額</p>
        <input
          type="text"
          name="cost"
          value={formData.cost}
          className="row"
          onChange={handleChange}
        ></input>
        <p className="row">類別</p>
        <input
          type="text"
          name="type"
          value={formData.type}
          className="row"
          onChange={handleChange}
        ></input>
        <p className="row">備註</p>
        <input
          type="text"
          name="remark"
          value={formData.remark}
          className="row"
          onChange={handleChange}
        ></input>
      </div>
      <>
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
      </>
    </form>
  );
};

export default Edit;
