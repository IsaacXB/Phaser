//Configuración de la escena
var windows = {width:1024,height: 896}
var config = {
    type: Phaser.AUTO,
    width: windows.width,
    height: windows.height,
    parent: "canvas",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [MainScene,Win],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug:true
        }
    }
};

var game = new Phaser.Game(config);
//'http://labs.phaser.io'
//'assets/skies/space3.png'
//'assets/sprites/phaser3-logo.png'
//'assets/particles/red.png'

