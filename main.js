//Autori: Nitti; Parma
//Istituto: Liceo G. M. Colombini
//Progetto: Train Simulator
//Descrizione: Un simulatore di guida di treni, in cui si può scegliere
    //la velocità del treno potrà essere decisa e modificata in corsa,
    //la rotaia è infinita.

const chunk_size = 32;  //chunk = unità di terreno usata per la generazione procedurale
let last_station_z = 0; //salvo la coordinata z dell'ultima stazione generata (verrà assegnata inizialmente a 0 in quanto la prima stazione è centrata rispetto a z=0)

window.addEventListener('DOMContentLoaded', (event) => {
        const canvas = document.getElementById('renderCanvas');
        canvas.addEventListener('wheel', evt => evt.preventDefault());
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera('cam', 0,0,15, new BABYLON.Vector3(0,0,0), scene);
        camera.attachControl(canvas,true);
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.infinteDistance = true;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        //camera.wheelPrecision = 50;
        //camera.lowerRadiusLimit = 3;
        //camera.upperRadiusLimit = 13*2;
        let light1 = new BABYLON.PointLight('light1',new BABYLON.Vector3(0,1,0), scene);
        light1.parent = camera;
        inizializzaColori(scene);
        let chunk_offset = 0;
        populateScene(scene, chunk_offset, camera);
        
        scene.registerBeforeRender(() => {
            let t = performance.now() * 0.1;
            camera.setPosition(new BABYLON.Vector3(-8, 7.5, t));
            camera.setTarget(new BABYLON.Vector3(-8, 7.5, 10+t));
            if (camera.position.z > (5 + chunk_offset) * chunk_size) {
                chunk_offset+=10;
                populateScene(scene, chunk_offset, camera);
            }
            //console.log(camera.position.z);
        });
        
        engine.runRenderLoop(()=>scene.render());
        window.addEventListener("resize", () => engine.resize());
        
});

//Funzione per creare l'ambiente
/*function createEnvironment(scene, tipologia, percentuale) {
    randomnum = Math.round(Math.random()*100);
    var tipperc = [tipologia, percentuale];
    //tip è per capire se il blocco prima era foresta o città
    //perc è per capire con quale percentuale si deve 
    //generare il blocco prima
    if (tipperc[0] == 1) {
        //città, le percentuali saranno 100% (solo il primo blocco)
        //80% (2), 60% (3), 40% (4), 20% (da 5 in poi)
        if (tipperc[1] == 100) {
            createCity();
            tipperc = [1, 80];
            return tipperc;

        } else if (tipperc[1] == 80) {
            if (randomnum < 80) {
                createCity();
                tipperc = [1, 60];
                return tipperc;
            } else {
                createForest();
                tipperc = [0,90]
                return tipperc;
            }

        } else if (tipperc[1] == 60) {
            if (randomnum < 60) {
                createCity();
                tipperc = [1, 40];
                return tipperc;
            } else {
                createForest();
                tipperc = [0,90]
                return tipperc;
            }

        } else if (tipperc[1] == 40) {
            if (randomnum < 40) {
                createCity();
                tipperc = [1, 20];
                return tipperc;
            } else {
                createForest();
                tipperc = [0,90]
                return tipperc;
            }

        } else {
            if (randomnum < 20) {
                createCity();
                tipperc = [1, 20];
                return tipperc;
            } else {
                createForest();
                tipperc = [0,90]
                return tipperc;
            }
        } 

    } else {
        //foresta, le percentuali saranno 100% (solo il primo blocco)
        //90% (2), 80% (3), 70% (4), 60% (5), 50% (6), 40% (7),
        //30% (8), 20% (9), 10% (da 10 in poi)
        if (tipperc[1] == 90) {
            if (randomnum < 90) {
                createForest();
                tipperc = [1, 80];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }

        } else if (tipperc[1] == 80) {
            if (randomnum < 80) {
                createForest();
                tipperc = [1, 70];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }

        } else if (tipperc[1] == 70) {
            if (randomnum < 70) {
                createForest();
                tipperc = [1, 60];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }

        } else if (tipperc[1] == 60) {
            if (randomnum < 60) {
                createForest();
                tipperc = [1, 50];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }

        } else if (tipperc[1] == 50) {
            if (randomnum < 50) {
                createForest();
                tipperc = [1, 40];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }

        } else if (tipperc[1] == 40) {
            if (randomnum < 40) {
                createForest();
                tipperc = [1, 30];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }

        } else if (tipperc[1] == 30) {
            if (randomnum < 30) {
                createForest();
                tipperc = [1, 20];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }

        } else if (tipperc[1] == 20) {
            if (randomnum < 20) {
                createForest();
                tipperc = [1, 10];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }

        } else {
            if (randomnum < 10) {
                createForest();
                tipperc = [1, 10];
                return tipperc;
            } else {
                createCity();
                tipperc = [0,80]
                return tipperc;
            }
        }

    }
}*/

//Funzione per generare proceduralmente la scena
function populateScene(scene, chunk_offset, camera) {

    //scene.clearColor = new BABYLON.Color3(0.639, 0.878, 0.921);   //colore cielo
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    let stazione = (camera.position.z > last_station_z + 200) || (chunk_offset == 0);
    //let stazione = (camera.position.z > last_station_z + 2000 + Math.floor(Math.random() * 8001)) || (chunk_offset == 0);   //creo le stazioni ad almeno 2 km di distanza l'una dall'altra; la massima distanza ammessa è 10 km
    if (stazione) createStation(scene, chunk_offset);
    let Terrain = createTerrain(scene, chunk_offset, !stazione);
    treno(scene);
    //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    //scene.fogDensity = 0.01;
    //scene.fogStart = 20.0;
    //scene.fogEnd = 60.0;
}

//////////////////////////// ! ! ! ! ! ZONA TRENO ! ! ! ! ! ////////////////////////////

//////////////////////////// ! ! ! ! ! ZONA TRENO ! ! ! ! ! ////////////////////////////

//////////////////////////// ! ! ! ! ! ZONA TRENO ! ! ! ! ! ////////////////////////////

function treno(scene) {
    carrozza(scene, 8, 100);
    carrozza(scene, 8, 170);
    locomotiva(scene, 8, 30, 3, -3, 33, Math.PI/16*5.7);
    locomotiva(scene, 8, 240, -3, 3, -33, Math.PI/16*10.3);
}

function locomotiva(scene, posx, posz, avaoind, avaoind2, avaoind3, rotazione) {

    centro(scene, posx, posz+avaoind, colori(scene, 2), 60);

    spigoli(scene, posx+1, 10.5, posz+avaoind, colori(scene, 1), 60);
    spigoli(scene, posx-1, 10.5, posz+avaoind, colori(scene, 1), 60);
    spigoli(scene, posx+1, 4.5, posz+avaoind2, colori(scene, 0), 72);
    spigoli(scene, posx-1, 4.5, posz+avaoind2, colori(scene, 0), 72);

    tettofondo(scene, posx, 3, posz+avaoind2, colori(scene, 0), 72);
    tettofondo(scene, posx, 12, posz+avaoind, colori(scene, 1), 60);

    ruota(scene, posx-2, posz-25, colori(scene, 2));
    ruota(scene, posx-2, posz-15, colori(scene, 2));
    ruota(scene, posx+2, posz-25, colori(scene, 2));
    ruota(scene, posx+2, posz-15, colori(scene, 2));
    ruota(scene, posx-2, posz+15, colori(scene, 2));
    ruota(scene, posx-2, posz+25, colori(scene, 2));
    ruota(scene, posx+2, posz+15, colori(scene, 2));
    ruota(scene, posx+2, posz+25, colori(scene, 2));

    musocen(scene, posx, posz-avaoind3, colori(scene, 1), rotazione);
    musolat(scene, posx+4, posz-avaoind3, colori(scene, 1));
    musolat(scene, posx-4, posz-avaoind3, colori(scene, 1));

}

function carrozza(scene, posx, posz) {

    centro(scene, posx, posz, colori(scene, 2), 66);

    spigoli(scene, posx+1, 10.5, posz, colori(scene, 1), 66);
    spigoli(scene, posx-1, 10.5, posz, colori(scene, 1), 66);
    spigoli(scene, posx+1, 4.5, posz, colori(scene, 0), 66);
    spigoli(scene, posx-1, 4.5, posz, colori(scene, 0), 66);

    tettofondo(scene, posx, 3, posz, colori(scene, 0), 66);
    tettofondo(scene, posx, 12, posz, colori(scene, 1), 66);

    ruota(scene, posx-2, posz-25, colori(scene, 2));
    ruota(scene, posx-2, posz-15, colori(scene, 2));
    ruota(scene, posx+2, posz-25, colori(scene, 2));
    ruota(scene, posx+2, posz-15, colori(scene, 2));
    ruota(scene, posx-2, posz+15, colori(scene, 2));
    ruota(scene, posx-2, posz+25, colori(scene, 2));
    ruota(scene, posx+2, posz+15, colori(scene, 2));
    ruota(scene, posx+2, posz+25, colori(scene, 2));

}

function ruota(scene, posx, posz, colore) {
    var ruota = BABYLON.MeshBuilder.CreateCylinder('ruota', {height: 0.4, diameter: 2}, scene);
    ruota.rotation.z = Math.PI/2;
    ruota.position.x = posx;
    ruota.position.y = 1.55;
    ruota.position.z = posz;
    ruota.material = colore;
}

function centro(scene, posx, posz, colore, lunghezza) {
    var carrozzacentro = BABYLON.MeshBuilder.CreateBox('carrozzacentro', {width: 8, height: 6, depth: lunghezza}, scene);
    carrozzacentro.position.x = posx;
    carrozzacentro.position.y = 7.5;
    carrozzacentro.position.z = posz;
    carrozzacentro.material = colore;
}

function tettofondo(scene, posx, posy, posz, colore, lunghezza) {
    var tettofondo = BABYLON.MeshBuilder.CreateBox('tettofondo', {width: 2, height: 3, depth: lunghezza}, scene);
    tettofondo.position.x = posx;
    tettofondo.position.y = posy;
    tettofondo.position.z = posz;
    tettofondo.material = colore;
}

function spigoli(scene, posx, posy, posz, colore, lunghezza) {
    var spigoli = BABYLON.MeshBuilder.CreateCylinder('spigoli', {height: lunghezza, diameter: 6}, scene);
    spigoli.rotation.x = Math.PI/2;
    spigoli.position.x = posx;
    spigoli.position.y = posy;
    spigoli.position.z = posz;
    spigoli.material = colore;
}

function musocen(scene, posx, posz, colore, rotazione) {
    var musocen = BABYLON.MeshBuilder.CreateBox('musocen', {height: 13.5, width: 8, depth: 0.1}, scene);
    musocen.rotation.x = rotazione;
    musocen.position.x = posx;
    musocen.position.y = 10.5;
    musocen.position.z = posz;
    musocen.material = colore;
}

function musolat(scene, posx, posz, colore) {
    var musolat = BABYLON.MeshBuilder.CreateBox('musocen', {height: 12, width: 3, depth: 0.1}, scene);
    musolat.rotation.z = Math.PI/2;
    musolat.rotation.y = Math.PI/2;
    musolat.position.x = posx;
    musolat.position.y = 6;
    musolat.position.z = posz;
    musolat.material = colore;
}
