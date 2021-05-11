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

    //var SPEED_LIMIT = 5;
    var SPEED_LIMIT = 20; //temp
    
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

    //var SPEED_LIMIT = 5;
    var SPEED_LIMIT = 20; //temp

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
//need faster rocket and longer range
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
        var num_top = Math.abs(parseInt(window.getComputedStyle(stage).top.replace('px', ''))) + parseInt(window.getComputedStyle(view).top.replace('px', '')) + parseInt(window.getComputedStyle(character_container).top.replace('px', ''));

        rocket.style.left = num_left + 'px';
        rocket.style.top = num_top + 'px';

        stage.appendChild(rocket);

        var flight_time = Date.now() + 1100;
        //var flight_time = Date.now() + 1500;
        var flight_path = character.position;
        //var ROCKET_SPEED = 10;
        var ROCKET_SPEED = 20; //px
        var INTERVAL_TIME = 100; //ms

        var flying = setInterval(()=>{
            if(flight_path == 'west'){
                num_left-=ROCKET_SPEED;
                rocket.style.left = num_left + 'px';
            }
            else if(flight_path == 'east'){
                num_left+=ROCKET_SPEED;
                rocket.style.left = num_left + 'px';
            }
            else if(flight_path == 'north' || flight_path == 'north-west' || flight_path == 'north-east'){
                num_top-=ROCKET_SPEED;
                if(flight_path == 'north-west'){
                    num_left-=ROCKET_SPEED;
                }
                else if(flight_path == 'north-east'){
                    num_left+=ROCKET_SPEED;
                }
                rocket.style.top = num_top + 'px';
                rocket.style.left = num_left + 'px';
            }
            else{
                num_top+=ROCKET_SPEED;
                if(flight_path == 'south-west'){
                    num_left-=ROCKET_SPEED;
                }
                else if(flight_path == 'south-east'){
                    num_left+=ROCKET_SPEED;
                }
                rocket.style.top = num_top + 'px';
                rocket.style.left = num_left + 'px';
            }
            //loop to detect hit on enemies
            var impact = collision();
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
                //add audio
                setTimeout(()=>{
                    explosion.remove();
                },500);
                character.rocketStatus = false;
            }
            if(impact.status){
                //use found class position to remove enemy
                var turret = document.getElementsByClassName('turret')[impact.position];
                turret.remove();
                console.log('boom!');
            }
            else{
                console.log('miss');
            }
        }, INTERVAL_TIME);
    }
}
//enemies
function loadEnemies(){
    for(var i = 0; i < enemies.length; i++){
        var temp_container = document.createElement('DIV');
        var temp_img = document.createElement('IMG');
        temp_img.src = "enemies/turret-s.png";
        temp_container.appendChild(temp_img);
        temp_container.classList.add('turret');
        temp_container.style.left = enemies[i].left;
        temp_container.style.top = enemies[i].top;
        stage.appendChild(temp_container);
    }
}

function collision(){
    var toReturn = {
        status: false,
        position: null
    };

    var position = findTurret();
    if(typeof position != 'undefined'){
        toReturn.status = true;
        toReturn.position = position;
    }
    return toReturn;
}
//helper function
function findTurret(){
    var turrets = Array.from(document.getElementsByClassName('turret'));

    var rocket = document.getElementById('rocket');
    var rocket_left = parseInt(window.getComputedStyle(rocket).left.replace('px', ''));
    var rocket_top = parseInt(window.getComputedStyle(rocket).top.replace('px', ''));

    for(var i = 0; i < turrets.length; i++){
        var turret_left = parseInt(window.getComputedStyle(turrets[i]).left.replace('px', ''));
        var turret_right = turret_left + parseInt(window.getComputedStyle(turrets[i]).width.replace('px', ''));
        var turret_top = parseInt(window.getComputedStyle(turrets[i]).top.replace('px', ''));
        var turret_bottom = turret_top + parseInt(window.getComputedStyle(turrets[i]).top.replace('px', ''));

        if(turret_left <= rocket_left && rocket_left <= turret_right && turret_top <= rocket_top && rocket_top <= turret_bottom){
            return i;
        }
    }
    return undefined;
}