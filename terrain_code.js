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
            for(let x_offset=-8; x_offset<=8; x_offset+=16) {
                wire.forEach(x => {
                    let filo_sup = x.clone('wire');
                    filo_sup.position.x = x_offset;
                    filo_sup.position.y = 22.5 + 1.125/2 + 3.0 + 0.125;
                    filo_sup.position.z = z_offset + 2.5 * chunk_size;
                    filo_sup.setParent(parent_mesh);
                });
            }
            leftPole.forEach(x => {
                let palo = x.clone('palo');
                palo.position.x = -24;
                palo.position.z = z_offset;
                palo.setParent(parent_mesh);
            });
            rightPole.forEach(x => {
                let palo = x.clone('palo');
                palo.position.x = +24;
                palo.position.z = z_offset;
                palo.setParent(parent_mesh);
            });
        }
        
        //creazione fili
        for(let x_offset = -8; x_offset<=8; x_offset+=16) {
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
