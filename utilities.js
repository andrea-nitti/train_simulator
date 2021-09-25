//Funzione per mostrare i tre assi di riferimento
function createAxis(scene) {
    const axisParentMesh = new BABYLON.MeshBuilder.CreateBox('axisParentMesh', {size: 1}, scene);
    axisParentMesh.isVisible = false;
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
    xAxis.setParent(axisParentMesh);
    yAxis.setParent(axisParentMesh);
    zAxis.setParent(axisParentMesh);
    axisParentMesh.setEnabled(false);
    return axisParentMesh;
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
