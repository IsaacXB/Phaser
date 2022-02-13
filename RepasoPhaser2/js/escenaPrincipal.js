class escenaPrincipal extends Phaser.Scene {
    preload() {
        this.load.image('tile', 'res/Tileset.png');
        this.load.tilemapTiledJSON('map', 'res/Mapa.json');
        this.load.image('jugador', 'res/idle-1.png');
        this.load.image('mushroom', 'res/mushroom.png');
        this.load.image('bg', 'res/sky.png');
        this.load.atlas('spritesjugador', 'res/player/jugadoratlas.png', 'res/player/jugadoratlas_atlas.json');
    }

    create() {
        this.add.tileSprite(0, 0, 2048, 2048, 'bg');
        var map = this.make.tilemap({ key: 'map'});
        var tiles = map.addTilesetImage('Escenario', 'tile');
        var layerFondo = map.createLayer('Fondo', tiles, 0, 0);
        var layerAdornos = map.createLayer('Adornos', tiles, 0, 0);
        var layerAgua = map.createLayer('Agua', tiles, 0, 0);
        var layerTierra = map.createLayer('Terreno', tiles, 0, 0);
        layerTierra.setCollisionByExclusion(-1, true);

        this.jugador1 = new jugador(this, 75, 50);
        this.physics.add.collider(this.jugador1, layerTierra);
        this.physics.add.collider(this.jugador1, layerAgua);

        var objectsJSON = map.getObjectLayer('Items')['objects'];
        this.mushrooms = [];
        for (let i = 0; i < objectsJSON.length; i++){
            var obj = objectsJSON[i];
            if (obj.gid == 115)
            {
                this.mushrooms.push(new mushroom(this, obj.x, obj.y));
            }
        }
        this.physics.add.collider(this.mushrooms, layerTierra);


        this.cameras.main.startFollow(this.jugador1);
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.jugador1.setCollideWorldBounds(true);

    }

    update(time, delta) {
        this.jugador1.update(time, delta);
    }
}