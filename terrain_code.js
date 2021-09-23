"use strict";
//Funzione per creare il terreno della ferrovia
function createTerrain(scene) {
    const chunk_size = 32;    
    const arrayOfBaseTerrainMeshes = [];
    const arrayOfDynamicTerrainMeshes = [];
    
    //creazione binari e terreno
    terrain_chunk.forEach(x => {
        const parteBinario = x.clone('terrain_chunk');
        parteBinario.position.z = 3.5 * 32;
        arrayOfBaseTerrainMeshes.push(parteBinario);
    });
    gravelPlane.forEach(x => {
        const parteTerreno = x.clone('gravelPlane');
        parteTerreno.position.z = 3.5 * 32;
        arrayOfDynamicTerrainMeshes.push(parteTerreno);
    });
    
    //creazione ringhiera
    for(let x_offset=-48; x_offset<=48; x_offset+=96) {
        ringhiera.forEach(x => {
            const parteRinghiera = x.clone('ringhiera');
            parteRinghiera.position.x = x_offset;
            parteRinghiera.position.z = 3.5 * 32;
            arrayOfDynamicTerrainMeshes.push(parteRinghiera);
        });
    }
    
    for(let i=0; i<8; i++) {    //numero di chunk da generare per ogni segmento
        let z_offset = i * chunk_size;
        
        //creazione pali
        if(z_offset % (4*chunk_size) == 0) {    //creo i pali ogni 5 chunks
            for(let x_offset=-8; x_offset<=8; x_offset+=16) {
                wire.forEach(x => {
                    const upperWire = x.clone('');
                    upperWire.position.x = x_offset;
                    upperWire.position.y = 38;
                    upperWire.position.z = z_offset + 2 * chunk_size;
                    arrayOfBaseTerrainMeshes.push(upperWire);
                });
            }
            leftPole.forEach(x => {
                const polePiece = x.clone('');
                polePiece.position.x = -24;
                polePiece.position.z = z_offset;
                arrayOfBaseTerrainMeshes.push(polePiece);
            });
            rightPole.forEach(x => {
                const polePiece = x.clone('');
                polePiece.position.x = +24;
                polePiece.position.z = z_offset;
                arrayOfBaseTerrainMeshes.push(polePiece);
            });
        }
        
        //creazione fili
        for(let x_offset = -8; x_offset<=8; x_offset+=16) {
            const lowerWire = BABYLON.MeshBuilder.CreateCylinder('lowerWire', {height: chunk_size, diameter: 0.25}, scene); //filo inferiore della linea aerea
            lowerWire.material = colnero;
            lowerWire.rotation.x = Math.PI/2;
            lowerWire.position.x = x_offset;
            lowerWire.position.y = 27.75;
            lowerWire.position.z = z_offset;
            arrayOfBaseTerrainMeshes.push(lowerWire);
            const tieRod = BABYLON.MeshBuilder.CreateCylinder('tieRod', {height: chunk_size, diameter: 0.35}, scene);   //tieRod situato tra ogni palo ed il successivo
            tieRod.material = metal;
            tieRod.rotation.x = Math.PI/2;
            if(x_offset < 0) tieRod.position.x = -24;
            else tieRod.position.x = 24;
            tieRod.position.y = 22.5;
            tieRod.position.z = z_offset;
            arrayOfBaseTerrainMeshes.push(tieRod);
        }
    }
    const baseTerrainMesh = BABYLON.Mesh.MergeMeshes(arrayOfBaseTerrainMeshes, true, true, undefined, false, true); //mesh che raggruppa un intero blocco di terreno (per motivi di efficienza)
    const dynamicTerrainMesh = BABYLON.Mesh.MergeMeshes(arrayOfDynamicTerrainMeshes, true, true, undefined, false, true);
    return {railRoad: baseTerrainMesh, terrain: dynamicTerrainMesh};
}

//Funzione per creare un ponte
function createBridge(skybox, scene) {
    const arrayOfBridgeMeshes = [];
    for(let i=0; i<=512; i+=512) {
        ponte1.forEach(x => {
            const bridgePart = x.clone('');
            bridgePart.position.z = 1008 + i;
            if(i == 0) bridgePart.rotation.y = Math.PI;
            arrayOfBridgeMeshes.push(bridgePart);
        });
    }
    const river = BABYLON.MeshBuilder.CreatePlane('river', {width: 1184, height: 975}, scene);
    river.rotation.x = Math.PI/2;
    river.position.y = -80;
    river.position.z = 1264;
    const riverGround = BABYLON.MeshBuilder.CreatePlane('riverGround', {width: 1184, height: 975}, scene);
    riverGround.rotation.x = Math.PI/2;
    riverGround.position.y = -82.5;
    riverGround.position.z = 1264;
    const riverGroundMaterial = new BABYLON.StandardMaterial('riverGround', scene);
    riverGroundMaterial.diffuseTexture = new BABYLON.Texture('./assets/textures/riverGround.jpg', scene);
    riverGroundMaterial.diffuseTexture.uScale = riverGroundMaterial.diffuseTexture.vScale = 4;
    const water = new BABYLON.WaterMaterial('water', scene);
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
    const bridgeMesh = BABYLON.Mesh.MergeMeshes(arrayOfBridgeMeshes, true, true, undefined, false, true);
    return bridgeMesh;
}
