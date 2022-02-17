
class Menu extends Phaser.Scene {

    //Se coloca un nombre para realizar el reiniciado del nivel
    constructor() {
        super("menu");
    }

    //objetos precargados en el nivel.
    preload() {
        this.load.image('background', 'res/black.png');
        this.load.image('sprites_start', 'res/start.png');
        this.load.image('sprites_logo', 'res/logo.png');
    }

    create() {
        this.add.image(0, this.scale.height, 'background').setOrigin(0, 1)
        this.add.sprite(400, 180, 'sprites_logo');

        var returnButton = this.add.sprite(400, 420, 'sprites_start').setOrigin(0.5);
        returnButton.setScale(0.30);

        returnButton.setInteractive();
        returnButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function () {
            this.scene.scene.start("main");
        });
    }
}