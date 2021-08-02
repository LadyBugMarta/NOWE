const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../Controllers/transactions');

router
    .route('/home')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/home/:id')
    .delete(deleteTransaction);

module.exports = router;