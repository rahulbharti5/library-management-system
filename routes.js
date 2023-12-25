
const express = require('express');
const router = express.Router();
const db = require("./config/db");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const auth = require("./routes/auth/auth");
const auth1 = require("./routes/auth/session_auth");

const book = require("./routes/book/book");
const transaction = require("./routes/transaction/transaction");

const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutes
    expiration: 86400000, // 1 day
}, db);

// Configure the session middleware
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}));


router.use("/auth",auth);
router.use("/book",book);
router.use("/transaction",transaction);

router.use("/auth1",auth1);

module.exports = router;
