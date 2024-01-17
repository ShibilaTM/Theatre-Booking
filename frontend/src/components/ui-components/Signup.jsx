import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {

//   const [user,setUser] =useState({
     
//       name:'',
//       email:'',
//       password:'',
//       confirmpassword:''
//   })
//   const [errors,setErrors] = useState({
//     name:'',
//     email:'',
//     password:'',
//     confirmpassword:''
//   })
//   const inputHandler= (e)=>{
//     setUser({...user,
//       [e.target.name]:e.target.value,
//     })
//     setErrors({
//         ...errors,
//         [e.target.name]:'',

//     })
//   }
//   const validateEmail = (email)=>{
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   }
//   const validatePassword = (password)=>{
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/.test(password);
//   }
//   const validateConfirm = (confirmpassword)=>{
//     return confirmpassword === user.password
//   }

//   const addHandler = async (e) => {
//     let isValid = true;
//     const newErrors = {};
  
//     if (!validateEmail(user.email)) {
//       newErrors.email = 'Invalid Email address';
//       isValid = false;
//     }
  
//     if (!validatePassword(user.password)) {
//       newErrors.password = 'Password must be 8-12 characters and include at least one uppercase letter, one lowercase letter, and one digit';
//       isValid = false;
//     }
  
//     if (!validateConfirm(user.confirmpassword)) {
//       newErrors.confirmpassword = 'Password does not match';
//       isValid = false;
//     }
  
//     setErrors(newErrors);
  
//     if (isValid) {
   
  
//       axios.post('http://127.0.0.1/4000/user/add', user)
//         .then((res) => {
//           alert('Successfully registered');
//         })
//         .catch((error) => {
//           console.log('Error in axios request', error);
//           if (error.response) {
//             console.error('Server responded with status code:', error.response.status);
//             alert('Already registered');
//             console.error('Response data:', error.response.data);
//           }
//         });
//     }
//   };
  

  return (
    <Box
      display='flex'
      flexDirection={'column'}
      maxWidth={400}
      marginTop={10}
      marginLeft={55}
      alignItems='center'
      background='rgb(78, 77, 77)'
      padding={3}
      borderRadius={5}
      boxShadow={'5px 5px 10px #ccc'}
      sx={{
        ':hover': {
          boxShadow: '10px 10px 20px #ccc',
        },
        '@media (max-width:600px)': {
          marginLeft: 0,
          marginTop: 10,
          padding: 2,
          fontSize: '14px',
        },
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" component="div" sx={{ fontSize: '24px', color: 'darkred' }}>
        Sign Up
      </Typography>
    
      
      <TextField label="Name" name='name'  variant="outlined" sx={{ width: '100%', marginTop: '20px' }} />
      <TextField label="Email" name='email'  variant="outlined" sx={{ width: '100%', marginTop: '10px' }} />
      <TextField label="Password" name='password'  type="password" variant="outlined" sx={{ width: '100%', marginTop: '10px' }} />
      <Button variant="contained"  sx={{ width: '100%', marginTop: '20px', background: 'rgb(252, 110, 28)', color: 'white', ':hover': { background: 'lightblue',color:'black' } }}>
        Register
      </Button>
      <Link to='/login' style={{color: 'black', marginTop: '10px', cursor: 'pointer'}}>Already registered go to login</Link>
    </Box>
  );
};

export default Signup;