// authRoutes.js
const chalk = require('chalk');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../../../config/db");

const StudentModel = require('../../../models/student_model');

const studentModel = new StudentModel(db);

router.post('/signup', async(req, res) => {
    const { roll_number,full_name,email,username, password,branch,year,address } = req.body;
    
    const user = await studentModel.getUserByUserName(username);
    // Check if the username is already taken
    if (user) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const hashed_password = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await studentModel.createUser(roll_number,full_name,email,username,hashed_password,branch,year,address);

    req.session.user = newUser; // Automatically log in the user after signup
    req.session.isAdmin = false;
    res.json({ message: 'Signup successful', user: newUser });
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password is correct
    const user = await studentModel.getUserByUserName(username);

    if (user) {
        console.log(chalk.red(user.password));
        const passwordMatch = await bcrypt.compare(password, user.hashed_password);
        if (passwordMatch) {
            // Authentication successful
            req.session.user = user; // Log in the user
            req.session.isAdmin = false;
            res.json({ message: 'Login successful', user });
          }

    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid username or password' });
    }
});


const isAuthenticated = (req, res, next) => {
    if (req.session && !req.session.isAdmin) {
        // User is authenticated, proceed to the next middleware or route
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
       res.json({message:" Bad Credentials"}); // You can redirect to a login page, for example
    }
};

router.get('/profile', isAuthenticated, (req, res) => {
    const student = req.session.user;
    res.status(200);
    res.json({ message: 'This is a admin protected route', student});
});

router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
});

module.exports = router;
