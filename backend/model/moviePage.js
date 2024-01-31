const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviePageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    potraitImgUrl: {
        type: String,
        required: true
    },
    landScapeImgUrl: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    languages: {
        type: [String], // Define languages as an array of strings
        required: true
    },
    type:{
        type: String,
        required: true 
    },
    duration: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releasedate: {
        type: String,
        required: true
    },

    cast: [{
        celebType:String,
        celebName:String,
        celebRole:String,
        celebImage:String
    }],
    screens:[{
        name: String,
        screenType:String     
    }],
    movieSchedules:[{
        showTime:String,
        showDate:Date,
        seats:[{
            row:String,           
            col:Number,
            seat_id: String,    
            price:Number,
        }],   
    }],
    bookTickiets:[{
        totalPrice:Number, 
        numberofTickets:Number,
        paymentId:String,
        paymentType:String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userdata', // Reference to the User model
        }
    }]
 

});

const moviePage = mongoose.model('moviepage', moviePageSchema);
module.exports = moviePage;
