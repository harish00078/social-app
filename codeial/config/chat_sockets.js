// here we are setting up the (socket.io):for our chat-Box:
// here we are setting it up for the (server) side:
// or we can say setting up the (socket) in our (app's) server:
// its also set up in the (client) side:because web-sockets established the communication in (both-ways):

// here we are creating the (socket.io) function for the chat-Box:from the server-side:
// here (socketServer) argument is basically the (chatServer) that we have created in our (index.js) file:or we can say in our (server-file):
module.exports.chatSockets = function (socketServer) {
  // here we are giving the (socket.io) library or the (port) that we have created in the (server-file):to the (io) variable: or we can say to the socket-function of the (server-side):that we have created:
  let io = require("socket.io")(socketServer);

  // socket will have two function with in it: In the (server-side) as well:
  // first (function) is the (on):this basically tells that we are getting the (messsage):
  // second (function) is the (amit):this basically tells that we are sending the (message):

  // when socket  (on) function get triggered:then we will first connect with the (server):who trying to  sending us the (message): with the help of the (connection) Event:
  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    // if we create the (disconnected) socket Event:
    socket.on("disconnect", function () {
      console.log("socket connection disconnected ");
    });

    // here we are getting the  (chat-room) request from the (user):
    socket.on("join_room", function (data) {
      console.log("joining request received", data);

      // after getting that (request):we have to join that (chat-room):
      // we can join that (chat-room):with the help of the inbuild (join) function of the (socket):
      // In join function: we also have to define the (data) that we are getting in the (join_room) request from the (user):of the chat-room to tell the (socket) that which (chat-room) we are joining:

      // this will also create the  new (chat-room):if its not already has been created:

      socket.join(data.chatroom);

      // after joing the chat-room:we have to tell the (user's):those were in that (chat-room):that another (user) has joined the chat-room:
      // for sending some text in the (specific) chat-room: we have to use the inbuilt (in) function of the (socket):
      io.in(data.chatroom).emit("user_joined", data);
    });

    

    // here we detect the (message) from the particular (user):and (broadcast) to everyone in the room:
    socket.on("send_message", function (data) {

      io.in(data.chatroom).emit("receive_message", data);



    });



  });



};
