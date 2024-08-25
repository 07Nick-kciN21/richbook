import React, { useEffect, useState } from "react";
import { addType, getTypeEntries, deleteType } from "@db/typedb";
import "./CustomTypePage.css";
import { Type, typeEntry } from "@interface/CustomTypePage";

const CustomTypePage = () => {
  const [subTrigger, setSubTrigger] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);
  const [newType, setNewType] = useState<Type>({ name: "", pic: null });
  const [types, setTypes] = useState<typeEntry[]>();

  useEffect(() => {
    const fetchData = async () => {
      const types = await getTypeEntries();
      setTypes(types);
    };
    fetchData();
  }, [subTrigger]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newType.pic) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        const typeEntry = {
          name: newType.name,
          pic: reader.result.toString(), // 将图片数据存储为 base64 URL
        };
        try {
          await addType(typeEntry);
        } catch (error) {
          alert(`Type uploaded failed\n${error}`);
        }
      }
    };
    reader.readAsDataURL(newType.pic);
    await setSubTrigger((prev: boolean) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pic") {
      if (files) {
        setNewType({
          ...newType,
          [name]: files[0],
        });
      }
    } else
      setNewType({
        ...newType,
        [name]: value,
      });
  };

  const editClick = async (name: string) => {
    await deleteType(name);
    await setSubTrigger((prev: boolean) => !prev);
  };

  return (
    <div className="container mt-4">
      <h3>自訂義類別</h3>
      <div className="row">
        {/* 左半部分：上傳新類別按鈕與表單 */}
        <div className="col-md-6">
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowForm(!showForm)}
          >
            上傳新類別
          </button>

          {/* 新增類別的表單 */}
          {showForm && (
            <div className="border p-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label">
                    類別名稱
                  </label>
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
                  <label htmlFor="categoryPic" className="form-label">
                    上傳圖標
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="categoryPic"
                    name="pic"
                    onChange={handleChange}
                  />
                </div>
                <button type="button submit" className="btn btn-primary">
                  新增類別
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setShowForm(false)}
                >
                  取消
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 右半部分：已上傳的類別 */}
        <div className="col-md-6">
          <h4>已上傳的類別</h4>
          <div className="row typeList">
            {types
              ? types.map((type, index) => (
                  <button
                    key={index}
                    className="col-md-4 d-flex align-items-center mb-3 typeItem"
                    onClick={() => editClick(type.name)}
                  >
                    {type.pic && (
                      <img
                        src={type.pic}
                        alt={type.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    <span>{type.name}</span>
                  </button>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTypePage;
