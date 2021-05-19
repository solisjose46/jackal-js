//first load obstacles
window.addEventListener('load', loadObstacles());
//key handler
var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.key] = e.type == 'keydown';
    if(map['w'] && map['d']){
        characterMovement('north-east');
    }
    else if(map['w'] && map['a']){
        characterMovement('north-west');
    }
    else if(map['s'] && map['d']){
        characterMovement('south-east');
    }
    else if(map['s'] && map['a']){
        characterMovement('south-west');
    }
    else if(map['w']){
        characterMovement('north');
    }
    else if(map['d']){
        characterMovement('east');
    }
    else if(map['s']){
        characterMovement('south');
    }
    else if(map['a']){
        characterMovement('west');
    }
    if(map[' ']){
        //shootSquare(character);
        //continue here
    }
}
//------movement-----
//------character movement wrapper-----
function characterMovement(direction){
    //rate at which this object will move
    var speedLimit = 10;
    //make clone and move: if not in bounds do not move character else rotate and move character
    var characterClone = character.cloneNode(false);
    game.appendChild(characterClone);
    moveObject(characterClone, direction, speedLimit);
    var checkCharacterBounds = objectCollisions(characterClone);
    //do not need clone, remove from game
    characterClone.remove();
    //rotate to proper orientation and move this object
    if(!checkCharacterBounds.status){
        rotate(character, direction);
        moveObject(character, direction, speedLimit);
    }
    //else do nothing
}
//------character movement wrapper-----
function moveObject(object, direction, speedLimit){
    if(direction == 'north' || direction == 'south'){
        moveY(object, direction, speedLimit);
    }
    else if(direction == 'east' || direction == 'west'){
        moveX(object, direction, speedLimit);
    }
    else{
        var X = 'east';
        var Y = 'north';
        if(direction.includes('west')){
            X = 'west';
        }
        if(direction.includes('south')){
            Y = 'south';
        }
        moveY(object, Y, speedLimit);
        moveX(object, X, speedLimit);
    }
}
//------movement-----
function shootSquare(object){
    var objectDimensions = getDimensions(object);
    var projectile = makeProjectile(objectDimensions.left, objectDimensions.top);
    var projectileImg = document.createElement('IMG');

    if(object.id == 'character-container'){
        var index = tankLibrary.indexOf(tankLibrary.find(({direction}) => direction === object.firstChild.className));
        projectileImg.src = rocketLibrary[index].img;
        projectile.className = object.firstChild.className;
    }
    else{
        projectileImg.src = 'assets/weapons/projectile.png';
    }
    
    projectile.appendChild(projectileImg);
    game.appendChild(projectile);
    projectileMovement(projectile);
}
function makeProjectile(left, top){
    var projectile = document.createElement('DIV');
    projectile.className = 'projectile';
    projectile.style.left = left + 'px';
    projectile.style.top = top + 'px';
    return projectile;
}
function projectileMovement(projectile){
    var intervalTime = 100;
    var flightTime = 1100;
    var minTime = Date.now() + flightTime; 
    var speedLimit = 20;
    var projectileCollision;
    var projectileInterval = setInterval(()=>{
        moveObject(projectile, projectile.firstChild.className, speedLimit);
        projectileCollision = objectCollisions(projectile);
        if(Date.now() > minTime || projectileCollision.status){
            if(projectileCollision.status && projectileCollision.removeable){
                removeObstacle(projectileCollision.index);
            }
            clearInterval(projectileInterval);
            projectile.remove();
        }
    }, intervalTime);
}
function removeObstacle(index){
    var removeables = Array.from(document.getElementsByClassName('removeables'));
    removeables[index].remove();
}