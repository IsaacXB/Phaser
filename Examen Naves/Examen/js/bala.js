class Bala extends MySprite {
    constructor(scene, x, y, player,isLaser) {
        if(!isLaser)super(scene, x, y, 'sprites_bala');
        else super(scene, x, y, 'sprites_laser');
        this.body.allowGravity = false;  
        this.speed = 500;
        this.eliminado = false;
        this.isLaser=isLaser;
        if(player==true)
        {
            this.setVelocityY(-this.speed);
        }
        else
        {
            this.setVelocityY(this.speed);
        }
    }


    update(time, delta) {

        if (this.y < 0) {
            this.isLaser=false;
            this.eliminarBala();
        }
        if(this.y>576)
        {
            this.isLaser=false;
            this.eliminarBala();
        }
    }

    eliminarBala()
    {
        if(!this.isLaser)
        {
            this.eliminado=true;
            this.destroy();
        }
    }
}