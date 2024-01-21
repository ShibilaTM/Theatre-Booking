import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
    const [user,setUser] = useState({
      email:'',
      password:''
    })
    const navigate = useNavigate()
    const inputHandler = (e)=>{
      setUser({...user,
        [e.target.name]:e.target.value
      })
    }

    const addHandler = async (e) => {
      try {
        // const { email, password } = user; // Extract only the required fields
        await axios.post('http://127.0.0.1:4000/user/login', user)
          .then((response) => {
            navigate('/user');
            toast.success(response.data.message, { position: 'top-center' });
          });
      } catch (error) {
        toast.error('Email or password is incorrect', { position: 'top-center' });
      }
    };
    
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
          <TextField placeholder='Email' onChange={inputHandler} type='text' sx={{ marginTop: '20px',width: '100%' }} />
          <TextField placeholder='Password' onChange={inputHandler}  type='password' sx={{ marginTop: '10px',width: '100%' }} />
          <Button onClick={addHandler} sx={{ marginTop: '10px',width: '100%', background:'rgb(252, 110, 28)',color:'white',':hover':{ color:'black', background:'lightblue'} }}>Login</Button>
          <Link to='/signup' style={{color: 'red', marginTop: '10px', cursor: 'pointer'}}>New user please register </Link>
          <Link to='/' style={{color: 'blue', marginTop: '10px', cursor: 'pointer'}}>Back to Home page </Link>
        </Box>
  );
};

export default Login;