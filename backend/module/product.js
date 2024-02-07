const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    CategoryName:{
        type:String
    },
    name: {
        type:String
    },
    img:{
        type:String
    },
    options:[
        {
            half:{
                type:String
            },
            full:{
                type:String
            }
        }
    ],
    description:{
        type:String
    }
})

const Product = new mongoose.model("Product" , productschema);
module.exports = Product