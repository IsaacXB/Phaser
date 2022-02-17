
class Hero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, 'hero');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //Hero animations part 1 => char_blue_1.png
        this.CreateAnimation('idle', 'hero-sprites-1', 0, 5, 10, -1);
        this.CreateAnimation('attack', 'hero-sprites-1', 8, 13, 10, 0);
        this.CreateAnimation('combo', 'hero-sprites-1', 8, 15, 10, 0);
        this.CreateAnimation('run', 'hero-sprites-1', 16, 23, 10, -1);
        this.CreateAnimation('jump', 'hero-sprites-1', 24, 39, 10, 0);
        this.CreateAnimation('hurt', 'hero-sprites-1', 40, 43, 10, 0);
        this.CreateAnimation('death', 'hero-sprites-1', 48, 59, 10, 0);
        this.CreateAnimation('spell', 'hero-sprites-1', 64, 71, 10, 0);
        this.CreateAnimation('crouch', 'hero-sprites-1', 72, 74, 10, 0);
        this.CreateAnimation('shield', 'hero-sprites-1', 80, 82, 10, 0);

        //Hero animations part 2 => char_blue_1.png
        this.CreateAnimation('walk', 'hero-sprites-2', 0, 9, 10, -1);
        this.CreateAnimation('sliding', 'hero-sprites-2', 16, 23, 10, 0);
        this.CreateAnimation('wall-sliding', 'hero-sprites-2', 24, 27, 10, -1);
        this.CreateAnimation('critical', 'hero-sprites-2', 32, 39, 10, -1);
        this.CreateAnimation('ladder-climbing', 'hero-sprites-2', 40, 49, 10, -1);

        this.body.setCollideWorldBounds(true);
        this.body.setSize(22, 30);
        this.body.setOffset(18, 26);
        this.body.setMaxVelocity(100, 200);
        this.body.setDragX(250);
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.canMove = true;
        this.score = 0;
        this.healthPoints = 100;
        this.armor = 100;
        this.magic = 100;
        this.gold = 0;
        this.isJumping = {
            play: false
        };
        this.isAttacking = {
            play: false
        };
    }

    updateGold(gold)
    {
        this.gold += gold;
    }

    updateArmor(armor)
    {
        this.armor += armor;
    }
    updateMagic(magic)
    {
        this.magic += magic;
    }
    updateHealth(health)
    {
        this.healthPoints += health;
    }
    takeDamage(damage){
        if (!this.isAttacking.play && this.healthPoints > 0)
        {
            this.PlayAnimation('hurt');
            this.StopOnComplete(this.isAttacking.play, 'hurt');
            if (!this.isAttacking.play)
            {
                if (this.armor > 0)
                {
                    this.armor -= damage ;
                }
                if (this.armor === 0)
                {
                    this.healthPoints -= damage;
                }
            }
            if (this.healthPoints === 0)
            {
                this.PlayAnimation('death');
                this.setAccelerationX(0);

            }
        }


    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.GetPlayerInput(delta);
    }

    GetPlayerInput(delta) {
        if (this.healthPoints > 0)
        {
            if (!this.isAttacking.play) {
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

            //Attack
            if (this.cursor.shift.isDown && !this.isAttacking.play) {
                this.isAttacking.play = true;
                this.Idle();
            }


            //Jump
            if (this.cursor.space.isDown && this.body.onFloor() && !this.isJumping.play && !this.isAttacking.play) {
                this.isJumping.play = true;
                this.SetMovementY(-10, delta);
            }

            if (!this.cursor.space.isDown && this.body.velocity.y < -50 && !this.isAttacking.play) {
                this.body.setVelocityY(-50);
            }

            if (this.isJumping.play) {
                this.PlayAnimation('jump');
                this.StopOnComplete(this.isJumping, 'jump');
            }
            //Attack
            else if (this.isAttacking.play) {
                this.PlayAnimation('attack');
                this.StopOnComplete(this.isAttacking, 'attack');
            } else if (this.body.velocity.x !== 0) {
                this.PlayAnimation('walk');
            } else if (!this.isAttacking.play) {
                this.PlayAnimation('idle');
            }
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

    //Create Animations
    CreateAnimation(key, frameName, startFrame, endFrame, frameRate, repeat) {
        this.anims.create({
            key: key,
            frames: this.scene.anims.generateFrameNames(frameName,
                {
                    start: startFrame,
                    end: endFrame,
                }),
            //prefix: prefixName }),
            frameRate: frameRate,
            repeat: repeat
        });
    }

    //Play an animation
    PlayAnimation(animation) {

        this.anims.play(animation, true);
    }

    StopOnComplete(condition, name) {
        this.on('animationcomplete-' + name, function () {
            condition.play = false;
        }, this);
    }

}