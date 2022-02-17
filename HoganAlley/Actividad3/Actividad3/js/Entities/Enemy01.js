
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y, healthPoints) {
        super(scene,x,y,'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //Enemy animations part 1 => Cultist_Sheet.png
        this.CreateAnimation('idle', 'enemy-sprites', 0,7, 10, -1);
        this.CreateAnimation('run', 'enemy-sprites', 8,15, 10, -1);
        this.CreateAnimation('attack', 'enemy-sprites', 17,23, 10, 0);
        this.CreateAnimation('combo', 'enemy-sprites', 17,35, 10, 0);
        this.CreateAnimation('hurt', 'enemy-sprites', 36,38, 10, 0);
        this.CreateAnimation('death', 'enemy-sprites', 39,50, 10, 0);
        this.CreateAnimation('jump', 'enemy-sprites', 51,58, 10, -1);
        this.PlayAnimation('idle');

        this.body.setCollideWorldBounds(true);
        this.body.setSize(32,40);
        this.body.setOffset(60,20);
        this.body.setMaxVelocity(60, 200);
        this.body.setDragX(1000);
        this.canMove = true;
        this.isJumping = {
            play: false
        };
        this.isAttacking = {
            play: false
        };
        this.isTakingDamage = {
            play: false
        };
        this.healthPoints = healthPoints ;
    }


    takeDamage(){
        if ( !this.isTakingDamage.play && this.healthPoints > 0)
        {
            this.PlayAnimation('hurt');
            this.StopOnComplete(this.isTakingDamage,'hurt' );
            this.healthPoints -= 2;
            if (this.healthPoints <= 0)
            {
                console.log("death");
                this.setAccelerationX(0);
                this.PlayAnimation('death');
            }
        }
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }


    //Moves player on X and flips direction
    SetMovementX(x, flip, delta){
        this.setAccelerationX(x * delta);
        //this.setFlipX(flip);
    }

    //Moves player on Y
    SetMovementY(y, delta){
        this.setVelocityY(y * delta);
    }

    //Set velocity on 0 (Inactive)
    Idle(){
        this.setAccelerationX(0);
        this.PlayAnimation('idle');

    }

    //Create Animations
    CreateAnimation(key, frameName, startFrame, endFrame, frameRate, repeat)
    {
        this.anims.create({
            key: key,
            frames: this.scene.anims.generateFrameNames(frameName,
                {
                    start: startFrame,
                    end: endFrame,}),
            //prefix: prefixName }),
            frameRate: frameRate,
            repeat: repeat
        });
    }

    //Play an animation
    PlayAnimation(animation)
    {
        this.anims.play(animation, true);
    }

    StopOnComplete(condition, name)
    {
        this.on('animationcomplete-' + name, function () {
            condition.play = false;
        }, this);
    }
}
