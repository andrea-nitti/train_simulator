//Funzioni per radunare tutti i colori e poterli richiamare a propria scelta
let colgrigio, colrosso, colnero, metal, gravel, rusted_steel, giallo, cemento, alluminio, porcellana, bricks, hv, station_roof_1, station_roof_2, ground, bricks_rotated, palazzo, erba, wall, campo;

function inizializzaColori(scene) {
    colgrigio = new BABYLON.StandardMaterial('grigio', scene); //0
    colgrigio.diffuseColor = new BABYLON.Color3(0.702, 0.702, 0.702);
    colrosso = new BABYLON.StandardMaterial('rosso', scene); //1
    colrosso.diffuseColor = new BABYLON.Color3(1, 0.176, 0.176);
    colnero = new BABYLON.StandardMaterial('nero', scene); //2
    colnero.diffuseColor = new BABYLON.Color3(0.078, 0.078, 0.078);
    metal = new BABYLON.StandardMaterial('metal', scene); //3
    metal.diffuseColor = new BABYLON.Color3(0.447, 0.474, 0.447);
    wood = new BABYLON.StandardMaterial('wood', scene);
    wood.diffuseTexture = new BABYLON.Texture("./assets/textures/wood.png", scene);
    gravel = new BABYLON.StandardMaterial('gravel', scene);
    gravel.diffuseTexture = new BABYLON.Texture("./assets/textures/ghiaia1.jpg", scene);
    rusted_steel = new BABYLON.StandardMaterial('rusted_steel', scene);
    rusted_steel.diffuseColor = new BABYLON.Color3(0.718, 0.255, 0.055);
    rusted_steel.specularColor = new BABYLON.Color3(0, 0, 0);   //rimuovo il riflesso
    giallo = new BABYLON.StandardMaterial('giallo', scene); 
    giallo.diffuseColor = new BABYLON.Color3(1, 1, 0);
    cemento = new BABYLON.StandardMaterial('cemento', scene);
    cemento.diffuseColor = new BABYLON.Color3(0.373, 0.373, 0.373);
    cemento.specularColor = new BABYLON.Color3(0, 0, 0);
    alluminio = new BABYLON.StandardMaterial('alluminio', scene);
    alluminio.diffuseColor = new BABYLON.Color3(0.635, 0.635, 0.635);
    porcellana = new BABYLON.StandardMaterial('porcellana', scene);
    porcellana.diffuseColor = new BABYLON.Color3(0.317, 0.219, 0.121);
    porcellana.specularColor = new BABYLON.Color3(0, 0, 0);
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
    fogliame = new BABYLON.StandardMaterial('fogliame', scene);
    fogliame.diffuseTexture = new BABYLON.Texture("./assets/textures/pine1.jpg", scene);
    palazzo = new BABYLON.StandardMaterial('palazzo', scene);
    palazzo.diffuseTexture = new BABYLON.Texture("./assets/textures/palazzo.jpg", scene);
    erba = new BABYLON.StandardMaterial('erba', scene);
    erba.diffuseColor = new BABYLON.Color3(0.078, 0.760, 0.145);
    wall = new BABYLON.StandardMaterial('wall', scene);
    wall.diffuseTexture = new BABYLON.Texture("./assets/textures/wall.jpg", scene);
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
