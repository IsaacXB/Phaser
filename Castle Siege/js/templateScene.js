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
        this.agrid.showNumbers();
        //this.apple = this.add.image(0,0,'apple');
        //this.apple2 = this.add.image(100,0,'apple');

        //Align.scaleToGameW(this.apple, .1);
        //Align.scaleToGameW(this.apple2, .1);
        //this.agrid.placeAtIndex(37,this.apple);
        //to group items in blocks
        /*this.block = new UIBlock();
        this.block.add(this.apple);
        this.block.add(this.apple2);
        this.agrid.placeAtIndex(37,this.block);*/
    }
}