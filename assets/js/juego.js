// 2C = two of clubs 
// 2D = two of diamond
// 2H = two of hards
// 2S = two of  

(() => {

    'use strict'

    let deck              = [];
    const tipos           = ['C', 'D', 'H', 'S'],
          especiales      = ['A', 'J', 'Q', 'K'];

    //eliminar estas variables
    let puntosJugador     = 0,
        puntosComputadora = 0;

    let puntosJugadores = [];

    // Referencias del HTML
    const btnDetener        = document.querySelector('#btnDetener'),
          btnPedir          = document.querySelector('#btnPedir'),
          btnNuevo          = document.querySelector('#btnNuevo'),
          puntosHTML        = document.querySelectorAll('small'),
          cartasJugador     = document.querySelector('#jugador-cartas'),
          cartasComputadora = document.querySelector('#computadora-cartas');

    //Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {

        deck = crearDeck();

        for( let i = 0; i < numJugadores; i++  ){

            puntosJugadores.push(0);

        }

        console.log(puntosJugadores);

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

    const acumularPuntos = () => {



    }

    //computer tourn
    const turnoComputadora = ( puntosMinimos ) => {

        do{

            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);

            // console.log(puntosJugador);
            
            puntosHTML[1].innerText = puntosComputadora;

            // <img id="primerCarta" name="primerCarta" class="carta" src="assets/cartas/2D.png" alt="">
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            cartasComputadora.append( imgCarta );

            if(puntosMinimos > 21){
                break;
            }

        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        setTimeout(() => {

            resultadoJuego();
            
        }, 20);

    }

    // Eventos
    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    });

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);

        console.log(puntosJugador);
        
        puntosHTML[0].innerText = puntosJugador;

        // <img id="primerCarta" name="primerCarta" class="carta" src="assets/cartas/2D.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        cartasJugador.append( imgCarta );

        if (puntosJugador > 21) {

            console.warn('Lo siento mucho pero perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
            
        } else if(puntosJugador === 21){

            console.warn('21, Has Ganado!!!!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } 

    });

    const resultadoJuego = () =>{

        if(puntosJugador === puntosComputadora){

            alert("Nadie Gana");

        }else if(puntosComputadora <= 21){

            alert("Computadora  Gana");
        
        }else if(puntosJugador <= 21){

            alert("Jugador Gana");

        }

    };

    btnNuevo.addEventListener('click', () => {

        console.clear();
        inicializarJuego();

        // deck = [];
        // deck = crearDeck();

        puntosJugador       = 0;
        puntosComputadora   = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        btnPedir.disabled    = false;
        btnDetener.disabled  = false;

        cartasJugador.innerHTML     = '';
        cartasComputadora.innerHTML = '';

    })

})();

