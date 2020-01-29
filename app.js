const express = require('express');
const bodyParser = require ('body-parser');
var mongoose = require('mongoose');
var campground = require('./models/campgrounds.js');
var seedDB = require('./seeds.js');
var app = express();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

seedDB();

app.get("/campgrounds",(req,res)=>{
    campground.find({},function(err,allCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds",{campgrounds:allCampground});
        }
    })
  
    
    
});
app.post("/campgrounds1",(req,res)=>{
    // res.send("you have reached the psot route");
   var name = req.body.name;
//    console.log(name);
    var image =req.body.image;
    // console.log(image);
    var newCampground = {name: name,image:  image}
    // console.log(newCampground);
    campground.create({
        name:newCampground.name,
        image:newCampground.image,
        description:"nice"
    },function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    });
    // console.log(campgrounds);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/campgrounds/:id",(req,res)=>{
    // console.log(req);
    campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("show.ejs",{campground:foundCampground});
        }
    })
    
})

app.listen(3000,()=>{
    console.log("the server has started");
});