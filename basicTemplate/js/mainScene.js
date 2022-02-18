class mainScene extends Phaser.Scene{
    constructor(){
        super('mainScene');

    }

    preload(){
        this.load.image('face', 'res/face.png');
        this.load.spritesheet('player', 'res/dude.png' ,
            {
                frameWidth: 32,
                frameHeight:48
            });
        this.load.image('apple','res/apple.png');
        this.load.image('ground', 'res/ground.png');
    }

    create(){
        //groups
        this.appleGroup = this.add.group();
        for(var i=1; i < 5; i++)
        {
            //this.apple = this.add.image(100 *i,100*i, 'apple');
            //add physics to image
            this.apple = this.physics.add.sprite(100 *i,100*i, 'apple');
            this.apple.setGravityY(200);
            this.apple.setBounce(0.2,0.1);
            //this.input.on('pointerdown', this.moveApple, this);
            this.appleGroup.add(this.apple);
        }
        this.ground = this.physics.add.sprite(250,600,'ground');
        // set image inmovable
        this.ground.setImmovable();
        //add collision
        this.physics.add.collider(this.appleGroup, this.ground);
        //image
        this.face = this.add.image(240,0,'face');
        //image properties
        this.face.aplha = 0.5;
        this.face.scaleX = 0.25;
        this.face.scaleY = 0.25;
        this.face.setOrigin(0,0);
        //to make an image clickable call setInteractive method
        this.face.setInteractive();
        //add a function to the desired mouse event
        this.face.on('pointerdown', this.onDown, this);
        this.face.on('pointerup', this.onUp, this);
        //player
        this.player = this.add.sprite(0, game.config.height / 2, 'player');

        //auto generate key frames for single image in sprite with animations
        this.playerFrames = this.anims.generateFrameNumbers('player', {
            start: 5,
            end: 8
        });
        this.anims.create({
           key: 'walk',
           /*frames:[
               {key:'player', frame: 9 },
               {key:'player', frame: 1 },
               {key:'player', frame: 2 },
               {key:'player', frame: 3 },
               {key:'player', frame: 4 },
               {key:'player', frame: 5 },
               {key:'player', frame: 6 },
               {key:'player', frame: 7 },
               {key:'player', frame: 8 }
           ],*/
            frames: this.playerFrames,
            frameRate: 9,
            repeat: -1
        });

        this.player.play('walk');
        this.doWalk();
        //add text
        this.score = 0;
        this.scoreText = this.add.text(380,20,'Score: ' + this.score);
        //yo use phaser graphics
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(4,0xff0000);
        this.graphics.moveTo(100,0);
        // line / laser
        this.graphics.lineTo(100,250);
        this.graphics.strokePath();
        // rectangle
        this.graphics.strokeRect(200,100,50,50);
        //circle
        this.graphics.strokeCircle(300,200,60);
    }
    /*moveApple(){
        this.apple.setVelocity(0,1500);
    }*/

    onDown()
    {
        this.face.alpha = .5;
    }
    onUp()
    {
        this.face.alpha = 1;
    }
    doWalk(){
        //function make smooth animations with parameters
        this.tweens.add({
            targets: this.player,
            duration: 5000,
            x:game.config.width,
            y:0,
            alpha:0,
            onComplete: this.onCompleteHandler.bind(this)
        });
    }
    //event to call when tween animation is complete
    onCompleteHandler(tween, targets, custom){
        this.player = targets[0];
        this.player.x =0;
        this.player.y = game.config.height/2;
        this.player.alpha = 1;
        this.doWalk();
    }

    update(time, delta)
    {

    }
}