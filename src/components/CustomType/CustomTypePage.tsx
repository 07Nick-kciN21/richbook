import React, { useState } from "react";
import { addType } from "../../db/db";
import TypeList from "./TypeSelect";

const CustomTypePage = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        const typeEntry = {
          name,
          pic: reader.result.toString(), // 将图片数据存储为 base64 URL
        };
        await addType(typeEntry);
        alert("Type uploaded successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Picture:
            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              accept="image/*"
              required
            />
          </label>
        </div>
        <button type="submit">Upload Type</button>
      </form>
      {TypeList()}
    </>
  );
};

export default CustomTypePage;
