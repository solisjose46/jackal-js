//enemy behavior
var enemyInterval = 250;

setInterval(() => {
    enemyShooting();
    //console.log('run enemy script');
}, enemyInterval);

function enemyShooting(){
    //var turrets = Array.from(document.getElementsByClassName('turrets'));

    //console.log('enemyShooting: testing withinRange: ' + withinRange());
    //console.log('b4 rotate');
    //enemyRotate(i);
    //enemyShoot(i);
}
function withinRange(){
    var rangeSquares = Array.from(document.getElementsByClassName('rangeSquares'))
    for(var i = 0; i < rangeSquares.length; i++){
        if(collision(character, rangeSquares[i])){
            return true;
        }
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