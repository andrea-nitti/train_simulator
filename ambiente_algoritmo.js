//Funzione per creare l'ambiente
function createEnvironment(scene, posz) {
    let arrayOfCityMeshes = [];
    
    cittaRandom(scene, 20, posz, arrayOfCityMeshes);
    cittaRandom(scene, -629.5, posz, arrayOfCityMeshes);

    cittaRandom(scene, 20, posz+512, arrayOfCityMeshes);
    cittaRandom(scene, -629.5, posz+512, arrayOfCityMeshes);

    cittaRandom(scene, 20, posz-512, arrayOfCityMeshes);
    cittaRandom(scene, -629.5, posz-512, arrayOfCityMeshes);
    
    var cityMesh = BABYLON.Mesh.MergeMeshes(arrayOfCityMeshes, true, true, undefined, false, true);   //mesh che raggruppa un intero blocco di città
    return cityMesh;
}

function cittaRandom(scene, posx, posz, arrayOfCityMeshes) {
    let random = Math.round(Math.random()*100);
    switch (true) {
        case random < 100 && random > 73:
          cittaP1(scene, posx, posz, arrayOfCityMeshes);
          break;
        case random < 74 && random > 48:
          cittaP2(scene, posx, posz, arrayOfCityMeshes);
          break;
        case random < 49 && random > 23:
          cittaP3(scene, posx, posz, arrayOfCityMeshes);
          break;
        case random < 24 && random > -1:
          cittaP4(scene, posx, posz, arrayOfCityMeshes);
          break;
    }
}
