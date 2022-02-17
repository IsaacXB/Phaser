class Player extends MySprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprites_jugador');

        //captura de tecla a presionar
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.body.allowGravity = false;  

        this.speed = 10;
        this.countVida = 3;
        this.puntaje = 0;

        this.direccion = false;
        this.balas = [];

        this.disparadoLaser=false;

    }

    update(time, delta) {
        if(!this.visible) return;
        if (this.cursor.left.isDown) {
            this.setVelocityX(-this.speed * delta);
            this.setFlipX(false);
            this.direccion = false;
        }
        else if (this.cursor.right.isDown) {
            this.setVelocityX(this.speed * delta);
            this.setFlipX(true);
            this.direccion = true;
        }
        else {
            //Parado
            this.setVelocityX(0);
        }

        const ispressSpace = Phaser.Input.Keyboard.JustDown(this.cursor.space);

        if (ispressSpace) {
            this.time = 0;
            this.disparar = true;
            this.dispararBala(false);
        }

        this.scene.input.on('pointerdown', function (pointer) {
            if(!this.disparadoLaser)
            {
                this.dispararBala(true);
                this.disparadoLaser=true;
            }
        }, this);

        if (this.balas.length != 0) {
            for (let i = 0; i < this.balas.length; i++) {
                if (this.balas[i] != undefined) {
                    this.balas[i].update(time, delta);
                }
            }

        }

        if(this.x<0)
        {
            this.x=800;
        }
        if(this.x>800)
        {
            this.x=1;
        }
    }

    dispararBala(isLaser) {
        if (this.visible) {
            this.balas.push(new Bala(this.scene, this.x, this.y,true,isLaser));
            this.scene.physics.add.overlap(this.balas, this.scene.enemys, this.eliminarEnemy, null, this);
        }
    }

    eliminarEnemy(bala,enemy)
    {
        bala.eliminarBala();
        this.scene.incrementarPuntaje(enemy.puntaje);
        enemy.vida--;
        if(enemy.vida<=0)
        {
            enemy.eliminado = true;
            enemy.destroy();
        }
    }
}