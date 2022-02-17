
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name) {

        super(scene, x, y, 'player');
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(64, 64);
        this.body.setOffset(18, 26);
        this.body.setMaxVelocity(100, 200);
        this.score = 0
        this.healthPoints = 3;
        this.body.setDragX(250);

        this.cursor = this.scene.input.keyboard.createCursorKeys();
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.GetPlayerInput(delta);
    }

    GetPlayerInput(delta) {

        if (this.cursor.left.isDown) {
            //Move Left anf flip direction
            this.SetMovementX(-100, true, delta);
        } else if (this.cursor.right.isDown) {
            //Move Right anf flip direction
            this.SetMovementX(100, false, delta);
        } else {
            //Inactive
            this.Idle();
        }
    }

    //Moves player on X and flips direction
    SetMovementX(x, flip, delta) {
        this.setAccelerationX(x * delta);
        this.setFlipX(flip);
    }

    //Moves player on Y
    SetMovementY(y, delta) {
        this.setVelocityY(y * delta);
        //this.body.setAccelerationY(y * delta);
    }

    //Set velocity on 0 (Inactive)
    Idle() {
        this.setAccelerationX(0);
    }
    Shoot(){

    }

    IncreaseScore(score)
    {
        this.score += score;
    }

}