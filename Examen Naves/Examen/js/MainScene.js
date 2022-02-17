
class MainScene extends Phaser.Scene {

    //Se coloca un nombre para realizar el reiniciado del nivel
    constructor() {
        super("main");
    }

    //objetos precargados en el nivel.
    preload() {
        this.load.image('background', 'res/black.png');
        this.load.image('sprites_jugador', 'res/nave.png');
        this.load.image('sprites_bala', 'res/bala.png');
        this.load.image('sprites_laser', 'res/laser.png');
        this.load.image('sprites_enemy', 'res/enemy.png');
        this.load.image('sprites_enemy2', 'res/enemy2.png');
        this.load.image('sprites_return', 'res/return.png');
        this.load.image('sprites_menu', 'res/menu.png');
    }

    create() {
        this.add.image(0, this.scale.height, 'background').setOrigin(0, 1)

        this.nivel = 2;

        this.player = new Player(this, 400, 550);

        this.createEnemy();

        this.puntajeText = this.add.text(35, 10, 'Puntaje: ' + this.player.puntaje, {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.vidasText = this.add.text(35, 40, 'Vida x ' + this.player.countVida, {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.laserText = this.add.text(35, 70, 'Laser x ' + (!this.player.disparadoLaser?"1":"0"), {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });

    }

    randomNumber(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min+1)+min);
    }

    createEnemy()
    {
        this.enemys = [];
        let x=150;
        let y=100;
        let timeBajar=this.randomNumber(100,300);
        let distancia=50;
        for(let i=0;i<5;i++)
        {
            this.enemys.push(new Enemy(this,'sprites_enemy2', x+2, y,timeBajar,distancia,1,false));
            x+=100;
        }
        y=200;
        x=150;
        for(let i=0;i<5;i++)
        {
            this.enemys.push(new Enemy(this,'sprites_enemy', x, y,timeBajar,distancia,2,true));
            x+=100;
        }
        
        this.physics.add.overlap(this.player,this.enemys,  this.deadPlayer, null, this);
    }

    //MOvimiento de player
    update(time, delta) {
        this.player.update(time, delta);
        for (let i = 0; i < this.enemys.length; i++) {
            if (this.enemys[i] != undefined)
                this.enemys[i].update(time, delta);
        }

        this.winner();
        this.verLaser();
    }

    winner()
    {
        if(!this.player.visible) return;
        let winner=true;
        for (let i = 0; i < this.enemys.length; i++) {
            if (this.enemys[i] != undefined)
                if(!this.enemys[i].eliminado)
                {
                    winner=false;
                    break;
                }
        }
        if(winner)
        {
            this.viewMesaje('WINNER');
        }
    }

    resetLevel()
    {
        this.player.x =400
        this.player.y = 550;

        for (let i = 0; i < this.enemys.length; i++) {
            if (this.enemys[i] != undefined && !this.enemys[i].eliminado)
            {
                this.enemys[i].resetEnemy();
            }
        }
    }

    eliminarEnemys()
    {
        for (let i = 0; i < this.enemys.length; i++) {
            if (this.enemys[i] != undefined && !this.enemys[i].eliminado)
            {
                this.enemys[i].eliminado=true;
                this.enemys[i].destroy();
            }
        }
    }

    verLaser()
    {
        this.laserText.text="Laser x "+ (!this.player.disparadoLaser?"1":"0");
    }

    incrementarPuntaje(mount) {
        this.player.puntaje += mount;
        this.puntajeText.text = 'Puntaje: ' + this.player.puntaje;
    }

    deadPlayer(player, enemy) {
        this.player.countVida--;
        if (this.player.countVida > 0) {
            this.vidasText.text = 'Vida x ' + this.player.countVida;
            this.resetLevel();
        }
        else {
            this.player.countVida = 0;
            this.gameOver();
        }

    }

    gameOver() {
        this.eliminarEnemys();
        this.vidasText.text = 'Vida: ' + this.player.countVida;
        this.viewMesaje("Game Over")
    }

    viewMesaje(mensaje) {
        //Texto de Game Over o Finish
        var gameOverText = this.add.text(400, 200, mensaje, {
            fontSize: '70px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        }).setOrigin(0.5);

        //Boton replay para reiniciar el juego.
        var returnButton = this.add.sprite(400, 280, 'sprites_return').setOrigin(0.5);
        returnButton.setScale(0.30);

        returnButton.setInteractive();
        returnButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function () {
            this.scene.scene.start("main");
        });

        var returnButton = this.add.sprite(400, 330, 'sprites_menu').setOrigin(0.5);
        returnButton.setScale(0.30);

        returnButton.setInteractive();
        returnButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function () {
            this.scene.scene.start("menu");
        });

        this.player.speed = 0;
        this.player.visible = false;
        this.player.destroy();
    }

}