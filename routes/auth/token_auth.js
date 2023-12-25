const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secretKey = 'your-secret-key';
const accessTokenSecret = 'your-access-token-secret';
const refreshTokenSecret = 'your-refresh-token-secret';
const accessTokenLifetime = '1h';
const refreshTokenLifetime = '7d';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const users = [];
const revokedTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ username: user.username, id: user.id }, accessTokenSecret, {
    expiresIn: accessTokenLifetime,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ username: user.username, id: user.id }, refreshTokenSecret, {
    expiresIn: refreshTokenLifetime,
  });
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
  }

  const accessToken = token.replace('Bearer ', '');

  if (revokedTokens.includes(accessToken)) {
    return res.status(401).json({ error: 'Unauthorized: Access token has been revoked' });
  }

  jwt.verify(accessToken, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid access token' });
    }

    req.user = user;
    next();
  });
};

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);
  res.json({ accessToken, refreshToken });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid username or password' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.json({ accessToken, refreshToken });
});

router.post('/logout', (req, res) => {
    const refreshToken = req.headers['authorization'];
  
    if (!refreshToken) {
      return res.status(401).json({ error: 'Unauthorized: Refresh token is missing in headers' });
    }
  
    // Instead of destroying the refresh token, add it to the list of revoked tokens
    revokedTokens.push(refreshToken);
  
    res.json({ message: 'Logout successful' });
  });

router.post('/refresh-token', (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Unauthorized: Refresh token is missing' });
  }

  // Check if the refresh token has been revoked
  if (revokedTokens.includes(refreshToken)) {
    return res.status(401).json({ error: 'Unauthorized: Refresh token has been revoked' });
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid refresh token' });
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
