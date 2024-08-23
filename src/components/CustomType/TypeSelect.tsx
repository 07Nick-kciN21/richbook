import React, { useState, useEffect } from "react";
import { getTypeEntries } from "../../db/db";
import { typeEntry } from "../../interface/financialentry";
import Select from "react-select";
const TypeSelect = () => {
  const [typeEntries, setTypeEntries] = useState<typeEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const entries = await getTypeEntries();
      setTypeEntries(entries);
    };

    fetchData();
  }, []);
  const options = typeEntries.map((entry) => ({
    value: entry.name,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={entry.pic}
          alt={entry.name}
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
        {entry.name}
      </div>
    ),
  }));
  return (
    <Select options={options} isSearchable placeholder="Select an option" />
  );
};

export default TypeSelect;
