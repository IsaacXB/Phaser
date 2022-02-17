//Generate the basic functions and objects on load, to create character instances
window.onload   = function () {

    //Create an instance of object character
    myCharacter = new Character("Catuminati", 100, 1985, "././Sprites/Catuminati.png", 180, 180,categories.Hero);
    mySpaceShip = new Character("Peregrine", 1000, 1820, "././Sprites/Ovni.png", 204, 200,categories.Ship);
    myGun = new Character("Plasma Pistol", 100, 1975, "././Sprites/AlienGun.png", 240, 100, categories.Gun);
    myPowerUp = new Character("Star", 100, 1680, "././Sprites/StarPowerUp.png", 144, 122, categories.PowerUp);
    myEnemy     = new Character("Cocotero", 1000, 1933, "././Sprites/Enemy.png", 160, 175, categories.Enemy);
    


    //Create new components based of myCharacter instances
    Catuminati  = new component(myCharacter, 50, 100, "image");
    SpaceShip   = new component(mySpaceShip, 350, 100, "image");
    Gun         = new component(myGun, 650, 100, "image");
    PowerUp     = new component(myPowerUp, 950, 100, "image");
    Enemy       = new component(myEnemy, 1250, 100, "image");

    //Initialize canvas as the game area
    myGameArea.start();

    //Generate Attack function
    var Attack = document.getElementById("btnAttack");
    Attack.innerHTML = "Attack the enemy HP.";
    Attack.onclick = function () {
        if (myEnemy.hp > 0 && myCharacter.hp > 0) {
            HeroAttacks();
            if (myEnemy.hp <= 0)
            {
                Attack.disabled = true;
                EnemyAttack.disabled = true;
                alert("The enemy has Died.");
            }
        }

    }

    //Generate the Enemy Attack function
    var EnemyAttack = document.getElementById("btnEnemyAttack");
    EnemyAttack.innerHTML = "Attack the hero HP.";
    EnemyAttack.onclick = function () {
        if (myCharacter.hp > 0 && myEnemy.hp > 0) {
            enemyAttacks();
            if (myCharacter.hp <= 0)
            {
                Attack.disabled = true;
                EnemyAttack.disabled = true;
                alert("The hero has Died.");
            }
        }
    }

    //Generate the Restart function
    var Restart = document.getElementById("btnRestart");
    Restart.innerHTML = "Restart";
    Restart.onclick = function () {
        RestartGame();
        Attack.disabled = false;
        EnemyAttack.disabled = false;
        alert("The game has restarted");
    }

}

//Global Variables
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = window.innerWidth / 1.1;
const height = canvas.height = window.innerHeight / 1.5;
var message = "Game has Started! Please use the buttons to simulate attacks";

//Create Game Area
var myGameArea = {
    canvas: canvas,
    start: function () {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = context;
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

//Create the game component and draw it on the canvas
function component(character, x, y, type) {
    this.type = type;
    this.width = character.width;
    this.height = character.height;
    this.x = x;
    this.y = y;

    if (type == "image") {
        this.image = new Image();
        this.image.src = character.sprite;
    }
    //Draw the component on the canvas context
    this.update = function () {
        ctx = myGameArea.context;

        if (type == "image") {
            ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height);
        } 

        ctx.fillText("Name: "   + character.name, this.x + 10, this.y + 200, 200);
        ctx.fillText("HP: "     + character.hp, this.x + 10, this.y + 220, 200);
        ctx.fillText("Age: " + character.age(year), this.x + 10, this.y + 240, 200);
        ctx.fillText("Category: " + character.category, this.x + 10, this.y + 260, 200);
        ctx.fillText(message, 50, 400, 800);
    }
    //Attack 
    this.attack = function(){
        ctx = myGameArea.context;
        switch (character.category)
        {
            case categories.Hero: 
                myEnemy.hp -= character.powerAttack();
                message = "Hero attacks and has damaged the enemy, the enemy only has "   + myEnemy.hp + " HP Remaining.";
                break;
            case categories.Enemy:
                myCharacter.hp -= character.powerAttack();
                message = "Enemy attacks and has damaged our hero Catuminati and now only has "   + myCharacter.hp + " HP Remaining.";
                break;
        }
        
    }
}

//Function to update the game canvas on the interval set
function updateGameArea() {
    myGameArea.clear();
    Catuminati.update();
    SpaceShip.update();
    Gun.update();
    PowerUp.update();
    Enemy.update();
}

//function to attack the enemy
function HeroAttacks() {
    Catuminati.attack();
}

//function to attack our hero
function enemyAttacks() {
    Enemy.attack();
}

//function to restart the game
function RestartGame() {
    myCharacter.hp = 100;
    myEnemy.hp = 1000;
    message = "The game has restarted!";

}
