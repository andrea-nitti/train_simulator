//Funzione per creare l'ambiente
function createEnvironment(scene, posz) {

    cittaRandom(scene, 20, posz);
    cittaRandom(scene, -629.5, posz);

    cittaRandom(scene, 20, posz+512);
    cittaRandom(scene, -629.5, posz+512);

    cittaRandom(scene, 20, posz-512);
    cittaRandom(scene, -629.5, posz-512);
}

function cittaRandom(scene, posx, posz) {
    var random = Math.round(Math.random()*100);
    switch (true) {
        case random < 100 && random > 73:
          cittaP1(scene, posx, posz);
          break;
        case random < 74 && random > 48:
          cittaP2(scene, posx, posz);
          break;
        case random < 49 && random > 23:
          cittaP3(scene, posx, posz);
          break;
        case random < 24 && random > -1:
          cittaP4(scene, posx, posz);
          break;
    }
}
