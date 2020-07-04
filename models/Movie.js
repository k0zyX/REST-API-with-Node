const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    category:{
        type:String
    },
    country:{
        type:String
    },
    year:Number,
    imdb_score:Number,
    director_id:Schema.Types.ObjectId
});

module.exports = mongoose.model("movie",MovieSchema);