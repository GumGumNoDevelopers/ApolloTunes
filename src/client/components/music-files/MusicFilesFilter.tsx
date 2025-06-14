import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface MusicFilesFilterProps {
  fileTypes: Array<string>;
  value: string;
  onChange: (value: string) => void;
}

export const MusicFilesFilter: React.FC<MusicFilesFilterProps> = ({ fileTypes, value, onChange }) => (
  <FormControl sx={{ minWidth: 160 }}>
    <InputLabel id="file-type-label">File Type</InputLabel>
    <Select
      labelId="file-type-label"
      value={value}
      label="File Type"
      onChange={(e) => onChange(e.target.value)}
    >
      {fileTypes.map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
