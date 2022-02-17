class jugador extends Component {
    constructor(entity, layer) {
        super(entity);
        this.cursores = this.scene.input.keyboard.createCursorKeys();
    }
    start() {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.scene = this.getEntity().getScene();
        this.scene.physics.add.collider(this.sprite, this.layer);
        //this.physics.add.collider(this.jugador1, layer);

        this.sprite.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('spritesjugador',
                {
                    start: 1, end:4, prefix: 'idle-'
                }),
            frameRate: 8,
            repeat: -1
        });

        this.sprite.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('spritesjugador',
                {
                    start: 1, end:16, prefix: 'walk-'
                }),
            frameRate: 16,
            repeat: -1
        });

        this.sprite.anims.create({
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
        if (!this.sprite.onFloor()){
            this.sprite.play('jump', true);
        }else if (this.sprite.velocity.x != 0){
            this.sprite.play('walk', true);
        }else{
            this.sprite.play('idle', true);
        }
    }

    control(time, delta){
        if (this.cursores.left.isDown)
        {
            this.sprite.setVelocityX(-10 * delta);
            this.setFlipX(true);
        }
        else if (this.cursores.right.isDown)
        {
            this.sprite.setVelocityX(10 * delta);
            this.setFlipX(false);
        }
        else
        {
            this.sprite.setVelocityX(0);
        }
        if (this.cursores.space.isDown && this.sprite.onFloor())
        {
            this.sprite.setVelocityY(-40 * delta);
        }
    }

    update(time, delta){

        this.control(time, delta);
        this.updateAnimacion(time, delta);
    }




}