var game = document.getElementById('game-container');
var view = document.getElementById('character-view');
var stage = document.getElementById('stage');
var character_img = document.getElementById('character');
var character_container = document.getElementById('character-container');

var character = {
    position: 'north',
    rocketStatus: false
};

var tank_lib = [
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

var rocket_lib = [
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

var enemies = [
    {
        left: '97px',
        top: '2495px'
    },
    {
        left: '191px',
        top: '2351px'
    },
    {
        left: '95px',
        top: '2191px'
    },
    {
        left: '255px',
        top: '2191px'
    },
    {
        left: '353px',
        top: '2191px'
    },
    {
        left: '193px',
        top: '1119px'
    },
    {
        left: '256px',
        top: '1119px'
    },
    {
        left: '65px',
        top: '911px'
    },
    {
        left: '255px',
        top: '911px'
    },
    {
        left: '289px',
        top: '879px'
    },
    {
        left: '319px',
        top: '845px'
    },
    {
        left: '191px',
        top: '637px'
    },
    {
        left: '320px',
        top: '637px'
    },
    {
        left: '384px',
        top: '637px'
    },
    {
        left: '128px',
        top: '542px'
    }
];

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

function getCharacterOnStagePosition(){
    return Math.abs(parseInt(window.getComputedStyle(stage).top.replace('px', ''))) + parseInt(window.getComputedStyle(view).top.replace('px', '')) + parseInt(window.getComputedStyle(character_container).top.replace('px', ''));
}