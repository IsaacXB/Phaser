var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    parent: "canvas",
    mode:Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    framerate: 30,
    physics:{
        default: 'arcade',
        arcade: {
            /*gravity:{
                y: 300
            },*/
            debug: true
        }
    },

    scene:  [sceneTitle, mainScene],
};

var game = new Phaser.Game(config);

function preload(){

}

function create(){

}

function update(){

}