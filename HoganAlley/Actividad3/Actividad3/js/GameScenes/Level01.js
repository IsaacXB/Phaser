class Level01 extends Phaser.Scene {
    constructor(){
        super('Level01');
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
        this.CreateLayers();
        this.AddEnemy();
        this.AddHero();
        this.LoadObjects();
        this.CreateUITexts();

        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.hero);
        //Enable collisions
        this.layers.ground.setCollisionByExclusion([-1],true);
        this.physics.add.collider(this.hero, this.layers.ground);
        this.physics.add.collider(this.enemy, this.layers.ground);
        //this.physics.add.collider(this.enemy, this.hero, this.takeDamage, null, this);

        this.physics.add.overlap(this.enemy, this.hero, this.takeDamage, null, this);
        this.flip = false;
        this.moveRight = false;
        this.enemyAttacking = false;
        this.timeInSeconds = 120;
    }

    //creates UI information
    CreateUITexts(){
        this.goldText = this.add.text(16, 5, 'Gold:'+ this.hero.gold , {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.healthPointsText = this.add.text(350, 5, 'Health:'+ this.hero.healthPoints , {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.armorText = this.add.text(350, 220, 'Armor:'+ this.hero.healthPoints , {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.magicText = this.add.text(16, 220, 'Magic:'+ this.hero.healthPoints , {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        //Keeps text on screen
        this.goldText.setScrollFactor(0,0);
        this.healthPointsText.setScrollFactor(0,0);
        this.armorText.setScrollFactor(0,0);
        this.magicText.setScrollFactor(0,0);
    }

    //Updates HUD
    UpdateUHD()
    {
        this.goldText.setText('Gold:' + this.hero.gold.toString());
        this.healthPointsText.setText('Health:' + this.hero.healthPoints.toFixed(0).toString());
        this.armorText.setText('Armor:' + this.hero.armor.toFixed(0).toString());
        this.magicText.setText('Magic:'+ this.hero.magic.toString());
    }

    //Flip sprite
    Flip(){
        this.flip = false;
    }

    // the path for our enemies
    Patrol(delta){
        if (this.hero.healthPoints > 0 && this.isGameOver === false)
        {
            if (this.enemy.healthPoints > 0) {
                // console.log(this.enemy.body.position.x + " test");
                if (!this.flip && !this.enemy.isAttacking.play) {
                    if (!this.moveRight && this.enemy.body.position.x > 150) {
                        this.enemy.SetMovementX(-3, false, delta);
                    } else {
                        this.enemy.SetMovementX(3, false, delta);
                        this.moveRight = true;
                        this.enemy.setAccelerationX(0);
                        this.enemy.setScale(-1, 1);
                        this.enemy.setOffset(90, 20);
                        this.enemy.setAccelerationX(200);
                    }

                    this.enemyDistance = Phaser.Math.Difference(this.hero.body.position.x, this.enemy.body.position.x);

                    if (this.enemy.body.position.x > 50 && this.enemyDistance < 40) {
                        if (!this.enemyAttacking) {
                            this.enemy.setAccelerationX(0);
                            this.enemy.PlayAnimation('attack');
                            this.enemy.StopOnComplete(this.enemy.isAttacking, 'attack');
                        } else {
                            this.flip = true;
                            this.moveRight = true;
                        }

                    } else if (this.enemy.body.position.x >= 400) {
                        this.enemy.setAccelerationX(0);
                        this.flip = false;
                        this.moveRight = false;
                        this.enemy.setScale(1, 1);
                        this.enemy.setOffset(60, 20);
                        this.enemy.setAccelerationX(-200);
                    }

                } else if (this.flip) {
                    this.enemy.Idle();
                }
            }
        }
        else
        {
            this.enemy.Idle();
        }

    }

    //enemy attacks
    enemyAttacks(){
        //console.log(this.hero.healthPoints);
        if (this.enemy.healthPoints > 0 && this.isGameOver === false)
        {
            this.enemyDistance = Phaser.Math.Difference(this.hero.body.position.x,this.enemy.body.position.x);

            if (this.enemyDistance < 40 && !this.enemyAttacking && !this.hero.isAttacking.play)
            {
                this.enemy.setAccelerationX(0);
                this.enemy.PlayAnimation('attack');
                this.enemy.StopOnComplete(this.enemy.isAttacking, 'attack');

                if (!this.enemy.isAttacking)
                {
                    //console.log(this.enemyAttacking);
                    this.enemy.setAccelerationX(0);
                }
                if (this.hero.healthPoints > 0)
                {
                    this.hero.takeDamage(1);

                }
            }
            this.UpdateUHD();
        }
    }

    //enemy animations
    enemyAnimations()
    {
        if (this.enemy.body.velocity.x > 0)
        {
            //this.enemy.setFlip(true, false);
            this.enemy.PlayAnimation('run');
        } else if (this.enemy.body.velocity.x < 0)
        {
            //this.enemy.setFlip(false, false);
            this.enemy.PlayAnimation('run');
        }
    }

    //take damage
    takeDamage() {
        if (this.hero.isAttacking != null && this.hero.isAttacking.play)
        {
            this.enemy.takeDamage();
        }

    }

    // Game Over
    GameOverPlayer(){
        this.gameOverText = this.add.text(150, 120, 'Game Over' , {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.gameOverText.visible = true;
        this.gameOverText.setScrollFactor(0,0);
    }

    //Victory
    victoryPlayer(){
        this.victoryText = this.add.text(150, 120, 'You Win!' , {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.victoryText.visible = true;
        //Keeps text on screen
        this.victoryText.setScrollFactor(0,0);
        this.hero.cursor = null;
    }

    //called every frame
    update(time, delta) {
        super.update(time, delta);
        if (!this.enemyAttacking && this.isGameOver === false)
        {
            this.enemyAnimations();
            this.enemyAttacks();
            this.time.delayedCall(1000,this.Patrol, [delta], this);
        }
        if (this.hero.healthPoints === 0)
        {
            this.GameOverPlayer();
        }
        if (this.hero.body.position.x > 1000)
        {
            this.victoryPlayer();
        }
    }

    //Creates the hero instance
    AddHero(){
        this.hero = new Hero(this, 10 , 100);
    }

    //Creates the enemy instance
    AddEnemy(){
        this.enemy = new Enemy(this, 250 , 120, 100);

    }

    //Loads game objects
    LoadObjects()
    {
        this.healBook = [];
        this.armor = [];
        this.gold = [];
        this.GetObjectsFromTileSet('Items', this.healBook , this.map);
    }


    //Increases player health
    increaseHealth (sprite)
    {
        this.hero.updateHealth(50);
        this.UpdateUHD();
        sprite.destroy();
    }

    //Increases player armor
    increaseArmor (sprite)
    {
        this.hero.updateArmor(50);
        this.UpdateUHD();
        sprite.destroy();
    }
    //Increases player armor
    increaseGold (sprite)
    {
        this.hero.updateGold(50);
        this.UpdateUHD();
        sprite.destroy();
    }

    //Get list of objects from tile set in an existing layer
    GetObjectsFromTileSet(objectName, objectReference){
        this.objects = null;
        this.objects = this.map.getObjectLayer(objectName)['objects'];
        for(let i = 0; i < this.objects.length; ++i)
        {
            const obj = this.objects[i];
            //console.log(obj.gid + obj.x + obj.y);
            switch (obj.gid)
            {
                //204 healBook
                case 204:
                    objectReference = new Item(this, obj.x, obj.y, 'icon-sprites', 28);
                    this.healBook.push(objectReference);
                    this.physics.add.collider(objectReference, this.hero, this.increaseHealth,null,this);
                    break;
                //armor
                case 179:
                    objectReference = new Item(this, obj.x, obj.y, 'icon-sprites', 3);
                    this.armor.push(objectReference);
                    this.physics.add.collider(objectReference, this.hero, this.increaseArmor,null,this);
                    break;
                //gold
                case 288:
                    objectReference = new Item(this, obj.x, obj.y, 'icon-sprites', 112);
                    this.gold.push(objectReference);
                    this.physics.add.collider(objectReference, this.hero, this.increaseGold,null,this);
                    break;

            }
        }
    }
    //Load scene resources
    LoadResources()
    {
        this.load.spritesheet('hero-sprites-1', 'res/Player/char_blue_1.png', {
            frameWidth: 56,
            frameHeight: 56,
            startFrame: 0,
            endFrame:88
        } );
        this.load.spritesheet('hero-sprites-2', 'res/Player/char_blue_2.png', {
            frameWidth: 56,
            frameHeight: 56,
            startFrame: 0,
            endFrame:56
        } );
//        this.load.spritesheet('enemy-sprites', 'res/Enemy/Cultist_Sheet.png', {
        this.load.spritesheet('enemy-sprites', 'res/Enemy/Big-Cultist_NoEffect_Sheet.png', {
            frameWidth: 108,
            frameHeight: 59,
            startFrame: 0,
            endFrame:60
        } );
        this.load.spritesheet('icon-sprites', 'res/Icon/icons.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 0,
            endFrame:349
        } );
        this.load.image('player', 'res/SpaceInvaders/P-blue-a.png' );


        this.load.image('tiles','res/Assets/tiles.png');
        this.load.tilemapTiledJSON('map','res/Tiled/Map01.json');
    }

    //Create map layers
    CreateLayers()
    {
        const tiles = this.map.addTilesetImage('tiles', 'tiles');
        const backGround1 = this.map.createLayer('Background01', tiles, 0, 0);
        const backGround3 = this.map.createLayer('Background03', tiles, 0, 0);
        const backGround2 = this.map.createLayer('Background02', tiles, 0, 0);
        const backGround4 = this.map.createLayer('Background04', tiles, 0, 0);
        const backGround5 = this.map.createLayer('Background05', tiles, 0, 0);
        const ground = this.map.createLayer('Ground', tiles, 0, 0);

        this.layers =  {
            backGround1,
            backGround2,
            backGround3,
            backGround4,
            backGround5,
            ground
        };
    }

    //Creates the map
    AddMap(){
        this.map = this.make.tilemap({key: 'map'});
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, false, true);
    }
}