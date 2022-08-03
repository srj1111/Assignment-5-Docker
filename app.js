const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app = express();

mongoose.connect("mongodb://localhost:27017/sample",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected with mongodb")
}).catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

const productSchema = new mongoose.Schema({
name : String,
description : String,
price : Number,

})

const product = new mongoose.model("product",productSchema)

app.post("/api/v1/product/new",async(req , resp)=>{

const Product = await product.create(req.body);

resp.status(201).json({
    success:true,
    product 
})
})

app.get("/api/v1/products",async(req,resp)=>{
   const products = await product.find();
   resp.status(200).json({success:true,products})
})
app.put("/api/v1/product/:id",async(req,resp)=>{
    let Product = await product.findById(req.params.id)

    Product = await product.findByIdAndUpdate(req.params.id,req.body,{new:true,useFindAndModify:false,
    runValidators:true})
    resp.status(200).json({
        success:true,product
})

})
app.delete("/api/v1/product/:id",async(req,resp)=>{
    const Product = await product.findById(req.params.id);
    if(!Product){
        return resp.status(500).json({
            success:false,
            messege:"product not found"
        })
    }
    await product.remove();
    resp.status(200).json({
        success:true,
        message :"product deleted successfully"
    })

})
app.listen(4500,()=>{
console.log("server is working http://localhost:4500")

})
