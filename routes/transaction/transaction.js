const express = require('express');
const router = express.Router();
const db = require("../../config/db");
const TransactionModel = require('../../models/transaction_model');

const transactionModel = new TransactionModel(db);

// authenticated user and user is admin can acces this 
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        // User is authenticated, proceed to the next middleware or routes
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
        res.json({ message: " Bad Credentials" }); // You can redirect to a login page, for example
    }
};

router.get("/getAllTransactions", isAuthenticated, async (req, res) => {
    const transactions = await transactionModel.getAllTransactions();
    console.log("book transactions" + transactions);
    res.send({ message: "Book transactions", list: transactions })
});

router.post("/getTransaction", async (req, res) => {
    const { transaction_id } = req.body;
    const copy = await transactionModel.getTransaction(transaction_id);
    console.log("book CopP" + copy);
    res.send({ message: "Book Copy", copy: copy })
});

router.post("/addTransaction", isAuthenticated, async (req, res) => {
    const { student_id, copy_id, admin_id, issue_date, return_date, status } = req.body;
    const copy = await transactionModel.addTransaction(student_id, copy_id, admin_id, issue_date, return_date, status);
    console.log("Added book copy" + copy);
    res.send({ message: "Added Book copy", copy: copy })
});

router.put("/updateTransaction", isAuthenticated, async (req, res) => {
    const { copy_id } = req.body;
    const copy = await transactionModel.updateTransaction(copy_id);
    console.log("Updated book copy" + copy);
    res.send({ message: "Updated Book copy", copy: copy })
});

router.delete("/deleteTransaction", isAuthenticated, async (req, res) => {
    const { transaction_id } = req.body;
    const copy = await transactionModel.deleteTransaction(transaction_id);
    console.log("Deleted book copy" + copy);
    res.send({ message: "Deleted Book copy", copy: copy })
});


const isStudent = (req, res, next) => {
    if (req.session && !req.session.isAdmin) {
        // User is authenticated, proceed to the next middleware or routes
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
        res.json({ message: " Bad Credentials" }); // You can redirect to a login page, for example
    }
};

router.get("/getStudentAllTransactions", isStudent, async (req, res) => {
    let student_id = req.session.user.student_id;
    const transactions = await transactionModel.getStudentAllTransactions(student_id);

    console.log(transactions+"of student_id"+student_id);
    res.json({ meassage: "transaction of user", list: transactions });
})


module.exports = router;