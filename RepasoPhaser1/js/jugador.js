class jugador extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'jugador');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.cursores = this.scene.input.keyboard.createCursorKeys();
    }

    create() {

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('jugador', {start:0, end: 3}),
            framerate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'turn',
            frames: [ { key: 'jugador', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('jugador', {start:5, end: 8}),
            framerate: 10,
            repeat: -1
        });
    }

    update(){
        if (this.cursores.left.isDown){
            this.setVelocityX(-160);
            this.anims.play('left',true);
        }
        else if (this.cursores.right.isDown){
            this.setVelocityX(160);
            this.anims.play('right',true);
        }
        else{
            this.setVelocityX(0);
            this.anims.play('turn');
        }

        if (this.cursores.up.isDown && this.body.touching.down){
            this.setVelocityY(-330);
        }
    }
}