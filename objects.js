var game = document.getElementById('game-container');
var mapObjects = Array.from(document.getElementsByClassName('mapObjects'));
class Object{
    constructor(width, height, left, top, imageSrc, role, index){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.styleWidth = width + 'px';
        this.styleHeight = height + 'px';
        this.styleLeft = left + 'px';
        this.styleTop = top + 'px';
        this.image = imageSrc; //change at inherited classes
        this.status = false; 
        this.role = role; //does not change
        this.index = index; //index in class of map arrays
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
    get getImage(){
        return this.image;
    }
    get getStatus(){
        return this.status;
    }
    get getRole(){
        return this.role;
    }
    //setter
    set setLeft(left){
        this.left = left;
        this.styleLeft = this.left + 'px';
        mapObjects[this.index].style.left = this.styleLeft;
    }
    set setTop(top){
        this.top = top;
        this.styleTop = this.top + 'px';
        mapObjects[this.index].style.top = this.styleTop;
    }
}

class Shooter extends Object{
    constructor(direction, width, height, left, top, imageSrc, role, index){
        super(width, height, left, top, imageSrc, role, index);
        this.direction = direction;
    }
    //getter
    get getDirection(){
        return this.direction;
    }
    //setter
    set setDirection(direction){
        this.direction = direction;
    }
    Shoot(){
        //
    }
}
// class Projectile extends Object{
//     constructor()
// }