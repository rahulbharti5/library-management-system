// authRoutes.js
const chalk = require('chalk');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const { dbPool } = require("../../config/db");

const router = express.Router();


const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutes
    expiration: 86400000, // 1 day
}, dbPool);

// Configure the session middleware
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}));

// Dummy user data (replace with your user database)
const users = [];

router.post('/signup', async(req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    if (users.find((u) => u.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = { id: users.length + 1, username, hashedPassword };
    
    users.push(newUser);

    req.session.user = newUser; // Automatically log in the user after signup
    req.session.isAuthenticated = true;
    res.json({ message: 'Signup successful', user: newUser });
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password is correct
    const user = users.find((u) => u.username === username );

    if (user) {
        console.log(chalk.red(user.password));
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (passwordMatch) {
            // Authentication successful
            req.session.user = user; // Log in the user
            req.session.isAuthenticated = true;
            res.json({ message: 'Login successful', user });
          }

    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid username or password' });
    }
});


const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        // User is authenticated, proceed to the next middleware or route
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
       res.json({message:" Bad Credentials"}); // You can redirect to a login page, for example
    }
};

router.get('/profile', isAuthenticated, (req, res) => {
    const user = req.session.user;
    res.json({ message: 'This is a protected route', user, users: users });
});

router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
});

module.exports = router;
