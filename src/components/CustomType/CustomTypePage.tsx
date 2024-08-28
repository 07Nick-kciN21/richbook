import React, { useEffect, useState } from "react";
import { getTypeEntries, getType } from "../../db/typedb";
import "./CustomTypePage.css";
import { typeEntry } from "../../interface/financialentry";
import Add from "./Add";
import Edit from "./Edit";

const CustomTypePage = () => {
  const [subTrigger, setSubTrigger] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [types, setTypes] = useState<typeEntry[]>();
  const [editType, setEditType] = useState<typeEntry>();

  const editClick = async (type: typeEntry) => {
    setEditType(type);
  };

  useEffect(() => {
    const fetchData = async () => {
      const types = await getTypeEntries();
      setTypes(types);
    };
    fetchData();
  }, [subTrigger]);

  useEffect(() => {
    if (editType != undefined) {
      setEditForm(true);
    }
  }, [editType]);

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
          {/* 編輯類別的表單 */}
          {editForm && (
            <Edit
              key={editType.id}
              oldType={editType}
              setSubTrigger={setSubTrigger}
              setEditForm={setEditForm}
            />
          )}
          {/* 新增類別的表單 */}
          {showForm && (
            <Add
              key={showForm} // 当 showForm 改变时，重新渲染 Add 组件
              setSubTrigger={setSubTrigger}
              setShowForm={setShowForm}
              typeId={types ? types.length : 0}
            />
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
                    onClick={() => editClick(type)}
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
