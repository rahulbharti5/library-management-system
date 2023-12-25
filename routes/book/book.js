const express = require('express');
const router = express.Router();
const db = require("../../config/db");
const BookModel = require('../../models/book/book_model');

const bookModel = new BookModel(db);

const book_categories = require("./book_category");
const book_copies = require("./book_copy");


router.get("/getAllBooks",async(req,res)=>{
     const books = await bookModel.getAllBooks();
     res.json({message:"All books",list:books});
});

// authenticated user and user is admin can acces this 
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        // User is authenticated, proceed to the next middleware or routes
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
       res.json({message:" Bad Credentials"}); // You can redirect to a login page, for example
    }
};

router.post("/addBook",isAuthenticated,async (req,res)=>{
    const {title, author, isbn, quantity, available_quantity, category_id} = req.body;
    const book =  await bookModel.addBook(title, author, isbn, quantity, available_quantity, category_id);
    res.json({ message: 'This is a protected route', book });
});

router.post("/getBook",async (req,res)=>{
    const {book_id} = req.body;
    const book = await bookModel.getBook(book_id);
    res.json({message:"goted book",book:book});
})


// using the cetogories and copy
router.use("/categories",book_categories);
router.use("/copies",book_copies);



module.exports = router;