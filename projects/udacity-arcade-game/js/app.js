/**
 * Creates a new Enemy.
 * @constructor
 */
var Enemy = function() {
    this.speeds = [100, 500];
    this.xPositions = [-200, 700];
    this.yPositions = [68, 151, 234];
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    var finishLine = this.xPositions[1];
    if (this.x < finishLine){
        // Increase the speed each time the player gets a point
        this.x = this.x + this.speed * dt * (player.score / 5 + 1);
    } else {
        // Otherwise, reset to starting position
        this.reset();
    }
};

Enemy.prototype.reset = function(){
    this.x = this.xPositions[0];
    this.y = this.randomYPosition();
    this.speed = this.randomSpeed();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create function to get random speed
Enemy.prototype.randomSpeed = function(){
     return Math.floor(Math.random()*(this.speeds[1]-this.speeds[0]+1)+this.speeds[0]);
};

// Create function to get random y position
Enemy.prototype.randomYPosition = function(){
    return this.yPositions[Math.floor(Math.random() * 3)];
};

/**
 * Creates a new Player.
 * @constructor
 */
var Player = function(){
    //The image/sprite for the player
    this.sprite = 'images/char-cat-girl.png';
    this.reset();
    this.score = 0;
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {

    // Check if the player reaches the water
    if ( this.y <= 0 ) {
        // Reset to bottom and add a point to scoreboard
        this.reset();
        this.score = this.score + 1;
    }

    // Assign parameter this to player variable
    var player = this;

    // Loop through enemies to check for their position
    allEnemies.forEach(function(enemy){
        // check if player is on the same row as enemy (y value plus or minus 30)
        if (player.y >= enemy.y - 30 && player.y <= enemy.y + 30){
            // check if player is on same column as enemy (x value plus or minus 60)
            if (player.x >= enemy.x - 60 && player.x <= enemy.x + 60){
                // if so, reset player to start and scorecard to 0
                player.reset();
                player.score = 0;
            }
        }
    })
};

// Draw the player on the screen,
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move player up and down based on keystrokes
Player.prototype.handleInput = function(key) {
    if (key == 'up' && this.y > 0){
        this.y = this.y - 83;
    } else if (key == 'down' && this.y < 400){
        this.y = this.y + 83;
    } else if (key == 'left' && this.x > 0){
        this.x = this.x - 101;
    } else if (key == 'right' && this.x < 400) {
        this.x = this.x + 101;
    }
};

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

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
var chauncey = new Enemy();
var becky = new Enemy();
var tito = new Enemy();
var allEnemies = [chauncey, becky, tito];

// Place the player object in a variable called player
var player = new Player();