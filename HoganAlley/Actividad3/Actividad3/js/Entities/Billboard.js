
class Billboard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'billboard');
        this.ActiveBillboards = [];
        this.goodCharacters = ['good01', 'good02', 'good03'];
        this.badCharacters = ['bad01','bad02','bad03'];
        this.moveBillboards = true;
        this.billboardSpeed = 7;
        this.firstBillboardSet = false;
        this.secondBillboardSet = false;

    }

    AddBillboards(){
        for (let i =0; i < 3; i++)
        {
            this.ActiveBillboards[i] = this.scene.add.sprite(0,360,'billboard01');
            this.ActiveBillboards[i].active = true;
            this.firstBillboardSet = false;
            this.secondBillboardSet = false;
            this.moveBillboards = true;
        }

    }
    MoveBillboards(){
        if (this.ActiveBillboards[0].x < 405 )
        {
            this.ActiveBillboards[0].x += this.billboardSpeed;
        }
        else if (!this.firstBillboardSet)
        {
            this.RotateBillboards(0);
            this.firstBillboardSet = true;
        }
        if (this.ActiveBillboards[1].x < 660 )
        {
            this.ActiveBillboards[1].x += this.billboardSpeed * 1.5;
        }
        else if (!this.secondBillboardSet)
        {
            this.RotateBillboards(1);
            this.secondBillboardSet = true;
        }
        if (this.ActiveBillboards[2].x < 910 )
        {
            this.ActiveBillboards[2].x += this.billboardSpeed * 2;
        }
        else
        {
            this.RotateBillboards(2);
            this.moveBillboards = false;
        }
    }

    RotateBillboards(id){
        this.ActiveBillboards[id].setTexture('billboard02');
        this.RandomizeBillboards(id);
    }


    RandomizeBillboards(id){
        if (id === 2 && (this.ActiveBillboards[0].isGood) && this.ActiveBillboards[1].isGood)
        {
            this.random = Phaser.Math.Between(3,5);
        }
        else if (id === 2 && (!this.ActiveBillboards[0].isGood) && !this.ActiveBillboards[1].isGood)
        {
            this.random = Phaser.Math.Between(0,2);
        }
        else
        {
            this.random = Phaser.Math.Between(0,5);
        }

        if (this.random < 3)
        {
            this.ActiveBillboards[id].setTexture(this.goodCharacters[id]).setInteractive();
            this.ActiveBillboards[id].name = this.goodCharacters[id].substring(0,4);
            this.ActiveBillboards[id].isGood = true;
            this.ActiveBillboards[id].on('pointerdown', function(pointer){
                if (this.scene.billboard.ActiveBillboards[id].active === true)
                {
                    this.scene.gameManager.score -= 100;
                    this.scene.gameManager.missed ++;
                    this.scene.background.setTexture('background02');
                    this.scene.gameManager.row = 0;
                    this.scene.billboard.ActiveBillboards[id].setTexture('damage01');
                    this.scene.billboard.ActiveBillboards[id].active = false;
                    this.scene.IsRoundOver();
                }
            });
        }
        else
        {
            this.ActiveBillboards[id].setTexture(this.badCharacters[id]).setInteractive();
            this.ActiveBillboards[id].name = this.badCharacters[id].substring(0,3);
            this.ActiveBillboards[id].isGood = false;
            this.ActiveBillboards[id].on('pointerdown', function(pointer){
                if (this.scene.billboard.ActiveBillboards[id].active === true)
                {
                    this.scene.gameManager.row ++ ;
                    if (this.scene.gameManager.row > this.scene.gameManager.top)
                    {
                        this.scene.gameManager.top = this.scene.gameManager.row ;
                    }
                    this.scene.gameManager.score += 100;
                    this.scene.billboard.ActiveBillboards[id].setTexture('damage01');
                    this.scene.billboard.ActiveBillboards[id].active = false;
                    this.scene.IsRoundOver();
                }
            });
        }
    }

    ClearBillboards(id){
        this.ActiveBillboards[id].destroy();
    }

}