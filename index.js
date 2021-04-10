var game = document.getElementById('game');
var view = document.getElementById('view');
var stage = document.getElementById('stage');
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
}

function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

    switch(keyPressed){
        case 'W':
            movingUp();
            break;
        case 'A':
            console.log(keyPressed);
            break;
        case 'S':
            movingDown();
            break;
        case 'D':
            console.log(keyPressed);
            break;        
    }
}