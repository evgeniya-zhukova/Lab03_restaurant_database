const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/RestaurantRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose.connect('<PASTE YOUR MONGODB ATLAS COLLECTION STRING HERE>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(restaurantRouter);

app.listen(8081, () => { console.log('Server is running...') });