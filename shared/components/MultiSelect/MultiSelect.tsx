import React from "react";

import Select, { StylesConfig } from "react-select";

import { IMultiSelectProps } from "./MultiSelect.interfaces";

const customStyles: StylesConfig<{ value: string; label: string }, true> = {
  placeholder: (provided) => ({
    ...provided,
    color: "#9CA3AF",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#374151",
  }),
};

const MultiSelect: React.FC<IMultiSelectProps> = ({ options, value, onChange, placeholder }) => (
  <Select
    isMulti
    options={options}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    styles={customStyles}
    className="mt-1 block w-full text-black"
  />
);

export default MultiSelect;
