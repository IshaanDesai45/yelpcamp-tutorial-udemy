let express = require('express');
let router = express.Router({mergeParams:true});
let campground = require('../models/campgrounds');
let comment = require('../models/comment');
let middlewareObj = require('../middleware/index')


//new comment route
router.get("/campgrounds/:id/comments/new",middlewareObj.isLoggedIn,(req,res)=>{
    campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new.ejs",{campground:foundCampground});
        }
    })
    
});
//new comment post route
// app.post("/campgorunds/:id/comments",(req,res)=>{
//     res.send('hello my name is ishaan and i think I like soumya');
// });
router.post("/campgrounds/:id/comments",middlewareObj.isLoggedIn,(req,res)=>{
    campground.findById(req.params.id,(err,foundCampground)=>{
       if(err){
           console.log("err");
       } 
       else{
        //    console.log(req.body.comment);
           comment.create(req.body.comment,(err,comment1)=>{
               if(err){
                   console.log(err);
               }
               else{
                   comment1.author.id = req.user._id;
                   comment1.author.username = req.user.username;
                   comment1.save();
                  foundCampground.comments.push(comment1);
                  foundCampground.save();
                  req.flash("success","successfully added comment")
                  res.redirect('/campgrounds/'+ foundCampground._id);
               }
           })
       }
    });
});

//comment edit route
router.get("/campgrounds/:id/comments/:comment_id/edit",middlewareObj.checkCommentOwnership,(req,res)=>{
    comment.findById(req.params.comment_id,(err,foundComment)=>{
            res.render('comments/edit',{comment:foundComment,campgroundId:req.params.id})
    }) 
}) 

//comment update route
router.put("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership,(req,res)=>{
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
});

//comment destroy route
router.delete("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership,(req,res)=>{
    comment.findByIdAndDelete(req.params.comment_id,(err)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
})

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


// function checkCommentOwnership(req,res,next){
//     if(req.isAuthenticated()){
//         comment.findById(req.params.comment_id,(err,foundComment)=>{
//             if(err){
//                 res.direct("back")
//             }
//             else{
//                 if(foundComment.author.id.equals(req.user._id)){
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