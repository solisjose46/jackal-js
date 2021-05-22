var playerObstacles = ['removable', 'turret', 'nonremovable'];
var turretObstacles = ['player', 'nonremovable', 'removable'];

window.addEventListener('load', loadGameObjects());

var player;
var launchPad;
function loadGameObjects(){
    var gameObject;
    for(var i = 0; i < objects.length; i++){
        gameObject = objects[i];
        var pushObject;
        if(i == 0){
            pushObject = new Door(gameObject.height, gameObject.width, gameObject.left, gameObject.top);

        }
        else if(i == 1){
            pushObject = new Pad(gameObject.height, gameObject.width, gameObject.left, gameObject.top, 'assets/environment/infrastructure/landing-pad.gif', 'none', '');
            launchPad = pushObject;
        }
        else if(2 <= i && i <= 16){
            pushObject = new Turret(gameObject.height, gameObject.width, gameObject.left, gameObject.top, turretObstacles);
            // if(i==7 || i==8){
            //     pushObject = new Turret(gameObject.height, gameObject.width, gameObject.left, gameObject.top, turretObstacles.splice(1,1));
                
            // }
            // else{
            //     pushObject = new Turret(gameObject.height, gameObject.width, gameObject.left, gameObject.top, turretObstacles);
            // }
        }
        else if(17 <= i && i <= 47){
            pushObject = new GameObject(gameObject.height, gameObject.width, gameObject.left, gameObject.top, '', 'nonremovable', '');
        }
        else{
            player = new Player(gameObject.height, gameObject.width, gameObject.left, gameObject.top, playerObstacles);
            pushObject = player;
        }
        mapObjects.push(pushObject);
    }
}

var turretTime = 250;
setInterval(() => {
    var turrets = mapObjects.filter(({role}) => role === 'turret');
    for(var i = 0; i < turrets.length; i++){
        turrets[i].turretShoot(player);
    }
    launchPad.victory(player); //checks for victory condition
}, turretTime);

//key handler
var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.key] = e.type == 'keydown';
    e.preventDefault();
    if(map['w'] && map['d']){
        player.moveObject('north-east');
    }
    else if(map['w'] && map['a']){
        player.moveObject('north-west');
    }
    else if(map['s'] && map['d']){
        player.moveObject('south-east');
    }
    else if(map['s'] && map['a']){
        player.moveObject('south-west');
    }
    else if(map['w']){
        player.moveObject('north');
    }
    else if(map['d']){
        player.moveObject('east');
    }
    else if(map['s']){
        player.moveObject('south');
    }
    else if(map['a']){
        player.moveObject('west');
    }
    if(map[' ']){
        player.shootRocket();
    }
}