//Autori: Andrea Nitti; Lorenzo Parma
//Istituto: Liceo G. M. Colombini
//Progetto: Train Simulator
//Descrizione: Un simulatore di guida di treni, in cui la velocità del mezzo, lungo una rotaia infinita, potrà essere decisa e modificata in corsa

"use strict";
let wire, terrain_chunk, gravelPlane, ponte1, ringhiera, leftPole, rightPole, casa, palazzo, albero1, albero2, stazione0, carrozza, carrovuoto, locomotore, container1, container2, cisterna1, cisterna2;   //models
let sun, moon, day, vegetali;
let horn, rain, thunderstorm, thunder1, thunder2, thunder3, thunder4, thunder5, riverSound; //sounds
const importedModelsList = ["filo.obj","chunk_binario.obj","ground.obj","ponte1.obj","ringhiera.obj","paloL.obj","paloR.obj","casaAlta.obj","casaBassa.obj","albero1.obj","albero2.obj","stazione0.obj","carrozza.obj","carrovuoto.obj","locomotore.obj","container1.obj","container2.obj","cisterna1.obj","cisterna2.obj"];
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
    //BABYLON.StandardMaterial.prototype.defaultAmbientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    inizializzaColori(scene);

    sun = new BABYLON.PointLight("Light", new BABYLON.Vector3(-1, -2, -1), scene);
    sun.setDirectionToTarget(BABYLON.Vector3.Zero());
    //sun = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, -1, 0), scene);
    sun.intensity = 1;
    sun.diffuse = new BABYLON.Color3(1, 1, 0.8);
    //sun.groundColor = new BABYLON.Color3(1, 1, 0.8);
    
    moon = BABYLON.MeshBuilder.CreateSphere('moon', {diameter: 10}, scene);
    moon.infiniteDistance = true;
    moon.material = moonSurface;
    const moonHalo = new BABYLON.GlowLayer("moonHalo", scene);
    const moonTexture = new BABYLON.Texture("./assets/textures/moon_surface.jpg");
    moonHalo.customEmissiveTextureSelector = (mesh, submesh, material) => {
        return moonTexture;
    };
    moonHalo.addIncludedOnlyMesh(moon, BABYLON.Color3(1, 1, 1), true);
    
    scene.clearColor = new BABYLON.Color3(0.0859, 0.0898, 0.15);    //imposto il colore esterno alla skybox (blu scuro)
    const assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.useDefaultLoadingScreen = false;
    importedModelsList.forEach(x => {
        const importMesh = assetsManager.addMeshTask("task", "", "./assets/models/", x);
        importMesh.onSuccess = function(task) {
            //avanzamento.innerHTML = "(./assets/models/" + x + ")";
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
        const importSound = assetsManager.addBinaryFileTask("task", "./assets/sounds/" + x);
        importSound.onSuccess = function(task) {
            //avanzamento.innerHTML = "(./assets/sounds/" + x + ")";
            switch(x) {
                case "horn.ogg": horn = new BABYLON.Sound("horn", task.data, scene); break;
                case "thunder1.ogg": thunder1 = new BABYLON.Sound("thunder1", task.data, scene); break;
                case "thunder2.ogg": thunder2 = new BABYLON.Sound("thunder2", task.data, scene); break;
                case "thunder3.ogg": thunder3 = new BABYLON.Sound("thunder3", task.data, scene); break;
                case "thunder4.ogg": thunder4 = new BABYLON.Sound("thunder4", task.data, scene); break;
                case "thunder5.ogg": thunder5 = new BABYLON.Sound("thunder5", task.data, scene); break;
                case "rain.ogg": rain = new BABYLON.Sound("rain", task.data, scene); break;
                case "thunderstorm.ogg": thunderstorm = new BABYLON.Sound("thunderstorm", task.data, scene); break;
                case "river.ogg": riverSound = new BABYLON.Sound("river", task.data, scene, function() {setTimeout(function() {riverSound.play();}, 5000)}, {loop: true, maxDistance: 512, spatialSound: true}); break;
            }
        };
        importSound.onError = function(task, message) {console.log(message);};
    });
    assetsManager.onProgress = function(remaining, total) {
        avanzamento.innerHTML = total - remaining + " of " + total + " assets loaded";
    };
    assetsManager.onFinish = function(tasks) {
        scene.autoClearDepthAndStencil = false;
        setupScene(engine, defaultCamera, freeCam, scene, configFlags, renderDistance);
        scene.blockfreeActiveMeshesAndRenderingGroups = true;
        [wire, terrain_chunk, gravelPlane, ponte1, ringhiera, leftPole, rightPole, casa, palazzo, albero1, albero2, stazione0, carrozza, carrovuoto, locomotore,  container1, container2, cisterna1, cisterna2].forEach(model => {
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

function setupScene(engine, defaultCamera, freeCam, scene, configFlags, renderDistance) {
    const velocitaOverlay = document.getElementById('velocita');
    const spazioOverlay = document.getElementById('spazio');
    const aiutoOverlay = document.getElementById('aiuto2');
    
    //creazione della skybox
    const skybox = BABYLON.Mesh.CreateBox("skybox", renderDistance * 2 / Math.sqrt(3), scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
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
    
    const stazione = createStation(scene);
    stazione.isVisible = false;
    const listaCartelli = createSigns(scene);
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
        /*cities[0].position.z = -1024;   //DA CAMBIARE --> aggiungere al modello della prima stazione alcune città esterne
        cities.push(cities.shift());*/
    }
    
    let treno;
    if(configFlags[3]) treno = createNormalTrain();
    if(configFlags[4]) treno = createTankTrainSecondType();

    const ponte = createBridge(skybox, scene);
    
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
    
    const lightningPlanes = createLightning(scene);
    const globalWeatherState = {finishTimeStamp: 0, weatherState: 0};
    
    let modalitaTempo = 0;  //il tipo di ciclo giorno-notte predefinito è quello reale
    let sunAngle = 0;
    let moonAngle = 0;
    scene.registerBeforeRender(() => {
        day = new Date();
        switch(modalitaTempo) {
            case 0: //modalità reale
                const time = day.getHours() * 60 + day.getMinutes();    //il tempo corrente è rappresentato in minuti (a partire da mezzanotte del giorno corrente)
                sunAngle = time / (24 * 60) * 2 * Math.PI;    //calcolo l'angolo in base alla proporzione con i minuti contenuti in un giorno
                sunAngle -= Math.PI/2;    //-pi/2 è l'offset che esiste tra gli angoli calcolati ed il ciclo giorno-notte
                if(sunAngle < 0) sunAngle = 2 * Math.PI + sunAngle;   //converto in positivo gli angoli compresi tra le 0:00 e le 6:00
                break;
            case 1: //tempo accelerato
                sunAngle += .005;
                if(sunAngle > 2*Math.PI) sunAngle = 0;
                break;
            case 2: sunAngle = 0; break;  //alba fissa
            case 3: sunAngle = Math.PI/2; break;  //mezzogiorno fisso
            case 4: sunAngle = Math.PI; break;    //tramonto fisso
            case 5: sunAngle = 3 / 2 * Math.PI; break;    //mezzanotte fissa
        }
        sun.position.x = Math.cos(sunAngle) * 500;
        sun.position.y = Math.sin(sunAngle) * 500;
        sun.position.z = defaultCamera.position.z;
        if(sunAngle <= Math.PI/2) skyboxMaterial.alpha = 2 / Math.PI * sunAngle + 0.1;  //alba-mattina
        else if(sunAngle > Math.PI/2 && sunAngle < Math.PI) skyboxMaterial.alpha = -2 / Math.PI * sunAngle + 2 + 0.1; //pomeriggio-sera
        else if(sunAngle >= Math.PI) skyboxMaterial.alpha = 0.1;  //notte
        
        //la Luna ruota in senso opposto rispetto al Sole
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
        
        if(rain.isReady() && thunderstorm.isReady() && thunder1.isReady() && thunder2.isReady() && thunder3.isReady() && thunder4.isReady() && thunder5.isReady()) weather(rainParticleSystem, lightningPlanes, globalWeatherState, skyboxMaterial);
        
        if(configFlags[3]) treno.position.z = defaultCamera.position.z;
        
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
            stazione.isVisible = true;
            if(checkIntersections(ponte.position.z + 1264, 512 * 2, stazione.position.z + 98, 512 * 3)) stazione.isVisible = false; //98 --> da cambiare a seconda della lunghezza delle stazioni
            if(configFlags[0] && stazione.isVisible) {
                cities[0].city.position.z = stazione.position.z;
                cities[0].trees.position.z = stazione.position.z;
                cities.push(cities.shift());
            }
            if(configFlags[2]) {
                forests[0].position.z = stazione.position.z + 1024;
                forests.push(forests.shift());
            }
            const indice = Math.floor(Math.random() * listaCartelli.length);
            const cartello = listaCartelli[indice];
            if(cartello != undefined && stazione.isVisible) {
                cartello.position.z = stazione.position.z + 12;
                listaCitta.splice(indice, 1);   //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
            }
        }
        if(defaultCamera.position.z > ponte.position.z + 4096) {
            ponte.position.z += 512 * Math.floor(16 + Math.random() * 30);
        }
        
        velocitaOverlay.innerText = "Velocità: " + Math.floor(velocita * 10);   //il fattore 10 serve a rendere più realistici i valori
        spazioOverlay.innerText = "Spazio: " + Math.floor(spazio * 10);
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
                    axisGroup.position = freeCam.position.clone();
                }
                else {
                    scene.activeCamera = defaultCamera;
                    axisGroup.setEnabled(false);
                }
            default: return;
        }
        event.preventDefault();
    });
}
