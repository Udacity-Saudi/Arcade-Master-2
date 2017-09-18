'use strict';
window.onload = function(){
    document.getElementById("scores").innerHTML = 0;
}
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = 50;
    this.width = 50;
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
    this.x += this.speed * dt;
// check to see if bug out of canvas,and reset x to zero
    if (this.x > 505) {
    this.x = 0;
}
    //check the collision between the enemy and player 
    this.collision();

};

Enemy.prototype.collision = function() {
    //    debugger;
    //    console.log("collision  method invoked!");
    //    console.log("Enemy object:", this);
    //    console.log("Enemy x:", this.x);
    //    console.log("Player object:", player);
    //    console.log("Player x:", player.x)
    //    console.log("Player y:", player.y)
    if (player.x < this.x + this.width &&
    player.x + player.width > this.x &&
    player.y < this.y + this.height &&
    player.height + player.y > this.y) {
        lose.play();
        player.reset();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player
var Player = function() {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
    this.x = 200;
    this.y = 383;
    this.speed = 50;
    this.height = 50;
    this.width = 50;
    this.score = 0;
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {
//check if player wins
    if (this.y == -32){
        this.y -= 83;
        win.play();
        this.reset();
        this.score++;
        //update the score in the html
        document.getElementById("scores").innerHTML = this.score;
        console.log("you win!!");
    }
};
//reset the player to the starting point
Player.prototype.reset = function(){
    this.x=200;
    this.y=383;
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
Player.prototype.handleInput = function(keypress) {
    if(keypress == 'left') {
        if(this.x >= 2){ 
            this.x -= 101;
        }
    }
    if(keypress == 'right'){
        if(this.x + 101 <= 420){ 
            this.x += 101;
        }
    }
    if(keypress == 'up') {
        if(this.y - 83 > -51){
            this.y -= 83;
    }

    }
    if(keypress == 'down') {
        if(this.y < 383){
            this.y += 83;
    }
}

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-350, 130,200);
var enemy2 = new Enemy(-300, 60,100);
var enemy3 = new Enemy(-100, 130,200);//
var enemy4 = new Enemy(0, 230,100);
var enemy5 = new Enemy(0, 60,100);//
var allEnemies = [enemy1 ,enemy2, enemy3,enemy4,enemy5];

var player = new Player();

//lose auido sound
var lose = new Audio('js/gameover.wav');
//win auido sound
var win = new Audio('js/score_count.wav');
console.log(player);
//console.log(allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
var allowedKeys = {
37: 'left',
38: 'up',
39: 'right',
40: 'down'
};

player.handleInput(allowedKeys[e.keyCode]);
});
