"use strict";
//Funzioni per radunare tutti i colori e poterli richiamare a propria scelta
let colnero, metal, cemento, bricks, hv, station_roof_1, station_roof_2, ground, bricks_rotated, erba;

function inizializzaColori(scene) {
    colnero = new BABYLON.StandardMaterial('nero', scene);
    colnero.diffuseColor = new BABYLON.Color3(0.078, 0.078, 0.078);
    metal = new BABYLON.StandardMaterial('metal', scene);
    metal.diffuseColor = new BABYLON.Color3(0.447, 0.474, 0.447);
    cemento = new BABYLON.StandardMaterial('cemento', scene);
    cemento.diffuseTexture = new BABYLON.Texture("./assets/models/concrete.jpg", scene);
    bricks_rotated = new BABYLON.StandardMaterial('bricks', scene);
    bricks_rotated.diffuseTexture = new BABYLON.Texture("./assets/textures/bricks-rotated.jpg", scene);
    bricks = new BABYLON.StandardMaterial('bricks', scene);
    bricks.diffuseTexture = new BABYLON.Texture("./assets/textures/bricks.jpg", scene);
    hv = new BABYLON.StandardMaterial('hv', scene);
    hv.diffuseTexture = new BABYLON.Texture("./assets/textures/hv.png", scene);
    hv.specularColor = new BABYLON.Color3(0, 0, 0);
    hv.emissiveColor = new BABYLON.Color3(1, 1, 1);
    station_roof_1 = new BABYLON.StandardMaterial('station_roof_1', scene);
    station_roof_1.diffuseTexture = new BABYLON.Texture("./assets/textures/station_roof_1.jpg", scene);
    station_roof_2 = new BABYLON.StandardMaterial('station_roof_2', scene);
    station_roof_2.diffuseTexture = new BABYLON.Texture("./assets/textures/station_roof_2.jpg", scene);
    ground = new BABYLON.StandardMaterial('ground', scene);
    ground.diffuseTexture = new BABYLON.Texture("./assets/textures/ground.jpg", scene);
    erba = new BABYLON.StandardMaterial('erba', scene);
    erba.diffuseTexture = new BABYLON.Texture("./assets/textures/erba.jpg", scene);
    droplet = new BABYLON.Texture("./assets/textures/rain--2.png");
    [colnero, metal, cemento, bricks, hv, station_roof_1, station_roof_2, ground, bricks_rotated, erba].forEach(material => {material.freeze();} );
}
