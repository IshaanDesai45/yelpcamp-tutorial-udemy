const express = require('express');
const bodyParser = require ('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.render("landing");
});
var campgrounds = [
    {name:"salmon creek",image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722879d0904dc45c_340.jpg"},
    {name:"Granite Hill",image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722879d0904dc45c_340.jpg"},
    {name:"MOuntain goat",image:"https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c722879d0904dc45c_340.jpg"}
];
app.get("/campgrounds",(req,res)=>{
  
    res.render("campgrounds",{campgrounds:campgrounds});
    
});
app.post("/campgrounds1",(req,res)=>{
    // res.send("you have reached the psot route");
   var name = req.body.name;
//    console.log(name);
    var image =req.body.image;
    // console.log(image);
    var newCampground = {name: name,image:  image}
    // console.log(newCampground);
    campgrounds.push(newCampground);
    // console.log(campgrounds);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs");
});

app.listen(3000,()=>{
    console.log("the server has started");
});