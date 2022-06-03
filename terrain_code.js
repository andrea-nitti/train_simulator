"use strict";
function createTerrain(scene) {
    const chunk_size = 32;    
    const arrayOfBaseTerrainMeshes = [];
    const arrayOfDynamicTerrainMeshes = [];

    convertModelToMesh(terrainChunk, arrayOfBaseTerrainMeshes, {positionZ: 112});
    convertModelToMesh(gravelPlane, arrayOfDynamicTerrainMeshes, {positionZ: 112, materialPriority: -1});

    for(let x_offset=-48; x_offset<=48; x_offset+=96) convertModelToMesh(ringhiera, arrayOfDynamicTerrainMeshes, {positionX: x_offset, positionZ: 112});

    for(let i=0; i<8; i++) {    //number of chunks for each segment
        let z_offset = i * chunk_size;

        if(z_offset % (4*chunk_size) == 0) {    //poles are present every 5 chunks
            for(let x_offset=-8; x_offset<=8; x_offset+=16) {
                convertModelToMesh(wire, arrayOfBaseTerrainMeshes, {positionX: x_offset, positionY: 38, positionZ: z_offset + 2 * chunk_size});
            }
            convertModelToMesh(leftPole, arrayOfBaseTerrainMeshes, {positionX: -24, positionZ: z_offset});
            convertModelToMesh(rightPole, arrayOfBaseTerrainMeshes, {positionX: 24, positionZ: z_offset});
        }
    }
    for(let x_offset = -8; x_offset<=8; x_offset+=16) {
        const lowerWire = BABYLON.MeshBuilder.CreateCylinder('lowerWire', {height: 256, diameter: 0.25}, scene);
        lowerWire.material = blackColor;
        lowerWire.rotation.x = Math.PI/2;
        lowerWire.position.x = x_offset;
        lowerWire.position.y = 27.75;
        lowerWire.position.z = 3.5 * 32;
        arrayOfBaseTerrainMeshes.push(lowerWire);
        const tieRod = BABYLON.MeshBuilder.CreateCylinder('tieRod', {height: 256, diameter: 0.35}, scene);
        tieRod.material = metal;
        tieRod.rotation.x = Math.PI/2;
        if(x_offset < 0) tieRod.position.x = -24;
        else tieRod.position.x = 24;
        tieRod.position.y = 22.5;
        tieRod.position.z = 3.5 * 32;
        arrayOfBaseTerrainMeshes.push(tieRod);
    }
    const baseTerrainMesh = BABYLON.Mesh.MergeMeshes(arrayOfBaseTerrainMeshes, true, true, undefined, false, true); //this mesh is an entire terrain block
    const dynamicTerrainMesh = BABYLON.Mesh.MergeMeshes(arrayOfDynamicTerrainMeshes, true, true, undefined, false, true);
    return {railRoad: baseTerrainMesh, terrain: dynamicTerrainMesh};
}

function createBridge(skybox, scene) {
    const arrayOfBridgeMeshes = [];
    for(let i=0; i<=512; i+=512) {
        if(i == 0) convertModelToMesh(ponte1, arrayOfBridgeMeshes, {positionZ: 1008 + i, rotationY: Math.PI});
        else convertModelToMesh(ponte1, arrayOfBridgeMeshes, {positionZ: 1008 + i});
    }
    const river = BABYLON.MeshBuilder.CreatePlane('river', {width: 2208, height: 975}, scene);
    river.rotation.x = Math.PI/2;
    river.position.y = -80;
    river.position.z = 1264;
    const riverGround = BABYLON.MeshBuilder.CreatePlane('riverGround', {width: 2208, height: 975}, scene);
    riverGround.rotation.x = Math.PI/2;
    riverGround.position.y = -82.5;
    riverGround.position.z = 1264;
    const riverGroundMaterial = new BABYLON.StandardMaterial('riverGround', scene);
    riverGroundMaterial.diffuseTexture = new BABYLON.Texture('./assets/textures/riverGround.jpg', scene);
    riverGroundMaterial.diffuseTexture.uScale = riverGroundMaterial.diffuseTexture.vScale = 4;
    const water = new BABYLON.WaterMaterial('water', scene);
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
