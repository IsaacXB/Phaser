class jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, playerID) {
        super(scene, x, y, playerID);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }
}