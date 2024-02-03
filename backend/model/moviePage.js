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

    screens: [
        {
          name: String,
          screenType: String,
          showTime: [String],
          seatsAvailable: [{
            name:[String],
            number: String,
            price: Number,
          }],
          bookedSeats: [{
            name:[String],
            number: String,
            price: Number,
          }],
        },
    ],
      bookings: [
        {
        //   screenName: String,
          showTime: String,
          seats: [{
            avilableseatname:[String],
            number: String,
            price: Number,
          }],
          userEmail: String,
        },
      ],
 

});

const moviePage = mongoose.model('moviepage', moviePageSchema);
module.exports = moviePage;


    // screens:[{
    //     name: String,
    //     screenType:String ,
    //     showTime:[String] ,
    //     seats:[{
    //         row:String,           
    //         col:Number,
    //         seat_id: String,    
    //         price:Number,
    //     }],
    //     movieSchedules:[{
    //         showDate:Date,
    //         notavailableseats:[{
    //             row:String,           
    //             col:Number,
    //             seat_id: String,    
    //             price:Number,
    //         }],   
    //     }],   
    // }],
    // bookTickets:[{
    //     totalPrice:Number, 
    //     numberofTickets:Number, 
    //     paymentId:String,
    //     paymentType:String,
    //     userId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'userdata', // Reference to the User model
    //     }
    // }]