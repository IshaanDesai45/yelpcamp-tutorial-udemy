let express = require('express');
let router = express.Router();
let campground = require('../models/campgrounds');
let middlewareObj = require('../middleware/index')


router.get("/", function(req, res){
    res.render("landing");
});

router.get("/campgrounds",(req,res)=>{
    campground.find({},function(err,allCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campgrounds",{campgrounds:allCampground,currentUser:req.user});
        }
    })
});
router.post("/campgrounds",middlewareObj.isLoggedIn,(req,res)=>{
    // res.send("you have reached the psot route");
   var name = req.body.name;
//    console.log(name);
    var image =req.body.image;
    let author = {
        id:req.user._id,
        username:req.user.username
    }
    // console.log(image);
    var newCampground = {name: name,image: image,description:"nice",author:author}
    // console.log(newCampground);
    campground.create(newCampground,function(err,campgrounds){
        if(err){
            console.log(err);
        }
        else{
            campground.find({},function(err,allCampground){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("campgrounds/campgrounds",{campgrounds:allCampground,currentUser:req.user});
                }
            })
        }
    });
    // console.log(campgrounds);
     
  
});

router.get("/campgrounds/new",middlewareObj.isLoggedIn,(req,res)=>{
    res.render("campgrounds/new.ejs");
});

router.get("/campgrounds/:id",(req,res)=>{
    // console.log(req);
    campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show.ejs",{campground:foundCampground});
        }
    })
    
});

//edit route 
router.get('/campgrounds/:id/edit',middlewareObj.checkCampgroundOwnership,(req,res)=>{
    campground.findById(req.params.id,(err,foundCampground)=>{
        res.render('campgrounds/edit',{campground:foundCampground})
    });
})

//update route
router.put('/campgrounds/:id/',middlewareObj.checkCampgroundOwnership,(req,res)=>{
    campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//destroy route
router.delete("/campgrounds/:id",middlewareObj.checkCampgroundOwnership,(req,res)=>{
    campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
})

//middleware

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

// function checkCampgroundOwnership(req,res,next){
//     if(req.isAuthenticated()){
//         campground.findById(req.params.id,(err,foundCampground)=>{
//             if(err){
//                 res.direct("back")
//             }
//             else{
//                 if(foundCampground.author.id.equals(req.user._id)){
//                     next();
//                 }
//                 else{
//                     res.send("you don not have the permission to do that");
//                 }
//             }
//         })
//     }
//     else{
//         res.redirect("back");
//     }

// }
module.exports =router;