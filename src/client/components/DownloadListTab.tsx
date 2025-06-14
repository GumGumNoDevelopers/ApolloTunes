import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DownloadListTab: React.FC = () => {
  const [todos, setTodos] = useState<{ title: string; artist: string }[]>([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && artist.trim()) {
      setTodos([...todos, { title, artist }]);
      setTitle("");
      setArtist("");
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Songs Download List
      </Typography>
      <Box component="form" onSubmit={handleAdd} sx={{ mb: 2, display: "flex", gap: 2 }}>
        <TextField
          label="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Song Title</TableCell>
              <TableCell>Artist Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, idx) => (
              <TableRow key={idx}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.artist}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DownloadListTab;