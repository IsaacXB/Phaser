class jugador extends mySprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'jugador');
        this.cursores = this.scene.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('spritesjugador',
                {
                    start: 1, end:4, prefix: 'idle-'
                }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('spritesjugador',
                {
                    start: 1, end:16, prefix: 'walk-'
                }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('spritesjugador',
                {
                    start: 1, end:4, prefix: 'jump-'
                }),
            frameRate: 8,
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
            this.body.setVelocityY(-40 * delta);
        }
    }

    update(time, delta){

        this.control(time, delta);
        this.updateAnimacion(time, delta);
    }




}