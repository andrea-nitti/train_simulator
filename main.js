//Autori: Andrea Nitti; Lorenzo Parma
//Istituto: Liceo G. M. Colombini
//Progetto: Train Simulator
//Descrizione: Un simulatore di guida di treni, in cui la velocità del mezzo, lungo una rotaia infinita, potrà essere decisa e modificata in corsa

const chunk_size = 32;  //chunk = unità di terreno usata per la generazione procedurale
const segment_size = 10;    //segment = numero di chunk di blocco di ferrovia generata dalla funzione cretaeTerrain()
let wire, terrain_chunk, ringhiera;
let sun;

window.addEventListener('DOMContentLoaded', (event) => {    //queste prime righe sono state riadattate a partire da MYLIB.js
        const barra = document.getElementById('bar');
        const progresso = document.getElementById('progress');
        const canvas = document.getElementById('renderCanvas');
        canvas.addEventListener('wheel', evt => evt.preventDefault());
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.UniversalCamera('cam',new BABYLON.Vector3(-8,7.5,0), scene);
        camera.keysDown = camera.keysUp = camera.keysLeft = camera.keysRight = camera.keysDownward = camera.keysUpward = []; //rimuovo i controlli predefiniti della tastiera
        camera.attachControl(canvas,true);

        sun = new BABYLON.PointLight("Light", new BABYLON.Vector3(-1, -2, -1), scene);
        sun.setDirectionToTarget(BABYLON.Vector3.Zero());
	    sun.intensity = 1;
        sun.diffuse = new BABYLON.Color3(1, 1, 0.8);
        //sun.parent = camera;
        
        inizializzaColori(scene);
        
        scene.clearColor = new BABYLON.Color3(0.0859, 0.0898, 0.15); //imposto il colore esterno alla skybox (blu scuro)
        
        BABYLON.SceneLoader.ImportMesh('',"./assets/models/", "filo.obj", scene, (meshes) => {
            wire = meshes;
            BABYLON.SceneLoader.ImportMesh('',"./assets/models/", "chunk_binario.obj", scene, (meshes) => {
                terrain_chunk = meshes;
                BABYLON.SceneLoader.ImportMesh('',"./assets/models/", "ringhiera.obj", scene, (meshes) => {
                    ringhiera = meshes;
                    BABYLON.SceneLoader.ImportMesh('',"./assets/models/", "paloL.obj", scene, (meshes) => {
                        leftPole = meshes;
                        BABYLON.SceneLoader.ImportMesh('',"./assets/models/", "paloR.obj", scene, (meshes) => {
                            rightPole = meshes;
                            BABYLON.SceneLoader.ImportMesh('',"./assets/models/", "casaAlta.obj", scene, (meshes) => {
                                palazzo = meshes;
                                BABYLON.SceneLoader.ImportMesh('',"./assets/models/", "casaBassa.obj", scene, (meshes) => {
                                    casa = meshes;
                                    setupScene(engine, camera, scene);
                                    ringhiera.forEach(x => x.dispose() );
                                    terrain_chunk.forEach(x => x.dispose() );
                                    leftPole.forEach(x => x.dispose() );
                                    rightPole.forEach(x => x.dispose() );
                                    //palazzo.forEach(x => x.dispose() );
                                    //casa.forEach(x => x.dispose() );
                                    wire.forEach(x => x.dispose() );
                                });
                            });
                        });
                    });
                });
            });
        });
        
        var i = 0;  //barra di caricamento (tratta da https://www.w3schools.com/howto/howto_js_progressbar.asp)
        var width = 10;
        if (i == 0) {
            i = 1;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                    barra.style.display = "none";
                    progresso.style.display = "none";
                } else {
                    width++;
                    barra.style.width = width + "%";
                    barra.innerHTML = "Loading: " + width + "%";
                }
            }
        }
});

function setupScene(engine, camera, scene) {
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
        //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox", scene);
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox_v4", scene, ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"]);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        
        let segments = [];  //array che contiene 5 segmenti da 10 chunks l'uno di terreno ferroviario
        for(let i=0; i<5; i++) {
            let Terrain = createTerrain(scene);
            Terrain.position.z = i * chunk_size * segment_size;
            segments.push(Terrain);
        }
        
        let stazione = createStation(scene); //stazione indica la parent_mesh di tutto il complesso
        let listaCartelli = createSigns(scene);
        let Foresta1 = foresta(scene, 20, 1024);    //Foresta1 indica la parent_mesh di tutto il complesso
        let Foresta2 = foresta(scene, -629.5, 1024);    //Foresta2 indica la parent_mesh di tutto il complesso
        
        let spazio = 0;
        let velocita = 0;
        
        //manipolo la nebbia
        /*scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        scene.fogDensity = 0.005;
        scene.fogColor = new BABYLON.Color3(0.494, 0.604, 0.686);*/
        //skybox.applyFog = false;
        
        horn = new BABYLON.Sound("horn", "./assets/sounds/horn.ogg", scene);    //sirena
        
        let cities = [];    //array che contiene la lista delle parentMesh di 5*3*2 città
        for(let i=0; i<5; i++) {
            let city = createEnvironment(scene, 0);
            city.position.z = -100000;
            cities.push(city);
        }
        cities[0].position.z = stazione.position.z;
        cities.push(cities.shift());
        
        let indice = Math.floor(Math.random() * listaCartelli.length);
        let cartello = listaCartelli[indice];
        if(cartello != undefined) {
            cartello.position.z = stazione.position.z + 12;
            listaCitta.splice(indice, 1);    //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
        }
        
        let masterPlane = BABYLON.MeshBuilder.CreatePlane('masterPlane', {size: 1024}, scene);
        masterPlane.material = campo;
        masterPlane.rotation.x = Math.PI/2;
        masterPlane.position.y = -0.875;
        
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
            
            
            masterPlane.position.z = camera.position.z;
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
                cities[0].position.z = stazione.position.z;
                cities.push(cities.shift());
                let indice = Math.floor(Math.random() * listaCartelli.length);
                let cartello = listaCartelli[indice];
                if(cartello != undefined) {
                    cartello.position.z = stazione.position.z + 12;
                    listaCitta.splice(indice, 1);    //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
                }
            }
            if(camera.position.z > Foresta1.position.z + 5 * segment_size * chunk_size) {
                Foresta1.position.z += stazione.position.z + 1024;
                Foresta2.position.z += stazione.position.z + 1024;
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
            if(evt.keyCode === 40 && camera.position.y > 0.5) { //freccia inferiore (non consento alla telecamera di scendere sotto il terreno)
                camera.position.y -= 0.5;
            }
            if(evt.keyCode === 32) {    //barra spaziatrice
                horn.play();
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
