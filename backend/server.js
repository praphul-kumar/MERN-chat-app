const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./configs/mongoDb');
const authRouter = require('./routes/auth.routes');
const chatRouter = require('./routes/chat.routes');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);

app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));


app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});