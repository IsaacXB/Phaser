class persona {
    constructor(vida) {
        this.vida = vida;
    }

    reducirVida (ataque){
        this.vida -= ataque;
    }
}