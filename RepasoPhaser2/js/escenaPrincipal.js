class escenaPrincipal extends Phaser.Scene {
    preload() {
        this.load.image('tile', 'img/Tileset.png');
        this.load.tilemapTiledJSON('map', 'img/Mapa.json');
        this.load.image('jugador', 'img/idle-1.png');
        this.load.image('bg', 'img/sky.png');

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

        this.jugador1 = new jugador(this, 75, 50, 'jugador');
        this.physics.add.collider(this.jugador1, layerTierra);
        this.physics.add.collider(this.jugador1, layerAgua);

    }

    update(time, delta) {
        this.jugador1.update(time, delta);
    }
}