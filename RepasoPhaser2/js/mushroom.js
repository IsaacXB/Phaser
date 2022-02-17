class mushroom extends Component {
    constructor(entity, jugador) {
        super(entity);
        this.jugador1 = jugador;
    }

    start() {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.getEntity().getScene().physics.add.overlap(this.sprite, this.jugador1, this.spriteHit, null, this);
    }

    spriteHit(){
        this.getEntity().sendMessage(this.getEntity(), 'destroy',null, true);
        this.sprite.destroy();
        this.getEntity().addPoints(10);
    }

    update(time, delta) {

    }
}