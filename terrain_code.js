//Funzione per creare il terreno della ferrovia
function createTerrain(scene) {
    let parent_mesh = BABYLON.Mesh.CreateBox("box", 1.0, scene);    //a questa mesh ancoro tutto il terreno
    parent_mesh.isVisible = false;  //rendo l'ancora invisbile
    
    for(let i=0; i<10; i++) {   //numero di chunk da generare per ogni segmento
        z_offset = i * chunk_size;
        
        //creazione binari e terreno
        terrain_chunk.forEach(x => {
            let terrain = x.clone('terrain_chunk');
            terrain.position.z = z_offset;
            terrain.setParent(parent_mesh);
        });
        
        //creazione pali
        if(z_offset % (5*chunk_size) == 0) {  //creo i pali ogni 5 chunks
            for(let x_offset=-24; x_offset<=24; x_offset+=48) {
                let cilindro1 = BABYLON.MeshBuilder.CreateCylinder('cilindro1', {height: 15, diameter: 2.0}, scene);  //sezione verticale
                let cilindro2 = BABYLON.MeshBuilder.CreateCylinder('cilindro2', {height: 15, diameter: 1.5}, scene);  //sezione verticale superiore ristretta
                let troncodicono = BABYLON.MeshBuilder.CreateCylinder('troncodicono', {diameterTop: 1.5, diameterBottom: 2.0, height: 1.0}, scene); //restringimento più dolce del palo
                cilindro1.material = alluminio;
                cilindro2.material = alluminio;
                troncodicono.material = alluminio;
                cilindro1.position.x = x_offset;
                cilindro2.position.x = x_offset;
                troncodicono.position.x = x_offset;
                cilindro1.position.y = 7.5 - 0.8;
                cilindro2.position.y = 22.5 - 0.8;
                troncodicono.position.y = 15 + 0.5 - 0.8;
                cilindro1.position.z = z_offset;
                cilindro2.position.z = z_offset;
                troncodicono.position.z = z_offset;
                cilindro1.setParent(parent_mesh);
                cilindro2.setParent(parent_mesh);
                troncodicono.setParent(parent_mesh);
                
                let cilindro_orizz = BABYLON.MeshBuilder.CreateCylinder('cilindro_orizz', {height: 20, diameter: 1.125}, scene); //creazione dei "pali orizzontali"
                cilindro_orizz.material = alluminio;
                cilindro_orizz.rotation.z = Math.PI/2;
                if (x_offset < 0) cilindro_orizz.position.x = x_offset + 10;   //controllo se la sezione orizzontale si trova a sinistra (tengo il segno concorde)
                else cilindro_orizz.position.x = x_offset - 10;                //oppure a destra rispetto all'origine (inverto la sua traslazione sulle ascisse)       metodo alternativo: cilindro_orizz.position.x = x_offset + (x_offset < 0 ? 10 : -10);
                cilindro_orizz.position.y = 22.5;
                cilindro_orizz.position.z = z_offset;
                cilindro_orizz.setParent(parent_mesh);
                
                let tirante1 = BABYLON.MeshBuilder.CreateCylinder('tirante1', {height: 15, diameter: 0.5}, scene);    //creazione dei tiranti che sostengono le sezioni orizzontali su quella verticale
                tirante1.material = alluminio;
                if (x_offset < 0) {
                    tirante1.position.x = x_offset + 7.0;   //in questo caso controllo la posizione per determinare l'angolo di rotazione del tirante
                    tirante1.rotation.z = Math.PI/2.5;
                }
                else {
                    tirante1.position.x = x_offset - 7.0;
                    tirante1.rotation.z = Math.PI - Math.PI/2.5;
                }
                tirante1.position.y = 25;
                tirante1.position.z = z_offset;
                tirante1.setParent(parent_mesh);
                
                let soffietto1 = BABYLON.MeshBuilder.CreateCylinder('soffietto1', {height: 3.5, diameter: 1}, scene); //creazione dei sostegni degli isolatori dei fili superiori
                soffietto1.material = alluminio;
                if (x_offset < 0) soffietto1.position.x = -8;
                else soffietto1.position.x = +8; 
                soffietto1.position.y = 22.5 + 1.125/2 + 1.5 - 0.25;
                soffietto1.position.z = z_offset;
                soffietto1.setParent(parent_mesh);
                for(let n=1; n<=8; n++) {
                    let disco1 = BABYLON.MeshBuilder.CreateCylinder('disco1', {diameterTop: 2, diameterBottom: 1, height: 0.25, tessellation: 50}, scene);    //"disco" in realtà fa riferimento ad un altro tronco di cono
                    disco1.material = porcellana;
                    if (x_offset < 0) disco1.position.x = -8;
                    else disco1.position.x = +8;
                    if(n%2 == 0) disco1.rotation.x = Math.PI;
                    disco1.position.y = 22.5 + 1.125/2 + 0.25 * n;
                    disco1.position.z = z_offset;
                    disco1.setParent(parent_mesh);
                }
                
                for(let posiz=-1.5; posiz<=1.5; posiz+=3) {
                    let collegamento = BABYLON.MeshBuilder.CreateBox('collegamento', {height: 2.7, width: 0.1, depth: 2}, scene);   //elemento che unisce i sostegni inferiori con i pali orizzontali (si tratta di un rettangolo avente profondità minima)
                    collegamento.material = alluminio;
                    if(x_offset < 0) collegamento.position.x = -8 + posiz;
                    else collegamento.position.x = 8 + posiz;
                    collegamento.position.y = 22;
                    collegamento.position.z = z_offset;
                    collegamento.setParent(parent_mesh);
                }
                
                let bracciodipoligonazione1 = BABYLON.MeshBuilder.CreateBox('bracciodipoligonazione1', {height: 0.6, width: 5, depth: 0.75}, scene);   //segmento orizzonale appena sotto il cilindro orizzontale
                bracciodipoligonazione1.material = alluminio;
                if(x_offset < 0) bracciodipoligonazione1.position.x = -8;
                else bracciodipoligonazione1.position.x = +8;
                bracciodipoligonazione1.position.y = 21.4625;
                bracciodipoligonazione1.position.z = z_offset;
                bracciodipoligonazione1.setParent(parent_mesh);
                let bracciodipoligonazione2 = BABYLON.MeshBuilder.CreatePolyhedron('bracciodipoligonazione2',{custom: {"vertex" : [[-11.125,0,-0.75],[-8.875,0,-0.75],[-11.125,0,0.75],[-8.875,0,0.75],[-1.125,5.5,-0.75],[1.125,5.5,-0.75],[-1.125,5.5,0.75],[1.125,5.5,0.75]],"face" : [[0,1,3,2],[4,6,7,5],[1,0,4,5],[3,1,5,7],[2,3,7,6],[0,2,6,4]]},size: 0.5},scene); //uno dei sostegni del filo inferiore
                bracciodipoligonazione2.material = alluminio;
                if (x_offset < 0) bracciodipoligonazione2.position.x = -10;
                else bracciodipoligonazione2.position.x = +10 - 4;
                bracciodipoligonazione2.position.y = 22.5 - 2 * 1.125/2 - 2.36;
                bracciodipoligonazione2.position.z = z_offset;
                bracciodipoligonazione2.setParent(parent_mesh);
                let soffietto2 = BABYLON.MeshBuilder.CreateCylinder('soffietto2', {height: 2.5, diameter: 0.35}, scene); //creazione dei sostegni degli isolatori dei fili inferiori
                soffietto2.rotation.z = Math.PI/2;
                if(x_offset < 0) soffietto2.position.x = -13;
                else soffietto2.position.x = 3;
                soffietto2.position.y = 19.25;
                soffietto2.position.z = z_offset;
                soffietto2.setParent(parent_mesh);
                for(let k=-1; k<=1; k+=2) {
                    let tirantinodipoligonazione = BABYLON.MeshBuilder.CreateCylinder('tirantinodipoligonazione', {diameter: 0.2, height: 3.75}, scene);
                    tirantinodipoligonazione.material = alluminio;
                    tirantinodipoligonazione.rotation.z = Math.PI/2;
                    if(x_offset < 0) tirantinodipoligonazione.position.x = -11.75 + 3.75/2;
                    else tirantinodipoligonazione.position.x = 4.25 + 3.75/2;
                    tirantinodipoligonazione.position.y = 19.25;
                    tirantinodipoligonazione.position.z = z_offset + k;
                    tirantinodipoligonazione.setParent(parent_mesh);
                    let gomito = BABYLON.MeshBuilder.CreateCylinder('gomito', {diameter: 0.18, height: 1}, scene); //morsetto che sostiene il filo inferiore
                    if(x_offset < 0) gomito.position.x = -8;
                    else gomito.position.x = +8;
                    gomito.position.y = 19.25 - 1/2 + 0.1;
                    gomito.position.z = z_offset + k;
                    gomito.setParent(parent_mesh);
                }
                let formaT = BABYLON.MeshBuilder.CreateCylinder('formaT', {diameter: 0.2, height: 2.2}, scene);
                formaT.material = alluminio;
                formaT.rotation.x = Math.PI/2;
                if(x_offset < 0) formaT.position.x = -11.75;
                else formaT.position.x = 4.25;
                formaT.position.y = 19.25;
                formaT.position.z = z_offset;
                formaT.setParent(parent_mesh);
                for(let n=1; n<=6; n++) {
                    let disco2 = BABYLON.MeshBuilder.CreateCylinder('disco2', {diameterTop: 1, diameterBottom: 0.7, height: 0.2, tessellation: 50}, scene);    //isolatori dei fili inferiori
                    disco2.material = porcellana;
                    disco2.rotation.z = Math.PI/2;
                    if (x_offset < 0) disco2.position.x = -11.85 - 0.2 * n;
                    else disco2.position.x = +4.15 - 0.2 * n;
                    if(n%2 == 0) disco2.rotation.z = 3*Math.PI/2;
                    disco2.position.y = 19.25;
                    disco2.position.z = z_offset;
                    disco2.setParent(parent_mesh);
                }
                let filo_sup = wire.clone('wire');
                filo_sup.material = colrosso;
                if(x_offset < 0) filo_sup.position.x = -8;
                else filo_sup.position.x = +8;
                filo_sup.position.y = 22.5 + 1.125/2 + 3.0 + 0.125;
                filo_sup.position.z = z_offset + 2.5 * chunk_size;
                filo_sup.setParent(parent_mesh);
            }
        }
        
        //creazione fili
        for(let x_offset = -8; x_offset<=8; x_offset+=16) {
            //let filo_sup = BABYLON.MeshBuilder.CreateCylinder('filo_sup', {height: chunk_size, diameter: 0.25}, scene); //filo superiore della linea aerea
            /*let filo_sup = wire.clone('wire');
            filo_sup.material = colnero;
            //filo_sup.rotation.x = Math.PI/2;
            filo_sup.position.x = x_offset;
            filo_sup.position.y = 22.5 + 1.125/2 + 3.0 + 0.125;
            filo_sup.position.z = z_offset;
            filo_sup.setParent(parent_mesh);*/
            let filo_inf = BABYLON.MeshBuilder.CreateCylinder('filo_inf', {height: chunk_size, diameter: 0.25}, scene); //filo inferiore della linea aerea
            filo_inf.material = colnero;
            filo_inf.rotation.x = Math.PI/2;
            filo_inf.position.x = x_offset;
            filo_inf.position.y = 18.35;
            filo_inf.position.z = z_offset;
            filo_inf.setParent(parent_mesh);
            let tirante2 = BABYLON.MeshBuilder.CreateCylinder('tirante2', {height: chunk_size, diameter: 0.35}, scene); //tirante situato tra un palo ed il successivo
            tirante2.material = metal;
            tirante2.rotation.x = Math.PI/2;
            if(x_offset < 0) tirante2.position.x = -24;
            else tirante2.position.x = 24;
            tirante2.position.y = 22.5;
            tirante2.position.z = z_offset;
            tirante2.setParent(parent_mesh);
        }
        
        //creazione ringhiera (se non sono presenti stazioni)
        for(let x_offset=-48; x_offset<=48; x_offset+=96) {
            ringhiera.forEach(x => {
                let element = x.clone('ringhiera');
                element.position.x = x_offset;
                element.position.z = z_offset;
                element.setParent(parent_mesh);
            });
        }
    }
    return parent_mesh;
}
