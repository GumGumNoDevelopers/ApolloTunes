import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export type DuplicateFilterOption = "all" | "only" | "none";

interface DuplicateFilterSelectProps {
  value: DuplicateFilterOption;
  onChange: (value: DuplicateFilterOption) => void;
}

export const DuplicateFilterSelect: React.FC<DuplicateFilterSelectProps> = ({ value, onChange }) => (
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel id="duplicate-filter-label">Duplicates</InputLabel>
    <Select
      labelId="duplicate-filter-label"
      value={value}
      label="Duplicates"
      onChange={(e) => onChange(e.target.value as DuplicateFilterOption)}
    >
      <MenuItem value="all">Show All</MenuItem>
      <MenuItem value="only">Only Duplicates</MenuItem>
      <MenuItem value="none">No Duplicates</MenuItem>
    </Select>
  </FormControl>
);