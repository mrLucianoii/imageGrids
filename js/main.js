var Grid = function(jsonObj){
    
    if (jsonObj === undefined){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var newJson = JSON.parse(this.responseText);
            Grid.load(newJson);

        }
        };
            xhttp.open("GET", "images.json", true);
            xhttp.send();
        
        }
    
    
    
}
Grid.load = function(imageUrls){
    
    this.imageUrl = imageUrls;
    console.log(this.imageUrl);
    
    var objUrl = this.imageUrl[0].images;
    
    console.log(objUrl);
    
   for (var key in objUrl){
       var newChild = document.createElement("img");
       
       newChild.id = key;
       newChild.src = objUrl[key];
       newChild.setAttribute('draggable', "true");
       newChild.setAttribute('ondragenter', "Grid.drop(event)");
       newChild.setAttribute('ondragstart', "Grid.start(event)");

       document.getElementById("grid").appendChild( newChild );
       
    
   }
    
}
var source;

function isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) { 
                return true;
            }
        }
    }
    return false;
} 

Grid.drop = function (e) {
    if (isbefore(source, e.target)) {
        e.target.parentNode.insertBefore(source, e.target);
    }
    else {
        e.target.parentNode.insertBefore(source, e.target.nextSibling);
    }
}

Grid.start = function(e) {
    source = e.target;
    e.dataTransfer.effectAllowed = 'move';
}

Grid();