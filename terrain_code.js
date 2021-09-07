"use strict";
//Funzione per creare il terreno della ferrovia
function createTerrain(scene) {
    const chunk_size = 32;    
    let arrayOfBaseTerrainMeshes = [];
    let arrayOfDynamicTerrainMeshes = [];
    
    //creazione binari e terreno
    terrain_chunk.forEach(x => {
        let parteBinario = x.clone('terrain_chunk');
        parteBinario.position.z = 3.5 * 32;
        arrayOfBaseTerrainMeshes.push(parteBinario);
    });
    gravelPlane.forEach(x => {
        let parteTerreno = x.clone('gravelPlane');
        parteTerreno.position.z = 3.5 * 32;
        arrayOfDynamicTerrainMeshes.push(parteTerreno);
    });
    
    //creazione ringhiera
    for(let x_offset=-48; x_offset<=48; x_offset+=96) {
        ringhiera.forEach(x => {
            let parteRinghiera = x.clone('ringhiera');
            parteRinghiera.position.x = x_offset;
            parteRinghiera.position.z = 3.5 * 32;
            arrayOfDynamicTerrainMeshes.push(parteRinghiera);
        });
    }
    
    for(let i=0; i<8; i++) {   //numero di chunk da generare per ogni segmento
        let z_offset = i * chunk_size;
        
        //creazione pali
        if(z_offset % (4*chunk_size) == 0) {  //creo i pali ogni 5 chunks
            for(let x_offset=-8; x_offset<=8; x_offset+=16) {
                wire.forEach(x => {
                    let filo_sup = x.clone('wire');
                    filo_sup.position.x = x_offset;
                    filo_sup.position.y = 38;
                    filo_sup.position.z = z_offset + 2 * chunk_size;
                    arrayOfBaseTerrainMeshes.push(filo_sup);
                });
            }
            leftPole.forEach(x => {
                let partePalo = x.clone('palo');
                partePalo.position.x = -24;
                partePalo.position.z = z_offset;
                arrayOfBaseTerrainMeshes.push(partePalo);
            });
            rightPole.forEach(x => {
                let partePalo = x.clone('palo');
                partePalo.position.x = +24;
                partePalo.position.z = z_offset;
                arrayOfBaseTerrainMeshes.push(partePalo);
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
            arrayOfBaseTerrainMeshes.push(filo_inf);
            let tirante = BABYLON.MeshBuilder.CreateCylinder('tirante2', {height: chunk_size, diameter: 0.35}, scene);  //tirante situato tra ogni palo ed il successivo
            tirante.material = metal;
            tirante.rotation.x = Math.PI/2;
            if(x_offset < 0) tirante.position.x = -24;
            else tirante.position.x = 24;
            tirante.position.y = 22.5;
            tirante.position.z = z_offset;
            arrayOfBaseTerrainMeshes.push(tirante);
        }
    }
    var baseTerrainMesh = BABYLON.Mesh.MergeMeshes(arrayOfBaseTerrainMeshes, true, true, undefined, false, true);   //mesh che raggruppa un intero blocco di terreno (per motivi di efficienza)
    var dynamicTerrainMesh = BABYLON.Mesh.MergeMeshes(arrayOfDynamicTerrainMeshes, true, true, undefined, false, true);
    return {railRoad: baseTerrainMesh, terrain: dynamicTerrainMesh};
}

//Funzione per creare un ponte
function createBridge(skybox, scene) {
    let arrayOfBridgeMeshes = [];
    for(let i=0; i<=512; i+=512) {
        ponte1.forEach(x => {
            let partePonte = x.clone('ponte1');
            partePonte.position.z = 1008 + i;
            if(i == 0) partePonte.rotation.y = Math.PI;
            arrayOfBridgeMeshes.push(partePonte);
        });
    }
    let river = BABYLON.MeshBuilder.CreatePlane('river', {size: 975}, scene);
    river.rotation.x = Math.PI/2;
    river.position.y = -80;
    river.position.z = 1264;
    let riverGround = BABYLON.MeshBuilder.CreatePlane('riverGround', {size: 975}, scene);
    riverGround.rotation.x = Math.PI/2;
    riverGround.position.y = -82.5;
    riverGround.position.z = 1264;
    let riverGroundMaterial = new BABYLON.StandardMaterial('riverGround', scene);
    riverGroundMaterial.diffuseTexture = new BABYLON.Texture('./assets/textures/riverGround.jpg', scene);
    riverGroundMaterial.diffuseTexture.uScale = riverGroundMaterial.diffuseTexture.vScale = 4;
    let water = new BABYLON.WaterMaterial('water', scene);
    water.backFaceCulling = true;
    water.bumpTexture = new BABYLON.Texture('./assets/textures/water.png', scene);
    water.windForce = 25;
    water.waveHeight = 0.5;    
    water.bumpHeight = 0.5;
    water.windDirection = new BABYLON.Vector2(-5, 0);
    water.waterColor = new BABYLON.Color3(0, 0, 0.867);
    water.colorBlendFactor = 0.15;
    water.addToRenderList(skybox);
    water.addToRenderList(riverGround);
    river.material = water;
    riverGround.material = riverGroundMaterial;
    water.freeze();
    arrayOfBridgeMeshes.push(river);
    arrayOfBridgeMeshes.push(riverGround);
    var bridgeMesh = BABYLON.Mesh.MergeMeshes(arrayOfBridgeMeshes, true, true, undefined, false, true);
    return bridgeMesh;
}
