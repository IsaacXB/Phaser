class templateScene extends Phaser.Scene {
    constructor() {
        super('mainScene');

    }

    preload(){
        //this.load.image('apple','res/apple.png');
    }

    create(){
        this.agrid = new AlignGrid({
           scene:this, rows:11, cols:11
        });
        //this.agrid.showNumbers();
    }
}