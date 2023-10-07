import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const SelectGender = ({ value, onChange }) => {
  const options = [
    {
      value: "Male",
      name: "Male",
    },
    {
      value: "Female",
      name: "Female",
    },
  ];
  // const [gender, setGender] = useState(options[0].value);
  const gender = value ? options[0].value : options[1].value;
  const genderOptions = options.map((i) => {
    return <MenuItem value={i.value}> {i.name}</MenuItem>;
  });

  // const handleChange = (e) => {
  //   setGender(e.target.value);
  // };

  return (
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={gender}
      onChange={onChange}
      label="Gender"
      style={{ height: "50px", marginTop: "7px" }}
    >
      {genderOptions}
    </Select>
  );
};

export default SelectGender;
