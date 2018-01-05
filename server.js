// require express and other modules
var express = require('express'),
app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

 var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

 app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

 app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/chadkeeven/express_self_api/README.md", 
    base_url: "https://fast-shore-20500.herokuapp.com/",
    endpoints: [
    {method: "GET", path: "/api", description: "Describes all available endpoints"},
    {method: "GET", path: "/api/chadkeeven", description: "Data about me"}, 
    {method: "GET", path: "/api/cars", description: "Shows all cars"},
    {method: "GET", path: "/api/cars/:id", description: "Show car by id"},
    {method: "POST", path: "/api/cars/", description: "Creates a new car"},
    {method: "PUT", path: "/api/cars/:id", description: "Updates car that was selected by id"},
    {method: "DELETE", path: "/api/cars/:id", description: "Delete car by id"}
    ]
  });
});
//Shows hardcoded profile of me
app.get('/api/chadkeeven', function show_profile(req, res){
  res.json({
    name: "Chad Keeven",
    github_link : "https://github.com/chadkeeven",
    current_city : "Denver",
    pets: [
    {name:"Bruno", type: "Dog", breed: "English Bulldog"}]
  });
});

//Shows all cars
app.get('/api/cars', function show_cars(req, res){
  db.Cars.find(function(err, cars){
    if(err){
      res.send("No cars to retrieve");
    }
    res.json(cars);
  });
});

//Shows cars by id
app.get('/api/cars/:id', function show_car_id(req, res){
  var carId = req.params.id;
  var carFound = false;
  db.Cars.findById(carId,function(err, cars){
    if (err) {
      res.send("Car id not found");
    }
    res.json(cars);
  });
});

//Creates new car 
app.post('/api/cars', function create_cars(req, res){
  var newMake = req.body.make;
  var newModel = req.body.model;
  var newYear = req.body.year;
  var newCar = {make: newMake,model: newModel, year: parseInt(newYear)};
  db.Cars.create(newCar, function(err, car){
    if(err){
      res.json("Sorry It's a no go");
    }
  });
  res.json(newCar);
});

// //Updates car by id 
app.put('/api/cars/:id', function update_car(req, res){
  var carToUpdate = req.params.id;
  db.Cars.findOneAndUpdate({_id: carToUpdate},
    {$set: {"make": req.body.make,
    "model" : req.body.model,
    "year" : req.body.year
  }}, { new: true }, function (err, car){
    if (err) {
      res.json("Can't Update");
    }
    res.json(car);
  });
});

//Deletes car by id
app.delete('/api/cars/:id', function delete_car(req, res){  
  var carToDelete = req.params.id;
  db.Cars.remove({_id: carToDelete},function(err, car){
    res.json("Car deleted");
  });

});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
