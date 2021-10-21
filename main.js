//Credits: Andrea Nitti; Lorenzo Parma

"use strict";
let wire, terrain_chunk, gravelPlane, ponte1, ringhiera, leftPole, rightPole, casa, palazzo, albero1, albero2, stazione0, stazione1, carrozza, carrovuoto, locomotore, container1, container2, cisterna1, cisterna2;    //models
let sun, moon, day, vegetali;
let horn, rain, thunderstorm, thunder1, thunder2, thunder3, thunder4, thunder5, riverSound; //sounds
const importedModelsList = ["filo.obj","chunk_binario.obj","ground.obj","ponte1.obj","ringhiera.obj","paloL.obj","paloR.obj","casaAlta.obj","casaBassa.obj","albero1.obj","albero2.obj","stazione0.obj","stazione1.obj","carrozza.obj","carrovuoto.obj","locomotore.obj","container1.obj","container2.obj","cisterna1.obj","cisterna2.obj"];
const importedSoundsList = ["horn.ogg","thunder1.ogg","thunder2.ogg","thunder3.ogg","thunder4.ogg","thunder5.ogg","rain.ogg","thunderstorm.ogg","river.ogg"];

let spazio = 0;
let velocita = 0;

//parametri per la larghezza e l'altezza di ciascun cartello per ogni stazione
const planeWidth = 10;
const planeHeight = 3;

function startEverything(configFlags, renderDistance) {
    const caricamento = document.getElementById('loadingScreen');
    caricamento.style.display = "block";
    const avanzamento = document.getElementById('objectToBeLoaded');
    avanzamento.style.display = "block";
    const canvas = document.getElementById('renderCanvas');
    canvas.style.display = "block";
    canvas.addEventListener('wheel', evt => evt.preventDefault());
    const engine = new BABYLON.Engine(canvas, true);
    function schermoDiCaricamento() {}
    schermoDiCaricamento.prototype.displayLoadingUI = function() {caricamento.innerHTML = "Loading...";};   //".prototype" consente di aggiungere una nuova proprietà (displayLoadingUI) al costruttore di un oggetto (schermoDiCaricamento)
    schermoDiCaricamento.prototype.hideLoadingUI = function() {
        caricamento.style.display = "none";
        avanzamento.style.display = "none";
    };
    engine.loadingScreen = new schermoDiCaricamento();
    engine.displayLoadingUI();
    const scene = new BABYLON.Scene(engine);
    const defaultCamera = new BABYLON.UniversalCamera('defaultCamera', new BABYLON.Vector3(-8, 7.5, 0), scene);
    defaultCamera.inputs.clear();   //rimuovo i controlli predefiniti della tastiera
    defaultCamera.inputs.addMouse();
    defaultCamera.attachControl(canvas, true);
    defaultCamera.maxZ = renderDistance;
    const freeCam = new BABYLON.UniversalCamera('freeCam', new BABYLON.Vector3(-8, 7.5, 0), scene);
    freeCam.keysDownward = freeCam.keysUpward = [];
    freeCam.attachControl(canvas, true);
    freeCam.maxZ = renderDistance;
    scene.activeCamera = defaultCamera;
    inizializzaColori(scene);

    sun = new BABYLON.HemisphericLight('sun', new BABYLON.Vector3(0, -1, 0), scene);
    sun.intensity = 1;
    sun.diffuse = new BABYLON.Color3(0, 0, 0);
    sun.groundColor = new BABYLON.Color3(1, 1, 0.8);
    
    moon = BABYLON.MeshBuilder.CreateSphere('moon', {diameter: 10}, scene);
    moon.infiniteDistance = true;
    moon.material = moonSurface;
    const glowHalo = new BABYLON.GlowLayer("glowHalo", scene);
    const moonTexture = new BABYLON.Texture("./assets/textures/moon_surface.jpg");
    glowHalo.customEmissiveTextureSelector = (mesh, submesh, material) => {
        return moonTexture;
    };

    //scene.clearColor = new BABYLON.Color3(0.086, 0.090, 0.150); //imposto il colore esterno alla skybox (blu scuro)
    const assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.useDefaultLoadingScreen = false;
    importedModelsList.forEach(x => {
        const importMesh = assetsManager.addMeshTask("task", "", "./assets/models/", x);
        importMesh.onSuccess = function(task) {
            //avanzamento.innerHTML = "(./assets/models/" + x + ")";
            //task.loadedMeshes.forEach(x => {x.doNotSyncBoundingInfo = true;});
            switch(x) {
                case "filo.obj": wire = task.loadedMeshes; break;
                case "chunk_binario.obj": terrain_chunk = task.loadedMeshes; break;
                case "ground.obj": gravelPlane = task.loadedMeshes; break;
                case "ponte1.obj": ponte1 = task.loadedMeshes; break;
                case "ringhiera.obj": ringhiera = task.loadedMeshes; break;
                case "paloL.obj": leftPole = task.loadedMeshes; break;
                case "paloR.obj": rightPole = task.loadedMeshes; break;
                case "casaAlta.obj": palazzo = task.loadedMeshes; break;
                case "casaBassa.obj": casa = task.loadedMeshes; break;
                case "albero1.obj": albero1 = task.loadedMeshes; break;
                case "albero2.obj": albero2 = task.loadedMeshes; break;
                case "stazione0.obj": stazione0 = task.loadedMeshes; break;
                case "stazione1.obj": stazione1 = task.loadedMeshes; break;
                case "carrozza.obj": carrozza = task.loadedMeshes; break;
                case "carrovuoto.obj": carrovuoto = task.loadedMeshes; break;
                case "locomotore.obj": locomotore = task.loadedMeshes; break;
                case "container1.obj": container1 = task.loadedMeshes; break;
                case "container2.obj": container2 = task.loadedMeshes; break;
                case "cisterna1.obj": cisterna1 = task.loadedMeshes; break;
                case "cisterna2.obj": cisterna2 = task.loadedMeshes; break;
            }
        };
        importMesh.onError = function(task, message) {console.log(message);};
    });
    importedSoundsList.forEach(x => {
        const importSound = assetsManager.addBinaryFileTask('task', "./assets/sounds/" + x);
        importSound.onSuccess = function(task) {
            //avanzamento.innerHTML = "(./assets/sounds/" + x + ")";
            switch(x) {
                case "horn.ogg": horn = new BABYLON.Sound('horn', task.data, scene); break;
                case "thunder1.ogg": thunder1 = new BABYLON.Sound('thunder1', task.data, scene); break;
                case "thunder2.ogg": thunder2 = new BABYLON.Sound('thunder2', task.data, scene); break;
                case "thunder3.ogg": thunder3 = new BABYLON.Sound('thunder3', task.data, scene); break;
                case "thunder4.ogg": thunder4 = new BABYLON.Sound('thunder4', task.data, scene); break;
                case "thunder5.ogg": thunder5 = new BABYLON.Sound('thunder5', task.data, scene); break;
                case "rain.ogg": rain = new BABYLON.Sound('rain', task.data, scene); break;
                case "thunderstorm.ogg": thunderstorm = new BABYLON.Sound('thunderstorm', task.data, scene); break;
                case "river.ogg": riverSound = new BABYLON.Sound('river', task.data, scene, function() {setTimeout(function() {
                    riverSound.setPosition(new BABYLON.Vector3(0, 0, 1264));
                    riverSound.play();
                    }, 5000)}, {loop: true, maxDistance: 512, spatialSound: true}); break;
            }
        };
        importSound.onError = function(task, message) {console.log(message);};
    });
    assetsManager.onProgress = function(remaining, total) {
        avanzamento.innerHTML = total - remaining + " of " + total + " assets loaded";
    };
    assetsManager.onFinish = function(tasks) {
        scene.autoClearDepthAndStencil = false;
        setupScene(engine, defaultCamera, freeCam, scene, configFlags, renderDistance, glowHalo);
        scene.blockfreeActiveMeshesAndRenderingGroups = true;
        [wire, terrain_chunk, gravelPlane, ponte1, ringhiera, leftPole, rightPole, casa, palazzo, albero1, albero2, stazione0, stazione1, carrozza, carrovuoto, locomotore,  container1, container2, cisterna1, cisterna2].forEach(model => {
            model.forEach(modelPiece => {
                modelPiece.dispose();
                scene.removeMesh(modelPiece);
            });
        });
        scene.blockfreeActiveMeshesAndRenderingGroups = false;
        engine.hideLoadingUI();
    };
    assetsManager.load();
}

function setupScene(engine, defaultCamera, freeCam, scene, configFlags, renderDistance, glowHalo) {
    const velocitaOverlay = document.getElementById('velocita');
    const spazioOverlay = document.getElementById('spazio');
    const aiutoOverlay = document.getElementById('aiuto2');
    const coordinateOverlay = document.getElementById('coordinate');
    
    //creazione della skybox
    const skybox = BABYLON.Mesh.CreateBox('skybox', renderDistance * 2 / Math.sqrt(3), scene);  //la dimensione della skybox è calcolata in modo tale che rimanga sempre visibile all'osservatore
    const skyboxMaterial = new BABYLON.StandardMaterial('skyboxMaterial', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.alpha = 1;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox_v4", scene, ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"]);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    
    vegetali = [albero1, albero2];
    
    const segments = [];    //array che contiene 12 modelli di terreno ferroviario (lunghi ciascuno 256 unità)
    for(let i=0; i<12; i++) {
        const Terrain = createTerrain(scene);
        Terrain.railRoad.position.z = i * 256;
        Terrain.terrain.position.z = i * 256;
        segments.push(Terrain);
    }
    
    const stazione = createAllStations(scene);
    stazione.setEnabled(false);
    const listaCartelli = createSigns(scene, glowHalo);
    const indice = Math.floor(Math.random() * listaCartelli.length);
    const cartello = listaCartelli[indice];
    cartello.position.z = 92;
    listaCitta.splice(indice, 1);   //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
    
    const forests = [];
    if(configFlags[2]) {
        for(let i=0; i<2; i++) {
            const Forest = createForestGroup(scene);
            Forest.position.z = -100000;
            forests.push(Forest);
        }
        forests[0].position.z = stazione.position.z + 256;
        forests.push(forests.shift());
    }
    
    //manipolo la nebbia
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.001;
    scene.fogColor = new BABYLON.Color3(0.494, 0.604, 0.686);
    skybox.applyFog = false;
    
    const cities = [];  //array che contiene la lista delle mesh (fuse insieme) di 5*3*2 città
    if(configFlags[0]) {
        for(let i=0; i<5; i++) {
            const City = createCityGroup(scene, configFlags[1]);
            City.city.position.z = -100000;
            City.trees.position.z = -100000;
            cities.push(City);
        }
    }
    
    let treno;
    if(configFlags[3]) treno = createNormalTrain();
    if(configFlags[4]) createContainerTrainFirstType(scene);

    const ponte = createBridge(skybox, scene);
    riverSound.setVolume(2, 0);
    
    const axisGroup = createAxis(scene);
    
    const rainParticleSystem = new BABYLON.GPUParticleSystem('rain', {capacity: 100000, randomTextureSize: 4096}, scene);
    rainParticleSystem.particleTexture = new BABYLON.Texture("./assets/textures/rain.png");
    const emitter = rainParticleSystem.createBoxEmitter(new BABYLON.Vector3(0, -150, 0), new BABYLON.Vector3(0, -250, 0), new BABYLON.Vector3(-75, 0, -400), new BABYLON.Vector3(75, 0, 400));
    rainParticleSystem.emitter = new BABYLON.Vector3(0, 75, 0);
    rainParticleSystem.minLifeTime = 4;
    rainParticleSystem.maxLifeTime = 7;
    rainParticleSystem.minSize = 0.5;
    rainParticleSystem.maxSize = 2.0;
    rainParticleSystem.minScaleX = 0.05;
    rainParticleSystem.maxScaleX = 0.1;
    
    const lightningPlanes = createLightning(scene, glowHalo);
    const globalWeatherState = {finishTimeStamp: 0, weatherState: 0};
    
    let modalitaTempo = 0;  //il tipo di ciclo giorno-notte predefinito è quello reale
    let deltaSunIntensity = 0.00025;
    let sunsetProgress = 0;
    let moonAngle = 0;
    scene.registerBeforeRender(() => {
        day = new Date();
        const time = day.getHours() * 60 + day.getMinutes();    //il tempo corrente è rappresentato in minuti (a partire da mezzanotte del giorno corrente)
        switch(modalitaTempo) {
            case 0: //modalità reale
                if(time <= 720) sun.intensity = time / (12 * 60);   //calcolo la luminosità del Sole in base alla proporzione con i minuti contenuti in metà giornata
                else sun.intensity = (-time) / (12 * 60) + 2;   //la luminosità del Sole è calcolata in modo inverso (con intensità decrescente) dopo mezzo-giorno
                break;
            case 1: //tempo accelerato
                sun.intensity += deltaSunIntensity;
                if((sun.intensity >= 1) || (sun.intensity <= 0)) deltaSunIntensity = -deltaSunIntensity;
                break;
            case 2: sun.intensity = 0.5; break; //06:00 fisse
            case 3: sun.intensity = 1; break;   //mezzogiorno fisso
            case 4: sun.intensity = 0.5; break; //18:00 fisse
            case 5: sun.intensity = 0; break;   //mezzanotte fissa
        }
        /*if(globalWeatherState.weatherState != 2)*/ skyboxMaterial.alpha = sun.intensity * 0.9 + 0.1;
        if((sunsetProgress < 0.1) && (globalWeatherState.weatherState == 2)) skyboxMaterial.alpha = sun.intensity - 0.25;   //può esistere un "gradino" di luminosità del cielo se il tramonto e il temporale sono attivi nello stesso momento
        
        //gestione dei colori del tramonto
        if((modalitaTempo == 0 && time > 720) || (modalitaTempo == 1 && deltaSunIntensity < 0)) {
            const secondHalfDayProgress = 1 - sun.intensity;
            //7/12 e 3/4 sono le ore di inizio e fine del tramonto per mezzogiorno=0 e mezzanotte=1 (19:00 e 21:00)
            if((secondHalfDayProgress > 7/12) && (secondHalfDayProgress < 17/24)) sunsetProgress = 8 * secondHalfDayProgress - 14/3;    //17/24 è un punto intermedio tra 7/12 e 3/4
            else if((secondHalfDayProgress >= 17/24) && (secondHalfDayProgress < 3/4)) sunsetProgress = -24 * secondHalfDayProgress + 18;
        }
        const skyRed = 0.086 + sunsetProgress * (0.965 - 0.086);
        const skyGreen = 0.090 + sunsetProgress * (0.387 - 0.090);
        const skyBlue = 0.150 + sunsetProgress * (0.040 - 0.150);
        scene.clearColor = new BABYLON.Color3(skyRed, skyGreen, skyBlue);
        
        //rotazione della Luna
        let moonTime = day.getDate();
        if(moonTime > 28) moonTime = 28;
        moonAngle = moonTime / 28 * 2 * Math.PI;
        moon.position.x = Math.sin(moonAngle) * 250;
        moon.position.y = Math.cos(moonAngle) * 250;

        //controllo se sia presente una sovrapposizione del terreno con la base del ponte (in tal caso rendo il segmento invisibile)
        for(let i=0; i<12; i++) {
            if(segments[i].terrain.position.z > (ponte.position.z + 752) && segments[i].terrain.position.z < (ponte.position.z + 1776)) segments[i].terrain.isVisible = false;
            else segments[i].terrain.isVisible = true;
        }

        rainParticleSystem.emitter.z = defaultCamera.position.z;

        if(rain.isReady() && thunderstorm.isReady() && thunder1.isReady() && thunder2.isReady() && thunder3.isReady() && thunder4.isReady() && thunder5.isReady()) weather(rainParticleSystem, lightningPlanes, globalWeatherState);

        if(configFlags[3]) treno.position.z = defaultCamera.position.z - 615;
        
        velocita -= 0.01;   //per inerzia il treno tenderà a rallentare da solo se non si continua a premere il tasto W
        if(velocita < 0) velocita = 0;
        
        spazio += velocita;
        defaultCamera.position.z = spazio;
        
        if(defaultCamera.position.z > (4 * 256) + segments[0].railRoad.position.z) {    //sposto il primo modello di terreno se ho superato l'inizio del terzo
            segments[0].railRoad.position.z += segments.length * 256;
            segments[0].terrain.position.z += segments.length * 256;
            segments.push(segments.shift());    //il primo elemento diventa l'ultimo
        }
        if(defaultCamera.position.z > stazione.position.z + 2 * 256) {  //se l'osservatore si trova oltre l'ultima stazione generata (sommata di 2 * 256)
            stazione.position.z += 256 * Math.floor(8 + Math.random() * 40);    //sposto l'ultima stazione ad almeno 2048 unità di distanza dalla precedente; la massima distanza ammessa è 10240 unità
            stazione.setEnabled(true);
            if(checkIntersections(ponte.position.z + 1264, 512 * 2, stazione.position.z + 98, 512 * 3)) stazione.setEnabled(false); //98 --> da cambiare a seconda della lunghezza delle stazioni
            if(configFlags[0] && stazione.isEnabled()) {
                cities[0].city.position.z = stazione.position.z - 240;
                cities[0].trees.position.z = stazione.position.z;
                cities.push(cities.shift());
            }
            if(configFlags[2]) {
                forests[0].position.z = stazione.position.z + 1280;
                forests.push(forests.shift());
            }
            const indice = Math.floor(Math.random() * listaCartelli.length);
            const cartello = listaCartelli[indice];
            if(cartello != undefined && stazione.isEnabled()) {
                cartello.position.z = stazione.position.z + 12;
                listaCitta.splice(indice, 1);   //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
            }
        }
        if(defaultCamera.position.z > ponte.position.z + 4096) {
            ponte.position.z += 512 * Math.floor(16 + Math.random() * 30);
            if(riverSound.isReady()) riverSound.setPosition(new BABYLON.Vector3(0, 0, ponte.position.z + 1264));
        }
        
        velocitaOverlay.innerText = "Velocità: " + Math.floor(velocita * 10);   //il fattore 10 serve a rendere più realistici i valori
        spazioOverlay.innerText = "Spazio: " + Math.floor(spazio * 10);
        coordinateOverlay.innerText = "X: " + freeCam.position.x + "\n Y: " + freeCam.position.y + "\n Z: " + freeCam.position.z;
    });
    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());
    window.addEventListener("keydown", function(event) {    //interazioni con la tastiera
        switch(event.keyCode) {
            case 87: if(velocita < 32) velocita += 0.025; break;    //W --> accelerazione
            case 83: velocita -= 0.1; break;    //S --> frenata
            case 38: if(scene.activeCamera == defaultCamera && defaultCamera.position.y <= 64) defaultCamera.position.y += 0.5; break;  //↑ --> salita della visuale
            case 40: if(scene.activeCamera == defaultCamera && defaultCamera.position.y > -0.5) defaultCamera.position.y -= 0.5; break; //↓ --> discesa della visuale
            case 32: horn.play(); break;    //spacebar --> sirena
            case 71: modalitaTempo = (modalitaTempo + 1) % 6; break;    //G --> modalità giorno-notte
            case 72:
                if(aiutoOverlay.style.display === "") { //H --> mostra aiuto
                    aiutoOverlay.style.display = "block";
                }
                else if(aiutoOverlay.style.display === "block") {   //H --> nascondi aiuto
                    aiutoOverlay.style.display = "";
                }
                break;
            case 67:    //C --> cambia telecamera attiva e visibilità degli assi
                if(scene.activeCamera == defaultCamera) {
                    scene.activeCamera = freeCam;
                    axisGroup.setEnabled(true);
                    freeCam.position = defaultCamera.position.clone();
                    axisGroup.position = freeCam.position.clone();
                    coordinateOverlay.style.display = "block";
                }
                else {
                    scene.activeCamera = defaultCamera;
                    axisGroup.setEnabled(false);
                    coordinateOverlay.style.display = "";
                }
            default: return;
        }
        event.preventDefault();
    });
}
