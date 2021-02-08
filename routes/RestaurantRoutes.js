const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

//Read ALL
//http://localhost:8081/restaurants
app.get('/restaurants', async (req, res) => {
  //const restaurants = await restaurantModel.find({});
  //Sorting
  //use "asc", "desc", "ascending", "descending", 1, or -1
  //const restaurants = await restaurantModel.find({}).sort({'firstname': -1});
  
  //Select Specific Column
  const restaurants = await restaurantModel.find({})
              //.select("cuisine")
              //.sort({'salary' : 'desc'});    
  try {
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Search By cuisine - PATH Parameter
//http://localhost:8081/restaurants/cuisine/Japanese
//http://localhost:3000/restaurants/cuisine/Bakery
//http://localhost:3000/restaurants/cuisine/Italian
app.get('/restaurants/cuisine/:name', async (req, res) => {
  const name = req.params.name
  const restaurants = await restaurantModel.find({cuisine : name});
  //const restaurants = await restaurantModel.getRestaurantByCuisine(name)
  
  //Using Virtual Field Name
  //console.log(restaurants[0].cuisine)
  
  try {
    if(restaurants.length != 0){
      res.send(restaurants);
    }else{
      res.send(JSON.stringify({status:false, message: "No data found"}))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//http://localhost:8081/restaurant?sortBy=ASC
//http://localhost:8081/restaurant?sortBy=DESC
app.get('/restaurant', async (req, res) => {
  if(Object.keys(req.query).length != 1){
    res.send(JSON.stringify({status:false, message: "Insufficient query parameter"}))
  }else{
    const sort = req.query.sortBy
  
    //const restaurants = await restaurantModel.find({salary : {$gte : salary}});
    //const restaurants = await restaurantModel.find({}).where("salary").gte(salary);
    const restaurants = await restaurantModel.find({}).select("name city cuisine restaurant_id").sort({'restaurant_id' : sort});    ;
    
    try {
      if(restaurants.length != 0){
        res.send(restaurants);
      }else{
        res.send(JSON.stringify({status:false, message: "No data found"}))
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

//Some more test queries
//http://localhost:8081/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {
  try {
    const restaurants = restaurantModel.find({})
                        .where('cuisine').equals('delicatessen')
                        .where('city').ne("Brooklyn")
                        //.where('firstname').in(['pritesh', 'moksh'])
                        //.limit(10)
                        //.sort('-salary')
                        .sort({'name' : 'asc'})
                        .select('cuisine name city')//.ne("_id")
                        .exec((err, data) => {
                          if (err){
                              res.send(JSON.stringify({status:false, message: "No data found"}));
                          }else{
                              res.send(data);
                          }
                        });
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = app

//Create New Record
/*
    //Sample Input as JSON
    //application/json as Body   
    {"_id":
      {"$oid":"60206fe446b7b747df24833c"},
      "address":{
        "building":"555",
        "street":"Fontana Street",
        "zipcode":null
      },
      "city":"Brooklyn",
      "cuisine":"Japanese",
      "name":"Wasabi Sushi",
      "restaurant_id":"40398000"}
    }
*/