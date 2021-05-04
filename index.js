var game = document.getElementById('game');
var view = document.getElementById('view');
var stage = document.getElementById('stage');

var img = document.getElementById('character');
var box = document.getElementById('characterbox');

var character = {
    position: 'north',
    moving: false
};

var tanklib = [
    {
        direction: 'south-west',
        img: 'tanks/blue-sw.png'
    },
    {
        direction: 'west',
        img: 'tanks/blue-w.png'
    },
    {
        direction: 'north-west',
        img: 'tanks/blue-nw.png'
    },
    {
        direction: 'north',
        img: 'tanks/blue-n.png'
    },
    {
        direction: 'north-east',
        img: 'tanks/blue-ne.png'
    },
    {
        direction: 'east',
        img: 'tanks/blue-e.png'
    },
    {
        direction: 'south-east',
        img: 'tanks/blue-se.png'
    },
    {
        direction: 'south',
        img: 'tanks/blue-s.png'
    }
];

var BOUND_TOP = -105; //in px
var BOUND_BOTTOM = -888;

var MIN_TURNS = 4;

//w (0), a (1), s (2), d (3), w+d (4), w+a (5), s+d (6), s+a (7)
//var keys = [false, false, false, false, false, false, false, false];

var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.key] = e.type == 'keydown';
    /* insert conditional here */
    if(map['w']){
        move('north');
    }
    else if(map['d']){
        move('east');
    }
    else if(map['s']){
        move('south');
    }
    else if(map['a']){
        move('west')
    }
}

//must hold down key for a second before movement is allowed in that direction
// function timer(key, dir){
//     key[key] = true;
//     var min = Date.now() + 1000;
//     var testing = setInterval(() => {
//         window.addEventListener('keyup', ()=>{
//             clearInterval(testing);
//             keys[key] = false;
//         });
//         if(Date.now() > min){
//             move(dir);
//         }
//     }, 25);
// }

function move(dir){

    if(dir != character.position){
        var position = tanklib.indexOf(tanklib.find(({direction}) => direction === character.position));
        var right = false;
        var curr_position = position;
        for(var i=0; i < MIN_TURNS; i++){
            if(curr_position != 7){
                curr_position++;
            }
            else{
                curr_position = 0;
            }
            if(tanklib[curr_position].direction == dir){
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
        character.position = tanklib[position].direction;
        img.src = tanklib[position].img;
        console.log(character.position);
    }
    else{
        //moveX and moveY
    }
}

function moveX(){

}
function moveY(){

}