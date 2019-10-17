var frames = 300;
var currentFrame = 0;
var dot = { x: 0, y: 90, radius: 5 };
var ctx = null;
var canvasWidth = 400;
var canvasHeight = 400;;

function loadImage() {
  console.log("Load image");
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    imageLoaded(request);
  }

  request.open("GET", "/image", true);
  request.send(null);
}

function imageLoaded(request) {
  if (request.readyState == 4 && request.status == 200) {
    console.log("Successfully loaded image from server.");    
    
    var image = document.querySelector('#img-ski');
    if (image != null) image.src = request.responseText;        
    
    removeButton();
    return;
  }
}

function removeButton() {
  var button = document.querySelector('#btn-load');
  if (button !== null) {
    button.remove();
  }
}

function init() {
  setTimeout(function() {
    checkCookies();
    window.requestAnimationFrame(moveDot);
  }, 100);
  window.requestAnimationFrame(draw);
}

function moveDot() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  dot.x += 1;
  dot.y += 1/3;

  this.drawLine();
  this.drawDot(dot)
  currentFrame += 1;

  if( currentFrame == frames ) {
    currentFrame = 0;
    dot = { x: 0, y: 90, radius: 5 };
  }

  window.requestAnimationFrame(moveDot);
}

function draw() {  
  ctx = document.getElementById('canvas').getContext('2d');  
  this.drawLine();
  this.drawDot(this.dot);
  window.requestAnimationFrame(draw);
}

function drawLine() {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  ctx.strokeStyle = 'black';
  ctx.moveTo(0, 100);
  ctx.lineTo(300, 200);
  ctx.stroke();
}

function drawDot(dot) {
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.radius, 0, 5 * Math.PI, false);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function checkCookies() {
  var date = new Date();
  setCookie("visited", date.toLocaleTimeString());  
  var username = getCookie("username");
  var visited = getCookie("visited");

  if (username != "") {
    setLabelById("username", username);
    setLabelById("visited", visited);
  } else {
    username = prompt("How should I call you?", "");
    if (username != "" && username != null) {
      setCookie("username", username);
    }    
    checkCookies();
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(key, value) {
  document.cookie = key + "=" + value + ";";
}

function setLabelById(id, text) {
  var element = document.getElementById(id);
  if(element == null) return;
  element.innerHTML = text;
}

init();