var game = document.getElementById('game-container');
var mapObjects = []; //player, removeable, none, turret, nonremovable 

class GameObject{
    constructor(html, image, role, direction){
        this.html = html;
        this.styleWidth = window.getComputedStyle(html).width;
        this.styleHeight = window.getComputedStyle(html).height;
        this.styleLeft = window.getComputedStyle(html).left;
        this.styleTop = window.getComputedStyle(html).top;
        this.width = parseInt(this.styleWidth.replace('px', ''));
        this.height = parseInt(this.styleHeight.replace('px', ''));
        this.left = parseInt(this.styleLeft.replace('px', ''));
        this.top = parseInt(this.styleTop.replace('px', ''));
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
    constructor(html, image, role, direction, speedLimit){
        super(html, image, role, direction);
        this.speedLimit = speedLimit;
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
    move(direction){
        this.setDirection(direction);
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
        if(this.inBounds(lng, lat) == 1){
            this.setLeft(lng);
            this.setTop(lat);
            return true;
        }
        return false;
    }
    projectileCollision(obstacles){
        
        var toReturn = {
            impact: true,
            object: 'bounds',
            index: null
        };
 
        if(this.inBounds(this.left, this.top) == 1){
            var obstacle;
            for(var i = 0; i < obstacles.length; i++){
                obstacle = obstacles[i];
                if(this.collision(this, obstacle)){
                    toReturn.object = obstacle.getRole;
                    toReturn.index = i;
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
    constructor(html, image, role, direction, speedLimit, library){
        super(html, image, role, direction, speedLimit);
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
            return true;
        }
        return false;
    }
    shoot(rocketImage, obstacles){
        var rocket = new Rocket(rocketImage, this.left, this.top, this.direction, this.role);
        rocket.flight(obstacles);
    }
};

class Rocket extends Projectile{
    //constructor(html, image, role, direction, speedLimit)
    constructor(rocketImage, left, top, direction, shooter){
        this.shooter = shooter;
        var temp = document.createElement('DIV');
        temp.className = 'mapObjects';
        var tempImg = document.createElement('IMG');
        tempImg.src = rocketImage;
        temp.appendChild(tempImg);
        temp.style.height = '20px';
        temp.style.width = '20px';
        temp.style.left = left + 'px';
        temp.style.top = top + 'px';
        game.appendChild(temp);
        var speedLimit = 15;
        super(temp, tempImg, 'rocket', direction, speedLimit);
    }
    flight(obstalces){
        
    }
};

class Player extends Shooter{
    constructor(html, image, role, direction, speedLimit, library){
        super(html, image, role, direction, speedLimit, library);
    }
    shootRocket(){
        //left off here!!!
        var rocketImage = rocketLibrary.find(({direction}) => direction === this.direction).img;
        var obstacles = [];
        this.shoot(rocketImage, obstacles);
    }
};

// class Turret extends Shooter{
//     constructor(html, image, role, direction, speedLimit, library){
//         super(html, image, role, direction, speedLimit, library);
//     }
//     shootRocket(){
//         var rocketImage = 'assets/weapons/projectile.png';
//         var obstacles = [];
//         this.shoot(rocketImage, obstacles);
//     }
// };