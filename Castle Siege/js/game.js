var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: "canvas",
    mode:Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics:{
        default: 'arcade',
        arcade: {
            /*gravity:{
                y: 300
            },*/
            debug: true
        }
    },
    scene:  [templateScene],
};

var game = new Phaser.Game(config);

function preload(){

}

function create(){

}

