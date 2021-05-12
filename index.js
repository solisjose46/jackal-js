document.addEventListener('load', loadEnemies());
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
        character.rocketStatus = true;
    }
}

function move(dir){
    if(dir != character.position){
        var position = tank_lib.indexOf(tank_lib.find(({direction}) => direction === character.position));
        var right = false;
        var curr_position = position;
        var MIN_TURNS = 4;
        for(var i=0; i < MIN_TURNS; i++){
            if(curr_position != 7){
                curr_position++;
            }
            else{
                curr_position = 0;
            }
            if(tank_lib[curr_position].direction == dir){
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
        character.position = tank_lib[position].direction;
        character_img.src = tank_lib[position].img;
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
//fix this for new stage, move faster
function moveX(dir){
    var num_character_style = parseInt(window.getComputedStyle(character_container).left.replace('px', ''));
    var BOUNDS = {
        right: 490,
        left: 0
    }

    var SPEED_LIMIT = 5;
    
    if(dir == 'east'){
        if(num_character_style < BOUNDS.right){
            num_character_style+=SPEED_LIMIT;
            character_container.style.left = num_character_style + 'px';
        }
    }
    else{
        if(num_character_style > BOUNDS.left){
            num_character_style-=SPEED_LIMIT;
            character_container.style.left = num_character_style + 'px';
        }
    }
}
//fix this for new stage, move faster
function moveY(dir){
    var num_stage_style = parseInt(window.getComputedStyle(stage).top.replace('px', ''));
    var num_view_style = parseInt(window.getComputedStyle(view).top.replace('px', ''));
    var num_character_style = parseInt(window.getComputedStyle(character_container).top.replace('px', ''));

    var BOUNDS = {
        stage_bottom: -2570,
        stage_top: 0,
        view_bottom: 200,
        view_center_top: 100,
        view_top: 0,
        character_bottom: 75,
        character_center_top: 40,
        character_top: 0
    }

    var SPEED_LIMIT = 5;

    if(dir == 'north'){
        if(num_character_style > BOUNDS.character_center_top){
            num_character_style-=SPEED_LIMIT;
            character_container.style.top = num_character_style + 'px';
        }
        else if(num_view_style > BOUNDS.view_center_top){
            num_view_style-=SPEED_LIMIT;
            view.style.top = num_view_style + 'px';
        }
        else if(num_stage_style < BOUNDS.stage_top){
            num_stage_style+=SPEED_LIMIT;
            stage.style.top = num_stage_style + 'px';
        }
        else if(num_view_style > BOUNDS.view_top){
            num_view_style-=SPEED_LIMIT;
            view.style.top = num_view_style + 'px';
        }
        else if (num_character_style > BOUNDS.character_top){
            num_character_style-=SPEED_LIMIT;
            character_container.style.top = num_character_style + 'px';
        }
    }
    else{
        if(num_character_style < BOUNDS.character_center_top){
            num_character_style+=SPEED_LIMIT;
            character_container.style.top = num_character_style + 'px';
        }
        else if(num_view_style < BOUNDS.view_center_top){
            num_view_style+=SPEED_LIMIT;
            view.style.top = num_view_style + 'px';
        }
        else if(num_stage_style > BOUNDS.stage_bottom){
            num_stage_style-=SPEED_LIMIT;
            stage.style.top = num_stage_style + 'px';
        }
        else if(num_view_style < BOUNDS.view_bottom){
            num_view_style+=SPEED_LIMIT;
            view.style.top = num_view_style + 'px';
        }
        else if(num_character_style < BOUNDS.character_bottom){
            num_character_style+=SPEED_LIMIT;
            character_container.style.top = num_character_style + 'px';
        }
    }
}
//----main character shooting
function shootRocket(){
    if(!character.rocketStatus){
        var rocket = document.createElement('DIV');
        rocket.id = 'rocket';
        var rocket_img = document.createElement('IMG');

        var position = tank_lib.indexOf(tank_lib.find(({direction}) => direction === character.position));

        rocket_img.src = rocket_lib[position].img;
        rocket.appendChild(rocket_img);

        rocket.style.width = '12px';
        rocket.style.height = '12px';
        rocket.style.position = 'absolute';

        var num_left = parseInt(window.getComputedStyle(character_container).left.replace('px', ''));
        var num_top = getCharacterOnStagePosition();

        rocket.style.left = num_left + 'px';
        rocket.style.top = num_top + 'px';

        stage.appendChild(rocket);

        //----------------wtf-----------------------------------wtf-----------------------------------wtf-----------------------------------wtf-------------------
        var DURATION = 1000; //ms
        var INTERVAL_TIME = 100; //ms

        var flight_path = character.position;
        var flight_time;
        
        var intervalX; // x axis
        var intervalY;

        if(flight_path == 'north' || flight_path == 'south'){
            intervalX = 0;
            intervalY = 14; //px
            //intervalY = 25;
        }
        else if(flight_path == 'east' || flight_path == 'west'){
            intervalX = 14; //px
            intervalY = 0;
        }
        else{
            intervalX = 10; //px
            intervalY = 10; //px
        }

        var rocketX = (DURATION/INTERVAL_TIME) * intervalX; //distance traveled in x axis
        var rocketY = (DURATION/INTERVAL_TIME) * intervalY; //distance traveled in y axis
        
        var collision = withinRange(rocketX, rocketY, flight_path);
        var collision_time;

        if(flight_path == 'north' || flight_path == 'south'){
            collision_time = Math.floor(((INTERVAL_TIME/intervalY) * collision.distanceY));
            console.log('time to collide: ' + collision_time);
        }
        else if(flight_path == 'east' || flight_path == 'west'){
            collision_time = Math.floor(((INTERVAL_TIME/intervalX) * collision.distanceX));
            console.log('time to collide: ' + collision_time);
        }
        else{
            var square = 2;
            var intervalC = Math.sqrt(Math.floor(Math.pow(intervalX, square) + Math.pow(intervalY, square)));
            var distanceC = Math.sqrt(Math.floor(Math.pow(collision.distanceX, square) + Math.pow(collision.distanceY, square)));
            collision_time = Math.floor((INTERVAL_TIME/intervalC) * distanceC);
            console.log('time to collide: ' + collision_time);
            console.log('interval c: ' + intervalC);
            console.log('distance c: ' + distanceC);
        }
        
        if(collision.status == true){
            flight_time = Date.now() + collision_time;
        }
        else{
            flight_time = Date.now() + DURATION;
        }

        var flying = setInterval(()=>{
            if(flight_path == 'north' || flight_path == 'north-east' || flight_path == 'north-west'){
                num_top-=intervalY;
                if(flight_path == 'north-east'){
                    num_left+=intervalX;
                }
                else if(flight_path == 'north-west'){
                    num_left-=intervalX;
                }
            }
            else if(flight_path == 'south' || flight_path == 'south-east' || flight_path == 'south-west'){
                num_top+=intervalY;
                if(flight_path == 'south-east'){
                    num_left+=intervalX;
                }
                else if(flight_path == 'south-west'){
                    num_left-=intervalX;
                }
            }
            else if(flight_path == 'west'){
                num_left-=intervalX;
            }
            else if(flight_path == 'east'){
                num_left+=intervalX;
            }
            rocket.style.top = num_top + 'px';
            rocket.style.left = num_left + 'px';
            if(Date.now() > flight_time){
                clearInterval(flying);
                var explosion = document.createElement('DIV');
                var explosion_img = document.createElement('IMG');
                explosion_img.src = 'assets/environment/explosions/explosion.gif';
                explosion.appendChild(explosion_img);
                explosion.style.width = '30px';
                explosion.style.height = '30px';
                explosion.style.position = 'absolute';
                explosion.style.left = window.getComputedStyle(rocket).left;
                explosion.style.top = window.getComputedStyle(rocket).top;
                rocket.remove();
                stage.appendChild(explosion);
                setTimeout(()=>{
                    if(collision.status == true){
                        console.log('BOOM!');
                        var turret = document.getElementsByClassName('turret')[collision.index];
                        console.log('destroyed ' + turret.style.left + ' ' + turret.style.top);
                        console.log('character ' + window.getComputedStyle(character_container).left + ' ' + window.getComputedStyle(character_container).top);
                        turret.remove();
                    }
                    else{
                        console.log('miss');
                    }
                    explosion.remove();
                    character.rocketStatus = false;
                },500);
            }
        }, INTERVAL_TIME);      
//----------------wtf-----------------------------------wtf-----------------------------------wtf-----------------------------------wtf-------------------
    }
}

function withinRange(rocketX, rocketY, direction){

    var toReturn = {
        status: false, //did it hit?
        index: null, //which turret did it hit?
        distanceX: null,
        distanceY: null
    };

    var turrets = Array.from(document.getElementsByClassName('turret'));
    var character_left = parseInt(window.getComputedStyle(character_container).left.replace('px', ''));
    var character_top = getCharacterOnStagePosition();

    var index;

    for(var i = 0; i < turrets.length; i++){
        var turret_left = parseInt(window.getComputedStyle(turrets[i]).left.replace('px', ''));
        var turret_right = parseInt(window.getComputedStyle(turrets[i]).width.replace('px', '')) + turret_left;
        var turret_top = parseInt(window.getComputedStyle(turrets[i]).top.replace('px', ''));
        var turret_bottom = parseInt(window.getComputedStyle(turrets[i]).height.replace('px', '')) + turret_top;

        var differenceX;
        var differenceY;

        if(direction == 'north' || direction == 'south'){
            if((direction == 'north' && character_top < turret_top) || (direction == 'south' && character_top > turret_top)){
                continue;
            }
            else{
                differenceX = 0;
                if(direction == 'north'){
                    differenceY = character_top - turret_top;
                }
                else{
                    differenceY = turret_top - character_top;
                }
            }
            if(turret_left <= character_left && character_left <= turret_right && rocketY > differenceY){
                index = i;
                toReturn.distanceY = differenceY;
                break;
            }
        }
        else if(direction == 'west' || direction == 'east'){
            if((direction == 'west' && character_left < turret_left) || (direction == 'east' && character_left > turret_left)){
                continue;
            }
            else{
                differenceY = 0;

                if(direction == 'west'){
                    differenceX = character_left - turret_left;
                }
                else{
                    differenceX = turret_left - character_left;
                }
                if((turret_top <= character_top && character_top <= turret_bottom) && rocketX > differenceX){
                    console.log('hit!');
                    index = i;
                    toReturn.distanceX = differenceX;
                    break;
                }
            }
        }
        else{
            var nw_bool = (direction == 'north-west' && !(character_left > turret_left && character_top > turret_top));
            var ne_bool = (direction == 'north-east' && !(character_left < turret_left && character_top > turret_top));
            var sw_bool = (direction == 'south-west' && !(character_left > turret_left && character_top < turret_top));
            var se_bool = (direction == 'south-east' && !(character_left < turret_left && character_top < turret_top));
            if(nw_bool || ne_bool || sw_bool || se_bool){
                continue;
            }
            if(direction == 'north-west' || direction == 'north-east'){
                differenceY = character_top - turret_top;
                if(direction == 'north-west'){
                    differenceX = character_left - turret_left;
                }
                else{
                    differenceX = turret_left - character_left;
                }
            }
            else{
                differenceY = turret_top - character_top;
                if(direction == 'south-west'){
                    differenceX = character_left - turret_left;
                }
                else{
                    differenceX = turret_left - character_left;
                }
            }
            if(rocketX > differenceX && rocketY > differenceY){
                console.log('hit!');
                index = i;
                toReturn.distanceX = differenceX;
                toReturn.distanceY = differenceY;
                break;
            }
        }
    }

    if(typeof index != 'undefined'){
        toReturn.status = true;
        toReturn.index = index;
    }
    else{
        console.log('undefined');
    }

    return toReturn;
}