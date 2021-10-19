"use strict";
function createNormalTrain() {
    const arrayOfTrainMeshes = [];
    for(let i=0; i<9; i++) vagone(-8, i * 70, arrayOfTrainMeshes);
    locomotiva(-8, 9 * 70 - 5, arrayOfTrainMeshes);
    const trainMesh = BABYLON.Mesh.MergeMeshes(arrayOfTrainMeshes, true, true, undefined, false, true);
    return trainMesh;
}

function createContainerTrainFirstType() {
    const arrayOfTrainMeshes = [];
    for(let i=0; i<30; i++) {
        carro(8, i*67.6, arrayOfTrainMeshes);
        cargo(container1, 8, 10, i*67.6, arrayOfTrainMeshes);
    }
    const trainMesh = BABYLON.Mesh.MergeMeshes(arrayOfTrainMeshes, true, true, undefined, false, true);
    return trainMesh;
}

/*function createContainerTrainSecondType() {   //model bug
    const arrayOfTrainMeshes = [];
    for(let i=0; i<22; i++) {
        carro(8, i*67.6, arrayOfTrainMeshes);
        cargo(container2, 8, 12.5, i*67.6, arrayOfTrainMeshes);
    }
    const trainMesh = BABYLON.Mesh.MergeMeshes(arrayOfTrainMeshes, true, true, undefined, false, true);
    return trainMesh;
}*/

function createTankTrainFirstType() {
    const arrayOfTrainMeshes = [];
    for(let i=0; i<8; i++) {
        carro(8, i*67.6, arrayOfTrainMeshes);
        cargo(cisterna1, 8, 9, i*67.6, arrayOfTrainMeshes);
    }
    const trainMesh = BABYLON.Mesh.MergeMeshes(arrayOfTrainMeshes, true, true, undefined, false, true);
    return trainMesh;
}

function createTankTrainSecondType(scene) {
    const cargoTrainParentNode = new BABYLON.TransformNode('cargoTrainParentNode', scene);
    const flatWagonArray = [];
    const cargoArray = [];
    for(let i=0; i<25; i++) {
        flatWagonArray.push(BABYLON.Matrix.Translation(8, 0, i * 67.6));
        if(Math.random() < 0.25) cargoArray.push(BABYLON.Matrix.Translation(8, 10.5, i * 67.6));
    }
    const flatWagon = carro();
    const secondTank = cargo(cisterna2);
    flatWagon.setParent(cargoTrainParentNode);
    secondTank.setParent(cargoTrainParentNode);
    secondTank.thinInstanceAdd(cargoArray);
    flatWagon.thinInstanceAdd(flatWagonArray);
    return cargoTrainParentNode;
}

function vagone(posx, posz, arrayOfTrainMeshes) {
    carrozza.forEach(x => {
        const parteCarrozza = x.clone('carrozza');
        parteCarrozza.position.x = posx;
        parteCarrozza.position.z = posz;
        arrayOfTrainMeshes.push(parteCarrozza);
        if(parteCarrozza.material.diffuseTexture != null) {
            parteCarrozza.material.diffuseTexture.hasAlpha = true;
            //parteCarrozza.material.useAlphaFromDiffuseTexture = true;
            parteCarrozza.material.backFaceCulling = false;
        }
    });
}

function carro() {
    const arrayOfFlatWagonMeshes = [];
    carrovuoto.forEach(x => {
        const flatWagonSegment = x.clone('flatWagonSegment');
        arrayOfFlatWagonMeshes.push(flatWagonSegment);
    });
    const flatWagonMesh = BABYLON.Mesh.MergeMeshes(arrayOfFlatWagonMeshes, true, true, undefined, false, true);
    flatWagonMesh.alwaysSelectAsActiveMesh = true;
    return flatWagonMesh;
}

function cargo(type) {
    const arrayOfCargoMeshes = [];
    type.forEach(x => {
        const cargoSegment = x.clone('cargoSegment');
        arrayOfCargoMeshes.push(cargoSegment);
    });
    const cargoMesh = BABYLON.Mesh.MergeMeshes(arrayOfCargoMeshes, true, true, undefined, false, true);
    cargoMesh.alwaysSelectAsActiveMesh = true;
    return cargoMesh;
}

function locomotiva(posx, posz, arrayOfTrainMeshes) {
    locomotore.forEach(x => {
        const parteLocomotore = x.clone('locomotore');
        parteLocomotore.position.x = posx;
        parteLocomotore.position.z = posz;
        arrayOfTrainMeshes.push(parteLocomotore);
        if(parteLocomotore.material.diffuseTexture != null) {
            parteLocomotore.material.diffuseTexture.hasAlpha = true;
            //parteLocomotore.material.useAlphaFromDiffuseTexture = true;
            parteLocomotore.material.backFaceCulling = false;
        }
    });
}
