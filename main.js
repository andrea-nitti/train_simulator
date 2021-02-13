//Autori: Andrea Nitti; Lorenzo Parma
//Istituto: Liceo G. M. Colombini
//Progetto: Train Simulator
//Descrizione: Un simulatore di guida di treni, in cui la velocità del mezzo, lungo una rotaia infinita, potrà essere decisa e modificata in corsa
//Documentazione approfondita della libreria: https://doc.babylonjs.com/typedoc

const chunk_size = 32;  //chunk = unità di terreno usata per la generazione procedurale
const segment_size = 10;    //segment = numero di chunk di blocco di ferrovia generata dalla funzione cretaeTerrain()
let last_station_z = 0; //salvo la coordinata z dell'ultima stazione generata (è assegnata inizialmente a 0 in quanto la prima stazione è centrata rispetto all'asse z = 0)

window.addEventListener('DOMContentLoaded', (event) => {    //queste prime righe sono state riadattate a partire da MYLIB.js
        const velocitaOverlay = document.getElementById('velocita');
        const spazioOverlay = document.getElementById('spazio');
        const aiutoOverlay = document.getElementById('aiuto2');
        const canvas = document.getElementById('renderCanvas');
        canvas.addEventListener('wheel', evt => evt.preventDefault());
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.UniversalCamera('cam',new BABYLON.Vector3(-8,7.5,0), scene);
        camera.keysDown = camera.keysUp = camera.keysLeft = camera.keysRight = camera.keysDownward = camera.keysUpward = []; //rimuovo i controlli predefiniti della tastiera
        camera.attachControl(canvas,true);
        let light1 = new BABYLON.PointLight('light1',new BABYLON.Vector3(0,1,0), scene);
        light1.parent = camera;
        
        //creazione della skybox (tratto da https://doc.babylonjs.com/divingDeeper/environment/skybox)
        let skybox = BABYLON.Mesh.CreateBox("skybox", 10000.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
        skyboxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.infinteDistance = true;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox", scene)
        //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox_v2", scene, ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"]);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        
        inizializzaColori(scene);
        
        //imposto il colore esterno alla skybox (nero)
        scene.clearColor = new BABYLON.Color3(0, 0, 0);
        
        let segments = [];  //array che contiene 5 segmenti da 10 chunks l'uno di terreno ferroviario
        for(let i=0; i<5; i++) {
            let Terrain = createTerrain(scene, true);
            Terrain.position.z = i * chunk_size * segment_size;
            segments.push(Terrain);
        }
        let stazione = createStation(scene); //stazione indica la parent_mesh di tutto il complesso
        let listaCartelli = createSigns(scene);
        treno(scene);
        let spazio = 0;
        let velocita = 0;
        //scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        //scene.fogDensity = 0.01;
        //scene.fogStart = 20.0;
        //scene.fogEnd = 5000.0;
        
        horn = new BABYLON.Sound("horn", "./assets/sounds/horn.ogg", scene);    //sirena
        
        let tipperc = createEnvironment(scene, [1,100], stazione.position.z);
        
        //let isStationPresent = false;
        
        //animazione
        scene.registerBeforeRender(() => {
            skybox.position.z = camera.position.z;
            velocita -= 0.01;   //per inerzia il treno tenderà a rallentare da solo se non si continua a premere il tasto W
            if(velocita < 0) velocita = 0;
            spazio += velocita;
            camera.position.z = spazio;
            if(camera.position.z > (2.5 * segment_size * chunk_size) + segments[0].position.z) {   //sposto il primo segmento di terreno se ho superato la metà del secondo
                segments[0].position.z += segments.length * segment_size * chunk_size;
                segments.push(segments.shift());    //il primo elemento diventa l'ultimo
            }
            if(camera.position.z > stazione.position.z + 2.5 * segment_size * chunk_size) { //se l'osservatore si trova oltre l'ultima stazione generata (sommata di 2/5 * segment_size * chunk_size)
                stazione.position.z += segment_size * chunk_size * Math.floor((200 + Math.random() * 801) / chunk_size);  //sposto l'ultima stazione ad almeno 2 km di distanza dalla precedente; la massima distanza ammessa è 10 km
                tipperc = createEnvironment(scene, tipperc, stazione.position.z);
                let indice = Math.floor(Math.random() * listaCartelli.length);
                //isStationPresent = true;
                let cartello = listaCartelli[indice];
                if(cartello != undefined) {
                    cartello.position.z = stazione.position.z + 12;
                    listaCitta.splice(indice, 1);    //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
                }
            }
            velocitaOverlay.innerText = "Velocità: " + Math.floor(velocita * 10);  //il fattore 10 serve a rendere più realistici i valori
            spazioOverlay.innerText = "Spazio: " + Math.floor(spazio * 10);
            //console.log(velocita);
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
            if(evt.keyCode === 38 && camera.position.y <= 100) {    //freccia superiore (la telecamera può salire di un'altezza limitata rispetto al terreno)
                camera.position.y += 0.5;            
            }
            if(evt.keyCode === 40 && camera.position.y > 0.5) { //freccia inferiore (non consento alla telecamera di scendere sotto il terreno)
                camera.position.y -= 0.5;
            }
            if(evt.keyCode === 32) {    //barra spaziatrice
                horn.play();
            }
            if(evt.keyCode === 72 && aiutoOverlay.style.display === "") {
                aiutoOverlay.style.display = "block";
            }
            else if(aiutoOverlay.style.display === "block") aiutoOverlay.style.display = "";
        });
});
