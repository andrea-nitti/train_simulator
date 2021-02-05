//Autori: Nitti; Parma
//Istituto: Liceo G. M. Colombini
//Progetto: Train Simulator
//Descrizione: Un simulatore di guida di treni, in cui si può scegliere
    //la velocità del treno potrà essere decisa e modificata in corsa,
    //la rotaia è infinita. 

const chunk_size = 32;  //chunk = unità di terreno usata per la generazione procedurale

window.addEventListener('DOMContentLoaded', (event) => {
        const canvas = document.getElementById('renderCanvas');
        canvas.addEventListener('wheel', evt => evt.preventDefault());
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera('cam', 0,0,15, new BABYLON.Vector3(0,0,0), scene);
        camera.attachControl(canvas,true);
        //camera.wheelPrecision = 50;
        //camera.lowerRadiusLimit = 3;
        //camera.upperRadiusLimit = 13*2;
        let light1 = new BABYLON.PointLight('light1',new BABYLON.Vector3(0,1,0), scene);
        light1.parent = camera;
    
        populateScene(scene);
        
        scene.registerBeforeRender(() => {
            let t = performance.now() * 0.03;
            camera.setPosition(new BABYLON.Vector3(-8, 7.5, t));
            camera.setTarget(new BABYLON.Vector3(-8, 7.5, 10+t));
            //console.log(t);
        });
        
        engine.runRenderLoop(()=>scene.render());
        window.addEventListener("resize", () => engine.resize());
        
});

//Funzione per creare il terreno
function createTerrain(scene) {
    //materiali dell'ambiente
    const metal = new BABYLON.StandardMaterial('metal', scene)
    metal.diffuseColor = new BABYLON.Color3(0.447, 0.474, 0.447);
    //metal.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    const wood = new BABYLON.StandardMaterial('wood', scene)
    wood.diffuseColor = new BABYLON.Color3(0.478, 0.356, 0.219);
    //wood.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    const gravel = new BABYLON.StandardMaterial('gravel', scene);
    gravel.diffuseColor = new BABYLON.Color3(0.560, 0.619, 0.572);
    const rusted_steel = new BABYLON.StandardMaterial('rusted_steel', scene);
    rusted_steel.diffuseColor = new BABYLON.Color3(0.718, 0.255, 0.055);
    
    for(let i=0; i<10; i++) {   //numero di chunk da generare
        z_offset = i * chunk_size; //z_offset = (i + chunk_offset) * chunk_size;
        
        //creazione binari
        for(let x_offset=-8; x_offset<=8; x_offset+=16) {   //il valore di x_offset varia la distanza fra i centri dei binari
            for(let k=-2; k<=2; k+=4) {
                let rail_h_inf = BABYLON.MeshBuilder.CreateBox('rail_h_inf', {height:0.1, depth: chunk_size, width:1.0}, scene);   //h_inf indica la parte orizzontale inferiore di una rotaia
                rail_h_inf.material = metal;
                rail_h_inf.position.y = -0.5;
                rail_h_inf.position.x = k + x_offset;
                rail_h_inf.position.z = z_offset;
            }
            for(let i=-2; i<=2; i+=4) {
                let rail_v = BABYLON.MeshBuilder.CreateBox('rail_v', {height:1.0, depth: chunk_size, width:0.25}, scene);   //v indica la parte verticale di una rotaia
                rail_v.material = metal;
                rail_v.position.y = 0;
                rail_v.position.x = i + x_offset;
                rail_v.position.z = z_offset;
            }
            for(let k=-2; k<=2; k+=4) {
                let rail_h_sup = BABYLON.MeshBuilder.CreateBox('rail_h_sup', {height:0.1, depth: chunk_size, width:0.6}, scene);   //h_sup indica la parte orizzontale superiore di una rotaia
                rail_h_sup.material = metal;
                rail_h_sup.position.y = +0.5;
                rail_h_sup.position.x = k + x_offset;
                rail_h_sup.position.z = z_offset;
            }
            for(let i=-(chunk_size/2);i<=(chunk_size/2); i+=4) {
                let traversa = BABYLON.MeshBuilder.CreateBox('traversa',{height:0.25, depth:1, width:6.5}, scene);
                traversa.material = wood;
                traversa.position.x = x_offset;
                traversa.position.y = -0.675;  //(-0.5-0.1/2-0.25/2)
                traversa.position.z = i + z_offset;
            }
            for(let i=-(chunk_size/2);i<=(chunk_size/2); i+=4) {
                for(let j=-1.7; j<=1.7; j+=3.4) {
                    let bullone = BABYLON.MeshBuilder.CreateCylinder('bullone', {height:0.5, diameter:0.15}, scene);
                    bullone.material = rusted_steel;
                    if (x_offset < 0) bullone.position.x = j + x_offset;
                    else bullone.position.x = j + x_offset;
                    bullone.position.y = -0.4;
                    bullone.position.z = i + z_offset;
                    dado = BABYLON.MeshBuilder.CreateCylinder('dado', {height: 0.15, diameter: 0.25, tessellation: 6}, scene);
                    dado.material = rusted_steel;
                    if (x_offset < 0) dado.position.x = j + x_offset;
                    else dado.position.x = j + x_offset;
                    dado.position.y = -0.4;
                    dado.position.z = i + z_offset;
                }
            }
        }
        
        //creazione terreno
        for(let s=-1; s<=1; s+=1) {
            let terreno = BABYLON.MeshBuilder.CreatePlane('terreno', {size: chunk_size, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
            terreno.material = gravel;
            terreno.rotation.x = Math.PI/2;
            terreno.position.x = s*chunk_size;
            terreno.position.y = -0.8;
            terreno.position.z = z_offset;
        }
        
        //creazione pali
        if(z_offset%(4*chunk_size) == 0) {  //creo i pali ogni 4 chunks
            for(let x_offset=-24; x_offset<=24; x_offset+=48) {
                let cilindro1 = BABYLON.MeshBuilder.CreateCylinder('cilindro1', {height:15, diameter:2.0}, scene);  //sezione verticale
                let cilindro2 = BABYLON.MeshBuilder.CreateCylinder('cilindro2', {height:15, diameter:1.5}, scene);
                let troncodicono = BABYLON.MeshBuilder.CreateCylinder('troncodicono', {diameterTop: 1.5, diameterBottom: 2.0, height: 1.0}, scene);
                cilindro1.position.x = x_offset;
                cilindro2.position.x = x_offset;
                troncodicono.position.x = x_offset;
                cilindro1.position.y = 7.5 - 0.8;
                cilindro2.position.y = 22.5 - 0.8;
                troncodicono.position.y = 15 + 0.5 - 0.8;
                cilindro1.position.z = z_offset;
                cilindro2.position.z = z_offset;
                troncodicono.position.z = z_offset;
                
                let cilindro_orizz = BABYLON.MeshBuilder.CreateCylinder('cilindro_orizz', {height:20, diameter: 1.125}, scene); //creazione dei "pali orizzontali"
                cilindro_orizz.rotation.z = Math.PI/2;
                if (x_offset < 0) cilindro_orizz.position.x = x_offset + 10;   //controllo se la sezione orizzontale si trova a sinistra (tengo il segno concorde)
                else cilindro_orizz.position.x = x_offset - 10;                //oppure a destra rispetto all'origine (inverto la sua traslazione sulle ascisse)       metodo alternativo: cilindro_orizz.position.x = x_offset + (x_offset < 0 ? 10 : -10);
                cilindro_orizz.position.y = 22.5;
                cilindro_orizz.position.z = z_offset;
                
                let tirante = BABYLON.MeshBuilder.CreateCylinder('tirante', {height:15, diameter: 0.5}, scene);    //creazione dei tiranti che sostengono le sezioni orizzontali su quella verticale
                if (x_offset < 0) {
                    tirante.position.x = x_offset + 7.0;   //in questo caso controllo la posizione per determinare l'angolo di rotazione del tirante
                    tirante.rotation.z = Math.PI/2.5;
                }
                else {
                    tirante.position.x = x_offset - 7.0;
                    tirante.rotation.z = Math.PI - Math.PI/2.5;
                }
                tirante.position.y = 25;
                tirante.position.z = z_offset;
                
                let soffietto = BABYLON.MeshBuilder.CreateCylinder('soffietto', {height:3, diameter: 1}, scene); //creazione degli isolatori dei fili superiori
                if (x_offset < 0) soffietto.position.x = -8;
                else soffietto.position.x = +8; 
                soffietto.position.y = 22.5 + 1.125/2 + 1.5;
                soffietto.position.z = z_offset;
            }
        }
        
        //creazione fili
        for(let x_offset = -8; x_offset<=8; x_offset+=16) {
            let filo_sup = BABYLON.MeshBuilder.CreateCylinder('filo_sup', {height: chunk_size, diameter: 0.25}, scene);
            filo_sup.rotation.x = Math.PI/2;
            filo_sup.position.x = x_offset;
            filo_sup.position.y = 22.5 + 1.125/2 + 3.0 + 0.125;
            filo_sup.position.z = z_offset;
        }
    }
    
}

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

//Funzione per creare la stazione
function createStation(scene) {
    for(let x_offset=-30; x_offset<=30; x_offset+=60) {
        //dichiarazione dei materiali (inclusa la DynamicTexture usata per scrivere il nome della stazione)
        const giallo = new BABYLON.StandardMaterial('giallo', scene);
        giallo.diffuseColor = new BABYLON.Color3(1, 1, 0);
        //scritte sul cartello
        const material = new BABYLON.StandardMaterial("material", scene);
        let font_type = "Arial";
        let planeWidth = 10;
        let planeHeight = 3;
        let plane = BABYLON.MeshBuilder.CreatePlane("scritta", {width:planeWidth, height:planeHeight}, scene);
        let DTWidth = planeWidth * 60;      //i moltiplicatori sono uguali per mantenere l'aspect ratio
        let DTHeight = planeHeight * 60;
        let nome_stazione = "Piacenza";     //qui si potrebbe aggiungere la chiamata ad una funzione che sceglie dei nomi casuali all'interno di un elenco
        let dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene);
        //Check width of text for given font type at any size of font
        let ctx = dynamicTexture.getContext();
	    let size = 12; //può essere qualsiasi valore
        ctx.font = size + "px " + font_type;
        let larghezza_testo = ctx.measureText(nome_stazione).width + 7.5; //il valore +5 permette di lasciare un po' del bordo blu
        let font_size = Math.floor(DTWidth / (larghezza_testo / size)); //larghezza_testo / size coincide con il ratio
        let font = font_size + "px " + font_type;
	    dynamicTexture.drawText(nome_stazione, null, null, font, "#FFFFFF", "#120A8F", true);   //text, posizion_x (0=left), posizion_y (0=bottom), font type, text color, background color, InvertY (default is true - y increases downwards)        
        material.diffuseTexture = dynamicTexture;
        plane.material = material;
        
        const pav_z = 0;
        
        plane.position.x = -30;
        plane.position.y = 12.8;
        plane.position.z = pav_z - 20;
        
        let pavimentazione = BABYLON.MeshBuilder.CreateBox('pavimentazione', {height:4, width:25, depth: 3*chunk_size}, scene);
        pavimentazione.position.x = x_offset;
        pavimentazione.position.y = 1.2;
        pavimentazione.position.z = pav_z;
        
        let sostegno_v = BABYLON.MeshBuilder.CreateCylinder('sostegno_v', {diameter: 0.8, height: 8}, scene);   //palo di sostegno per il cartello
        sostegno_v.position.x = -30;
        sostegno_v.position.y = 7.2;
        sostegno_v.position.z = pav_z - 20;
        
        let sostegno_h = BABYLON.MeshBuilder.CreateCylinder('sostegno_h', {diameter: 0.8, height: planeWidth+1}, scene);   //parte verticale sopra il palo
        sostegno_h.rotation.z = Math.PI/2;
        sostegno_h.position.x = -30;
        sostegno_h.position.y = 11.2;
        sostegno_h.position.z = pav_z - 20;
        
        
        let sost_v = BABYLON.MeshBuilder.CreateCylinder('sost_v', {diameter: 0.4, height: 3.2}, scene);   //bordi della scritta
        if(x_offset < 0) sost_v.position.x = planeWidth/2 + x_offset;
        else sost_v.position.x = planeWidth/2 - (x_offset + planeWidth);
        sost_v.position.y = 12.8;
        sost_v.position.z = pav_z - 20;
        
        let linea_gialla = BABYLON.MeshBuilder.CreatePlane('linea_gialla', {height: 3*chunk_size, width: 4, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        linea_gialla.material = giallo;
        linea_gialla.rotation.x = Math.PI/2;
        if (x_offset < 0) linea_gialla.position.x = x_offset + 7.5;
        else linea_gialla.position.x = x_offset - 7.5;
        linea_gialla.position.y = 3.201;
        linea_gialla.position.z = pav_z;
        
        for(let z_offset=-3*chunk_size; z_offset<=3*chunk_size; z_offset+=6*chunk_size) {
            let rampa = BABYLON.MeshBuilder.CreatePolyhedron('rampa',{custom: {"vertex" : [[25,0,0],[-25,0,0],[25,0,50],[-25,0,50],[25,8,0],[-25,8,0]],"face" : [[1,0,2,3],[3,2,4,5],[5,4,0,1],[0,4,2],[1,3,5]]},size: 0.5},scene); //tratto dal file "shape_1.js"
            rampa.position.x = x_offset;
            rampa.position.y = -0.8;
            if(z_offset < 0) {
                rampa.rotation.y = Math.PI;
                rampa.position.z = pav_z + z_offset / 2;
            }
            else rampa.position.z = pav_z + z_offset / 2;
        }
        
        
    }
}

//Funzione per generare procedualmente la scena
function populateScene(scene) {

    //var box = BABYLON.Mesh.CreateBox("Box", 1.0, scene);
    //scene.clearColor = new BABYLON.Color3(0.639, 0.878, 0.921);   //colore cielo
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    /*var skybox = BABYLON.Mesh.CreateBox("skyBox", 24.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infinteDistance = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;*/
    
    createTerrain(scene);
    createStation(scene);
}

//Funzione per creare il blocco di città
/*function createCity(scene) {

}

//Funzione per creare il blocco di foresta
function createForest(scene) {

} */
