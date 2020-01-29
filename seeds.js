var mongoose = require('mongoose');
var  Campgrounds = require('./models/campgrounds.js');
var  Comment = require('./models/comment.js');

//seed data
let data =[
    {
        name : "camp1",
        image : "https://q9m3bv0lkc15twiiq99aa1cy-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/TENT.jpeg",
        description: "verygdubaervjbaourhvoaj v"
    },
    {
        name : "camp2",
        image : "https://q9m3bv0lkc15twiiq99aa1cy-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/TENT.jpeg",
        description: "verygdubaervjbaourhvoaj AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv"
    },
    {
        name : "camp3",
        image : "https://q9m3bv0lkc15twiiq99aa1cy-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/TENT.jpeg",
        description: "verygdubaervjbaourhvoaj sdbuoae'inipbirwnbkbfdbv9jevckwePwonvWHEIOVHWJV  v"
    }
]
function seedDb(){
    //remove campgronds
    Campgrounds.remove({},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('campgropunds removed');
        }
         //add campgrounds
        data.forEach((seed)=>{
            Campgrounds.create(seed,(err,campdata)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log('campground created');
                    Comment.create({
                        text: "this is beautiful site but without connectivity",
                        author: 'ishaan desai'
                    },(err,comment)=>{
                        if (err) {
                            console.log(err);
                        }
                        else{
                            console.log(comment);
                            campdata.comments.push(comment);
                            campdata.save();
                            console.log('comment added');
                        }
                    });
                }
        })
    });
    });
   
}

module.exports = seedDb;