//Credits: Andrea Nitti; Lorenzo Parma

"use strict";
let wire, terrainChunk, gravelPlane, ponte1, ringhiera, leftPole, rightPole, casa, palazzo, albero1, stazione0, stazione1, stazione2, stazione3, stazione4, carrozza, carrovuoto, locomotore, container1, container2, cisterna1, cisterna2;    //models
let sun, moon, day;
let horn, rain, thunderstorm, thunder1, thunder2, thunder3, thunder4, thunder5, riverSound, sparks; //sounds
const importedModelsList = ["filo.obj","chunk_binario.obj","ground.obj","ponte1.obj","ringhiera.obj","paloL.obj","paloR.obj","casaAlta.obj","casaBassa.obj","albero1.obj","stazione0.obj","stazione1.obj","stazione2.obj","stazione3.obj","stazione4.obj","carrozza.obj","carrovuoto.obj","locomotore.obj","container1.obj","container2.obj","cisterna1.obj","cisterna2.obj"];
const importedSoundsList = ["horn.ogg","thunder1.ogg","thunder2.ogg","thunder3.ogg","thunder4.ogg","thunder5.ogg","rain.ogg","thunderstorm.ogg","river.ogg","sparks.ogg"];

let distanceFromOrigin = 0;
let velocity = 0;

//station sign parameters
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
    schermoDiCaricamento.prototype.displayLoadingUI = function() {caricamento.innerHTML = "Loading...";};   //".prototype" adds a new property (displayLoadingUI) to an object's constructor (schermoDiCaricamento)
    schermoDiCaricamento.prototype.hideLoadingUI = function() {
        caricamento.style.display = "none";
        avanzamento.style.display = "none";
    };
    engine.loadingScreen = new schermoDiCaricamento();
    engine.displayLoadingUI();
    const scene = new BABYLON.Scene(engine);
    const defaultCamera = new BABYLON.UniversalCamera('defaultCamera', new BABYLON.Vector3(-8, 7.5, 0), scene);
    defaultCamera.inputs.clear();   //removing all camera default inputs
    defaultCamera.inputs.addMouse();
    defaultCamera.attachControl(canvas, true);
    defaultCamera.maxZ = renderDistance;
    const freeCam = new BABYLON.UniversalCamera('freeCam', new BABYLON.Vector3(-8, 7.5, 0), scene);
    freeCam.keysDownward = freeCam.keysUpward = [];
    freeCam.attachControl(canvas, true);
    freeCam.maxZ = renderDistance;
    scene.activeCamera = defaultCamera;
    initializeColors(scene);

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

    //scene.clearColor = new BABYLON.Color3(0.086, 0.090, 0.150); //this is the color of the sky outside the skybox (dark blue)
    const assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.useDefaultLoadingScreen = false;
    importedModelsList.forEach(x => {
        const importMesh = assetsManager.addMeshTask("task", "", "./assets/models/", x);
        importMesh.onSuccess = function(task) {
            //avanzamento.innerHTML = "(./assets/models/" + x + ")";
            //task.loadedMeshes.forEach(x => {x.doNotSyncBoundingInfo = true;});
            switch(x) {
                case "filo.obj": wire = task.loadedMeshes; break;
                case "chunk_binario.obj": terrainChunk = task.loadedMeshes; break;
                case "ground.obj": gravelPlane = task.loadedMeshes; break;
                case "ponte1.obj": ponte1 = task.loadedMeshes; break;
                case "ringhiera.obj": ringhiera = task.loadedMeshes; break;
                case "paloL.obj": leftPole = task.loadedMeshes; break;
                case "paloR.obj": rightPole = task.loadedMeshes; break;
                case "casaAlta.obj": palazzo = task.loadedMeshes; break;
                case "casaBassa.obj": casa = task.loadedMeshes; break;
                case "albero1.obj": albero1 = task.loadedMeshes; break;
                case "stazione0.obj": stazione0 = task.loadedMeshes; break;
                case "stazione1.obj": stazione1 = task.loadedMeshes; break;
                case "stazione2.obj": stazione2 = task.loadedMeshes; break;
                case "stazione3.obj": stazione3 = task.loadedMeshes; break;
                case "stazione4.obj": stazione4 = task.loadedMeshes; break;
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
                case "sparks.ogg": sparks = new BABYLON.Sound('sparks', task.data, scene, function() {sparks.setVolume(2);}, {loop: true}); break;
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
        [wire, terrainChunk, gravelPlane, ponte1, ringhiera, leftPole, rightPole, casa, palazzo, albero1, stazione0, stazione1, stazione2, stazione3, stazione4, carrozza, carrovuoto, locomotore,  container1, container2, cisterna1, cisterna2].forEach(model => {
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
    const speedOverlay = document.getElementById('speed');
    const distanceOverlay = document.getElementById('distance');
    const infoOverlay = document.getElementById('helpDialog');
    const coordinatesOverlay = document.getElementById('coordinates');

    //skybox creation
    const skybox = BABYLON.Mesh.CreateBox('skybox', renderDistance * 2 / Math.sqrt(3), scene);  //skybox length is calculated in such a way that it is always visible
    const skyboxMaterial = new BABYLON.StandardMaterial('skyboxMaterial', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.alpha = 1;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox_v4", scene, ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"]);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    const segments = [];    //this array contains 12 terrain models (each one is 256 units long)
    for(let i=0; i<12; i++) {
        const Terrain = createTerrain(scene);
        Terrain.railRoad.position.z = i * 256;
        Terrain.terrain.position.z = i * 256;
        segments.push(Terrain);
    }

    const arrayOfStations = createAllStations(scene);
    const signList = createSigns(scene, glowHalo);
    const index = Math.floor(Math.random() * signList.length);
    const sign = signList[index];
    sign.position.z = 92;
    cityList.splice(index, 1);  //the first argument is the position of the array element; the second one indicates how many elements need to be removed

    const forests = [];
    if(configFlags[2]) {
        for(let i=0; i<2; i++) {
            const Forest = createForestGroup(scene);
            Forest.position.z = -100000;
            forests.push(Forest);
        }
        forests[0].position.z = 256;
        forests.push(forests.shift());
    }

    //handling fog properties
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.001;
    scene.fogColor = new BABYLON.Color3(0.494, 0.604, 0.686);
    skybox.applyFog = false;

    const cities = [];  //this array contains a list of 5*3*2 city meshes
    if(configFlags[0]) {
        for(let i=0; i<5; i++) {
            const City = createCityGroup(scene, configFlags[1]);
            City.city.position.z = -100000;
            City.trees.position.z = -100000;
            cities.push(City);
        }
    }

    let train;
    if(configFlags[3]) train = createNormalTrain();
    if(configFlags[4]) createContainerTrainFirstType(scene);

    const bridge = createBridge(skybox, scene);
    riverSound.setVolume(2, 0);

    const axisGroup = createAxis(scene);

    const rainParticleSystem = new BABYLON.GPUParticleSystem('rainPS', {capacity: 100000, randomTextureSize: 4096}, scene);
    rainParticleSystem.particleTexture = new BABYLON.Texture("./assets/textures/rain.png");
    rainParticleSystem.createBoxEmitter(new BABYLON.Vector3(0, -150, 0), new BABYLON.Vector3(0, -250, 0), new BABYLON.Vector3(-75, 0, -400), new BABYLON.Vector3(75, 0, 400));
    rainParticleSystem.emitter = new BABYLON.Vector3(0, 75, 0);
    rainParticleSystem.minLifeTime = 4;
    rainParticleSystem.maxLifeTime = 7;
    rainParticleSystem.minSize = 0.5;
    rainParticleSystem.maxSize = 2.0;
    rainParticleSystem.minScaleX = 0.05;
    rainParticleSystem.maxScaleX = 0.1;

    const sparksParticleSystem = new BABYLON.ParticleSystem('sparksPS', 50, scene);
    sparksParticleSystem.particleTexture = new BABYLON.Texture("./assets/textures/spark.png");
    sparksParticleSystem.emitter = new BABYLON.Vector3(-8, 27.625, -10);
    sparksParticleSystem.direction1 = sparksParticleSystem.direction2 = BABYLON.Vector3.Zero();
    sparksParticleSystem.minLifeTime = 0.15;
    sparksParticleSystem.maxLifeTime = 0.75;
    sparksParticleSystem.minSize = 0.01;
    sparksParticleSystem.maxSize = 0.25;

    const lightningPlanes = createLightning(scene, glowHalo);
    const globalWeatherState = {finishTimeStamp: 0, weatherState: 0};

    let timeMode = 0;   //the default day-night cycle follows real time
    let deltaSunIntensity = 0.00025;
    let sunsetProgress = 0;
    let moonAngle = 0;
    let stationIndex = 0;
    scene.registerBeforeRender(() => {
        day = new Date();
        const time = day.getHours() * 60 + day.getMinutes();    //present time is measured in minutes starting from today's midnight
        switch(timeMode) {
            case 0: //real mode
                if(time <= 720) sun.intensity = time / (12 * 60);   //sun brightness is proportional to the number of minutes present in half a day
                else sun.intensity = (-time) / (12 * 60) + 2;   //sun brightness is decreasing starting from mid-day
                break;
            case 1: //fast-forward mode
                sun.intensity += deltaSunIntensity;
                if((sun.intensity >= 1) || (sun.intensity <= 0)) deltaSunIntensity = -deltaSunIntensity;
                break;
            case 2: sun.intensity = 0.5; break; //steady 06:00 a.m.
            case 3: sun.intensity = 1; break;   //steady noon
            case 4: sun.intensity = 0.5; break; //steady 06:00 p.m.
            case 5: sun.intensity = 0; break;   //steady midnight
        }
        /*if(globalWeatherState.weatherState != 2)*/ skyboxMaterial.alpha = sun.intensity * 0.9 + 0.1;
        if((sunsetProgress < 0.1) && (globalWeatherState.weatherState == 2)) skyboxMaterial.alpha = sun.intensity - 0.25;   //DA CAMBIARE: può esistere un "gradino" di luminosità del cielo se il tramonto e il temporale sono attivi nello stesso momento
        
        //sunset colors handling code
        if((timeMode == 0 && time > 720) || (timeMode == 1 && deltaSunIntensity < 0)) {
            const secondHalfDayProgress = 1 - sun.intensity;
            //7/12 and 3/4 are the start and end of the sunset if noon = 0 and midnight = 1 (07:00 p.m. and 09:00 p.m.)
            if((secondHalfDayProgress > 7/12) && (secondHalfDayProgress < 17/24)) sunsetProgress = 8 * secondHalfDayProgress - 14/3;    //17/24 is a point found between 7/12 and 3/4
            else if((secondHalfDayProgress >= 17/24) && (secondHalfDayProgress < 3/4)) sunsetProgress = -24 * secondHalfDayProgress + 18;
        }
        const skyRed = 0.086 + sunsetProgress * (0.965 - 0.086);
        const skyGreen = 0.090 + sunsetProgress * (0.387 - 0.090);
        const skyBlue = 0.150 + sunsetProgress * (0.040 - 0.150);
        scene.clearColor = new BABYLON.Color3(skyRed, skyGreen, skyBlue);

        //moon rotation
        let moonTime = day.getDate();
        if(moonTime > 28) moonTime = 28;
        moonAngle = moonTime / 28 * 2 * Math.PI;
        moon.position.x = Math.sin(moonAngle) * 250;
        moon.position.y = Math.cos(moonAngle) * 250;

        //checking if a terrain segment overlaps with the bridge (if an intersection is found, the segment is set to invisible)
        for(let i=0; i<12; i++) {
            if(segments[i].terrain.position.z > (bridge.position.z + 752) && segments[i].terrain.position.z < (bridge.position.z + 1776)) segments[i].terrain.isVisible = false;
            else segments[i].terrain.isVisible = true;
        }

        rainParticleSystem.emitter.z = defaultCamera.position.z;
        sparksParticleSystem.emitter.z = defaultCamera.position.z - 10;

        if(rain.isReady() && thunderstorm.isReady() && thunder1.isReady() && thunder2.isReady() && thunder3.isReady() && thunder4.isReady() && thunder5.isReady() && sparks.isReady()) weather(rainParticleSystem, sparksParticleSystem, lightningPlanes, globalWeatherState);

        if(configFlags[3]) train.position.z = defaultCamera.position.z - 615;

        velocity -= 0.01;   //if the W key isn't pressed, the camera starts slowing down for inertia
        if(velocity < 0) velocity = 0;

        distanceFromOrigin += velocity;
        defaultCamera.position.z = distanceFromOrigin;

        if(defaultCamera.position.z > (4 * 256) + segments[0].railRoad.position.z) {    //move the first terrain segment if the start of the third one is surpassed
            segments[0].railRoad.position.z += segments.length * 256;
            segments[0].terrain.position.z += segments.length * 256;
            segments.push(segments.shift());    //the first element becomes last
        }
        if(defaultCamera.position.z > arrayOfStations[stationIndex].position.z + 2 * 256) { //arrayOfStations[stationIndex] indicates the last discovered station
            const previuosStationIndex = stationIndex;
            if(stationIndex < 3) stationIndex += 1;
            else stationIndex = 0;
            arrayOfStations[stationIndex].position.z = arrayOfStations[previuosStationIndex].position.z + 256 * Math.floor(8 + Math.random() * 40); //the last station is moved at least 4096 units away the previous one
            arrayOfStations[stationIndex].setEnabled(true);
            arrayOfStations[previuosStationIndex].getChildren().forEach(x => x.setEnabled(false));  //turning off all of the previous station lights
            arrayOfStations[stationIndex].getChildren().forEach(x => x.setEnabled(true));           //turning on all of the current station lights
            //if(checkIntersections(bridge.position.z + 1264, 512 * 2, stazione.position.z + 98, 512 * 3)) stazione.setEnabled(false); //98 --> DA CAMBIARE a seconda della lunghezza delle stazioni
            if(configFlags[0] && arrayOfStations[stationIndex].isEnabled()) {
                cities[0].city.position.z = arrayOfStations[stationIndex].position.z;
                cities[0].trees.position.z = arrayOfStations[stationIndex].position.z;
                cities.push(cities.shift());
            }
            if(configFlags[2]) {
                forests[0].position.z = arrayOfStations[stationIndex].position.z + 1280;
                forests.push(forests.shift());
            }
            const index = Math.floor(Math.random() * signList.length);
            const sign = signList[index];
            if(sign != undefined && arrayOfStations[stationIndex].isEnabled()) {
                switch(stationIndex) {
                    case 0: sign.position.z = arrayOfStations[stationIndex].position.z + 12; break;
                    case 1: sign.position.z = arrayOfStations[stationIndex].position.z - 40; break;
                    case 2: sign.position.z = arrayOfStations[stationIndex].position.z - 140; break;
                    case 3: sign.position.z = arrayOfStations[stationIndex].position.z - 104; break;
                }
                cityList.splice(index, 1);
            }
            
        }
        if(defaultCamera.position.z > bridge.position.z + 4096) {
            bridge.position.z += 512 * Math.floor(16 + Math.random() * 30);
            if(riverSound.isReady()) riverSound.setPosition(new BABYLON.Vector3(0, 0, bridge.position.z + 1264));
        }

        speedOverlay.innerText = "Velocità: " + Math.floor(velocity * 10);  //the multiplier allows for more realistic values
        distanceOverlay.innerText = "Spazio: " + Math.floor(distanceFromOrigin * 10);
        coordinatesOverlay.innerText = "X: " + freeCam.position.x + "\n Y: " + freeCam.position.y + "\n Z: " + freeCam.position.z;
    });
    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());
    window.addEventListener("keydown", function(event) {    //keyboard interactions
        switch(event.keyCode) {
            case 87: if(velocity < 32) velocity += 0.025; break;    //W --> acceleration
            case 83: velocity -= 0.1; break;    //S --> brake
            case 38: if(scene.activeCamera == defaultCamera && defaultCamera.position.y <= 64) defaultCamera.position.y += 0.5; break;  //↑ --> rise camera
            case 40: if(scene.activeCamera == defaultCamera && defaultCamera.position.y > -0.5) defaultCamera.position.y -= 0.5; break; //↓ --> drop camera
            case 32: horn.play(); break;    //spacebar --> horn
            case 71: timeMode = (timeMode + 1) % 6; break;  //G --> set timeMode (cyclic change)
            case 72:
                if(infoOverlay.style.display === "") {  //H --> display help information
                    infoOverlay.style.display = "block";
                }
                else if(infoOverlay.style.display === "block") {    //H --> hide help information
                    infoOverlay.style.display = "";
                }
                break;
            case 67:    //C --> change active camera and set axis visiblity
                if(scene.activeCamera == defaultCamera) {
                    scene.activeCamera = freeCam;
                    axisGroup.setEnabled(true);
                    freeCam.position = defaultCamera.position.clone();
                    axisGroup.position = freeCam.position.clone();
                    coordinatesOverlay.style.display = "block";
                }
                else {
                    scene.activeCamera = defaultCamera;
                    axisGroup.setEnabled(false);
                    coordinatesOverlay.style.display = "";
                }
            default: return;
        }
        event.preventDefault();
    });
}
