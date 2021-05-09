var game = document.getElementById('game');
var view = document.getElementById('view');
var stage = document.getElementById('stage');

var img = document.getElementById('character');
var box = document.getElementById('characterbox');

var character = {
    position: 'north',
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
    if(map[' ']){
        shootRocket();
        rocketStatus = true;
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
            moveY('north');
            if(dir == 'north-west'){
                moveX('west');
            }
            else if(dir == 'north-east'){
                moveX('east');
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

//----main character shooting

var rocketStatus = false;

var rocketlib = [
    {
        direction: 'south-west',
        img: 'assets/weapons/rocket-sw.png'
    },
    {
        direction: 'west',
        img: 'assets/weapons/rocket-w.png'
    },
    {
        direction: 'north-west',
        img: 'assets/weapons/rocket-nw.png'
    },
    {
        direction: 'north',
        img: 'assets/weapons/rocket-n.png'
    },
    {
        direction: 'north-east',
        img: 'assets/weapons/rocket-ne.png'
    },
    {
        direction: 'east',
        img: 'assets/weapons/rocket-e.png'
    },
    {
        direction: 'south-east',
        img: 'assets/weapons/rocket-se.png'
    },
    {
        direction: 'south',
        img: 'assets/weapons/rocket-s.png'
    }
];

function shootRocket(){
    if(!rocketStatus){
        var rocket = document.createElement('DIV');
        var rocketimg = document.createElement('IMG');

        var position = tanklib.indexOf(tanklib.find(({direction}) => direction === character.position));

        rocketimg.src = rocketlib[position].img;
        rocket.appendChild(rocketimg);

        rocket.style.width = '12px';
        rocket.style.height = '12px';

        rocket.style.position = 'relative';

        var num_left = parseInt(window.getComputedStyle(box).left.replace('px', ''));
        var num_top = parseInt(window.getComputedStyle(box).top.replace('px', ''));

        num_top = num_top - 35;
        num_left = num_left + 6;

        rocket.style.left = num_left + 'px';
        rocket.style.top = num_top + 'px';

        view.appendChild(rocket);

        var flight_time = Date.now() + 1200;
        //redundant code I know, will reduce later. First get things to work
        var flight_path = character.position;
        var flying = setInterval(()=>{
            if(flight_path == 'west'){
                num_left-=10;
                rocket.style.left = num_left + 'px';
            }
            else if(flight_path == 'east'){
                num_left+=10;
                rocket.style.left = num_left + 'px';
            }
            else if(flight_path == 'north' || flight_path == 'north-west' || flight_path == 'north-east'){
                num_top-=10;
                if(flight_path == 'north-west'){
                    num_left-=10;
                }
                else if(flight_path == 'north-east'){
                    num_left+=10;
                }
                rocket.style.top = num_top + 'px';
                rocket.style.left = num_left + 'px';
            }
            else{
                num_top+=10;
                if(flight_path == 'south-west'){
                    num_left-=10;
                }
                else if(flight_path == 'south-east'){
                    num_left+=10;
                }
                rocket.style.top = num_top + 'px';
                rocket.style.left = num_left + 'px';
            }
            if(Date.now() > flight_time){
                clearInterval(flying);
                var explosion = document.createElement('DIV');
                var explosionimg = document.createElement('IMG');
                explosionimg.src = 'assets/environment/explosions/explosion.gif';
                explosion.appendChild(explosionimg);
                explosion.style.width = '30px';
                explosion.style.height = '30px';
                explosion.style.position = 'relative';
                explosion.style.left = window.getComputedStyle(rocket).left;
                explosion.style.top = window.getComputedStyle(rocket).top;
                rocket.remove();
                view.appendChild(explosion);
                //add audio
                setTimeout(()=>{
                    explosion.remove();
                },700);
                rocketStatus = false;
            }
        }, 100);
    }
}