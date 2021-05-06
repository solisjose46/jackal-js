var game = document.getElementById('game');
var view = document.getElementById('view');
var stage = document.getElementById('stage');

var img = document.getElementById('character');
var box = document.getElementById('characterbox');

var character = {
    position: 'north',
    boundTop: false,
    boundBottom: false,
    boundLeft: false,
    boundRight: false,

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

var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.key] = e.type == 'keydown';
    
    if(map['w'] && map['d']){
        move('north-east');
    }
    else if(map['w'] && map['a']){
        move('north-west');
    }
    else if(map['s'] && map['a']){
        move('south-west');
    }
    else if(map['s'] && map['d']){
        move('south-east');
    }
    else if(map['w']){
        move('north');
    }
    else if(map['d']){
        move('east');
    }
    else if(map['s']){
        move('south');
    }
    else if(map['a']){
        move('west');
    }
}

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
    }
    else{
        if(dir == 'north' || dir == 'north-west' || dir == 'north-east'){
            //left off here, prevent character from moving if at bounds
            if(character.boundTop != true){
                moveY('north');
                if(dir == 'north-west'){
                    moveX('west');
                }
                else if(dir == 'north-east'){
                    moveX('east');
                }
            }
            else{
                //make blocked noise
            }
        }
        else if(dir == 'south' || dir == 'south-east' || dir == 'south-west'){
            moveY('south');
            if(dir == 'south-east'){
                moveX('east');
            }
            else if(dir == 'south-west'){
                moveX('west');
            }
        }
        else if(dir == 'east'){
            moveX('east');
        }
        else{
            moveX('west');
        }
    }
}

function moveX(dir){
    var num_boxstyle = parseInt(window.getComputedStyle(box).left.replace('px', ''));
    if(dir == 'east'){
        if(num_boxstyle < 191){
            num_boxstyle+=5;
            box.style.left = num_boxstyle + 'px';
        }
    }
    else{
        if(num_boxstyle > 0){
            num_boxstyle-=5;
            box.style.left = num_boxstyle + 'px';
        }
    }
}

function moveY(dir){
    var num_stagestyle = parseInt(window.getComputedStyle(stage).marginTop.replace('px', ''));
    var num_viewstyle = parseInt(window.getComputedStyle(view).top.replace('px', ''));
    var num_boxstyle = parseInt(window.getComputedStyle(box).top.replace('px', ''));
    if(dir == 'north'){
        if(num_boxstyle > 37 && num_viewstyle > 199){
            num_boxstyle-=5;
            box.style.top = num_boxstyle + 'px';
        }
        else if(num_viewstyle > 100){
            num_viewstyle-=10;
            view.style.top = num_viewstyle + 'px';
        }
        else if(num_stagestyle < BOUND_TOP){
            num_stagestyle+=10;
            stage.style.marginTop = num_stagestyle + 'px';
        }
        else if(num_viewstyle > 0){
            num_viewstyle-=10;
            view.style.top = num_viewstyle + 'px';
        }
        else if(num_boxstyle > 0){
            num_boxstyle-=5;
            box.style.top = num_boxstyle + 'px';
        }
    }
    else{
        if(num_boxstyle < 37 && num_viewstyle < 199){
            num_boxstyle+=5;
            box.style.top = num_boxstyle + 'px';
        }
        else if(num_viewstyle < 100){
            num_viewstyle+=10;
            view.style.top = num_viewstyle + 'px';
        }
        else if(num_stagestyle > BOUND_BOTTOM){
            num_stagestyle-=10;
            stage.style.marginTop = num_stagestyle + 'px';
        }
        else if(num_viewstyle < 200){
            num_viewstyle+=10;
            view.style.top = num_viewstyle + 'px';
        }
        else if(num_boxstyle < 72){
            num_boxstyle+=5;
            box.style.top = num_boxstyle + 'px';
        }
    }
}