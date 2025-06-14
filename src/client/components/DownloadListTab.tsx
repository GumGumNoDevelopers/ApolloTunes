import React, { useState, useEffect } from "react";
import axios from "axios";
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
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DownloadTodo {
  id: number;
  title: string;
  artist: string;
}

const DownloadListTab: React.FC = () => {
  const [todos, setTodos] = useState<DownloadTodo[]>([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  // Fetch todos from API on mount
  useEffect(() => {
    axios
      .get("/api/songs/download-list")
      .then((res) => setTodos(res.data));
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && artist.trim()) {
      axios
        .post("/api/songs/download-list", {
          title: title.trim(),
          artist: artist.trim(),
        })
        .then((res) => {
          // Assuming the API returns the updated download list)
          setTodos(res.data); // Assumes API returns updated list
          setTitle("");
          setArtist("");
        })
        .catch((err) => {
          // Handle error as needed
          console.error("Failed to add to download list", err);
        })
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/songs/download-list/${id}`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Failed to delete from download list", err));
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
              <TableCell>ID</TableCell>
              <TableCell>Song Title</TableCell>
              <TableCell>Artist Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.artist}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DownloadListTab;