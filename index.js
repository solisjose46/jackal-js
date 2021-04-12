//lots of redundant code, will consolidate later
var game = document.getElementById('game');
var view = document.getElementById('view');
var stage = document.getElementById('stage');
var character = document.getElementById('character');
var tanklib = ['blue-n.png', 'blue-ne.png', 'blue-e.png', 'blue-se.png', 'blue-s.png', 'blue-sw.png', 'blue-w.png', 'blue-nw.png'];
var BOUND_TOP = -105; //in px
var BOUND_BOTTOM = -888;

document.addEventListener('keydown', keyDownHandler);

function movingUp(){
    var str = window.getComputedStyle(stage);
    str = str.getPropertyValue('margin-top');
    str = str.replace('px', '')
    str = parseInt(str);

    if(str < BOUND_TOP){
        str = str+=5;
        stage.style.marginTop = str + 'px';
    }
    else{
        console.log("view at end");
    }

}

function movingDown(){
    var str = window.getComputedStyle(stage);
    str = str.getPropertyValue('margin-top');
    str = str.replace('px', '')
    str = parseInt(str);

    if(str > BOUND_BOTTOM){
        str = str-=5;
        stage.style.marginTop = str + 'px';
    }
    else{
        console.log("view at end");
    }
}

function movingLeft(){
    var img = character.src;
    
    for(var i=0; i < tanklib.length; i++){
        var searching = img.search(tanklib[i]);
        if(searching != -1){
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
function movingRight(){
    var img = character.src;
    for(var i=0; i < tanklib.length; i++){
        var searching = img.search(tanklib[i]);
        if(searching != -1){
            if(i==7){
                img = tanklib[0];
            }
            else{
                img = tanklib[ i + 1];
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
            movingUp();
            break;
        case 'A':
            movingLeft();
            break;
        case 'S':
            movingDown();
            break;
        case 'D':
            movingRight();
            break;        
    }
}