const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url : {
        type : String,
        // required : true
    },
})
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    image: ImageSchema,
    wordsGuessed: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ],
    streaks : {
        type: Number,
        default: 0
    },
    score : {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', UserSchema);