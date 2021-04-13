var game = document.getElementById('game');
var view = document.getElementById('view');
var stage = document.getElementById('stage');
var character = document.getElementById('character');
var charbox = document.getElementById('characterbox');
var tanklib = ['blue-n.png', 'blue-ne.png', 'blue-e.png', 'blue-se.png', 'blue-s.png', 'blue-sw.png', 'blue-w.png', 'blue-nw.png'];
//                  0           1               2               3           4               5               6               7
var BOUND_TOP = -105; //in px
var BOUND_BOTTOM = -888;

document.addEventListener('keydown', keyDownHandler);

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

function move(){
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
//gtg
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

function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

    switch(keyPressed){
        case 'W':
            move('W');
            break;
        case 'A':
            rotate('A');
            break;
        case 'S':
            //move('');
            break;
        case 'D':
            rotate('D');
            break;        
    }
}