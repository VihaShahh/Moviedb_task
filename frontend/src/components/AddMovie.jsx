import React, { useState } from 'react';
import { addMovie } from '../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Rating
} from '@mui/material';

const genres = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Romance',
  'Thriller',
  'Documentary'
];

// add movies
function AddMovie() {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    releaseDate: '',
    genre: '',
    rating: 0,
    description: '',
    poster: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMovie(movie);
      // Clear form
      setMovie({
        title: '',
        director: '',
        releaseDate: '',
        genre: '',
        rating: 0,
        description: '',
        poster: ''
      });
      alert('Movie added successfully!');
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie. try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Movie
        </Typography>

        { <TextField
          required
          fullWidth
          label="Title"
          name="title"
          value={movie.title}
          onChange={handleChange}
          margin="normal"
        /> }

        <TextField
          required
          fullWidth
          label="Director"
          name="director"
          value={movie.director}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          required
          fullWidth
          type="date"
          label="Release Date"
          name="releaseDate"
          value={movie.releaseDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          fullWidth
          label="Genre"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          margin="normal"
        >
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          fullWidth
          label="Rating"
          name="rating"
          value={movie.rating}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={movie.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />

        <TextField
          fullWidth
          label="Poster URL"
          name="poster"
          value={movie.poster}
          onChange={handleChange}
          margin="normal"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Movie
        </Button>
      </Box>
    </Container>
  );
}

export default AddMovie;