var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "canvas",
    mode:Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics:{
        default: 'arcade',
        arcade: {
            gravity:{
                y: 300
            }
        }
    },
    scene:  escenaPrincipal,
};

var juego = new Phaser.Game(config);

function preload(){

}

function create(){

}