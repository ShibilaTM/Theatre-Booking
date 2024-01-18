import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom'

const Login = () => {
  return (    
        <Box
          display='flex'
          flexDirection={'column'}
          maxWidth={400}
          marginTop={10}
          marginLeft={55}
          alignItems='center'
          justifyContent={'center'}
          padding={3}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
          sx={{
            ':hover': {
              boxShadow: '10px 10px 20px #ccc',
            },
            '@media (max-width: 600px)': {
              marginLeft: 0,
              marginTop: 10,
              padding: 2,
              fontSize: '14px',
            },
            backgroundColor: 'white',
          }}
        >
          <Typography sx={{ fontSize: '40px', color: 'darkred' }}>Login</Typography>
          <TextField placeholder='Email' type='text' sx={{ marginTop: '20px',width: '100%' }} />
          <TextField placeholder='Password' type='password' sx={{ marginTop: '10px',width: '100%' }} />
          <Button sx={{ marginTop: '10px',width: '100%', background:'rgb(252, 110, 28)',color:'white',':hover':{ color:'black', background:'lightblue'} }}>Login</Button>
          <Link to='/signup' style={{color: 'red', marginTop: '10px', cursor: 'pointer'}}>New user please register </Link>
          <Link to='/' style={{color: 'blue', marginTop: '10px', cursor: 'pointer'}}>Back to Home page </Link>
        </Box>
  );
};

export default Login;