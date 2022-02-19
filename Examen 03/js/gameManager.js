class gameManager extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'gameManager');
        this.scene = scene;
        this.score = 0;
        this.timeElapsed = 0;
        this.fireSpeed = 5000;
        this.AddUIText();
    }

    AddUIText(){
        this.scoreText = this.scene.add.text(670, 15, this.score , {
            fontSize: '45px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.timeText = this.scene.add.text(25, 15, this.timeElapsed , {
            fontSize: '35px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });

    }
    UpdateUIText(){
        this.scoreText.setText(this.score.toString());
        this.timeText.setText(this.timeElapsed.toFixed(2).toString());
    }

    increaseScore(value){
        this.score += value;
    }

    update(time, delta){
        this.timeElapsed += delta / 1000;
        this.UpdateUIText();
    }

    gameOver(){
        this.gameOverText = this.scene.add.text(game.config.width/2, game.config.height/2 , {
            fontSize: '35px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif',
        });
        this.gameOverText.setText('Game Over');
        this.gameOverText.setOrigin(0,0);

    }
}