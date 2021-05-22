var game = document.getElementById('game-container');
var mapObjects = [];

class GameObject{
    constructor(height, width, left, top, imageSrc, role, direction){
        this.height = height;
        this.width = width;
        this.left = left;
        this.right = this.left + this.width;
        this.top = top;
        this.bottom = this.top + this.height;

        var div = document.createElement('DIV');
        div.className = 'mapObjects';
        var image = document.createElement('IMG');
        //image.className = 'mapObjects';
        image.src = imageSrc;
        div.appendChild(image);
        
        div.style.height = height + 'px';
        div.style.width = width + 'px';
        div.style.left = left + 'px';
        div.style.top = top + 'px';
        game.appendChild(div);

        this.html = div;
        this.image = image;
        this.role = role;
        this.direction = direction;
    }
    //getters
    get getNums(){
        var toReturn = {
            width: this.width,
            heigth: this.height,
            left: this.left,
            right: this.left + this.width,
            top: this.top,
            bottom: this.top + this.height
        };
        return toReturn;
    }
    get getDirection(){
        return this.direction;
    }
    get getRole(){
        return this.role;
    }
    //setter
    setLeft(left){
        this.left = left;
        this.html.style.left = left + 'px';
    }
    setTop(top){
        this.top = top;
        this.html.style.top = top + 'px';
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
    constructor(height, width, left, top, imageSrc, role, direction, speedLimit, obstacleRoles){
        super(height, width, left, top, imageSrc, role, direction);
        this.speedLimit = speedLimit;
        this.obstacleRoles = obstacleRoles; //array of roles to iteract with
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
        var results = this.projectileCollision(lng, (lng + this.width), lat, (lat + this.height));
        if(this.inBounds(lng, lat) == 1 && !results.impact){
            this.setLeft(lng);
            this.setTop(lat);
        }
        return results;
    }
    projectileCollision(left, right, top, bottom){
        var toReturn = {
            impact: false,
            object: null
        };
        var obstacles = this.updateObstacles();
        for(var i = 0; i < obstacles.length; i++){
            var obstacle = obstacles[i];
            for(var j = 0; j < obstacle.length; j++){
                if(this.collision(left, right, top, bottom, obstacle[j])){
                    toReturn.impact = true;
                    toReturn.object = obstacle[j];
                    return toReturn;
                }
            }
        }
        return toReturn;
    }
    collision(left, right, top, bottom, object2){
        if (left < object2.getNums.right && right > object2.getNums.left && top < object2.getNums.bottom && bottom > object2.getNums.top) {
            return true; //collision detected
        }
        return false;        
    }
};

class Shooter extends Projectile{
    constructor(height, width, left, top, imageSrc, role, direction, speedLimit, obstacleRoles, library){
        super(height, width, left, top, imageSrc, role, direction, speedLimit, obstacleRoles);
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
    shoot(rocketImage, rocketObstacles){
        var rocket = new Rocket(this.left, this.top, rocketImage, this.direction, rocketObstacles, this.role);
        rocket.flight();
    }
};

class Rocket extends Projectile{
    constructor(left, top, imageSrc, direction, obstacleRoles, shooter){
        super(10, 10, left, top, imageSrc, null, direction, 18, obstacleRoles);
        this.shooter = shooter;
    }
    flight(){
        var timeInterval = 100; //ms
        var minTime = Date.now() + 1100;//1.1 seconds
        var flightResults;
        var flightInterval = setInterval(()=>{
            flightResults = this.move();
            if(Date.now() > minTime || flightResults.impact){
                clearInterval(flightInterval);
                if(flightResults.impact){
                    if(flightResults.object.role == 'player'){
                        flightResults.object.playerHit();
                    }
                    else if((flightResults.object.role == 'turret' || flightResults.object.role == 'removable') && this.shooter == 'player'){
                        flightResults.object.removeObject();
                    }
                }
                this.explode();
            }
        }, timeInterval);
    }
    explode(){
        var explosion = new GameObject(30, 30, this.left, this.top, 'assets/environment/explosions/explosion.gif', null);
        var explosionTime = 500;
        setTimeout(()=>{
            explosion.html.remove();
            explosion = null;
            this.html.remove();
        }, explosionTime);
    }
};

class Player extends Shooter{
    constructor(height, width, left, top, obstacleRoles){
        super(height, width, left, top, 'tanks/blue-n.png', 'player', 'north', 12, obstacleRoles, tankLibrary);
        this.rocketObstacles = ['removable', 'turret'];
    }
    shootRocket(){
        var rocketImage = rocketLibrary.find(({direction}) => direction === this.direction);
        this.shoot(rocketImage.img, this.rocketObstacles);
    }
    playerHit(){
        location.reload();
        console.log('hit');
    }
};

class Turret extends Shooter{
    constructor(height, width, left, top, obstacleRoles){
        super(height, width, left, top, 'enemies/turret-s.png', 'turret', 'south', 0, obstacleRoles, turretLibrary);
        this.rangeSquare = new GameObject(230, 230, (this.left - 100), (this.top - 100), '', 'rangeSquare', null);
        this.rocketObstacles = ['nonremovable', 'removable', 'player'];
    }
    rotateTurret(direction){
        var rotateTime = 150;
        var rotateInterval = setInterval(() => {
            if(this.rotate(direction)){
                clearInterval(rotateInterval);
            }
        }, rotateTime);
    }
    repositionTurret(player){
        var direction;
        var turretNums = this.getNums;
        var playerNums = player.getNums;
        if(playerNums.left < turretNums.left && playerNums.top < turretNums.top){
            direction = 'north-west';
        }
        else if(playerNums.left > turretNums.right && playerNums.top < turretNums.top){
            direction = 'north-east';
        }
        else if(playerNums.left < turretNums.left && playerNums.top > turretNums.bottom){
            direction = 'south-west';
        }
        else if(playerNums.left > turretNums.right && playerNums.top > turretNums.top){
            direction = 'south-east';
        }
        else if(turretNums.left < playerNums.left && playerNums.left < turretNums.right && playerNums.top < turretNums.top){
            direction = 'north';
        }
        else if(turretNums.left < playerNums.left && playerNums.left < turretNums.right && playerNums.top > turretNums.top){
            direction = 'south';
        }
        else if(playerNums.top > turretNums.top && playerNums.top < turretNums.bottom && playerNums.left < turretNums.left){
            direction = 'west';
        }
        else{
            direction = 'east';
        }
        return direction;
    }
    turretShoot(player){
        if(this.collision(player.left, player.right, player.top, player.bottom, this.rangeSquare)){
            var newDirection = this.repositionTurret(player);
            this.rotateTurret(newDirection);
            setTimeout(() => {
                this.shootRocket();
            }, 1000);
        }
    }
    shootRocket(){
        var rocketImage = 'assets/weapons/projectile.png';
        this.shoot(rocketImage, this.obstacleRoles); //this is it?
    }
    removeObject(){
        mapObjects.splice(mapObjects.indexOf(this),1);
        this.rangeSquare.html.remove();
        this.html.remove();
    }
};

class Door extends GameObject{
    constructor(height, width, left, top){
        super(height, width, left, top, 'assets/environment/infrastructure/broken-door.png', 'removeable', '');
        this.html.style.display = 'none'; //when hit change to 'block' and remove from mapObejcts (soft delete)
    }
    removeObject(){
        mapObjects.splice(mapObjects.indexOf(this),1);
        this.html.style.display = 'block';
    }
}

class Pad extends GameObject{
    //constructor(height, width, left, top, imageSrc, role, direction)
    constructor(height, width, left, top, imageSrc, role, direction){
        super(height, width, left, top, imageSrc, role, direction);
    }
    victory(player){
        var turrets = mapObjects.filter(({role}) => role === 'turret');
        if(player.collision(this.left, this.right, this.top, this.bottom, playerw) && turrets.length == 0){
            console.log('victory!!!');
        }
    }
};