const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  address: {
    building: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0){
         throw new Error("Negative building number is not possible.");
      }
    }
  },
  street: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  zipcode: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0){
         throw new Error("Negative zipcode is not possible.");
      }
    }
  }},
  city:{
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  cuisine: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  restaurant_id: { 
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0){
         throw new Error("Negative ID is not possible.");
      }
    }
  },
});

//Declare Virtual Fields
RestaurantSchema.virtual('fullname')
              .get(function(){
                return `${this.firstname} ${this.lastname}`
              })
              .set(function(value){
                //Set values as needed
              })

//Custome Schema Methods
//1. Instance Method Declaration
RestaurantSchema.methods.getFullName = function(){
  console.log(`Full Name : ${this.firstname} ${this.lastname}`)
  return `${this.firstname} ${this.lastname}`
}

//2. Static method declararion
RestaurantSchema.statics.getRestaurantByFirstName = function(value){
  return this.find({firstname : value})
}


/*
RestaurantSchema.pre('save', true, (next) => {
  console.log("Before Save")
  //next();
});
*/

RestaurantSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

RestaurantSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

RestaurantSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

RestaurantSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;