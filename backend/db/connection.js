const mongoose = require("mongoose");
const main = async () =>{
    // mongodb+srv://chandanegc1:btut2xWDImtoZd0N@cluster1.i8fjadn.mongodb.net/?retryWrites=true&w=majority
    await mongoose.connect('mongodb://127.0.0.1:27017' , ({
         useNewUrlParser: true,
         useUnifiedTopology: true,
         }));
 }
 main().then(()=>{
     console.log("mongoose connected");
 })
 .catch((err)=>{
     console.log("error generated")
 })