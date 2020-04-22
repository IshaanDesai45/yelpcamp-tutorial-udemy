let express    = require('express');
let router     = express.Router();
let passport   = require('passport');
let User       = require('../models/user');

////////////////////////////
//AUTH ROUTES
////////////////////////////

//functioon to check if the user is loggrd in


//show register form
router.get("/register",(req,res)=>{
    res.render("register");
});
//dign up logic
router.post("/register",(req,res)=>{
//    res.send('signing ypou up....')
    let newUser = new User({username:req.body.username})
    User.register(newUser,req.body.password, function (err, user){
        if(err){
            // console.log(err);
            req.flash("error",err.message)
            return res.redirect("/register");
        }
        passport.authenticate('local')(req,res,()=>{
            req.flash("success","registered you succesfully");
            res.redirect('/campgrounds');
        })

    })
})


///show login form 
router.get('/login',(req,res)=>{
    res.render("login");
})

//login in logic 
router.post('/login',passport.authenticate("local",{
        successRedirect:"/campgrounds",
        failureRedirect :"/login"
     }),(req,res)=>{
    // res.send('logining in')
})

//logout route
router.get('/logout',function(req,res){
    req.logout();
    req.flash("success","logged you out")
    res.redirect("/campgrounds");
})

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports =router;