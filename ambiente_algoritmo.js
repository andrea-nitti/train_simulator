//Funzione per creare l'ambiente
function createEnvironment(scene, posz) {
    let citiesParentMesh = BABYLON.Mesh.CreateBox('', 1.0, scene);
    citiesParentMesh.isVisible = false;

    cittaRandom(scene, 20, posz, citiesParentMesh);
    cittaRandom(scene, -629.5, posz, citiesParentMesh);

    cittaRandom(scene, 20, posz+512, citiesParentMesh);
    cittaRandom(scene, -629.5, posz+512, citiesParentMesh);

    cittaRandom(scene, 20, posz-512, citiesParentMesh);
    cittaRandom(scene, -629.5, posz-512, citiesParentMesh);
    
    return citiesParentMesh;
}

function cittaRandom(scene, posx, posz, citiesParentMesh) {
    cittaP4(scene, posx, posz, citiesParentMesh);
    /*var random = Math.round(Math.random()*100);
    switch (true) {
        case random < 100 && random > 73:
          cittaP1(scene, posx, posz, citiesParentMesh);
          break;
        case random < 74 && random > 48:
          cittaP2(scene, posx, posz, citiesParentMesh);
          break;
        case random < 49 && random > 23:
          cittaP3(scene, posx, posz, citiesParentMesh);
          break;
        case random < 24 && random > -1:
          cittaP4(scene, posx, posz, citiesParentMesh);
          break;
    }*/
}
