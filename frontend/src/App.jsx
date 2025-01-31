import React, { useState, useEffect } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import Auth from './components/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setShowAddMovie(false);
    setShowAuth(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie App
          </Typography>
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => setShowAddMovie(!showAddMovie)}
              >
                {showAddMovie ? 'View Movies' : 'Add Movie'}
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button 
              color="inherit" 
              onClick={() => setShowAuth(true)}
            >
              Login / Register
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {showAuth ? (
          <Auth onAuthSuccess={handleAuthSuccess} />
        ) : (
          isAuthenticated && showAddMovie ? (
            <AddMovie />
          ) : (
            <MovieList />
          )
        )}
      </Container>
    </Box>
  );
}

export default App;