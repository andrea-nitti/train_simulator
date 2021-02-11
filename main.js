//Autori: Andrea Nitti; Lorenzo Parma
//Istituto: Liceo G. M. Colombini
//Progetto: Train Simulator
//Descrizione: Un simulatore di guida di treni, in cui la velocità del mezzo, lungo una rotaia infinita, potrà essere decisa e modificata in corsa
//Documentazione approfondita della libreria: https://doc.babylonjs.com/typedoc

const chunk_size = 32;  //chunk = unità di terreno usata per la generazione procedurale
const segment_size = 10;    //segment = numero di chunk di blocco di ferrovia generata dalla funzione cretaeTerrain()
let last_station_z = 0; //salvo la coordinata z dell'ultima stazione generata (è assegnata inizialmente a 0 in quanto la prima stazione è centrata rispetto all'asse z = 0)

window.addEventListener('DOMContentLoaded', (event) => {    //queste prime righe sono state riadattate a partire da MYLIB.js
        const canvas = document.getElementById('renderCanvas');
        canvas.addEventListener('wheel', evt => evt.preventDefault());
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        //const camera = new BABYLON.ArcRotateCamera('cam', 0,0,15, new BABYLON.Vector3(0,0,0), scene);
        const camera = new BABYLON.UniversalCamera('cam',new BABYLON.Vector3(-8,7.5,0), scene);
        camera.keysDown = camera.keysUp = camera.keysLeft = camera.keysRight = camera.keysDownward = camera.keysUpward = []; //rimuovo i controlli predefiniti della tastiera
        camera.attachControl(canvas,true);
        //camera.wheelPrecision = 50;
        //camera.lowerRadiusLimit = 3;
        //camera.upperRadiusLimit = 13*2;
        let light1 = new BABYLON.PointLight('light1',new BABYLON.Vector3(0,1,0), scene);
        light1.parent = camera;
        
        //creazione della skybox (tratto da https://doc.babylonjs.com/divingDeeper/environment/skybox)
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.infinteDistance = true;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        
        inizializzaColori(scene);
        let chunk_offset = 0;
        
        //imposto il colore esterno alla skybox (nero)
        scene.clearColor = new BABYLON.Color3(0, 0, 0);
        
        //let stazione = (camera.position.z > last_station_z + 2000 + Math.floor(Math.random() * 8001)) || (chunk_offset == 0);
        let segments = [];  //array che contiene 5 segmenti da 10 chunks l'uno di terreno ferroviario
        for(let i=0; i<5; i++) {
            let Terrain = createTerrain(scene, true);
            Terrain.position.z = i * chunk_size * segment_size;
            segments.push(Terrain);
        }
        let stazione = createStation(scene, 0); //stazione indica la parent_mesh di tutto il complesso
        let listaCartelli = createSigns(scene);
        treno(scene);
        let spazio = 0;
        let velocita = 0;
        //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        //scene.fogDensity = 0.01;
        //scene.fogStart = 20.0;
        //scene.fogEnd = 60.0;
        
        cittaP1(scene, 0, 0);
        cittaP2(scene, 0, 512);
        cittaP3(scene, -609.5, 0);
        cittaP4(scene, -609.5, 512);
        
        //animazione
        scene.registerBeforeRender(() => {
            velocita -= 0.01;   //per inerzia il treno tenderà a rallentare da solo se non si continua a premere il tasto W
            if(velocita < 0) velocita = 0;
            spazio += velocita;
            camera.position.z = spazio;
            //camera.setPosition(new BABYLON.Vector3(-8, 7.5, spazio));
            //camera.setTarget(new BABYLON.Vector3(-8, 7.5, 10+spazio));
            if(camera.position.z > (chunk_size * 3/2 * segment_size) + segments[0].position.z) {   //sposto il primo segmento di terreno se ho superato la metà del secondo
                segments[0].position.z += segments.length * segment_size * chunk_size;
                segments.push(segments.shift());    //il primo elemento diventa l'ultimo
            }
            if(camera.position.z > stazione.position.z + 5 * chunk_size) { //se l'osservatore si trova oltre l'ultima stazione generata (sommata di 5 * chunk_size)
                stazione.position.z += chunk_size * Math.floor((2000 + Math.random() * 8001) / chunk_size);  //sposto l'ultima stazione ad almeno 2 km di distanza dalla precedente; la massima distanza ammessa è 10 km
                let indice = Math.floor(Math.random() * listaCartelli.length);
                let cartello = listaCartelli[indice];
                if(cartello != undefined) {
                    cartello.position.z = stazione.position.z + 12;
                    listaCitta.splice(indice, 1);    //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
                }
            }
            //console.log(velocita);
        });
        engine.runRenderLoop(()=>scene.render());
        window.addEventListener("resize", () => engine.resize());
        
        window.addEventListener("keydown", function(evt) {
            if(evt.keyCode === 87 && velocita < 320) { //rilevo la pressione del tasto W
                velocita += 0.1;    //accelero
            }
            if(evt.keyCode === 83) {   //con 83 individuo la pressione del tasto S
                velocita -= 0.1;    //freno
            }
            if(evt.keyCode === 38) {
                camera.position.y += 0.5;            
            }
            if(evt.keyCode === 40 && camera.position.y > 0.5) {
                camera.position.y -= 0.5;
            }
        });
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
