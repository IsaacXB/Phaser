class soldado extends persona{
    constructor(vida, ataque) {
        super(vida);
        this.ataque = ataque;
    }
    atacarA (persona){
        console.log ("Ataco a " + persona.constructor.name + " y le hago " + this.ataque + " puntos de daño");
        persona.recibeAtaque(this.ataque);
    }
}