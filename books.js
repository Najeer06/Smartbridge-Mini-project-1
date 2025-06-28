const express=require('express');
const router=express.Router();
const Book=require('../models/Book');


router.get('/',async(req,res)=>{
    const books=await Book.find();
    res.json(books);
});

router.get('/:id',async (req,res)=>{
    try{
        const book=await Book.findById(req.params.id);
        if (!book) return res.status(404).json({message:"book not Found"});
        res.json(book);
    }catch(err){
        res.status(500).json({error : "invalid Id"});
    }
});

router.post('/',async (req,res) =>{
    const newBook=new Book(req.body);
    const savedBook=await newBook.save();
    res.status(201).json(savedBook);
});

router.put('/:id',async (req,res)=>{
    try{
        const updated=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (!updated) return res.status(404).json({message:"Book not found"});
        res.json(updated);
    }catch(err){
        res.status(500).json({error:"update Failed"});
    }
});

router.delete("/:id",async (req,res)=>{
    try{
        const deleted=await Book.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({message:"Book not found"});
        res.json({message:"Book deleted"});
    }catch(err){
        res.status(500).json({error:'Delete failed'});
    }
})



module.exports =router ;
