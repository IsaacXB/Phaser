class SpaceInvaders extends Phaser.Scene {
    constructor() {
        super('SpaceInvaders');
        this.isGameOver = false;

    }

    preload()
    {
        this.LoadResources();
    }


    //Creates scene objects
    create()
    {
        this.AddMap();
        this.AddPlayer();
        this.CreateUITexts();
        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);


        /*
         this.AddEnemy();
         this.AddHero();
         this.LoadObjects();



         //Enable collisions
         this.layers.ground.setCollisionByExclusion([-1],true);
         this.physics.add.collider(this.hero, this.layers.ground);
         this.physics.add.collider(this.enemy, this.layers.ground);
         //this.physics.add.collider(this.enemy, this.hero, this.takeDamage, null, this);

         this.physics.add.overlap(this.enemy, this.hero, this.takeDamage, null, this);
         this.flip = false;
         this.moveRight = false;
         this.enemyAttacking = false;
         this.timeInSeconds = 120;*/
         //this.load.image('player','res/SpaceInvaders/P-blue-a.png');
        //this.game.scene.add.spro(0,0, 'player');
    }

    //Load scene resources
    LoadResources()
    {
        this.load.image('player', 'res/SpaceInvaders/P-blue-a.png' );
        this.load.image('Enemy01', 'res/SpaceInvaders/Enemy1.png' );
        this.load.image('Enemy02', 'res/SpaceInvaders/Enemy1b.png' );
        this.load.image('Enemy03', 'res/SpaceInvaders/Enemy1c.png' );

        // this.load.image('characters','res/Characters/characters.png');

        //his.load.image('tiles','res/Assets/tiles.png');
        //this.load.tilemapTiledJSON('map','res/Tiled/Map01.json');
    }

    //Creates the map
    AddMap(){
        this.map = this.make.tilemap({key: 'map'});
        this.physics.world.setBounds(0,0 , this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, false, true);
    }

    //Creates the player instance
    AddPlayer(){
        this.player = new Player(this, 800 , 100, 'player');

    }

    AddEnemies(){

    }

    //called every frame
    update(time, delta) {
        super.update(time, delta);

        this.player.update();
        this.UpdateUHD();
    }

    //creates UI information
    CreateUITexts(){
        this.scoreText = this.add.text(50, 5, 'Score:'+ this.player.score , {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.healthPointsText = this.add.text(1500, 5, 'Health:'+ this.player.healthPoints , {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        //Keeps text on screen
        this.goldText.setScrollFactor(0,0);
        this.healthPointsText.setScrollFactor(0,0);

    }

    //Updates HUD
    UpdateUHD()
    {
        this.scoreText.setText('Gold:' + this.hero.gold.toString());
        this.healthPointsText.setText('Health:' + this.hero.healthPoints.toFixed(0).toString());
    }



}
