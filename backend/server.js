const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./configs/mongoDb');
const authRouter = require('./routes/auth.routes');
const chatRouter = require('./routes/chat.routes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));