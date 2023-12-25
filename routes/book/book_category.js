const express = require('express');
const router = express.Router();
const db = require("../../config/db");
const BookCategoryModel = require('../../models/book/book_category_model');

const bookCategories = new BookCategoryModel(db);

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

router.get("/getAllCategories",async (req,res)=>{
    const categories = await bookCategories.getAllBookCategory();
    res.send({categories:categories});
})

router.post("/addCategory", isAuthenticated, async (req,res)=>{
    const {name} = req.body;
    const category = await bookCategories.addBookCategory(name);
    console.log("Category Added Successfully");
    res.json({message:"Category Added Successfully",category:category});
});
router.get("/getCategory",async (req,res)=>{
    const {category_id} = req.body;
    const category = await bookCategories.getBookCategory(category_id);
    console.log("geted Added Successfully");
    res.json({message:"Category Goted Successfully",category:category});
});

router.put("/updateCategory",isAuthenticated,async (req,res)=>{
    const {category_id,newValue} = req.body;
    const category = await bookCategories.updateBookCategory(category_id,newData);
    console.log("geted Updated Successfully");
    res.json({message:"Category Updated Successfully",category:category});
});
router.delete("/deleteCategory",isAuthenticated,async (req,res)=>{
    const {category_id} = req.body;
    const category = await bookCategories.deleteBookCategory(category_id);
    console.log("deleted Added Successfully");
    res.json({message:"Category deleted Successfully",category:category});
});


module.exports = router;