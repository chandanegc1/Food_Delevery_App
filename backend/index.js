const express = require("express");
const app = express();
require("./db/connection");
const Product = require("./module/product");
const User = require("./module/user")
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.post("/" , async (req , res) =>{
    try {
        let storedata = new Product({
            name:req.body.name,
            description: req.body.description,
            value:req.body.value,
            type:req.body.type,
            price:req.body.price,
            img:req.body.img
        });

        let savedata = await storedata.save();
        console.log(savedata)
        res.status(200).send(savedata);
    } catch (error) {
        console.log("error");
        res.status(400).send();  
    }
})
app.get("/", async (req , res)=>{
    try {
        let apidata = await Product.find();
        res.send(apidata);
    } catch (error) {
        console.log("error");
    }
   
})

app.post("/signup" , async(req , res)=>{
    try {
        let storedata = new User({
            name:req.body.name,
            email: req.body.email,
            password:req.body.password,
            location:req.body.location,
        });

        let savedata = await storedata.save();
        console.log(savedata)
        res.status(200).send(savedata);
    } catch (error) {
        console.log("error");
        res.status(400).send();  
    }
})
app.listen(3002, ()=>{
    console.log("connection su ccesfull..");
});