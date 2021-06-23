const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'Rohit',
    email: 'rohitku@leewayhertz.com'
  }

  jwt.sign({user}, 'secretkey',(err, token) => {
    res.json({
      token
    });
  });
});

function verifyToken(req, res, next) {

  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    
    const bearerToken = bearer[1];
    
    req.token = bearerToken;
    
    next();
  } else {

    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));