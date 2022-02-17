class Item extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y, sprite, gid)
    {
        super(scene,x+16,y-16,sprite,gid);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
    }

}