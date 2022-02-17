class MainScene extends Phaser.Scene
{
    constructor()
    {
        super('MainScene');
    }
    preload()
    {
        this.load.image('fondo','res/Fondo01.png');
        this.load.image('pistola','res/pistola.png');
        // https://gammafp.com/tool/atlas-packer/
        this.load.atlas('characters','res/sprites_hogans_alley/sprites_hogans_alley.png',
        'res/sprites_hogans_alley/sprites_hogans_alley_atlas.json');
    }

    randomNumber(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min+1)+min);
    }

    create()
    {
        this.billboardName = ["bad01","bad02","bad03","good01","good02","good03"];
        this.billboardBad =  [true   ,true,   true,   false,   false,   false];

        var bg_1 = this.add.image(512,448,'fondo');
        bg_1.fixedToCamera = true;


        this.timeToShootTxt  = this.add.text(450, 120, "0.0");
        this.timeToShootTxt.setFontSize(40);
        this.timeToShootTxt.setFill('#fff');
        this.timeToShootTxt.setScrollFactor(0);
        
        //necesitamos un player
        //enable collisions for every tile
        this.msgText  = this.add.text(250, 180, "GAME OVER");
        this.msgText.setFontSize(60);
        this.msgText.setFill('#fff');
        this.msgText.setScrollFactor(0);
        this.msgText.visible = false;

        this.gameOverTxt2  = this.add.text(210, 280, "Pulsa enter para reiniciar el nivel");
        this.gameOverTxt2.setFontSize(20);
        this.gameOverTxt2.setFill('#fff');
        this.gameOverTxt2.setScrollFactor(0);
        this.gameOverTxt2.visible = false;


        this.healthTxt  = this.add.text(550, 750, "0");
        this.healthTxt.setFontSize(50);
        this.healthTxt.setFill('#fff');
        this.healthTxt.setScrollFactor(0);
        this.healthTxt.visible = true;

        this.score = 0;
        this.scoreTxt  = this.add.text(200, 775, "0");
        this.scoreTxt.setFontSize(30);
        this.scoreTxt.setFill('#fff');
        this.scoreTxt.setScrollFactor(0);
        this.scoreTxt.visible = true;
        this.contadorRondas = 0;


        this.player = new Player(this,512,448,'pistola',2);
        this.state = "moving";
        this.createSpriteS();
        this.setHelth(this.player.health);
        this.player.enableOverlaping(false);

    }

    update (time, delta)
    {
        switch(this.state)
        {
            case "moving":
                this.moving(time,delta);
                break;
            case "reveal":
                this.revealing(time,delta);
                break;
            case "shoot":
                this.shooting(time,delta);
                break;
            case "gameover":
                this.gameover(time,delta);
                break;
            case "damageView":
                this.damageView(time,delta);
                break;
        }
        this.lastTime = time;
        //this.player.update(time,delta);
    }

    setHelth(h)
    {
        this.healthTxt.text = h;
    }

    addPoints(d)
    {
        this.score += d;
        this.scoreTxt.text = this.score;
    }


    createSpriteS()
    {
        this.sprites = [];
        //this.sprites.push(new Billboard(this,260,414,'characters','billboard01'));
        //this.sprites.push(new Billboard(this,510,414,'characters','billboard01'));
        //this.sprites.push(new Billboard(this,760,414,'characters','billboard01'));
        for(let i = 0; i < 3; i++)
        {
            this.sprites.push(new Billboard(this,-500+i*250,414,'characters','billboard01'));
            //this.sprites.push(new Billboard(this,-250,414,'characters','billboard01'));
            //this.sprites.push(new Billboard(this,0,414,'characters','billboard01'));
        }
    }

    moving(time, delta)
    {
        if((Phaser.Math.Difference(this.sprites[0].x,260)) < 5)
        {
            this.state = "reveal";
            this.revealTime = time;

            this.stopBillboards();
        }
        /*var timeBeforeLastCicle = time - this.cicleTimeInit;
        if(timeBeforeLastCicle > 100)
        {
            
            this.player.setSprites();
            this.cicleTimeInit = time;
        }
        else
        {
            
        }*/
    }

    revealing(time, delta)
    {
        if((Phaser.Math.Difference(this.revealTime,time)) > 200)
        {
            for(let i = 0; i < 3; i++)
            {
                let r = this.randomNumber(0,this.billboardName.length-1);
                console.log("reveal "+r);
                this.sprites[i].changeSprite('characters',this.billboardName[r]);
                this.sprites[i].setBad(this.billboardBad[r]);
            }

            for(let i = 0; i < this.sprites.length; i++)
            {
                this.sprites[i].setSize(150,250);
                this.physics.add.overlap(this.sprites[i], this.player, this.player.checkOverlaping,null,this.player);
            }
            this.state = "shoot";
            this.player.enableOverlaping(true);
            this.shootTime = time;
        }
    }

    shooting(time, delta)
    {
        let timeRemain = Phaser.Math.Difference(this.shootTime,time);
        if(timeRemain > 2000)
        {
            if(this.thereIsBads())
            {
                this.player.damage();
                if(this.player.isDeath())
                {
                    this.setGameOver();
                }
                else
                {                
                    this.showMiss();
                    this.reset();
                }
            }
            else
            {
                this.setDamage();
                this.addPoints(100);
            }
        }
        else
        {
            this.timeToShootTxt.text = (timeRemain/100);
        }
    }

    thereIsBads()
    {
        for(let i = 0; i < this.sprites.length; ++i)
        {
            if(this.sprites[i].isBad())
            {
                return true;
            }
        }
        return false;
    }
    gameover(time, delta)
    {
        if(this.enter.isDown)
        {
            this.destroyBillboards();
            this.msgText.visible = false;
            this.gameOverTxt2.visible = false;
            this.createSpriteS();
            this.state = "moving";
            this.player.resetHealth();
            this.score = 0;
            this.scoreTxt.text = this.score;
        }
    }

    destroyBillboards()
    {
        for(let i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i].destroy();
        }
    }

    reset()
    {
        this.destroyBillboards();
        this.createSpriteS();
        this.state = "moving";
        
    }

    showMiss()
    {
        this.msgText.text = "Miss";
        this.msgText.visible = true;
        console.log("Show miss");
    }

    setGameOver()
    {
        this.msgText.text = "GAME OVER";
        this.msgText.visible = true;
        this.state = "gameover";
        this.gameOverTxt2.visible = true; 
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.stopBillboards();
    }

    stopBillboards()
    {
        for(let i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i].stop();
        }
    }

    setDamage()
    {
        this.state = "damageView";
        this.msgText.text = "You Win!";
        this.msgText.visible = true;
        this.damagetime = this.lastTime;
    }

    damageView(time,delta)
    {
        if((Phaser.Math.Difference(this.damagetime,time)) > 500)
        {
            this.contadorRondas += 1;
            if(this.contadorRondas == 3)
            {
                this.scene.start("Win");
            }
            this.reset();
        }
    }
}