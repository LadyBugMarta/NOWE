const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const transactions = require('./Routes/transactions');
const auth = require('./Routes/auth');
const { authMiddleware } = require('./Middleware/auth');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/auth', auth);
app.use('/api/v1/transactions', authMiddleware, transactions);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000; 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

