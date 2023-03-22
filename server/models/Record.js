const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    recordName: {
        type: String,
        required: true,
        minLength: [2, "Record name should be at least 2 characters !"]
    }, 
    artist: {
        type: String,
        required: true,
        minLength: [5, "Artist should be at least 5 characters !"]
    }, 
    description: {
        type: String,
        required: true,
        minLength: [5, "Description should be at least 5 characters !"]
    }, 
    year: {
        type: Number,
        required: true,
        min: [1950, "Year should be at greater then 1950 and less then 2024 !"],
        max: [2023, "Year should be at greater then 1950 and less then 2024 !"]
    }, 
    imageUrl: {
        type: String,
        required: true,
        validate : {
            validator: function (value){
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "Invalid URL!"
        }
    }, 

    rpm: {
        type: String,
        required: true,
       // minLength: [3, "Too short! Genre should be at least 3 characters !"]
    }, 
    genre: {
        type: String,
        required: true,
        //minLength: [3, "Too short! Genre should be at least 3 characters !"]
    }, 
    likes: {
        type: Number,
        required: true,
        default: 0
        //minLength: [3, "Too short! Genre should be at least 3 characters !"]
    }, 
    wishingList:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
    // createdAt: {
    //     type: Date, default: Date.now
    // },
}, { timestamps: true })

const Record = mongoose.model('Record', recordSchema)
module.exports = Record