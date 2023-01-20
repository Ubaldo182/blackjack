// 2C = two of clubs 
// 2D = two of diamond
// 2H = two of hards
// 2S = two of  

const miModulo = (() => {

    'use strict';

    let deck              = [];
    const tipos           = ['C', 'D', 'H', 'S'],
          especiales      = ['A', 'J', 'Q', 'K'];

    //eliminar estas variables
    // let puntosJugador     = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];

    // Referencias del HTML
    const btnDetener         = document.querySelector('#btnDetener'),
          btnPedir           = document.querySelector('#btnPedir'),
          btnNuevo           = document.querySelector('#btnNuevo'),
          puntosHTML         = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
        //   cartasJugador     = document.querySelector('#jugador-cartas'),
        //   cartasComputadora = document.querySelector('#computadora-cartas');

    //Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {

        deck = crearDeck();

        puntosJugadores = [];

        for( let i = 0; i < numJugadores; i++  ){

            puntosJugadores.push(0);

        }

        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled    = false;
        btnDetener.disabled  = false;

    }      

    // esta funcion crea un nuevo deck
    const crearDeck = () => {
        
        deck = [];

        for (let i = 2; i <= 10; i++) {
            
            for ( let tipo of tipos ) {
                
                deck.push( i + tipo );

            }

        }

        for(let tipo of tipos){

            for(let esp of especiales){

                deck.push( esp + tipo );

            }

        }
   
        return _.shuffle(deck);
        
    };

    const pedirCarta = () => {

        if (deck.length === 0){
            throw 'no hay mas cartas en la baraja';
        }

        return deck.pop();

    }

    // en esta funcion no se estan utilizando operadores ternarios
    // const valorCarta = (carta) => {

    //     const valor = carta.substring(0, carta.length -1);
    //     let puntos = 0;

    //     if( isNaN(valor) ){
    //         console.log('no es un numero');
    //         puntos = ( valor === 'A' ) ? 11 : 10;
    //     }else{
    //         console.log('es un numero');
    //         puntos = valor * 1;
    //     }
        
    //     console.log(puntos);

    // }

    //esta funcion es la vercion simplificada de la funcion anterior
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length -1);
        
        return (isNaN( valor )) ?
            ( valor === 'A' ) ? 11 : 10 
            : valor * 1;

    }

    //turno: 0 = primer jugador y el ultimo sea la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
        // cartasComputadora.append( imgCarta );

    }

    //computer tourn
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do{

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length - 1 );

        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        resultadoJuego();

    }

    // Eventos
    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);

    });

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta( carta, 0 );

        if (puntosJugador > 21) {

            console.warn('Lo siento mucho pero perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);
            
        } else if(puntosJugador === 21){

            console.warn('21, Has Ganado!!!!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);

        } 

    });

    const resultadoJuego = () =>{

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {

            if(puntosComputadora === puntosMinimos){

                alert("Nadie Gana");

            }else if(puntosMinimos > 21){

                alert("Computadora  Gana");
            
            }else if(puntosComputadora > 21){

                alert("Jugador Gana");

            }else{

                alert("Computadora Gana");

            }

        }, 20);

    };

    // btnNuevo.addEventListener('click', () => {

    //     console.clear();
    //     inicializarJuego();

    // })

    return {

        nuevoJuego: inicializarJuego

    };

})();

