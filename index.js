//window.addEventListener('load', loadObjects());
var playerObstacles = ['removable', 'turret', 'nonremovable'];
var turretObstacles = ['player', 'removable', 'nonremovable'];
var player = new Player(30, 30, 256, 2728, playerObstacles);
var door = new GameObject(32, 80, 312, 2111, 'assets/environment/infrastructure/broken-door.png', 'removable', null);
var turret = new Turret(97, 2495, turretObstacles);
var nonremove = new GameObject(30, 40, 160, 95, '', 'nonremovable', null);
mapObjects.push(player);
mapObjects.push(door);
mapObjects.push(turret);
mapObjects.push(nonremove);
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