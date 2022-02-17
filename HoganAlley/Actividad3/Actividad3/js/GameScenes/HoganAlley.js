class HoganAlley extends Phaser.Scene {
    constructor() {
        super('HoganAlley');
        this.isGameOver = false;
    }

    preload()
    {
        this.LoadResources();
    }

    create()
    {
        this.AddMap();
        this.CreateBackground();
        this.billboard = new Billboard(this,0,0);
        this.billboard.AddBillboards();
        this.gameManager = new GameManager(this, 0, 0);

    }
    IsRoundOver(){
        this.counter = 0;
        for (let i =0; i < 3; i++)
        {
            if (!this.billboard.ActiveBillboards[i].active || this.billboard.ActiveBillboards[i].isGood )
            {
                this.counter ++;
            }
        }
        if (this.counter === 3)
        {
            this.time.delayedCall(200,this.RestartRound, null, this);
        }
    }

    RestartRound(){
        this.background.setTexture('background01');

        this.billboard.ActiveBillboards.forEach(function (item){
            item.setTexture();
        });
        this.billboard.AddBillboards();
    }

    update(time, delta) {
        super.update(time, delta);
        if (this.billboard.moveBillboards)
        {
            this.billboard.MoveBillboards();
        }
        else
        {
            this.gameManager.UpdateUIText(this.billboard.ActiveBillboards);
            this.gameManager.IncreaseTimeElapsed(delta);
        }
    }

    //Load scene resources
    LoadResources()
    {
        this.load.image('characters','res/Characters/characters.png');
        this.load.image('background01','res/Background/background01.png');
        this.load.image('background02','res/Background/background02.png');
        this.load.image('billboard01','res/Billboard/billboard01.png');
        this.load.image('billboard02','res/Billboard/billboard02.png');
        this.load.image('good01','res/Good/good01.png');
        this.load.image('good02','res/Good/good02.png');
        this.load.image('good03','res/Good/good03.png');
        this.load.image('bad01','res/Bad/bad01.png');
        this.load.image('bad02','res/Bad/bad02.png');
        this.load.image('bad03','res/Bad/bad03.png');
        this.load.image('damage01','res/Damage/damage01.png');
        this.load.image('damage02','res/Damage/damage02.png');

    }

    //Creates the map
    AddMap(){
        this.map = this.make.tilemap({key: 'map'});
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, false, true);
    }

    CreateBackground(){
        this.background = this.add.sprite(660,360,'background01');
    }

}