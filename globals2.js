var character = document.getElementById('character-container');
var game = document.getElementById('game-container');

//-----helper functions-----
function getDimensions(object){
    //console.log('getDimensions: ' + object);
    var width = parseInt(window.getComputedStyle(object).width.replace('px', ''));
    var height = parseInt(window.getComputedStyle(object).height.replace('px', ''));
    var left = parseInt(window.getComputedStyle(object).left.replace('px', ''));
    var right = left + width;
    var top = parseInt(window.getComputedStyle(object).top.replace('px', ''));
    var bottom = top + height;

    var returnObject = {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        width: width,
        height: height
    };

    return returnObject;
}
//Collision
function collision(objectOne, objectTwo){
    var rectangleOne = getDimensions(objectOne);
    var rectangleTwo = getDimensions(objectTwo);
    if (rectangleOne.left < rectangleTwo.right && rectangleOne.right > rectangleTwo.left && rectangleOne.top < rectangleTwo.bottom && rectangleOne.bottom > rectangleTwo.top) {
        return true; //collision detected
    }
    return false;
}
//------collision wrapper------
function objectCollisions(object){
    var removeables = Array.from(document.getElementsByClassName('removeables'));
    var nonremovables = Array.from(document.getElementsByClassName('nonremovables'));
    var obstacles = [removeables, nonremovables];
    
    var toReturn = {
        status: false,
        removeable: null,
        index: null
    };

    // console.log('removeables: ' + removeables.length);
    // console.log('nonremovables: ' + nonremovables.length);
    
    if(contains(object) == 1){
        for(var i = 0; i < obstacles.length; i++){
            arr = obstacles[i];
            for(var j = 0; j < arr.length; j++){
                if(collision(object, arr[j])){
                    toReturn.status = true;
                    if(i == 0){
                        toReturn.removeable = true;
                        toReturn.index = j;
                    }
                    else{
                        toReturn.removeable = false;
                    }
                    return toReturn;
                }
            }
        }
    }
    else{
        toReturn.status = true;
        toReturn.removeable = false;
    }
    return toReturn;
}
//-----game loading functions-----
function loadObstacles(){
    //first load boundry points, this is just for visual; temp
    loadPolyPoints();
    //load infrastructure
    var toLoad = [nonRemovables, turretLocations];
    for(var j = 0; j < toLoad.length; j++){
        arr = toLoad[j];
        for(var i = 0; i < arr.length; i++){
            var temp_container = document.createElement('DIV');
            if(j == 0){
                temp_container.style.height = arr[i].height;
                temp_container.style.width = arr[i].width;
                temp_container.className = 'nonremovables';
            }
            else{
                var temp_img = document.createElement('IMG');
                temp_img.src = 'enemies/turret-s.png'; //default position
                temp_img.className = 'south';
                temp_container.appendChild(temp_img);
                temp_container.id = '';
                temp_container.className = 'turrets';
                temp_container.classList.add('removeables');
            }
            temp_container.style.left = arr[i].left;
            temp_container.style.top = arr[i].top;
            game.appendChild(temp_container);
        }
    }
}
function loadPolyPoints(){
    for(var i = 0; i < bounds.length; i++){
        var new_square = document.createElement('DIV');
        new_square.style.left = bounds[i].x + 'px';
        new_square.style.top = bounds[i].y + 'px';
        new_square.className = 'poly';
        game.appendChild(new_square);
    }
}
//-------------driver functions-------------
//movement functions
function moveX(object, direction, speedLimit){
    var objectDimensions = getDimensions(object);

    if(direction == 'west'){
        speedLimit = speedLimit * -1;
    }

    objectDimensions.left+=speedLimit;
    object.style.left = objectDimensions.left + 'px';
}
function moveY(object, direction, speedLimit){
    var objectDimensions = getDimensions(object);
    //console.log('moveY: ' + objectDimensions);

    if(direction == 'north'){
        speedLimit = speedLimit * -1;
    }

    objectDimensions.top+=speedLimit;
    object.style.top = objectDimensions.top + 'px';
    //console.log(object.style.top);
}
//rotation of character or turrets
function rotate(object, direction){
    //check if object orientation needs to change
    var characterDirection = object.firstChild.className;
    if(characterDirection != direction){
        var library;
        if(object.id == 'character-container'){
            library = tankLibrary;
            //console.log('tankLibrary');
        }
        else{
            library = turretLibrary;
        }
        var position = library.indexOf(library.find(({direction}) => direction === characterDirection));
        var right = false;
        var currentPosition = position;
        var minTurns = 4;
        for(var i=0; i < minTurns; i++){
            if(currentPosition != 7){
                currentPosition++;
            }
            else{
                currentPosition = 0;
            }
            if(library[currentPosition].direction == direction){
                right = true;
                break;
            }
        }
        if(right){
            if(position != 7){
                position++;
            }
            else{
                position = 0;
            }
        }
        else{
            if(position != 0){
                position--;
            }
            else{
                position = 7;
            }
        }
        object.firstChild.className = library[position].direction;
        object.firstChild.src = library[position].img;
    }
}
//checks if point is in polygon (object in map)
function contains(object) {
    var objectDimensions = getDimensions(object);
    lat = objectDimensions.top;
    lng = objectDimensions.left;
    //credit to
    //https://rosettacode.org/wiki/Ray-casting_algorithm
    var count = 0;
    for (var b = 0; b < bounds.length; b++) {
        var vertex1 = bounds[b];
        var vertex2 = bounds[(b + 1) % bounds.length];
        if (west(vertex1, vertex2, lng, lat))
            ++count;
    }
    return count % 2;
 
    /**
     * @return {boolean} true if (x,y) is west of the line segment connecting A and B
     */
    function west(A, B, x, y) {
        if (A.y <= B.y) {
            if (y <= A.y || y > B.y ||
                x >= A.x && x >= B.x) {
                return false;
            } else if (x < A.x && x < B.x) {
                return true;
            } else {
                return (y - A.y) / (x - A.x) > (B.y - A.y) / (B.x - A.x);
            }
        } else {
            return west(B, A, x, y);
        }
    }
}
//-------------driver functions-------------