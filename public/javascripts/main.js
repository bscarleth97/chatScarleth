/*let _GET = {};
var user = "unknown";
let qs = document.getElementById("pugSide");
if (qs) {
  let temp = qs.src.match(/\w+=\w+/g);
  a = temp[0].split("=");
  user = a[1];
}*/

var socket = io();

let btnSend = document.getElementById("btnMessage");
let message = document.getElementById("msgInput");
let area = document.getElementById("list");
let dataU = dataUser;

console.log(message.id);

btnSend.addEventListener("click", function(e) {
  e.preventDefault();
  console.log(message.value);
  m = " " + dataU.name + ": " + message.value;
  objUser = {};
  socket.emit("chat message", m, dataU.name, dataU.img);
  message.value = "";
  return false;
});

socket.on("chat message", function(messages) {
  img = messages["img"];
  msg = messages["msg"];
  user = messages["user"];
  let imgN = document.createElement("img");
  if (user == "unknownUser") {
    imgN.src = "./images/unknown.jpg";
  } else {
    imgN.src = img;
  }
  imgN.setAttribute("height", "30px;");
  imgN.setAttribute("width", "30px;");

  let texto = document.createElement("span");
  texto.innerText = msg;

  let li = document.createElement("li");
  li.appendChild(imgN);
  li.appendChild(texto);

  area.appendChild(li);
});

socket.on("new connection", function(messages) {
  let i = 0;
  msms = messages["messages"];
  images = messages["images"];
  users = messages["users"];
  console.log(msms);
  msms.forEach(element => {
    let imgN = document.createElement("img");
    if (users[i] == "unknownUser") {
      imgN.src = "./images/unknown.jpg";
    } else {
      imgN.src = images[i];
    }
    imgN.setAttribute("height", "30px;");
    imgN.setAttribute("width", "30px;");

    let texto = document.createElement("span");
    texto.innerText = element;

    let li = document.createElement("li");
    li.appendChild(imgN);
    li.appendChild(texto);

    area.appendChild(li);
    i++;
  });
});
