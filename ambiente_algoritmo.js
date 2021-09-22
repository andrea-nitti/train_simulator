"use strict";
//Funzione per creare un gruppo di 6 città
function createCityGroup(scene) {
    let arrayOfCityMeshes = [];
    
    for(let posz=-512; posz<=512; posz+=512) {
        cittaRandom(scene, 20, posz, arrayOfCityMeshes);
        cittaRandom(scene, -629.5, posz, arrayOfCityMeshes);
    }
    
    var cityMesh = BABYLON.Mesh.MergeMeshes(arrayOfCityMeshes, true, true, undefined, false, true);   //mesh che raggruppa un intero blocco di città
    return cityMesh;
}

function cittaRandom(scene, posx, posz, arrayOfCityMeshes) {
    let random = Math.round(Math.random() * 100);
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

//Funzione per creare un gruppo di x foreste
function createForestGroup(scene) {
    let parent_mesh = new BABYLON.MeshBuilder.CreateBox('parent_mesh', {size: 1}, scene);
    parent_mesh.isVisible = false;
    for(let i=-1; i<=1; i++) {
        createForest(scene, 50, i * 256, parent_mesh);
        createForest(scene, -430, i * 256, parent_mesh);
    }
    return parent_mesh;
}

//Funzione per il tempo atmosferico
function weather(rainParticleSystem, lightningPlanes, globalWeatherState, skyboxMaterial) {
    let timeStamp = new Date().valueOf() / 1000;    //valueOf() --> millisecondi trascorsi dall'01/01/1970
    if(globalWeatherState.finishTimeStamp < timeStamp) {
        globalWeatherState.weatherState = Math.floor(Math.random() * 3);    //numero intero compreso tra 0 (incluso) e 3 (escluso)
        switch(globalWeatherState.weatherState) {
            case 0:  //sereno
                rain.stop();
                thunderstorm.stop();
                rainParticleSystem.stop();
                rainParticleSystem.reset();
                break;
            case 1:  //pioggia
                thunderstorm.stop();
                rain.setVolume(0);
                rain.play();
                rain.setVolume(1, 10);  //syntax: (volume level, seconds to reach the specified volume)
                rainParticleSystem.emitRate = 100;
                rainParticleSystem.start();
                break;
            case 2:  //temporale
                rain.stop();
                thunderstorm.setVolume(0);
                thunderstorm.play();
                thunderstorm.setVolume(1, 6);
                rainParticleSystem.emitRate = 100;
                rainParticleSystem.start();
                break;
        }
        let duration = 60 * (1 + Math.round(Math.random() * 4));    //la durata prima di ogni transizione è misurata in minuti
        console.log({Weather: globalWeatherState.weatherState, Duration: duration + " seconds"});
        globalWeatherState.finishTimeStamp = timeStamp+duration;
    }
    else if(globalWeatherState.weatherState == 2) {
        skyboxMaterial.alpha -= 0.25;
        if(Math.floor(Math.random() * 500) == 1) {
            let thunderSounds = [thunder1, thunder2, thunder3, thunder4, thunder5];
            let selectedLightningPlane = Math.floor(Math.random() * lightningPlanes.length);    //scelgo un fulmine a caso dall'array da "illuminare"
            let selectedThunderSound = Math.floor(Math.random() * thunderSounds.length);    //scelgo un tuono a caso dall'array da riprodurre
            lightningPlanes[selectedLightningPlane].isVisible = true;
            setTimeout(function() {
                lightningPlanes[selectedLightningPlane].isVisible = false;
                thunderSounds[selectedThunderSound].play();
            }, 200);    //il fulmine rimane visibile per 0,2 secondi
        }
    }
    if(globalWeatherState.weatherState == 1 && rainParticleSystem.emitRate <= 6500) rainParticleSystem.emitRate += 10;
    else if(globalWeatherState.weatherState == 2 && rainParticleSystem.emitRate <= 8500) rainParticleSystem.emitRate += 25;
}

function createLightning(scene) {
    let lightningImages = ["lightning1","lightning2","lightning3","lightning4","lightning5"];
    let lightningPlanes = [];
    lightningImages.forEach(x => {
        let lightningPlane = BABYLON.MeshBuilder.CreatePlane('lightningPlane', {size: 256}, scene);
        let lightningTexture = new BABYLON.StandardMaterial('lightningTexture', scene);
        lightningTexture.diffuseTexture = new BABYLON.Texture("./assets/textures/" + x + ".png");
        lightningTexture.diffuseTexture.hasAlpha = true;
        lightningTexture.emissiveColor = new BABYLON.Color3(8, 8, 8);
        lightningPlane.material = lightningTexture;
        lightningPlane.position.z = 400;
        lightningPlane.position.y = 100;
        lightningPlane.applyFog = false;
        lightningPlane.infiniteDistance = true;
        lightningPlane.isVisible = false;
        lightningPlanes.push(lightningPlane);
    })
    return lightningPlanes;
}
