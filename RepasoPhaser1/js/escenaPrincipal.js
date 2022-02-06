class escenaPrincipal extends  Phaser.Scene{

    preload(){
        this.load.image('sky', 'img/sky.png');
        this.load.image('ground', 'img/platform.png');
        this.load.image('star', 'img/star.png');
        this.load.image('bomb', 'img/bomb.png');

        this.load.spritesheet('jugador', 'img/dude.png', { frameWidth:32, frameHeight:48 });
    }

    create(){
        //cielo
        this.add.image(400,300,'sky');

        //plataformas
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(400,568,'ground').setScale(2).refreshBody();
        this.plataformas.create(600,400,'ground');
        this.plataformas.create(50,250,'ground');
        this.plataformas.create(750,220,'ground');

        //estrellas
        this.estrellas = this.physics.add.group({
            key:'star',
            repeat:11,
            setXY : { x:12, y:0, stepX: 70, stepY: 10}
        });
        this.estrellas.children.iterate(function (child){
            child.setBounceY(Phaser.Math.FloatBetween(0.2,0.5));
        });

        //bombas
        this.bomb = this.add.image(240,100,'bomb');


        //Puntuación
        this.puntuacion = 0;
        this.textoPuntuacion = this.add.text(16,16,'Score: 0', {fontSize: '32px', fill:'#000'});

        //Jugador
        this.jugador = new jugador(this, 75,450,'jugador');
        this.jugador.create();

        //fësicas
        this.physics.add.existing(this.bomb);
        this.physics.add.collider(this.estrellas, this.plataformas);
        this.physics.add.collider(this.bomb, this.plataformas);
        this.physics.add.collider(this.jugador, this.plataformas);
        this.physics.add.overlap(this.jugador, this.estrellas, this.coleccionarEstrella, null, this);
        this.physics.add.overlap(this.jugador, this.bomb, this.tocarBomba, null, this);
    }

    update(){
        this.jugador.update();
    }

    tocarBomba(jugador, bomba){
        jugador.disableBody(true,true);
        bomba.disableBody(true,true);
        this.scene.restart();
    }

    coleccionarEstrella(jugador, estrella){
        estrella.disableBody(true,true);
        this.puntuacion ++;
        this.ActualizarPuntuacion();
    }

    ActualizarPuntuacion(){
        this.textoPuntuacion.setText('Score: ' + this.puntuacion, {fontSize: '32px', fill:'#000'});

    }
}