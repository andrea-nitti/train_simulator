//Funzione per creare il terreno della ferrovia
function createTerrain(scene, chunk_offset, crea_sbarre) {
    let parent_mesh = BABYLON.Mesh.CreateBox("box", 1.0, scene);    //a questa mesh ancoro tutto il terreno
    parent_mesh.isVisible = false;
    
    for(let i=0; i<10; i++) {   //numero di chunk da generare alla volta
        z_offset = (i + chunk_offset) * chunk_size;
        
        //creazione binari
        for(let x_offset=-8; x_offset<=8; x_offset+=16) {   //il valore di x_offset varia la distanza fra i centri dei binari
            for(let k=-2; k<=2; k+=4) {
                let rail_h_inf = BABYLON.MeshBuilder.CreateBox('rail_h_inf', {height: 0.1, depth: chunk_size, width: 1.0}, scene);   //h_inf indica la parte orizzontale inferiore di una rotaia
                rail_h_inf.material = colori(scene, 3);
                rail_h_inf.position.y = -0.5;
                rail_h_inf.position.x = k + x_offset;
                rail_h_inf.position.z = z_offset;
                rail_h_inf.setParent(parent_mesh);
            }
            for(let i=-2; i<=2; i+=4) {
                let rail_v = BABYLON.MeshBuilder.CreateBox('rail_v', {height: 1.0, depth: chunk_size, width: 0.25}, scene);   //v indica la parte verticale di una rotaia
                rail_v.material = colori(scene, 3);
                rail_v.position.y = 0;
                rail_v.position.x = i + x_offset;
                rail_v.position.z = z_offset;
                rail_v.setParent(parent_mesh);
            }
            for(let k=-2; k<=2; k+=4) {
                let rail_h_sup = BABYLON.MeshBuilder.CreateBox('rail_h_sup', {height: 0.1, depth: chunk_size, width: 0.6}, scene);   //h_sup indica la parte orizzontale superiore di una rotaia
                rail_h_sup.material = colori(scene, 3);
                rail_h_sup.position.y = +0.5;
                rail_h_sup.position.x = k + x_offset;
                rail_h_sup.position.z = z_offset;
                rail_h_sup.setParent(parent_mesh);
            }
            for(let i=-(chunk_size/2);i<=(chunk_size/2); i+=4) {
                let traversa = BABYLON.MeshBuilder.CreateBox('traversa',{height: 0.25, depth: 1, width: 6.5}, scene);
                traversa.material = colori(scene, 4);
                traversa.position.x = x_offset;
                traversa.position.y = -0.675;  //(-0.5-0.1/2-0.25/2)
                traversa.position.z = i + z_offset;
                traversa.setParent(parent_mesh);
            }
            for(let i=-(chunk_size/2);i<=(chunk_size/2); i+=4) {
                for(let j=-1.7; j<=1.7; j+=3.4) {
                    let bullone = BABYLON.MeshBuilder.CreateCylinder('bullone', {height: 0.5, diameter: 0.15}, scene);
                    bullone.material = colori(scene, 6);
                    if (x_offset < 0) bullone.position.x = j + x_offset;
                    else bullone.position.x = j + x_offset;
                    bullone.position.y = -0.4;
                    bullone.position.z = i + z_offset;
                    bullone.setParent(parent_mesh);
                    let dado = BABYLON.MeshBuilder.CreateCylinder('dado', {height: 0.15, diameter: 0.25, tessellation: 6}, scene);
                    dado.material = colori(scene, 6);
                    if (x_offset < 0) dado.position.x = j + x_offset;
                    else dado.position.x = j + x_offset;
                    dado.position.y = -0.4;
                    dado.position.z = i + z_offset;
                    dado.setParent(parent_mesh);
                }
            }
        }
        
        //creazione terreno
        for(let s=-1; s<=1; s+=1) {
            let terreno = BABYLON.MeshBuilder.CreatePlane('terreno', {size: chunk_size, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
            terreno.material = colori(scene, 5);
            terreno.rotation.x = Math.PI/2;
            terreno.position.x = s*chunk_size;
            terreno.position.y = -0.8;
            terreno.position.z = z_offset;
            terreno.setParent(parent_mesh);
        }
        
        //creazione pali
        if(z_offset % (4*chunk_size) == 0) {  //creo i pali ogni 4 chunks
            for(let x_offset=-24; x_offset<=24; x_offset+=48) {
                let cilindro1 = BABYLON.MeshBuilder.CreateCylinder('cilindro1', {height: 15, diameter: 2.0}, scene);  //sezione verticale
                let cilindro2 = BABYLON.MeshBuilder.CreateCylinder('cilindro2', {height: 15, diameter: 1.5}, scene);  //sezione verticale superiore ristretta
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
                cilindro1.setParent(parent_mesh);
                cilindro2.setParent(parent_mesh);
                troncodicono.setParent(parent_mesh);
                
                let cilindro_orizz = BABYLON.MeshBuilder.CreateCylinder('cilindro_orizz', {height: 20, diameter: 1.125}, scene); //creazione dei "pali orizzontali"
                cilindro_orizz.rotation.z = Math.PI/2;
                if (x_offset < 0) cilindro_orizz.position.x = x_offset + 10;   //controllo se la sezione orizzontale si trova a sinistra (tengo il segno concorde)
                else cilindro_orizz.position.x = x_offset - 10;                //oppure a destra rispetto all'origine (inverto la sua traslazione sulle ascisse)       metodo alternativo: cilindro_orizz.position.x = x_offset + (x_offset < 0 ? 10 : -10);
                cilindro_orizz.position.y = 22.5;
                cilindro_orizz.position.z = z_offset;
                cilindro_orizz.setParent(parent_mesh);
                
                let tirante = BABYLON.MeshBuilder.CreateCylinder('tirante', {height: 15, diameter: 0.5}, scene);    //creazione dei tiranti che sostengono le sezioni orizzontali su quella verticale
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
                tirante.setParent(parent_mesh);
                
                let soffietto = BABYLON.MeshBuilder.CreateCylinder('soffietto', {height: 3, diameter: 1}, scene); //creazione degli isolatori dei fili superiori
                if (x_offset < 0) soffietto.position.x = -8;
                else soffietto.position.x = +8; 
                soffietto.position.y = 22.5 + 1.125/2 + 1.5;
                soffietto.position.z = z_offset;
                soffietto.setParent(parent_mesh);
            }
        }
        
        //creazione fili
        for(let x_offset = -8; x_offset<=8; x_offset+=16) {
            let filo_sup = BABYLON.MeshBuilder.CreateCylinder('filo_sup', {height: chunk_size, diameter: 0.25}, scene);
            filo_sup.rotation.x = Math.PI/2;
            filo_sup.position.x = x_offset;
            filo_sup.position.y = 22.5 + 1.125/2 + 3.0 + 0.125;
            filo_sup.position.z = z_offset;
            filo_sup.setParent(parent_mesh);
        }
        
        //creazione ringhiera (se non sono presenti stazioni)
        if (crea_sbarre) {
            for(let i=-(chunk_size/2); i<=(chunk_size/2); i+=2) {   //sezione verticale della ringhiera
                for(let x_offset=-30; x_offset<=30; x_offset+=60) {
                    let sbarra_v = BABYLON.MeshBuilder.CreateBox('sbarra_h', {width: 0.25, depth: 0.25, height: 10}, scene);
                    sbarra_v.material = colori(scene, 6);
                    sbarra_v.rotation.y = Math.PI/4;
                    sbarra_v.position.x = x_offset;
                    sbarra_v.position.y = 5 - 0.8;
                    sbarra_v.position.z = i + z_offset;   
                    sbarra_v.setParent(parent_mesh); 
                    }
            }
            for(let i=-2; i<=2; i+=4) { //sezione orizzontale della ringhiera
                for(let x_offset=-30; x_offset<=30; x_offset+=60) {
                    let sbarra_h = BABYLON.MeshBuilder.CreateBox('sbarra_v', {width: 0.25, depth: 0.25, height: chunk_size}, scene);
                    sbarra_h.material = colori(scene, 6);
                    sbarra_h.rotation.x = Math.PI/2;
                    sbarra_h.position.x = x_offset;
                    if(i < 0) sbarra_h.position.y = i + 4;
                    else sbarra_h.position.y = i + 6;
                    sbarra_h.position.z = z_offset;
                    sbarra_h.setParent(parent_mesh);
                    }
            }
        }
        else if (i>2) {
            for(let i=-chunk_size/2; i<=chunk_size/2; i+=2) {   //sezione verticale della ringhiera
                for(let x_offset=-30; x_offset<=30; x_offset+=60) {
                    let sbarra_v = BABYLON.MeshBuilder.CreateBox('sbarra_h', {width: 0.25, depth: 0.25, height: 10}, scene);
                    sbarra_v.material = colori(scene, 6);
                    sbarra_v.rotation.y = Math.PI/4;
                    sbarra_v.position.x = x_offset;
                    sbarra_v.position.y = 5 - 0.8;
                    sbarra_v.position.z = i + z_offset;   
                    sbarra_v.setParent(parent_mesh); 
                    }
            }
            for(let i=-2; i<=2; i+=4) { //sezione orizzontale della ringhiera
                for(let x_offset=-30; x_offset<=30; x_offset+=60) {
                    let sbarra_h = BABYLON.MeshBuilder.CreateBox('sbarra_v', {width: 0.25, depth: 0.25, height: chunk_size}, scene);
                    sbarra_h.material = colori(scene, 6);
                    sbarra_h.rotation.x = Math.PI/2;
                    sbarra_h.position.x = x_offset;
                    if(i < 0) sbarra_h.position.y = i + 4;
                    else sbarra_h.position.y = i + 6;
                    sbarra_h.position.z = z_offset;
                    sbarra_h.setParent(parent_mesh);
                    }
            }
        }
        for(let x_offset=-30; x_offset<=30; x_offset+=60) { //blocco di appoggio per i pali verticali della ringhiera
            let blocco = BABYLON.MeshBuilder.CreateBox('blocco', {width: 5, depth: chunk_size, height: 1}, scene);
            blocco.material = colori(scene, 8);
            blocco.position.x = x_offset;
            blocco.position.y = -0.8 + 0.5;
            blocco.position.z = z_offset;
            blocco.setParent(parent_mesh);
        }
    }
    return parent_mesh;
}
