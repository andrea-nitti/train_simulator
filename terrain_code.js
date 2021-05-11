//Funzione per creare il terreno della ferrovia
function createTerrain(scene) {
    const chunk_size = 32;    
    let arrayOfTerrainMeshes = [];
    
    //creazione binari e terreno
    terrain_chunk.forEach(x => {
        let parteTerreno = x.clone('terrain_chunk');
        parteTerreno.position.z = 3.5 * 32;
        arrayOfTerrainMeshes.push(parteTerreno);
    });
    
    for(let i=0; i<8; i++) {   //numero di chunk da generare per ogni segmento
        z_offset = i * chunk_size;
        
        //creazione pali
        if(z_offset % (4*chunk_size) == 0) {  //creo i pali ogni 5 chunks
            for(let x_offset=-8; x_offset<=8; x_offset+=16) {
                wire.forEach(x => {
                    let filo_sup = x.clone('wire');
                    filo_sup.position.x = x_offset;
                    filo_sup.position.y = 38;
                    filo_sup.position.z = z_offset + 2 * chunk_size;
                    arrayOfTerrainMeshes.push(filo_sup);
                });
            }
            leftPole.forEach(x => {
                let partePalo = x.clone('palo');
                partePalo.position.x = -24;
                partePalo.position.z = z_offset;
                arrayOfTerrainMeshes.push(partePalo);
            });
            rightPole.forEach(x => {
                let partePalo = x.clone('palo');
                partePalo.position.x = +24;
                partePalo.position.z = z_offset;
                arrayOfTerrainMeshes.push(partePalo);
            });
        }
        
        //creazione fili
        for(let x_offset = -8; x_offset<=8; x_offset+=16) {
            let filo_inf = BABYLON.MeshBuilder.CreateCylinder('filo_inf', {height: chunk_size, diameter: 0.25}, scene); //filo inferiore della linea aerea
            filo_inf.material = colnero;
            filo_inf.rotation.x = Math.PI/2;
            filo_inf.position.x = x_offset;
            filo_inf.position.y = 27.75;
            filo_inf.position.z = z_offset;
            arrayOfTerrainMeshes.push(filo_inf);
            let tirante = BABYLON.MeshBuilder.CreateCylinder('tirante2', {height: chunk_size, diameter: 0.35}, scene);  //tirante situato tra ogni palo ed il successivo
            tirante.material = metal;
            tirante.rotation.x = Math.PI/2;
            if(x_offset < 0) tirante.position.x = -24;
            else tirante.position.x = 24;
            tirante.position.y = 22.5;
            tirante.position.z = z_offset;
            arrayOfTerrainMeshes.push(tirante);
        }
        
        //creazione ringhiera (se non sono presenti stazioni)
        for(let x_offset=-48; x_offset<=48; x_offset+=96) {
            ringhiera.forEach(x => {
                let parteRinghiera = x.clone('ringhiera');
                parteRinghiera.position.x = x_offset;
                parteRinghiera.position.z = z_offset;
                arrayOfTerrainMeshes.push(parteRinghiera);
            });
        }
    }
    var terrainMesh = BABYLON.Mesh.MergeMeshes(arrayOfTerrainMeshes, true, true, undefined, false, true);   //mesh che raggruppa un intero blocco di terreno (per motivi di efficienza)
    return terrainMesh;
}
