class sceneTitle extends Phaser.Scene{
    constructor() {
        super('sceneTitle');
    }

    preload(){
        this.load.image('btnStart','res/btnStart.png');
    }

    create(){
        this.btnStart = this.add.image(game.config.width / 2, game.config.height / 2, 'btnStart');
        this.btnStart.setInteractive();
        this.btnStart.on('pointerdown', this.startGame, this);

        this.titleText = this.add.text(300,20,"Examen Isaac Chaves - UNIR")
        this.titleText.setOrigin(0,0);
    }

    startGame(){
        this.scene.start('mainScene');
    }

}