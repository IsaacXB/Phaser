//Generate the class code
//Define the class constructor for character with global variables
const categories = {
    Hero: "Hero",
    Ship: "Ship",
    Gun: "Gun",
    Enemy: "Enemy",
    PowerUp: "Power UP",
    BaseCharacter: "Base Character"
}

class Character {
    constructor(name, hp, year, sprite, width, height, category) {
        this.name = name;
        this.hp = hp;
        this.year = year;
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.category = category

    }
    //method to returb the current age of character
    age(x) {
        return x - this.year;
    }
    //method to return the power attack based on the category
    powerAttack(){
        switch (this.category){
            case categories.Hero:
                return 200;
            case categories.Enemy:
                return 20;
            default: return 10;
        }
    }
    //method to use the power Up
    

}

let date = new Date();
let year = date.getFullYear();