//Funzioni per radunare tutti i colori e poterli richiamare a propria scelta
let colgrigio, colrosso, colnero, metal, giallo, cemento, bricks, hv, station_roof_1, station_roof_2, ground, bricks_rotated, palazzo, erba, wall, campo;

function inizializzaColori(scene) {
    colgrigio = new BABYLON.StandardMaterial('grigio', scene); //0
    colgrigio.diffuseColor = new BABYLON.Color3(0.702, 0.702, 0.702);
    colrosso = new BABYLON.StandardMaterial('rosso', scene); //1
    colrosso.diffuseColor = new BABYLON.Color3(1, 0.176, 0.176);
    colnero = new BABYLON.StandardMaterial('nero', scene); //2
    colnero.diffuseColor = new BABYLON.Color3(0.078, 0.078, 0.078);
    metal = new BABYLON.StandardMaterial('metal', scene); //3
    metal.diffuseColor = new BABYLON.Color3(0.447, 0.474, 0.447);
    giallo = new BABYLON.StandardMaterial('giallo', scene); 
    giallo.diffuseColor = new BABYLON.Color3(1, 1, 0);
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
    campo = new BABYLON.StandardMaterial('campo', scene);
    campo.diffuseTexture = new BABYLON.Texture("./assets/textures/campo3.jpg", scene);
}

function colori(scene, numerocol) {
    if (numerocol == 0) {
      return colgrigio;
    } else if (numerocol == 1) {
      return colrosso;
    } else if (numerocol == 2) {
      return colnero;
    }
}
