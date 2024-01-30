const express = require('express');
require('dotenv').config();

const chats = require('./data/chats');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res, next) => {
  res.end('Welcome to real time chat application');
});

app.get('/api/chats/', (req, res, next) => {
  res.json({
    success: true,
    message: "Chats Found",
    data: chats
  });
});

app.get('/api/chats/:id', (req, res, next) => {
  const chat = chats.find((c) => c._id === req.params.id);

  if (chat) {
    res.status(200).json({
      success: true,
      message: "Chat Found",
      data: chat
    });
  } else {
    res.status(410).json({
      success: false,
      message: "No Chat found of given Id!",
      data: {}
    });
  }
});

app.listen(PORT, console.log(`Server started on PORT: ${PORT}`))