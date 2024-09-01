import React, { useState, useEffect } from "react";

import { typeEntry } from "../../interface/financialentry";
import { editTpye, deleteType } from "../../db/typedb";

interface EditProps {
  setSubTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  oldType: typeEntry | undefined;
}

const Edit: React.FC<EditProps> = ({ setSubTrigger, setEditForm, oldType }) => {
  const [formData, setFormData] = useState<typeEntry>({
    id: oldType.id,
    name: oldType.name,
    pic: oldType.pic,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editTpye(formData);
    setSubTrigger((prev: boolean) => !prev);
    setEditForm((prev: boolean) => !prev);
  };

  const deldata = async () => {
    await deleteType(formData.id);
    setEditForm((prev: boolean) => !prev);
    setSubTrigger((prev: boolean) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pic") {
      if (files) {
        const reader = new FileReader();
        reader.onload = async () => {
          if (reader.result) {
            setFormData({
              ...formData,
              [name]: reader.result.toString(),
            });
          }
        };
        reader.readAsDataURL(files[0]);
      }
    } else
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  return (
    <div className="border p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={formData.name}
            name="name"
            onChange={handleChange}
            placeholder="輸入類別名稱"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            id="categoryPic"
            name="pic"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3"></div>
        <div className="mb-3">
          {formData.pic && (
            <img
              src={formData.pic}
              alt={formData.name}
              style={{
                width: "50px",
                height: "50px",
                marginRight: "10px",
              }}
            />
          )}
        </div>
        <button type="button submit" className="btn btn-primary">
          編輯
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            deldata();
          }}
        >
          刪除
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => {
            setEditForm((prev: boolean) => !prev);
          }}
        >
          取消
        </button>
      </form>
    </div>
  );
};

export default Edit;
