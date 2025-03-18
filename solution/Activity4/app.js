require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authMiddleware = require('./middleware/authentication');
// routers
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');
const categoriesRouter = require('./routes/categories');
const bodyParser = require('body-parser');
// error handler

// Middleware
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('<h1>Todos API</h1>');
// });

// routes
app.use('/', authRouter);
app.use('/todos', authMiddleware, todosRouter);
app.use('/categories', authMiddleware, categoriesRouter);


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
