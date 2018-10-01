/*
var users = {};
var messages = [];
io.on("connection", function(socket) {
// create user
if(!users.hasOwnProperty(socket.id)){
  users.[socket.id]={}
}
socket.emit('new connection',{
  if:socket.id,
  messages:messages
});
socket.on('chat-message',function(message)){
  console.log('message received on backend: ', message);
  messages.push(message);
  io.emit('chat-message',message)
}
});
*/

module.exports = function(io) {
  /*io.on("connection", function(socket) {
    console.log("a user connected");
    socket.on("chat message", function(msg) {
      console.log("message: " + msg);
    });
  });*/
  let users = [];
  let images = [];
  let messages = [];

  io.on("connection", function(socket) {
    console.log("a user connected");
    //this.messages = messages;

    socket.emit("new connection", {
      messages: messages,
      users: users,
      images: images
    });

    socket.on("chat message", function(msg, user, img) {
      console.log("MENSAJE: " + msg);
      console.log("USER: " + user);
      console.log("IMG: " + img);
      messages.push(msg);
      images.push(img);
      users.push(user);
      io.emit("chat message", { msg: msg, user: user, img: img });
    });
  });
};
