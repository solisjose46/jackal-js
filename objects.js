var game = document.getElementById('game-container');
var mapObjects = []; //player, removable, none, turret, nonremovable 

class GameObject{
    constructor(height, width, left, top, imageSrc, role, direction){
        this.height = height;
        this.width = width;
        this.left = left;
        this.top = top;
        this.styleHeight = height + 'px';
        this.styleWidth = width + 'px';
        this.styleLeft = left + 'px';
        this.styleTop = top + 'px';

        var div = document.createElement('DIV');
        var image = document.createElement('IMG');
        div.className = 'mapObjects';
        image.src = imageSrc;
        div.appendChild(image);
        div.style.height = this.styleHeight;
        div.style.width = this.styleWidth;
        div.style.left = this.styleLeft;
        div.style.top = this.styleTop;
        game.appendChild(div);

        this.html = div;
        this.image = image;
        this.role = role;
        this.direction = direction;
    }
    //getters
    get getStyles(){
        var toReturn = {
            width: this.styleWidth,
            height: this.styleHeight,
            left: this.styleLeft,
            top: this.styleTop
        };
        return toReturn;
    }
    get getNums(){
        var toReturn = {
            width: this.width,
            heigth: this.height,
            left: this.left,
            top: this.height
        };
        return toReturn;
    }
    get getDirection(){
        return this.direction;
    }
    get getRole(){
        return this.rolel
    }
    //setter
    setLeft(left){
        this.left = left;
        this.styleLeft = this.left + 'px';
        this.html.style.left = this.styleLeft;
    }
    setTop(top){
        this.top = top;
        this.styleTop = this.top + 'px';
        this.html.style.top = this.styleTop;
    }
    changeImage(imageSrc){
        this.image.src = imageSrc;
    }
    setDirection(direction){
        this.direction = direction;
    }
    inBounds(lng, lat){
        //lng = this.left; lat = this.top;
        //credit to: https://rosettacode.org/wiki/Ray-casting_algorithm
        var count = 0;
        for (var b = 0; b < bounds.length; b++) {
            var vertex1 = bounds[b];
            var vertex2 = bounds[(b + 1) % bounds.length];
            if (west(vertex1, vertex2, lng, lat))
                ++count;
        }
        return count % 2;
     
        /**
         * @return {boolean} true if (x,y) is west of the line segment connecting A and B
         */
        function west(A, B, x, y) {
            if (A.y <= B.y) {
                if (y <= A.y || y > B.y ||
                    x >= A.x && x >= B.x) {
                    return false;
                } else if (x < A.x && x < B.x) {
                    return true;
                } else {
                    return (y - A.y) / (x - A.x) > (B.y - A.y) / (B.x - A.x);
                }
            } else {
                return west(B, A, x, y);
            }
        }
    }
};

class Projectile extends GameObject{
    constructor(height, width, left, top, imageSrc, role, direction, speedLimit, obstacles){
        super(height, width, left, top, imageSrc, role, direction);
        this.speedLimit = speedLimit;
        this.obstacleRoles = obstacles; //array of roles to iteract with
        this.obstacles = this.updateObstacles(); //array of array of objects for projectileCollision
    }
    //methods
    updateObstacles(){
        var arr = [];
        for(var i = 0; i < this.obstacleRoles.length; i++){
            arr[i] = mapObjects.filter(({role}) => role === this.obstacleRoles[i]);
        }
        return arr;
    }
    moveX(){
        var newLeft;
        var speedLimit = this.speedLimit;
        if(this.direction.includes('west')){
            speedLimit = this.speedLimit * -1;
        }
        var newLeft = this.left + speedLimit;
        return newLeft;
    }
    moveY(){
        var newTop;
        var speedLimit = this.speedLimit;
        if(this.direction.includes('north')){
            speedLimit = this.speedLimit * -1;
        }
        newTop = this.top + speedLimit;
        return newTop;
    }
    move(){
        var lng; var lat;
        if(this.direction == 'north' || this.direction == 'south'){
            lng = this.left;
            lat = this.moveY();
        }
        else if(this.direction == 'east' || this.direction == 'west'){
            lng = this.moveX();
            lat = this.top;
        }
        else{
            lng = this.moveX();
            lat = this.moveY();
            
        }
        var results = this.projectileCollision();
        if(this.inBounds(lng, lat) == 1 && !results.impact){
            this.setLeft(lng);
            this.setTop(lat);
        }//ol
        return results;
    }
    projectileCollision(){
        var toReturn = {
            impact: false,
            object: null
        };
        var obstacle;
        for(var i = 0; i < this.obstacles.length; i++){
            obstacle = this.obstacles[i];
            for(var j = 0; j < obstacle.length; j++){
                if(this.collision(this, obstacle[j])){
                    toReturn.impact = true;
                    toReturn.object = obstacle[j];
                    return toReturn;
                }
            }
        }
        return toReturn;
    }
    collision(object1, object2){
        var rectangleOne = object1.getNums;
        var rectangleTwo = object2.getNums;
        if (rectangleOne.left < rectangleTwo.right && rectangleOne.right > rectangleTwo.left && rectangleOne.top < rectangleTwo.bottom && rectangleOne.bottom > rectangleTwo.top) {
            return true; //collision detected
        }
        return false;        
    }
};

class Shooter extends Projectile{
    constructor(height, width, left, top, imageSrc, role, direction, speedLimit, obstacles, library){
        super(height, width, left, top, imageSrc, role, direction, speedLimit, obstacles);
        this.library = library;
    }
    rotate(direction){
        if(this.direction != direction){
            var position = this.library.indexOf(this.library.find(({direction}) => direction === this.direction));
            var right = false;
            var currentPosition = position;
            var minTurns = 4;
            for(var i=0; i < minTurns; i++){
                if(currentPosition != 7){
                    currentPosition++;
                }
                else{
                    currentPosition = 0;
                }
                if(this.library[currentPosition].direction == direction){
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
            this.direction = this.library[position].direction;
            this.changeImage(this.library[position].img);
            return false;
        }
        return true;
    }
    moveObject(direction){
        if(this.rotate(direction)){
            this.move(this.direction);
        }
    }
    shoot(rocketImage){
        //constructor(left, top, imageSrc, direction, obstacles)
        var rocket = new Rocket(this.left, this.top, rocketImage, this.direction, this.obstacleRoles);
        rocket.flight();
    }
};

class Rocket extends Projectile{
    //constructor(height, width, left, top, imageSrc, role, direction, speedLimit, obstacles)
    constructor(left, top, imageSrc, direction, obstacles){
        super(10, 10, left, top, imageSrc, null, direction, 18, obstacles);
        this.shooter = shooter;
    }
    flight(){
        var timeInterval = 100; //ms
        var minTime = Date.now() + 1100;
        var flightResults;
        var flightInterval = setInterval(()=>{
            flightResults = this.move();
            if(Date.now() > minTime || flightResults.impact){
                clearInterval(flightInterval);
                if(flightResults.impact){
                    if(flightResults.object.role == 'player'){
                        console.log('player hit');
                    }
                    else if((flightResults.object.role == 'turret' || flightResults.object.role == 'removable') && this.shooter == 'player'){
                        if(flightResults.object.role == 'removable'){
                            flightResults.object.style.display = 'block'; //door display is none
                        }
                        mapObjects.splice(mapObjects.indexOf(flightResults.object)); //remove from
                    }
                    this.explode();
                }
            }
        }, timeInterval);
    }
    explode(){
        var explosion = new GameObject(30, 30, this.left, this.top, 'assets/environment/explosions/explosion.gif', null);
        var explosionTime = 500;
        setTimeout(()=>{
            explosion.html.remove();
            explosion = null;
        }, explosionTime);
    }
};

class Player extends Shooter{
    //constructor(height, width, left, top, imageSrc, role, direction, speedLimit, obstacles, library)
    constructor(height, width, left, top, obstacles){
        super(height, width, left, top, 'tanks/blue-n.png', 'player', 'north', 12, obstacles, tankLibrary);
    }
    shootRocket(){
        //pass parameters to shoot
        var rocketImage = rocketLibrary.find(({direction}) => direction === this.direction);
        this.shoot(rocketImage.img);
        this.obstacles = this.updateObstacles();
    }
};

class Turret extends Shooter{
    //constructor(height, width, left, top, imageSrc, role, direction, speedLimit, obstacles, library)
    constructor(left, top, obstacles){
        //temp height and width
        super(30, 30, left, top, 'enemies/turret-s.png', 'turret', 'south', null, obstacles, turretLibrary);
    }
};