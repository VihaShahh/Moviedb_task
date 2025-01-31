import React, { useState, useEffect } from 'react';
import { getAllMovies, getSortedMovies, updateMovie, deleteMovie, getSearchedMovies } from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';

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

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // get movies on current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const paginatedMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);


  const fetchMovies = async (sort = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = sort
        ? await getSortedMovies(sort)
        : await getAllMovies();

      setMovies(data);
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to fetch the movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  const fetchSearchedMovies = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);

      const query = searchQuery.trim();
      const data = query ? await getSearchedMovies(query) : await getAllMovies();

      setMovies(data);
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to fetch the movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (event) => {
    const value = event.target.value;
    setSortBy(value);
    if (value) {
      await fetchMovies(value);
    } else {
      await fetchMovies();
    }
  };
  useEffect(() => {
    if (searchQuery !== '') {
      fetchSearchedMovies(searchQuery);
    } else {
      fetchMovies();
    }
  }, [searchQuery]);
  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setEditedMovie({ ...movie });
    setEditDialog(true);
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setDeleteDialog(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await updateMovie(selectedMovie._id, editedMovie);
      await fetchMovies(sortBy);
      setEditDialog(false);
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update the movie');
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleDeleteConfirm = async () => {
    try {
      await deleteMovie(selectedMovie._id);
      await fetchMovies(sortBy);
      setDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete a movie');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
  <FormControl sx={{ minWidth: 200, mr: 2, height: '100%' }}>
    <InputLabel id="sort-select-label">Sort By</InputLabel>
    <Select
      labelId="sort-select-label"
      value={sortBy}
      label="Sort By"
      onChange={handleSortChange}
      sx={{ height: '100%' }}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="title">Title</MenuItem>
      <MenuItem value="rating">Rating</MenuItem>
      <MenuItem value="releaseDate">Release Date</MenuItem>
    </Select>
  </FormControl>
  <Box sx={{ flex: 1 }}>
    <input
      type="text"
      placeholder="Search by title"
      value={searchQuery}
      onChange={handleSearchChange}
      style={{
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        height: '100%',
      }}
    />
  </Box>
</Box>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="movies table">
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Rating</TableCell>
              {isAuthenticated && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMovies.map((movie) => (
              <TableRow key={movie._id}>
                <TableCell>
                  {movie.poster && (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{ width: "50px", height: "75px", objectFit: "cover" }}
                    />
                  )}
                </TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell>
                  {movie.releaseDate && format(new Date(movie.releaseDate), "MM/dd/yyyy")}
                </TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.rating}</TableCell>
                {isAuthenticated && (
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(movie)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(movie)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>

          

        </Table>
      </TableContainer>
      {movies.length > moviesPerPage && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          {editedMovie && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editedMovie.title}
                onChange={handleEditChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Director"
                name="director"
                value={editedMovie.director}
                onChange={handleEditChange}
                margin="normal"
              />
              <TextField
                fullWidth
                type="date"
                label="Release Date"
                name="releaseDate"
                value={editedMovie.releaseDate?.split('T')[0]}
                onChange={handleEditChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                fullWidth
                label="Genre"
                name="genre"
                value={editedMovie.genre || ''}
                onChange={handleEditChange}
                margin="normal"
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Rating"
                name="rating"
                value={editedMovie.rating}
                onChange={handleEditChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={editedMovie.description || ''}
                onChange={handleEditChange}
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="Poster URL"
                name="poster"
                value={editedMovie.poster || ''}
                onChange={handleEditChange}
                margin="normal"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Movie</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{selectedMovie?.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MovieList;