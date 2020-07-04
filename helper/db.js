const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb://localhost/movie-api",{useUnifiedTopology: true, useNewUrlParser: true});
    
    mongoose.connection.on("open",()=>{
        console.log("baglandik amk");
    });

    mongoose.connection.on("error",(err)=>{
        console.log("cafer sicti ",err);
    });
};