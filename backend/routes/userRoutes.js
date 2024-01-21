const express = require('express');
const cors = require('cors');
const User = require('../model/userData');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(cors());
router.use(express.json()); // Add this line to parse JSON requests

//Signup

router.post('/add', async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = new User({ name, email, password});
        const userSave = await user.save();
        return res.status(200).json({message:'Successfully Registered' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (user) {
            // Compare the provided password with the hashed password stored in the database
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (isPasswordCorrect) {
                // Create a payload with relevant information
                const payload = { email: user.email, userId: user._id };

                // Sign the payload to generate a JWT token
                const token = jwt.sign(payload, 'theatreBookingKey'); // Replace 'yourSecretKey' with your actual secret key

                // Return the token in the response
                return res.status(200).json({ status: 'success', message: 'Login successful', token: token });
            } else {
                return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            }
        } else {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

module.exports = router;

