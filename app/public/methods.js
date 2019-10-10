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
  console.error("Error while fetching image from server.");
}

function removeButton() {
  var button = document.querySelector('#btn-load');
  if (button !== null) {
    button.remove();
  }
}