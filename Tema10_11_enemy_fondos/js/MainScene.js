class MainScene extends Scene
{
    preload()
    {
        this.load.image('tiles','res/Tileset.png');
        this.load.tilemapTiledJSON('map','res/Map.json');
        this.load.image('bg-1', 'res/sky.png');
        this.load.image('sea', 'res/sea.png');
        this.load.image('player', 'res/idle-1.png');
        this.load.image('droneIdle', 'res/drone-1.png');
        this.load.image('seta', 'res/Seta.png');
        this.load.image('box', 'res/box.png');

        this.load.atlas('sprites_jugador','res/player_anim/player_anim.png',
        'res/player_anim/player_anim_atlas.json');

        this.load.atlas('drone_sprite','res/drone/drone.png',
        'res/drone/drone_atlas.json');
    }

    create()
    {
        //hearts
        var bg_1 = this.add.tileSprite(0, 0, windows.width*2, windows.height*2, 'bg-1');
        bg_1.setScrollFactor(0,0);
        bg_1.fixedToCamera = true;
        //necesitamos un player
       
        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('Plataformas', 'tiles');
        var layerFondo = map.createLayer('Fondo', tiles, 0, 0);
        var layer = map.createLayer('Suelo', tiles, 0, 0);
        //this.player = new Player(this,50,100);

        let player = new Entity('player',this);
        let playerSprite = new SpriteRender(player,50,100,'player');
        this.addEntity(player);
        player.addComponent(playerSprite);
        player.addComponent(new RigidBody(player,true));
        player.addComponent(new Player(player,layer));
        //Vida
        //Destroy
        
        
        //this.player = new Player(this,50,100);

        var objectsArr = map.getObjectLayer('objetos')['objects'];

        //this.setas=[];
        for(var i = 0; i < objectsArr.length; i++)
        {
             var obj = objectsArr[i];
             if(obj.gid == 115)
             {
                let seta = new Entity('Seta'+obj.id,this);
                this.addEntity(seta);
                seta.addComponent(new SpriteRender(seta,obj.x+16,obj.y-16, 'seta'));
                seta.addComponent(new RigidBody(seta,false));
                seta.addComponent(new Seta(seta,playerSprite)); //añadir en el array
                seta.addComponent(new Destroy(seta)); //añadir en el array
             }else if(obj.gid == 181)
             {
                let attrName = obj.properties[0]["name"];
                let attrValue = obj.properties[0]["value"];
                
                let drone = new Entity("Drone",this);
                let droneSprite = new SpriteRender(drone,obj.x+16,obj.y-16,'droneIdle');
                this.addEntity(drone);
                drone.addComponent(droneSprite);
                drone.addComponent(new RigidBody(drone,false));
                if(attrName == "Area")
                    drone.addComponent(new Drone(drone,player,attrValue));
                else
                    drone.addComponent(new Drone(drone,player));

             }
        }

        var group = this.physics.add.group({
            collideWorldBounds: true,
            immovable : true
        });
        
        let box = new Entity('box01',this);
        
        let boxSprite = new SpriteRender(box,150,200,'box');
        group.add(boxSprite);
        box.addComponent(boxSprite);
        box.addComponent(new RigidBody(box));
        //constructor(entity,scene,group,layer,playerSprite)
        let boxComp = new Box(box,this,group,layer,playerSprite);
        box.addComponent(boxComp);
        this.addEntity(box);

        //enable collisions for every tile
        layer.setCollisionByExclusion(-1,true);
        
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.start();
        this.createUI();
    }

    createUI()
    {
        var contadorSetas  = this.add.image(16, 16, 'seta');
        contadorSetas.setScrollFactor(0,0);
        contadorSetas.fixedToCamera = true;

        this.contadorPuntosTxt  = this.add.text(30, 0, " 0");
        this.contadorPuntosTxt.setFontSize(48);
        this.contadorPuntosTxt.setFill('#000');
        this.contadorPuntosTxt.setScrollFactor(0);
        this.contadorPuntos = 0;

        //contadorSetas.setScrollFactor(0,0);
        //contadorSetas.fixedToCamera = true;
    
    }

    addPoints(t)
    {
        this.contadorPuntos += t;
        this.contadorPuntosTxt.text = this.contadorPuntos;
    }

    //showGameover(){}
    //updateHearts(){}
    //destroyHears(){}


}