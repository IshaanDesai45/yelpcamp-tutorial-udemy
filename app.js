var express                     = require('express'),
    bodyParser                  = require ('body-parser'),
    mongoose                    = require('mongoose'),
    passport                    = require('passport'),
    localStrategy               = require('passport-local'),
    methodOverride              = require('method-override')
    // passport-local-mongoose     = require('passport-local-mongoose'),
    campground                  = require('./models/campgrounds.js'),
    comment                     = require('./models/comment'),
    User                        = require('./models/user'),
    seedDB                      = require('./seeds.js'),
    flash                       = require("connect-flash")
    app                         = express();

//requiring routes
let commentRoutes= require('./routes/comments'),
    campgroundRoutes= require('./routes/campgrounds')
    authRoutes =require('./routes/index');
mongoose.connect("mongodb+srv://Ishaan:Ishaan@1234@cluster0-bkgnb.mongodb.net/test?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"))

// seedDB();
//passport configuration
app.use(require("express-session")({
    secret:"ishaan likes soma",
    resave:false,
    saveUninitialized :false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});
app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT,process.env.IP,()=>{
    console.log("the server has started");
});