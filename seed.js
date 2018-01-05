// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var cars = [
{make: "Nissan", model: "370z", year: 2015},
{make: "Nissan", model: "GTR", year: 2010},
{make: "Ford", model: "Mustang", year: 2017}
];

db.Cars.create(cars, function(err, car){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new cars", cars._id);
  process.exit(); // we're all done! Exit the program.
});
