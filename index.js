//constructor(html, image, role, direction, speedLimit, library)
// var temp = document.createElement('DIV');
// temp.className = 'mapObjects';
// var tempImg = document.createElement('IMG');
// tempImg.src = 'tanks/blue-n.png'
// temp.appendChild(tempImg);
// temp.style.height = '30px';
// temp.style.width = '30px';
// temp.style.top = '2500px';
// temp.style.left = '150px';
// game.appendChild(temp);
// var role = 'character';
// var direction = 'north';
// var speedLimit = 10;
// var player = new Player(temp, tempImg, role, direction, speedLimit, tankLibrary);


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