//Autori: Andrea Nitti; Lorenzo Parma
//Istituto: Liceo G. M. Colombini
//Progetto: Train Simulator
//Descrizione: Un simulatore di guida di treni, in cui la velocità del mezzo, lungo una rotaia infinita, potrà essere decisa e modificata in corsa

"use strict";
let wire, terrain_chunk, ringhiera, leftPole, rightPole, casa, albero1, albero2, stazione0, carrozza, carrovuoto, locomotore;   //models
let sun, vegetali;
let horn, rain, thunderstorm, thunder1, thunder2, thunder3, thunder4, thunder5; //sounds
const importedModelsList = ["filo.obj","chunk_binario.obj","ringhiera.obj","paloL.obj","paloR.obj","casaAlta.obj","casaBassa.obj","albero1.obj","albero2.obj","stazione0.obj","carrozza.obj","carrovuoto.obj","locomotore.obj"];
const importedSoundsList = ["horn.ogg","thunder1.ogg","thunder2.ogg","thunder3.ogg","thunder4.ogg","thunder5.ogg","rain.ogg","thunderstorm.ogg"];

//parametri per la larghezza e l'altezza di ciascun cartello per ogni stazione
const planeWidth = 10;
const planeHeight = 3;

function startEverything(cities_boolean, forests_boolean, trains_boolean) {
        const caricamento = document.getElementById('loadingScreen');
        caricamento.style.display = "block";
        const avanzamento = document.getElementById('objectToBeLoaded');
        avanzamento.style.display = "block";
        const canvas = document.getElementById('renderCanvas');
        canvas.style.display = "block";
        canvas.addEventListener('wheel', evt => evt.preventDefault());
        const engine = new BABYLON.Engine(canvas, true);
        function schermoDiCaricamento() {}
        schermoDiCaricamento.prototype.displayLoadingUI = function() {caricamento.innerHTML = "Loading assets...";} //".prototype" consente di aggiungere una nuova proprietà (displayLoadingUI) al costruttore di un oggetto (schermoDiCaricamento)
        schermoDiCaricamento.prototype.hideLoadingUI = function() {
            caricamento.style.display = "none";
            avanzamento.style.display = "none";
        }
        engine.loadingScreen = new schermoDiCaricamento();
        engine.displayLoadingUI();
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.UniversalCamera('cam',new BABYLON.Vector3(-8,7.5,0), scene);
        camera.keysDown = camera.keysUp = camera.keysLeft = camera.keysRight = camera.keysDownward = camera.keysUpward = []; //rimuovo i controlli predefiniti della tastiera
        camera.attachControl(canvas,true);

        sun = new BABYLON.PointLight("Light", new BABYLON.Vector3(-1, -2, -1), scene);
        sun.setDirectionToTarget(BABYLON.Vector3.Zero());
	    sun.intensity = 1;
        sun.diffuse = new BABYLON.Color3(1, 1, 0.8);
        
        inizializzaColori(scene);
        
        scene.clearColor = new BABYLON.Color3(0.0859, 0.0898, 0.15); //imposto il colore esterno alla skybox (blu scuro)
        var assetsManager = new BABYLON.AssetsManager(scene);
        assetsManager.useDefaultLoadingScreen = false;
        importedModelsList.forEach(x => {
            let importMesh = assetsManager.addMeshTask("task", "", "./assets/models/", x);
            importMesh.onSuccess = function(task) {
                avanzamento.innerHTML = "(./assets/models/" + x + ")";
                switch(x) {
                    case "filo.obj": wire = task.loadedMeshes; break;
                    case "chunk_binario.obj": terrain_chunk = task.loadedMeshes; break;
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
                }
            };
            importMesh.onError = function(task, message) {console.log(message);};
        });
        importedSoundsList.forEach(x => {
            let importSound = assetsManager.addBinaryFileTask("task", "./assets/sounds/" + x);
            importSound.onSuccess = function(task) {
                avanzamento.innerHTML = "(./assets/sounds/" + x + ")";
                switch(x) {
                    case "horn.ogg": horn = new BABYLON.Sound("horn", task.data, scene); break;
                    case "thunder1.ogg": thunder1 = new BABYLON.Sound("thunder1", task.data, scene); break;
                    case "thunder2.ogg": thunder2 = new BABYLON.Sound("thunder2", task.data, scene); break;
                    case "thunder3.ogg": thunder3 = new BABYLON.Sound("thunder3", task.data, scene); break;
                    case "thunder4.ogg": thunder4 = new BABYLON.Sound("thunder4", task.data, scene); break;
                    case "thunder5.ogg": thunder5 = new BABYLON.Sound("thunder5", task.data, scene); break;
                    case "rain.ogg": rain = new BABYLON.Sound("rain", task.data, scene); break;
                    case "thunderstorm.ogg": thunderstorm = new BABYLON.Sound("thunderstorm", task.data, scene); break;
                }
            };
            importSound.onError = function(task, message) {console.log(message);};
        });
        assetsManager.onFinish = function(tasks) {
            setupScene(engine, camera, scene, cities_boolean, forests_boolean, trains_boolean);
            ringhiera.forEach(x => x.dispose() );
            terrain_chunk.forEach(x => x.dispose() );
            leftPole.forEach(x => x.dispose() );
            rightPole.forEach(x => x.dispose() );
            palazzo.forEach(x => x.dispose() );
            casa.forEach(x => x.dispose() );
            wire.forEach(x => x.dispose() );
            albero1.forEach(x => x.dispose() );
            albero2.forEach(x => x.dispose() );
            stazione0.forEach(x => x.dispose() );
            carrozza.forEach(x => x.dispose() );
            carrovuoto.forEach(x => x.dispose() );
            locomotore.forEach(x => x.dispose() );
        }
        assetsManager.load();
}

function setupScene(engine, camera, scene, cities_boolean, forests_boolean, trains_boolean) {
        const velocitaOverlay = document.getElementById('velocita');
        const spazioOverlay = document.getElementById('spazio');
        const aiutoOverlay = document.getElementById('aiuto2');
        //creazione della skybox
        let skybox = BABYLON.Mesh.CreateBox("skybox", 10000.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skyboxMaterial.alpha = 1;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox_v4", scene, ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"]);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        
        vegetali = [albero1, albero2];
        
        let segments = [];  //array che contiene 4 modelli di terreno ferroviario
        for(let i=0; i<12; i++) {
            let Terrain = createTerrain(scene);
            Terrain.position.z = i * 256;
            segments.push(Terrain);
        }
        
        let stazione = createStation(scene);
        stazione.isVisible = false;
        let listaCartelli = createSigns(scene);
        
        let Foresta1, Foresta2;
        if(forests_boolean) {
            Foresta1 = foresta(scene, 20, 1024);    //Foresta1 indica la parent_mesh di tutto il complesso
            Foresta2 = foresta(scene, -629.5, 1024);    //Foresta2 indica la parent_mesh di tutto il complesso
        }
        
        let spazio = 0;
        let velocita = 0;
        
        //manipolo la nebbia
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        scene.fogDensity = 0.001;
        scene.fogColor = new BABYLON.Color3(0.494, 0.604, 0.686);
        skybox.applyFog = false;
        
        let cities = [];    //array che contiene la lista delle parentMesh di 5*3*2 città
        if(cities_boolean) {
            for(let i=0; i<5; i++) {
                let city = createEnvironment(scene, 0);
                city.position.z = -100000;
                cities.push(city);
            }
            cities[0].position.z = stazione.position.z;
            cities.push(cities.shift());
        }
        
        let indice = Math.floor(Math.random() * listaCartelli.length);
        let cartello = listaCartelli[indice];
        if(cartello != undefined) {
            cartello.position.z = stazione.position.z + 12;
            listaCitta.splice(indice, 1);    //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
        }
        
        let treno;
        if(trains_boolean) {
            treno = train(scene);
        }
        
        const rainParticleSystem = new BABYLON.GPUParticleSystem('rain', {capacity: 100000, randomTextureSize: 4096}, scene);
        rainParticleSystem.particleTexture = droplet;
        let emitter = rainParticleSystem.createBoxEmitter(new BABYLON.Vector3(0, -150, 0), new BABYLON.Vector3(0, -250, 0), new BABYLON.Vector3(-75, 0, -400), new BABYLON.Vector3(75, 0, 400));
        rainParticleSystem.emitter = new BABYLON.Vector3(0, 75, 0);
        rainParticleSystem.minLifeTime = 4;
        rainParticleSystem.maxLifeTime = 7;
        rainParticleSystem.minSize = 0.5;
        rainParticleSystem.maxSize = 2.0;
        rainParticleSystem.minScaleX = 0.05;
        rainParticleSystem.maxScaleX = 0.1;
        
        let lightningPlanes = createLightning(scene);
        let globalWeatherState = {finishTimeStamp: 0, weatherState: 0};
        
        let masterPlane = BABYLON.MeshBuilder.CreatePlane('masterPlane', {size: 1024}, scene);
        masterPlane.material = campo;
        masterPlane.rotation.x = Math.PI/2;
        masterPlane.position.y = -0.875;
        //masterPlane.position.y = -0.8;
        
        let modalitaTempo = 0;  //il tipo di ciclo giorno-notte predefinito è quello reale
        
        //animazione
        var angoloLuce = 0;
        scene.registerBeforeRender(() => {
            if(modalitaTempo == 0) {    //modalità reale
                let day = new Date();
                let time = day.getHours() * 60 + day.getMinutes();  //il tempo corrente è rappresentato in minuti (a partire da mezzanotte del giorno corrente)
                angoloLuce = time / (24 * 60) * 2 * Math.PI;    //calcolo l'angolo in base alla proporzione con i minuti contenuti in un giorno
                angoloLuce -= Math.PI/2;    //-pi/2 è l'offset che esiste tra gli angoli calcolati ed il ciclo giorno-notte
                if(angoloLuce < 0) angoloLuce = 2 * Math.PI + angoloLuce;   //converto in positivo gli angoli compresi tra le 0:00 e le 6:00
            }
            else if(modalitaTempo == 1) {   //tempo accelerato
                angoloLuce += .005;
                if(angoloLuce > 2*Math.PI) angoloLuce = 0;
            }
            else if(modalitaTempo == 2) {   //alba fissa
                angoloLuce = 0;
            }
            else if(modalitaTempo == 3) {   //mezzogiorno fisso
                angoloLuce = Math.PI/2;
            }
            else if(modalitaTempo == 4) {   //tramonto fisso
                angoloLuce = Math.PI;
            }
            else if(modalitaTempo == 5) {   //mezzanotte fissa
                angoloLuce = 3 / 2 * Math.PI;
            }
            sun.position.x =+ Math.cos(angoloLuce)*500;
            sun.position.y =+ Math.sin(angoloLuce)*500;
            sun.position.z = camera.position.z;
            if(angoloLuce <= Math.PI/2) skyboxMaterial.alpha = 2 / Math.PI * angoloLuce + 0.1; //alba-mattina
            else if(angoloLuce > Math.PI/2 && angoloLuce < Math.PI) skyboxMaterial.alpha = -2 / Math.PI * angoloLuce + 2 + 0.1;   //pomeriggio-sera
            else if(angoloLuce >= Math.PI) skyboxMaterial.alpha = 0.1;   //notte
            
            masterPlane.position.z = camera.position.z + 300; //aggiorno la posizione del terreno
            
            rainParticleSystem.emitter.z = camera.position.z;
            
            if(rain.isReady() && thunderstorm.isReady() && thunder1.isReady() && thunder2.isReady() && thunder3.isReady() && thunder4.isReady() && thunder5.isReady())
                weather(rainParticleSystem, lightningPlanes, globalWeatherState, skyboxMaterial);
            
            if(trains_boolean) {
                treno.position.z = camera.position.z;
            }
            
            velocita -= 0.01;   //per inerzia il treno tenderà a rallentare da solo se non si continua a premere il tasto W
            if(velocita < 0) velocita = 0;
            
            spazio += velocita;
            camera.position.z = spazio;
            
            if(camera.position.z > (4 * 256) + segments[0].position.z) {   //sposto il primo modello di terreno se ho superato l'inizio del terzo
                segments[0].position.z += segments.length * 256;
                segments.push(segments.shift());    //il primo elemento diventa l'ultimo
            }
            if(camera.position.z > stazione.position.z + 2 * 256) { //se l'osservatore si trova oltre l'ultima stazione generata (sommata di 2 * 256) [oppure all'origine degli assi]
                //stazione.position.z += 256 * Math.floor(200 + Math.random() * 801);  //sposto l'ultima stazione ad almeno 2 km di distanza dalla precedente; la massima distanza ammessa è 10 km
                stazione.isVisible = true;
                stazione.position.z += 256 * Math.floor(8 + Math.random() * 40);
                if(cities_boolean) {
                    cities[0].position.z = stazione.position.z;
                    cities.push(cities.shift());
                }
                let indice = Math.floor(Math.random() * listaCartelli.length);
                let cartello = listaCartelli[indice];
                if(cartello != undefined) {
                    cartello.position.z = stazione.position.z + 12;
                    listaCitta.splice(indice, 1);    //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
                }
            }
            if(forests_boolean) {
                if(camera.position.z > Foresta1.position.z + 5 * 256) {
                    Foresta1.position.z += stazione.position.z + 1024;
                    Foresta2.position.z += stazione.position.z + 1024;
                }
            }
            
            velocitaOverlay.innerText = "Velocità: " + Math.floor(velocita * 10);  //il fattore 10 serve a rendere più realistici i valori
            spazioOverlay.innerText = "Spazio: " + Math.floor(spazio * 10);
        });
        engine.runRenderLoop(()=>scene.render());
        window.addEventListener("resize", () => engine.resize());
        window.addEventListener("keydown", function(evt) {
            if(evt.keyCode === 87 && velocita < 32) { //rilevo la pressione del tasto W
                velocita += 0.025;    //accelerazione
            }
            if(evt.keyCode === 83) {   //con 83 individuo la pressione del tasto S
                velocita -= 0.25;    //frenata
            }
            if(evt.keyCode === 38 && camera.position.y <= 64) {    //freccia superiore (la telecamera può salire di un'altezza limitata rispetto al terreno)
                camera.position.y += 0.5;            
            }
            if(evt.keyCode === 40 && camera.position.y > -0.5) { //freccia inferiore (non consento alla telecamera di scendere sotto il terreno)
                camera.position.y -= 0.5;
            }
            if(evt.keyCode === 32) {    //barra spaziatrice
                horn.play();    //sirena
            }
            if(evt.keyCode === 71) {    //tasto G
                modalitaTempo = (modalitaTempo + 1) % 6;    //scrittura alternativa: modalitaTempo += 1; if(modalitaTempo > 5) modalitaTempo = 0;
            }
            if(evt.keyCode === 72 && aiutoOverlay.style.display === "") {
                aiutoOverlay.style.display = "block";
            }
            else if(aiutoOverlay.style.display === "block") aiutoOverlay.style.display = "";
        });
}
