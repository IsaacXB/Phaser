class mainScene extends Phaser.Scene{
    constructor() {
        super('mainScene');
        this.timer = 0;
        this.timeBetweenShots = 0;
    }

    preload(){
        this.load.image('playerShip','res/ship.png');
        this.load.image('enemyShip','res/enemy01.png');
        this.load.image('bala', 'res/bala.png');
    }

    create(){
        this.playerShip = new playerShip(this, 200,600);
        this.createEnemies();

        this.playerShip.setCollideWorldBounds(true);
        this.gameManager = new gameManager(this,0,0);

    }
    update(time, delta){
        this.gameManager.update(time, delta);
        this.playerShip.update(time, delta);
        for (let i = 0; i < this.enemys.length; i++) {
            if (this.enemys[i] != undefined)
                this.enemys[i].update(time, delta);
        }
        this.timer = this.timer + delta;
        if (this.timer > this.gameManager.fireSpeed) {
            this.shoot();
        }
        this.timeBetweenShots = this.timeBetweenShots + delta;
        if (this.playerShip.cursors.space.isDown && this.timeBetweenShots > 500 && this.playerShip.hp > 0)
        {
            this.playerShoot();
            this.timeBetweenShots = 0;
        }
        if(this.playerShip.hp == 0){
            this.gameManager.gameOver();
        }
    }

    bulletHit(bullet){
        bullet.destroy();
        this.playerShip.reduceLife();
    }

    enemyHit(enemy){
        enemy.destroyEnemy();
        this.playerShip.reduceLife();
    }

    shoot(){
        this.random = Phaser.Math.Between(0,this.enemys.length - 1);
        this.bala = new bala(this, this.enemys[this.random].x,this.enemys[this.random].y,100);
        this.timer = 0;
        this.physics.add.overlap(this.bala, this.playerShip, this.bulletHit, null, this);
        if (this.enemys[this.random].isAlive)
        {
            this.enemys[this.random].moveToPlayer();
        }
    }
    playerShoot(){
        this.bala = new bala(this, this.playerShip.x,this.playerShip.y,-100);
        this.physics.add.overlap(this.bala, this.enemys, this.destroyEnemy, null, this);
    }

    destroyEnemy(bala, enemy){
        bala.destroy();
        enemy.destroyEnemy();
        this.gameManager.increaseScore(100);
    }
    createEnemies(){
        this.enemys = [];
        this.spacerX = 200;
        this.spacerY = 50;

        for (let i =1; i < 30; i++)
        {
            this.enemys.push(new enemyShip(this, this.spacerX,this.spacerY));
            this.spacerX += 50;
            if (i == 9)
            {
                this.spacerX = 150;
                this.spacerY = 100;
            }
            if (i == 20)
            {
                this.spacerX = 200;
                this.spacerY = 150;
            }
        }
        this.physics.add.overlap(this.enemys, this.playerShip, this.enemyHit, null, this);

    }

}