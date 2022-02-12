class jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, playerID) {
        super(scene, x, y, playerID);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.cursores = this.scene.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('spritesjugador',
                {
                    start: 1, end:4, prefix: 'idle-'
                }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('spritesjugador',
                {
                    start: 1, end:16, prefix: 'walk-'
                }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('spritesjugador',
                {
                    start: 1, end:4, prefix: 'jump-'
                }),
            frameRate: 10,
            repeat: -1
        });

    }
    updateAnimacion(time, delta){
        if (!this.body.onFloor()){
            this.play('jump', true);
        }else if (this.body.velocity.x != 0){
            this.play('walk', true);
        }else{
            this.play('idle', true);
        }
    }

    control(time, delta){
        if (this.cursores.left.isDown)
        {
            this.body.setVelocityX(-10 * delta);
            this.setFlipX(true);
        }
        else if (this.cursores.right.isDown)
        {
            this.body.setVelocityX(10 * delta);
            this.setFlipX(false);
        }
        else
        {
            this.body.setVelocityX(0);
        }
        if (this.cursores.space.isDown && this.body.onFloor())
        {
            this.body.setVelocityY(-20 * delta);
        }
    }

    update(time, delta){

        this.control(time, delta);
        this.updateAnimacion(time, delta);
    }




}