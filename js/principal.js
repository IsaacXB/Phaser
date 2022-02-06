var jugador1 = new jugador(5);
var soldado1 = new soldado(2, 3);
var soldado2 = new soldado(3, 2);

soldado1.atacarA(jugador1);
soldado2.atacarA(jugador1);

console.log(jugador1.vida)

jugador1.recibeAtaque(caida);

console.log("Al jugador le quedan " + jugador1.vida + " puntos de vida");
