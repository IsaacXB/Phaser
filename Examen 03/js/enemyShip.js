class enemyShip extends mySprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyShip');
        this.scene = scene;
        this.direction = 5;
        this.timer = 0;
        this.isAlive = true;
    }

    create(){
        this.timer = game.time.create(false);
        //this.timer.loop(5000,this.changeDirection, this);
        this.timer.start();
    }

    changeDirection(){
        this.direction = this.direction * -1;
    }
    destroyEnemy(){
        this.isAlive = false;
        this.destroy();
    }

    update(time, delta)
    {
        if (this.isAlive)
        {
            this.timer = this.timer + delta;
            if (this.timer > 1000)
            {
                this.changeDirection();
                this.timer = 0;
            }
            this.setVelocityX(this.direction * delta);
        }
        if (this.isAlive && this.y > 800) {
            this.y = 0;
        }
    }
    moveToPlayer(){
        if (this.isAlive) {
            this.setVelocityY(150);
        }
    }
}