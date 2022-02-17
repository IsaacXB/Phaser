class Billboard extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,spriteSheet,sprite)
    {
        super(scene,x,y,spriteSheet,sprite);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setVelocityX(100);
        this.bad = false;
    }

    setBad(b)
    {
        this.bad=b;
    }

    isBad()
    {
        return this.bad;
    }

    stop()
    {
        this.setVelocityX(0);
    }

    changeSprite(spriteSheet,sprite)
    {
        this.setTexture(spriteSheet,sprite);
    }

    update(time,delta)
    {
        
    }

}