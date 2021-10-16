"use strict";
function createAxis(scene) {
    const axisParentNode = new BABYLON.TransformNode('axisParentNode', scene);
    const xAxis = BABYLON.Mesh.CreateLines('xAxis', [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(5, 0, 0), new BABYLON.Vector3(5 * 0.95, 0.05 * 5, 0), new BABYLON.Vector3(5, 0, 0), new BABYLON.Vector3(5 * 0.95, -0.05 * 5, 0)], scene);
    const yAxis = BABYLON.Mesh.CreateLines('yAxis', [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 5, 0), new BABYLON.Vector3(-0.05 * 5, 5 * 0.95, 0), new BABYLON.Vector3(0, 5, 0), new BABYLON.Vector3(0.05 * 5, 5 * 0.95, 0)], scene);
    const zAxis = BABYLON.Mesh.CreateLines('zAxis', [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, 5), new BABYLON.Vector3(0 , -0.05 * 5, 5 * 0.95), new BABYLON.Vector3(0, 0, 5), new BABYLON.Vector3(0, 0.05 * 5, 5 * 0.95)], scene);
    xAxis.enableEdgesRendering();
    yAxis.enableEdgesRendering();
    zAxis.enableEdgesRendering();
    xAxis.edgesWidth = 5;
    yAxis.edgesWidth = 5;
    zAxis.edgesWidth = 5;
    xAxis.edgesColor = new BABYLON.Color4(1, 0, 0, 1);
    yAxis.edgesColor = new BABYLON.Color4(0, 1, 0, 1);
    zAxis.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
    const xLabel = createAxisLabel("X", "#FF0000", scene);
    const yLabel = createAxisLabel("Y", "#00FF00", scene);
    const zLabel = createAxisLabel("Z", "#0000FF", scene);
    xLabel.position = new BABYLON.Vector3(0.9 * 5, -0.05 * 5, 0);
    yLabel.position = new BABYLON.Vector3(0, 0.9 * 5, -0.05 * 5);
    zLabel.position = new BABYLON.Vector3(0, 0.05 * 5, 0.9 * 5);
    xLabel.setParent(xAxis);
    yLabel.setParent(yAxis);
    zLabel.setParent(zAxis);
    xAxis.setParent(axisParentNode);
    yAxis.setParent(axisParentNode);
    zAxis.setParent(axisParentNode);
    axisParentNode.setEnabled(false);
    return axisParentNode;
}

function createAxisLabel(letter, color, scene) {
    const axisLabelDynamicTexture = new BABYLON.DynamicTexture('axisLabelDynamicTexture', {width: 50, height: 50}, scene);
    axisLabelDynamicTexture.hasAlpha = true;
    axisLabelDynamicTexture.drawText(letter, 5, 40, "bold 36px Arial", color, "transparent");
    const axisLabelPlane = new BABYLON.Mesh.CreatePlane('axisLabelPlane', 0.5, scene);
    axisLabelPlane.material = new BABYLON.StandardMaterial('axisLabelMaterial', scene);
    axisLabelPlane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    axisLabelPlane.material.backFaceCulling = false;
    axisLabelPlane.material.diffuseTexture = axisLabelDynamicTexture;
    return axisLabelPlane;
}

function checkIntersections(posA, lenghtA, posB, lenghtB) { //posA e posB sono le posizioni centrali degli oggetti
    const pointA = posA - lenghtA / 2;
    const pointB = posA + lenghtA / 2;
    const pointC = posB - lenghtB / 2;
    const pointD = posB + lenghtB / 2;
    return !((pointD <= pointA) || (pointC >= pointB)); //true = esiste intersezione
}

function allWireframe(status) { //status --> boolean
    [colnero, metal, cemento, bricks, hv, station_roof_1, station_roof_2, ground, bricks_rotated, erba, moonSurface].forEach(material => {
        material.wireframe = status;
    });
    [wire, terrain_chunk, gravelPlane, ponte1, ringhiera, leftPole, rightPole, casa, palazzo, albero1, albero2, stazione0, carrozza, carrovuoto, locomotore].forEach(model => {
        model.forEach(modelPiece => {
            modelPiece.material.wireframe = status;
        });
    });
}

function checkDebugCodes(event) {
    if(event.shiftKey) {
        switch(event.keyCode) {
            case 49: allWireframe(true); break;
            case 50: allWireframe(false); break;
            case 51: velocita = 100; break;
            case 52: velocita = -10000; break;
            case 53: velocita += 25; break;
            case 54: spazio += 1000000; break;  //case 54: spazio = Number.MAX_VALUE; break;
        }
    }
}
