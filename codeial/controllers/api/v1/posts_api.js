// here we create (controller) for the (posts) api (request):
// and this controller will only  work with the (v1) version of the  (api):

// here we import the (post) schema:so we can gave the (posts) from the (database):
// In the (response) of the (api) request that we are gettting from the (user):
const Post = require("../../../models/post");

// here we import the (comment) schema:so we can delete the (Comments) related to the (post):
// that we are trying to delete:
const Comment = require("../../../models/comment");

// here we are creating the  (controller) for the (posts) api (request):
module.exports.index = async function (req, res) {
  // browser basically (connnect) with the (api):through the (json) format data:
  // because (current) time all the (Browsers) or systems:are using the (json) format (data) to connect with the each other:

  // => IMPORTANT:
  // so here in the (response) of the (user) request to the (api):
  // we also have to gave him the (response) in the form of (json)format data:
  // for gaving json format data in the response:
  // we also have to gave the (status) of the (user-request) in the (response):
  // because (json) format data (objects):have two things with in it:
  // first is the (status) of the (user-request) to the (api):
  // second is the (response) data that they want from the (api):
  // acc to the (request) that they gave to the (api):
  // In json object:(response) data for the (user) acc to its request to the (api):will be in the (message) key of the (json) object:

  // here we are finding-out or we can say getting the (posts) from the (database) and to gave them to the (api-request) in the (response):
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    // here we have (message) key of the (json) object:
    message: "List of posts",
    // and here we provide those (posts):In response to the user (api-request):
    posts: posts,
  });
};





// here we creating a (destory) function:In the (api):
// so that (user) will also able to delete the (posts) through the (api-request):

module.exports.destroy = async function (req, res) {

  try {

    let post = await Post.findById(req.params.id);

    if(post.user == req.user.id){

    

    post.remove();

    await Comment.deleteMany({ post: req.params.id });


    return res.json(200, {
      message: "post and associated comments deleted successfully",
    });


    // if the (user) does not match:
  }else{


    return res.json(401,{

      message: "you are not authorized to delete this post",
    });



  }


  } catch (err) {


    console.log('********',err);
    return res.json(500, {


      message: "internal server error",


    });


  }


};
