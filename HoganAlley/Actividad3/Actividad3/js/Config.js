//Configuración de la escena
var windows = {
    width:1280 ,
    height: 800
}
var config = {
    type: Phaser.AUTO,
    width: windows.width,
    height: windows.height,
    parent: "canvas",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene:  HoganAlley, Level01,
    render:{
        pixelArt:true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: true,
            debugShowVelocity: false,
            debugShowStaticBody: false,
            ground: false,
            fps:60
        }
    }
};

game = new Phaser.Game(config);

//'http://labs.phaser.io'
//'assets/skies/space3.png'
//'assets/sprites/phaser3-logo.png'
//'assets/particles/red.png'

