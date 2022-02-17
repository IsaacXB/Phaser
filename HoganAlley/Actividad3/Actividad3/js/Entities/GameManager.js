class GameManager extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'gameManager');
        this.score = 0;
        this.timeElapsed = 0;
        this.missed = 0;
        this.row = 0;
        this.top = 0;
        this.isRoundOver = false;
        this.AddUIText();
    }

    AddUIText(){
        this.scoreText = this.scene.add.text(370, 665, this.score , {
            fontSize: '45px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.timeText = this.scene.add.text(610, 25, this.timeElapsed , {
            fontSize: '35px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.missesText = this.scene.add.text(725, 705, this.missed , {
            fontSize: '35px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.rowText = this.scene.add.text(660, 645, this.row , {
            fontSize: '60px',
            fill: 'green',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.topText = this.scene.add.text(940, 660, this.top , {
            fontSize: '50px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.billboard01Text = this.scene.add.text(370, 500, '' , {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.billboard02Text = this.scene.add.text(625, 500, '' , {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.billboard03Text = this.scene.add.text(880, 500, '' , {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
    }
    UpdateUIText(ActiveBillboards){

        this.scoreText.setText(this.score.toString());
        this.timeText.setText(this.timeElapsed.toFixed(2).toString());
        this.missesText.setText(this.missed.toString());
        this.rowText.setText(this.row.toString());
        this.topText.setText(this.top.toString());
        this.billboard01Text.setText(ActiveBillboards[0].name);
        this.billboard02Text.setText(ActiveBillboards[1].name);
        this.billboard03Text.setText(ActiveBillboards[2].name);


    }
    IncreaseTimeElapsed(delta){
        this.timeElapsed += delta / 1000;
    }
}