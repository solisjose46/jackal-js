var game = document.getElementById('game');
var view = document.getElementById('view');
var stage = document.getElementById('stage');
//var character = document.getElementById('character');
var character = {
    position: 0,
    img: document.getElementById('character').src,
    box: document.getElementById('characterbox')
};
//var charbox = document.getElementById('characterbox');
var tanklib = ['blue-n.png', 'blue-ne.png', 'blue-e.png', 'blue-se.png', 'blue-s.png', 'blue-sw.png', 'blue-w.png', 'blue-nw.png'];
//                  0           1               2               3           4               5               6               7
var BOUND_TOP = -105; //in px
var BOUND_BOTTOM = -888;

//w (0), a (1), s (2), d (3), w+d (4), w+a (5), s+d (6), s+a (7)
var keys = [false, false, false, false, false, false, false, false];

var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.key] = e.type == 'keydown';
    /* insert conditional here */
    if(map['w'] && map['d']){
        
    }
    else if(map['w'] && map['a']){
        
    }
    else if(map['s'] && map['d']){
        
    }
    else if(map['s'] && map['a']){
        
    }
    else if(map['w'] && !keys[0]){
        timer(0, 'north');
    }
    else if(map['a'] && !keys[1]){
        timer(1, 'west');
    }
    else if(map['s'] && !keys[2]){
        timer(2, 'south');
    }
    else if(map['d'] && !keys[3]){
        timer(3, 'east');
    }
}

//must hold down key for a second before movement is allowed in that direction
function timer(key, dir){
    key[key] = true;
    var min = Date.now() + 1000;
    var testing = setInterval(() => {
        window.addEventListener('keyup', ()=>{
            clearInterval(testing);
            keys[key] = false;
        });
        if(Date.now() > min){
            //console.log('moving: ' + dir);
            move(dir);
        }
    }, 25);
}

function move(dir){
    var position = character.position;
    
}



function move(dir){
    var img = character.src;
    var position;
    for(var i=0; i < tanklib.length; i++){
        var searching = img.search(tanklib[i]);
        if(searching != -1){
            position = i;
            break;
        }
    } 
    if(position == 0 || position == 7 || position == 1){
        moveY('up');
        if(position == 7){
            moveX('left');
        }
        else if(position == 1){
            moveX('right');
        }
    }
    else if(position == 6){
        moveX('left');
    }
    else if(position == 2){
        moveX('right');
    }
}

function moveY(dir){
    var str = window.getComputedStyle(stage);
    str = str.getPropertyValue('margin-top');
    str = str.replace('px', '')
    str = parseInt(str);
    if(dir=='up'){
        if(str < BOUND_TOP){
            str = str + 5;
            stage.style.marginTop = str + 'px';
        }
    }
    else{ //down
        if(str > BOUND_BOTTOM){
            str = str - 5;
            stage.style.marginTop = str + 'px';
        }
    }
}

function moveX(dir){
    var str = window.getComputedStyle(charbox);
    str = str.getPropertyValue('left');
    str = str.replace('px', '')
    str = parseInt(str);
    if(dir == 'left'){
        str = str - 6;
    }
    else{
        str = str + 6;
    }
    charbox.style.left = str + 'px';
}

function rotate(direction){
    var img = character.src;
    for(var i=0; i < tanklib.length; i++){
        var searching = img.search(tanklib[i]);
        if(searching != -1 && direction == 'D'){
            if(i==7){
                img = tanklib[0];
            }
            else{
                img = tanklib[ i + 1];
            }
            break;
        }
        else if(searching != -1 && direction == 'A'){
            if(i==0){
                img = tanklib[7];
            }
            else{
                img = tanklib[ i - 1];
            }
            break;
        }
    }
    character.src = './tanks/' + img;
}