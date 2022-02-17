"use strict";
let blackColor, metal, concrete, bricks, hv, station_roof_1, station_roof_2, ground, bricks_rotated, grass, moonSurface;

function initializeColors(scene) {
    blackColor = new BABYLON.StandardMaterial('blackColor', scene);
    blackColor.diffuseColor = new BABYLON.Color3(0.078, 0.078, 0.078);
    metal = new BABYLON.StandardMaterial('metal', scene);
    metal.diffuseColor = new BABYLON.Color3(0.447, 0.474, 0.447);
    concrete = new BABYLON.StandardMaterial('concrete', scene);
    concrete.diffuseTexture = new BABYLON.Texture("./assets/models/concrete.jpg", scene);
    concrete.zOffset = -2;
    bricks_rotated = new BABYLON.StandardMaterial('bricks', scene);
    bricks_rotated.diffuseTexture = new BABYLON.Texture("./assets/textures/bricks-rotated.jpg", scene);
    bricks_rotated.diffuseTexture.uScale = 4;
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
    grass = new BABYLON.StandardMaterial('grass', scene);
    grass.diffuseTexture = new BABYLON.Texture("./assets/textures/erba.jpg", scene);
    grass.zOffset = -3;
    moonSurface = new BABYLON.StandardMaterial('moonSurface', scene);
    moonSurface.diffuseTexture = new BABYLON.Texture("./assets/textures/moon_surface.jpg", scene);
    moonSurface.emissiveColor = new BABYLON.Color3(0.6, 0.6, 0.6);
    [blackColor, metal, concrete, bricks, hv, station_roof_1, station_roof_2, ground, bricks_rotated, grass, moonSurface].forEach(material => {material.freeze();} );
}
