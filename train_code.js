"use strict";
function createNormalTrain() {
    const arrayOfTrainMeshes = [];
    for(let i=0; i<9; i++) convertModelToMesh(carrozza, arrayOfTrainMeshes, {positionX: -8, positionZ: i * 70, backFaceCullingStatus: false, alphaStatus: true});
    convertModelToMesh(locomotore, arrayOfTrainMeshes, {positionX: -8, positionZ: 9 * 70 - 5, backFaceCullingStatus: false, alphaStatus: true});
    const trainMesh = BABYLON.Mesh.MergeMeshes(arrayOfTrainMeshes, true, true, undefined, false, true);
    return trainMesh;
}

function createContainerTrainFirstType(scene) {
    const cargoTrainParentNode = new BABYLON.TransformNode('cargoTrainParentNode', scene);
    const flatWagonArray = [];
    const cargoArray = [];
    for(let i=0; i<30; i++) {
        flatWagonArray.push(BABYLON.Matrix.Translation(8, 0, i * 67.6));
        cargoArray.push(BABYLON.Matrix.Translation(8, 10, i * 67.6));
    }
    const flatWagon = emptyWagon();
    const firstContainer = cargo(container1);
    flatWagon.setParent(cargoTrainParentNode);
    firstContainer.setParent(cargoTrainParentNode);
    firstContainer.thinInstanceAdd(cargoArray);
    flatWagon.thinInstanceAdd(flatWagonArray);
    //return cargoTrainParentNode;
}

function createContainerTrainSecondType(scene) {
    const cargoTrainParentNode = new BABYLON.TransformNode('cargoTrainParentNode', scene);
    const flatWagonArray = [];
    const cargoArray = [];
    for(let i=0; i<22; i++) {
        flatWagonArray.push(BABYLON.Matrix.Translation(8, 0, i * 67.6));
        cargoArray.push(BABYLON.Matrix.Translation(8, 12.5, i * 67.6));
    }
    const flatWagon = emptyWagon();
    const secondContainer = cargo(container2);
    flatWagon.setParent(cargoTrainParentNode);
    secondContainer.setParent(cargoTrainParentNode);
    secondContainer.thinInstanceAdd(cargoArray);
    flatWagon.thinInstanceAdd(flatWagonArray);
    //return cargoTrainParentNode;
}

function createTankTrainFirstType(scene) {
    const cargoTrainParentNode = new BABYLON.TransformNode('cargoTrainParentNode', scene);
    const flatWagonArray = [];
    const cargoArray = [];
    for(let i=0; i<8; i++) {
        flatWagonArray.push(BABYLON.Matrix.Translation(8, 0, i * 67.6));
        cargoArray.push(BABYLON.Matrix.Translation(8, 9, i * 67.6));
    }
    const flatWagon = emptyWagon();
    const firstTank = cargo(cisterna1);
    flatWagon.setParent(cargoTrainParentNode);
    firstTank.setParent(cargoTrainParentNode);
    firstTank.thinInstanceAdd(cargoArray);
    flatWagon.thinInstanceAdd(flatWagonArray);
    //return cargoTrainParentNode;
}

function createTankTrainSecondType(scene) {
    const cargoTrainParentNode = new BABYLON.TransformNode('cargoTrainParentNode', scene);
    const flatWagonArray = [];
    const cargoArray = [];
    for(let i=0; i<25; i++) {
        flatWagonArray.push(BABYLON.Matrix.Translation(8, 0, i * 67.6));
        if(Math.random() < 0.25) cargoArray.push(BABYLON.Matrix.Translation(8, 10.5, i * 67.6));
    }
    const flatWagon = emptyWagon();
    const secondTank = cargo(cisterna2);
    flatWagon.setParent(cargoTrainParentNode);
    secondTank.setParent(cargoTrainParentNode);
    secondTank.thinInstanceAdd(cargoArray);
    flatWagon.thinInstanceAdd(flatWagonArray);
    //return cargoTrainParentNode;
}

function emptyWagon() {
    const arrayOfFlatWagonMeshes = [];
    convertModelToMesh(carrovuoto, arrayOfFlatWagonMeshes, {});
    const flatWagonMesh = BABYLON.Mesh.MergeMeshes(arrayOfFlatWagonMeshes, true, true, undefined, false, true);
    flatWagonMesh.alwaysSelectAsActiveMesh = true;
    return flatWagonMesh;
}

function cargo(type) {
    const arrayOfCargoMeshes = [];
    convertModelToMesh(type, arrayOfCargoMeshes, {});
    const cargoMesh = BABYLON.Mesh.MergeMeshes(arrayOfCargoMeshes, true, true, undefined, false, true);
    cargoMesh.alwaysSelectAsActiveMesh = true;
    return cargoMesh;
}
