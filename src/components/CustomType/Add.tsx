import React, { useEffect, useState } from "react";
import { addType } from "../../db/typedb";
import { typeEntry } from "../../interface/CustomType";
import CryptoJS from "crypto-js";
import "./CustomTypePage.css";

interface AddProps {
  setSubTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add: React.FC<AddProps> = ({ setSubTrigger, setShowForm }) => {
  const [newType, setNewType] = useState<typeEntry>({
    name: "",
    pic: null,
  });

  function generateGUID(name: string) {
    const timestamp = Date.now();
    const combinedString = name + timestamp;
    const hash = CryptoJS.SHA256(combinedString).toString(CryptoJS.enc.Hex);
    return hash;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedType = {
      ...newType,
      id: generateGUID(newType.name),
    };
    setNewType(updatedType);
    if (!newType.pic) {
      alert("Please select a file.");
      return;
    } else {
      try {
        await addType(updatedType);
      } catch (error) {
        alert(`Type uploaded failed\n${error}`);
      }
    }
    setSubTrigger((prev: boolean) => !prev);
    setShowForm((prev: boolean) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pic") {
      if (files) {
        const reader = new FileReader();
        reader.onload = async () => {
          if (reader.result) {
            setNewType({
              ...newType,
              [name]: reader.result.toString(),
            });
          }
        };
        reader.readAsDataURL(files[0]);
      }
    } else
      setNewType({
        ...newType,
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
        <div className="mb-3">
          {newType.pic && (
            <img
              src={newType.pic}
              alt={newType.name}
              style={{
                width: "50px",
                height: "50px",
                marginRight: "10px",
              }}
            />
          )}
        </div>
        <button type="button submit" className="btn btn-success">
          新增
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => {
            setShowForm((prev: boolean) => !prev);
          }}
        >
          取消
        </button>
      </form>
    </div>
  );
};

export default Add;
