class playerShip extends mySprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'playerShip');
        this.scene= scene;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.hp = 3;
    }

    preload(){
        this.load.image('bala', 'res/bala.png');
    }

    create(){

    }
    reduceLife(enemy){
        this.hp--;
        if (enemy != undefined)
        {
            enemy.destroyEnemy();
        }
        if (this.hp == 0)
        {
            this.destroy();
        }
        console.log(this.hp);
    }

    update(time, delta){
        if (this.hp > 0){
            if (this.cursors.left.isDown){
                this.setVelocityX(-300);
                //this.anims.play('left',true);
            }
            else if (this.cursors.right.isDown){
                this.setVelocityX(300);
                //this.anims.play('right',true);
            }
            else{
                this.setVelocityX(0);
                //this.anims.play('turn');
            }
        }

        /*if (this.cursors.up.isDown && this.body.touching.down){
            this.setVelocityY(-330);
        }*/
    }
}