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
*Array for Cars
*/

var cars = [
{_id: 1, make: "Nissan", modle: "370z", year: 2015},
{_id: 2,make: "Nissan", modle: "GTR", year: 2010},
{_id: 3,make: "Ford", modle: "Mustang", year: 2017}
];



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
      {method: "GET", path: "/api/cars/:id", description: "Show by car by id"},
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

//Shows all cars HARDCODED
app.get('/api/cars', function show_cars(req, res){
  res.json({cars});
});

//Shows cars by id HARDCODED
app.get('/api/cars/:id', function show_car_id(req, res){
  var carId = parseInt(req.params.id);
  for (var i = 0; i < carId; i++) {
     if(carId === cars[i]._id){
     //  console.log(todos[i]._id);
     res.json(cars[i]);
   }
 }
});

//Creates new car HARDCODED
var counter = 3;
app.post('/api/cars', function create_cars(req, res){
  counter ++;
  var newId = counter;
  var newMake = req.body.make;
  var newModel = req.body.model;
  var newYear = req.body.year;
    var newCar ={_id: parseInt(newId) ,make: newMake,model: newModel, year: parseInt(newYear)};
    cars.push(newCar);
    res.json(newCar);
});


// //Updates car by id HARDCODED
app.put('/api/cars/:id', function update_car(req, res){
  var carToUpdate = req.params.id;
  var updateIdFound = false;
  var amountInCars = 0;
  var idParsed = parseInt(carToUpdate);
   while(!updateIdFound){
     if(idParsed === cars[amountInCars]._id){
      var updatedMake = req.body.make;
      var updatedModel = req.body.model; 
      var updatedYear = req.body.year;
      var updatedCar = {_id: idParsed,make: updatedMake,model: updatedModel, year: updatedYear};
      cars[amountInCars] = updatedCar;
      updateIdFound = true;
     res.json(updatedCar);
    }
    amountInCars ++;
  }
});

//Deletes car by id HARDCODED
app.delete('/api/cars/:id', function delete_car(req, res){
  var carToDelete = parseInt(req.params.id);
  var idFound = false;
  var amountInArr = 0;
   while(!idFound){
    if(carToDelete === cars[amountInArr]._id){
      var spliceCar = cars.splice(amountInArr, 1);
      idFound = true;
      res.json(cars);
    }
    amountInArr ++;
  }
});

// At least one resource (mongoose model) that you can CRUD using RESTful Routes
// That means endpoints for index, show, create update, delete!
// Here are some ideas:
// Wish list (e.g. gifts or wishes)
// _id, description, price, amazon_link
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
