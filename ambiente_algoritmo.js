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

//Funzione per il tempo atmosferico
function weather(rainParticleSystem, lightningPlane, globalWeatherState) {
    let timeStamp = new Date().valueOf() / 1000;    //valueOf() --> millisecondi trascorsi dall'01/01/1970
    if(globalWeatherState.finishTimeStamp < timeStamp) {
        globalWeatherState.weatherState = Math.floor(Math.random()*3);   //numero intero compreso tra 0 (incluso) e 3 (escluso)
        console.log(globalWeatherState.weatherState);
        switch(globalWeatherState.weatherState) {
            case 0:  //sereno
                rainParticleSystem.stop();
                rainParticleSystem.reset();
                break;
            case 1:  //pioggia
                rainParticleSystem.emitRate = 6500;
                rainParticleSystem.start();
                break;
            case 2:  //temporale
                rainParticleSystem.emitRate = 8500;
                rainParticleSystem.start();
                break;
        }
        duration = 60 * (1 + Math.round(Math.random()*4));    //la durata prima di ogni transizione è misurata in minuti
        console.log(duration);
        globalWeatherState.finishTimeStamp = timeStamp+duration;
        //return {finishTimeStamp: timeStamp+duration, weatherState: weatherState};
    }
    else if(globalWeatherState.weatherState == 2) {
        //console.log('dentro la funzione del fulmine');
        if(Math.floor(Math.random()*500) == 1) {
            lightningPlane.isVisible = true;
            setTimeout(function() {lightningPlane.isVisible = false;}, 200);
        }
    }
    //return {finishTimeStamp: finishTimeStamp, weatherState: weatherState};
}
