class Enemy extends MySprite {
    constructor(scene, name, x, y, timeBajar, distancia, vida, isBosses) {
        super(scene, x, y, name);

        //captura de tecla a presionar
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.body.allowGravity = false;
        this.yOriginal = y;
        this.xOriginal = x;

        this.puntaje = this.randomNumber(100, 500);
        this.timeDisparar = this.randomNumber(150, 200);
        this.timeBajar = timeBajar;
        this.distancia = distancia;
        this.tiempo = 150;
        this.resetEnemy();
        this.eliminado = false;

        this.vida = vida;
        this.isBosses = isBosses;

    }

    update(time, delta) {
        if (!this.eliminado) {
            this.cont++;
            this.contDisparo++;
            this.contBajar++;
            if (this.left) {
                this.setVelocityX(-2 * delta);
            }
            if (!this.left) {
                this.setVelocityX(2 * delta);
            }

            if (this.cont >= this.tiempo && this.left) {
                this.left = false;
                this.cont = 0;
            }
            if (this.cont >= this.tiempo && !this.left) {
                this.left = true;
                this.cont = 0;
            }
            if (this.contDisparo >= this.timeDisparar) {
                if (this.isBosses) {
                    this.dispararEnemy();
                }
                this.contDisparo = 0;
            }
            if (this.contBajar >= this.timeBajar) {
                this.bajando = true;
                this.contBajar = 0;
                this.contDisparo = 0;
                this.bajarNave(delta);
            }

            if (this.bajando) {
                if (this.y >= this.yOriginal + this.distancia) {
                    this.yOriginal += this.distancia;
                    this.bajando = false;
                    this.setVelocityY(0);
                }
            }
            if(this.y>=550){
                this.scene.gameOver();
            }
        }

        if (this.bala != undefined && !this.bala.eliminado) {
            this.bala.update(time, delta);
        }
    }

    randomNumber(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    dispararEnemy() {
        this.bala = new Bala(this.scene, this.x, this.y, false,false);
        this.scene.physics.add.overlap(this.bala, this.scene.player, this.eliminarPlayer, null, this);
    }

    bajarNave(delta) {
        this.setVelocityY(3 * delta);
    }

    eliminarPlayer(bala, player) {
        this.scene.deadPlayer(player, this);
        bala.eliminarBala();
    }


    resetEnemy() {
        this.setVelocityY(0);
        this.timeDisparar = this.randomNumber(100, 200);
        this.y = this.yOriginal;
        this.x = this.xOriginal;
        this.cont = 0;
        this.contDisparo = 0;
        this.contBajar = 0;
        this.left = false;
        this.bajando = false;
        if (this.bala != undefined) {
            this.bala.eliminarBala();
        }
    }
}