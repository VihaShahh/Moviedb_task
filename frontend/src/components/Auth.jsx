import React, { useState } from 'react';
import { login, register } from '../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Tab,
  Tabs
} from '@mui/material';

function Auth({ onAuthSuccess }) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const isLogin = tab === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await login({ email: formData.email, password: formData.password })
        : await register(formData);

      if (response.token) {
        localStorage.setItem('token', response.token);
        onAuthSuccess();
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert(isLogin ? 'Login failed' : 'Registration failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Movie App
        </Typography>

        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {!isLogin && (
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
          )}

          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Auth;