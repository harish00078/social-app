const User = require("../models/user");

// here we are importing the (fx) module or library:we can say:
// what is (fs) = The Node.js file system module allows you to work with the file system on your computer.
// Common use for File System module:
// 1 = Read Files
// 2 = Write Files
// 3 = Append Files
// 4 = Close Files
// 5 = Delete Files
const fs = require("fs");



// here we are importing the (path) of the (avatar): so that we can delete the (avatar):
// if it is already there in the (user) profile:
// so that it can add the (new) one to his profile:
const path = require('path');

// let's keep it same as before
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

// here we have (update) function for updating (user) profile:
// with the help of (async-await) function:and also user will able to update its (profile) with the (image) or (avatar):

module.exports.update = async function (req, res) {


  if (req.user.id == req.params.id) {


    try {
     

      // first we have to find the (user) or (check-user):if its present or not:
      let user = await User.findById(req.params.id);

      // if user was (found):then we have to update the (user) profile:
      // so here we did not directly update the (user) profile:because we are also using the  (image) or (avatar):
      // for updating the (user) profile:
      // so doing that we have to use the (multer):thorugh (multer) we have created a (static) function:
      // In the (user) schema:we will use  that  (static) function to update the (user) profile:


      User.uploadedAvatar(req, res, function (err){
        if (err) {
          console.log("****Multer Error:", err);
        }

        // here we print the (data) of the (user) avatar:on the console:
        console.log(req.file);

        // we also have to store this (updated) profile:In our  database as well:
        user.name = req.body.name;
        user.email = req.body.email;
        
        // before (uploading) the (user) avater in the database:
        // we have to check that the  (user) gave the (avatar) or (avatar) file:with its (updated) profile data  or not:
        if(req.file){

          // here we are checking that:if the (user) already has an (avatar):
          if(user.avatar){

            // then we have to first (delete) that avatar:which is  already present in the (user) profile:
            // we can (delete) avatar:with the help of (unlinkSync) method:because we not only have to delete the (avatar):we also have to delete its (link) or (path) we can say:
            // what is (fs) = The Node.js file system module allows you to work with the file system on your computer.
            fs.unlinkSync(path.join(__dirname,'..', user.avatar));
            


          }
        
            // then only we update  the (user) profile with the (avatar) file data:
            // here we are using the (filename) or (avatarPath) of the (user's-avatar) :for  storing the (reference) of (avatar) in the database:
            // because we did not directly (store) the (files) or (images) in the (database):
            // In basic words: we can say:
            // this is saving the (path) of the (uploaded) file into the (avatar0 field in the (user)schema or (database) we can say:
            user.avatar =  User.avatarPath + '/' +  req.file.filename;

        }
        user.save();
        return res.redirect('back');


      });




    } catch (err) {
      console.log("error", err);
      return res.redirect("back");
    }



  } else {
    req.flash("error", "Unauthorized!");
    return res.status(401).send("Unauthorized");
  }



};

// here we have simple (update) function:for updating (user) profile:
// module.exports.update = function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             req.flash('success', 'Updated!');
//             return res.redirect('back');
//         });
//     }else{
//         req.flash('error', 'Unauthorized!');
//         return res.status(401).send('Unauthorized');
//     }
// }

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash("error", "Passwords do not match");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash("error", err);
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          req.flash("error", err);
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      req.flash("success", "You have signed up, login to continue!");
      return res.redirect("back");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    console.log('error',err);
  });
  req.flash("success", "You have logged out!");

  return res.redirect("/");
};
