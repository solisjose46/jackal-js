//first load obstacles
window.addEventListener('load', loadObstacles());
//key handler
var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.key] = e.type == 'keydown';
    e.preventDefault();
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
        shootSquare(character);
    }
}
//------movement-----
//------character movement wrapper-----
function characterMovement(direction){
    //rate at which this object will move
    var speedLimit = 10;
    //make clone and move it: if not in bounds do not move character else rotate and move character
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
    }
    else{
        projectileImg.src = 'assets/weapons/projectile.png';
    }
    projectile.appendChild(projectileImg);
    //console.log(projectileImg);
    console.log(projectile);
    game.appendChild(projectile);
    projectileMovement(projectile, object.firstChild.className);
}
function makeProjectile(left, top){
    var projectile = document.createElement('DIV');
    projectile.className = 'projectile';
    projectile.style.left = left + 'px';
    projectile.style.top = top + 'px';
    return projectile;
}
function projectileMovement(projectile, direction){
    var intervalTime = 100;
    var flightTime = 1100;
    var minTime = Date.now() + flightTime; 
    var speedLimit = 20;
    var projectileCollision;
    var projectileInterval = setInterval(()=>{
        moveObject(projectile, direction, speedLimit);
        projectileCollision = objectCollisions(projectile);
        if(Date.now() > minTime || projectileCollision.status){
            if(projectileCollision.status && projectileCollision.removeable){
                removeObstacle(projectileCollision.index);
            }
            clearInterval(projectileInterval);
            projectileExplosion(projectile.style.left, projectile.style.top);
            projectile.remove();
        }
    }, intervalTime);
}
function removeObstacle(index){
    var removeables = Array.from(document.getElementsByClassName('removeables'));
    removeables[index].remove();
}
function projectileExplosion(left, top){
    var explosion = document.createElement('DIV');
    var explosion_img = document.createElement('IMG');
    explosion_img.src = 'assets/environment/explosions/explosion.gif'
    explosion.style.left = left;
    explosion.style.top = top;
    explosion.className = 'explosion';
    explosion.appendChild(explosion_img);
    game.appendChild(explosion);
    var explosionTime = 500;
    setInterval(()=>{
        explosion.remove();
    }, explosionTime);   
}
//enemy behavior
var enemyInterval = 100;

setInterval(() => {
    enemyShooting();
}, enemyInterval);

function enemyShooting(){
    var turrets = Array.from(document.getElementsByClassName('turrets'));
    var turret;
    for(var i = 0; i < turrets.length; i++){
        turret = turrets[i];
        if(withinRange(turret)){
            //console.log('b4 rotate');
            //enemyRotate(i);
            //enemyShoot(i)
        }
    }
}
function withinRange(turret){
    console.log(turret);
    return;
    //var turretDimensions = getDimensions(turret);
    //var characterDimensions = getDimensions(character);

    var leftMin = 110;
    var topMin = 230;

    if(turretDimensions.left + leftMin >= characterDimensions.left && turretDimensions.top + topMin >= characterDimensions.top){
        console.log('withinRange!');
        return true;
    }
    return false;
}
function enemyRotate(index){
    var turret = Array.from(document.getElementsByClassName('turret'))[index];
    var direction = turretPostion(turret);
    var result;
    var rotationTime = 100;
    var timedRotation = setInterval(()=>{
        result = rotate(turret, direction);
        if(!result){
            clearInterval(timedRotation);
        }
    }, rotationTime);
}
function turretPostion(turret){
    var turretDim = getDimensions(turret);
    var characterDim = getDimensions(character);
    var direction;
    if(characterDim.left < turretDim.left && characterDim.top < turretDim.top){
        direction = 'north-west';
    }
    else if(characterDim.left > turretDim.right && characterDim.top < turretDim.top){
        direction = 'north-east';
    }
    else if(characterDim.left < turretDim.left && characterDim.top > turretDim.bottom){
        direction = 'south-west';
    }
    else if(characterDim.left > turretDim.right && characterDim.top > turretDim.top){
        direction = 'south-east';
    }
    else if(turretDim.left < characterDim.left && characterDim.left < turretDim.right && characterDim.top < turretDim.top){
        direction = 'north';
    }
    else if(turretDim.left < characterDim.left && characterDim.left < turretDim.right && characterDim.top > turretDim.top){
        direction = 'south';
    }
    else if(characterDim.top > turretDim.top && characterDim.top < turretDim.bottom && characterDim.left < turretDim.left){
        direction = 'west';
    }
    else{
        direction = 'east';
    }
    return direction;
}