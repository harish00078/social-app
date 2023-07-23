
const mongoose = require('mongoose');

// here we are importing the (multer) in (user) file:
// because we are (specifically) setting up the (multer) for the (user's) only:
// or we can say only the (user's):will able to upload (image) on its (profile_page):
// so that's why we are setting up the (multer) here:

// 1= first we have to import the (multer):
const multer = require('multer');
// 2 = second we have to (import) the (path) function or libray also:
// so that (multer) can connect with the (images) through the (path) of the (folder):which will have the (images) of the (user) that will (user) want to use in its (profile_page:
const path = require('path');

// 3 = third we gave the (folder) path of the (images) or the (avatar's) of the (user) to the (multer):with the (help) of (path) library:
// because we are getting the (folder) in the (string):so converting it into the (path) object: we are using the (path) library:
// so that (multer): can figure out that this is the (path) of the (folder):
// were (user) have put all its  (images) that they want to use in its (profile_page):

// we can gave that (path) with the help of (join) function of the (path) library:
const AVATAR_PATH = path.join('/uploads/users/avatars');



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    // we also have to (create) the (avatar) key in the (user) schema:
    // so that every (user)  can connected  with its (avatar):
    // or we can say (storing) the (reference) of the  (avatar) in the (user) schema or (database):
    // so that (user) can connected with its (avatar):
    avatar: {
        type: String,
    }

}, {
    timestamps: true
});

// here we setup the (configuration) file of the (multer):
// for the (user) profile-images or (avatars):
let storage = multer.diskStorage({

    // first we have to define the (storage) function in the (multer):
    // were we store all the (profile-images) of the (user):
    destination: function(req,file,cb){
        // here (cb) repersents the (callback)) function:
        // we set the (callback) function) to (null):
        // and also with that gave the (folder) path  to this function:
        // were we store all the (profile-images) of the (user):
        // In path we are giving  the (variable) to this fucntion:
        // which we create for storing the path-value of the (avatars) folder:


        // here we also use the (path) library:with its (join) function:
        // so that we can gave the (avatar) path to this function:
        // and the (__dirname) function will help this (destination-function) of the (multer) to the get in the (avatar's) folder:
        cb(null,path.join(__dirname,'..', AVATAR_PATH));

    },

    // under that folder we also have to (define) the (file) of the  (user's) avatar:
    // which will have the details of the (user) avatar:
    filename: function(req,file,cb){

        // for storing the (detailed) file of the (user's) avatar:
        // we have to use (function) named as (date.now()):which will differentiate the same-name type of files:
        // because the (date.now()) function:will stores the (milliseconds) of the every (files) with in it:

        // here (fieldname) is basically the (avatar) key of the (user) schema:
        cb(null,file.fieldname + '-' + Date.now());


    }






});



// here  we create (statics) functions or methods for the (user)or we can say for the (userSchema) to  connect with the (multer):
// there is also the (other) way of creating (function) for the connecting (user)with the (multer):instead of creating  (statics) functions:



// first static function:is for the connecting the (multer) diskstorage function:with the (localstorage):
// so that the (multer) diskstorage function:will get the (user) avatar from the (localstorage):
// this (single) function:will tell the (user) or (Configure) that the (user):will only able to upload the (one) file or (one) avatar:
userSchema.statics.uploadedAvatar = multer({storage: storage }).single('avatar');


// second static function:is for (setting)  the (user) path (avatar):
// localy so that we can access it in any where of our (app):
userSchema.statics.avatarPath = AVATAR_PATH;



const User = mongoose.model('User', userSchema);

module.exports = User;