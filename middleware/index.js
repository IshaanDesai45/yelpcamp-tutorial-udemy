var campground = require('../models/campgrounds')
var comment    =require('../models/comment')

//all middleware goes here

let middlewareObj = {};

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","please login");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id,(err,foundCampground)=>{
            if(err){
                res.direct("back")
            }
            if (!foundCampground) {
                req.flash("error", "Item not found.");
                return res.redirect("back");
            }
            
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.flash("error","you don not have the permission to do that");
                    res.redirect("back")
                }
            
        })
    }
    else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err){
                res.direct("back")
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","you don not have the permission to do that");
                    res.redirect("back")
                }
            }
        })
    }
    else{
        req.flash("error","you need to login to that")
        res.redirect("back");
    }
}


module.exports = middlewareObj;