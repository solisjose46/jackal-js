var game = document.getElementById('game-container');
var view = document.getElementById('character-view');
var stage = document.getElementById('stage');
var character_img = document.getElementById('character');
var character_container = document.getElementById('character-container');

var character = {
    position: 'north',
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

var rocketStatus = false;

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