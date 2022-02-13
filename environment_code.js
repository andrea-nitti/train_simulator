"use strict";
function createCityGroup(scene, cityTrees_boolean) {
    const arrayOfCityMeshes = [];
    const cityTreesParentNode = new BABYLON.TransformNode('cityTreesParentNode', scene);
    for(let posz=-512; posz<=512; posz+=512) {
        randomCity(scene, 20, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode);
        randomCity(scene, -629.5, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode);
    }
    
    const cityMesh = BABYLON.Mesh.MergeMeshes(arrayOfCityMeshes, true, true, undefined, false, true);   //this mesh is an entire city block
    return {city: cityMesh, trees: cityTreesParentNode};
}

function randomCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    const randomNumber = Math.round(Math.random() * 100);
    if(randomNumber > 73) firstCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode);
    else if(randomNumber > 48) secondCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode);
    else if(randomNumber > 23) thirdCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode);
    else fourthCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode);
}

function createForestGroup(scene) { //a 'group' indicates 6 forest blocks
    const forestParentNode = new BABYLON.TransformNode('forestParentNode', scene);
    for(let i=-1; i<=1; i++) {
        createForest(scene, 50, i * 256, forestParentNode);
        createForest(scene, -430, i * 256, forestParentNode);
    }
    return forestParentNode;
}

function weather(rainParticleSystem, sparksParticleSystem, lightningPlanes, globalWeatherState) {
    const timeStamp = new Date().valueOf() / 1000;  //valueOf() --> milliseconds since 01/01/1970
    if(globalWeatherState.finishTimeStamp < timeStamp) {
        globalWeatherState.weatherState = Math.floor(Math.random() * 3);
        switch(globalWeatherState.weatherState) {
            case 0: //clean sky
                rain.stop();
                thunderstorm.stop();
                rainParticleSystem.stop();
                rainParticleSystem.reset();
                sparksParticleSystem.stop();
                break;
            case 1: //rain
                thunderstorm.stop();
                rain.setVolume(0);
                rain.play();
                rain.setVolume(1, 10);  //syntax: (volume level, seconds to reach the specified volume)
                rainParticleSystem.emitRate = 100;
                rainParticleSystem.start();
                sparksParticleSystem.start();
                sparks.play();
                break;
            case 2: //thunderstorm
                rain.stop();
                thunderstorm.setVolume(0);
                thunderstorm.play();
                thunderstorm.setVolume(1, 6);
                rainParticleSystem.emitRate = 100;
                rainParticleSystem.start();
                sparksParticleSystem.start();
                sparks.play();
                break;
        }
        const duration = 60 * (1 + Math.round(Math.random() * 4));  //duration is measured in minutes
        console.log({Weather: globalWeatherState.weatherState, Duration: duration + " seconds"});
        globalWeatherState.finishTimeStamp = timeStamp+duration;
    }
    else if(globalWeatherState.weatherState == 2) {
        if(Math.floor(Math.random() * 500) == 1) {
            const thunderSounds = [thunder1, thunder2, thunder3, thunder4, thunder5];
            const selectedLightningPlane = Math.floor(Math.random() * lightningPlanes.length);  //choosing random lightning
            const selectedThunderSound = Math.floor(Math.random() * thunderSounds.length);  //choosing random sound
            lightningPlanes[selectedLightningPlane].isVisible = true;
            setTimeout(function() {
                lightningPlanes[selectedLightningPlane].isVisible = false;
                thunderSounds[selectedThunderSound].play();
            }, 200);    //lightnings remain visible for 0.2 s
        }
    }
    if(globalWeatherState.weatherState == 1 && rainParticleSystem.emitRate <= 6500) rainParticleSystem.emitRate += 10;
    else if(globalWeatherState.weatherState == 2 && rainParticleSystem.emitRate <= 8500) rainParticleSystem.emitRate += 25;
}

function createLightning(scene, glowHalo) {
    const lightningImages = ["lightning1","lightning2","lightning3","lightning4","lightning5"];
    const lightningPlanes = [];
    lightningImages.forEach(x => {
        const lightningPlane = BABYLON.MeshBuilder.CreatePlane('lightningPlane', {size: 256}, scene);
        const lightningTexture = new BABYLON.StandardMaterial('lightningTexture', scene);
        lightningTexture.diffuseTexture = new BABYLON.Texture("./assets/textures/" + x + ".png");
        lightningTexture.diffuseTexture.hasAlpha = true;
        lightningTexture.emissiveColor = new BABYLON.Color3(8, 8, 8);
        lightningPlane.material = lightningTexture;
        lightningPlane.position.z = 400;
        lightningPlane.position.y = 100;
        lightningPlane.applyFog = false;
        lightningPlane.infiniteDistance = true;
        lightningPlane.isVisible = false;
        glowHalo.addExcludedMesh(lightningPlane);
        lightningPlanes.push(lightningPlane);
    })
    return lightningPlanes;
}
