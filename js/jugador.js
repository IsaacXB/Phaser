class jugador extends persona{
    constructor(vida) {
        super(vida);

    }

    recibeAtaque(ataque){
        this.vida -= ataque;
    }
}