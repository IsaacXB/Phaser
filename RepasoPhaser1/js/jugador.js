class jugador extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'personaje');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.cursores = this.scene.input.keyboard.createCursorKeys();


    }

    create() {

    }

    update(){

    }
}