//Funzioni per radunare tutti i colori e poterli richiamare a propria scelta
let colgrigio, colrosso, colnero, metal, gravel, rusted_steel, giallo, cemento, alluminio, porcellana, bricks;

function inizializzaColori(scene) {
    colgrigio = new BABYLON.StandardMaterial('grigio', scene); //0
    colgrigio.diffuseColor = new BABYLON.Color3(0.702, 0.702, 0.702);
    colrosso = new BABYLON.StandardMaterial('rosso', scene); //1
    colrosso.diffuseColor = new BABYLON.Color3(1, 0.176, 0.176);
    colnero = new BABYLON.StandardMaterial('nero', scene); //2
    colnero.diffuseColor = new BABYLON.Color3(0.078, 0.078, 0.078);
    metal = new BABYLON.StandardMaterial('metal', scene); //3
    metal.diffuseColor = new BABYLON.Color3(0.447, 0.474, 0.447);
    wood = new BABYLON.StandardMaterial('wood', scene); //4
    //wood.diffuseColor = new BABYLON.Color3(0.478, 0.356, 0.219);
    wood.diffuseTexture = new BABYLON.Texture("./assets/textures/wood.png", scene);
    gravel = new BABYLON.StandardMaterial('gravel', scene); //5
    //gravel.diffuseColor = new BABYLON.Color3(0.560, 0.619, 0.572);
    gravel.diffuseTexture = new BABYLON.Texture("./assets/textures/ghiaia1.jpg", scene);
    rusted_steel = new BABYLON.StandardMaterial('rusted_steel', scene); //6
    rusted_steel.diffuseColor = new BABYLON.Color3(0.718, 0.255, 0.055);
    rusted_steel.specularColor = new BABYLON.Color3(0, 0, 0);   //rimuovo il riflesso
    giallo = new BABYLON.StandardMaterial('giallo', scene); //7
    giallo.diffuseColor = new BABYLON.Color3(1, 1, 0);
    cemento = new BABYLON.StandardMaterial('cemento', scene); //8
    cemento.diffuseColor = new BABYLON.Color3(0.373, 0.373, 0.373);
    alluminio = new BABYLON.StandardMaterial('alluminio', scene); //9
    alluminio.diffuseColor = new BABYLON.Color3(0.635, 0.635, 0.635);
    porcellana = new BABYLON.StandardMaterial('porcellana', scene); //10
    porcellana.diffuseColor = new BABYLON.Color3(0.317, 0.219, 0.121);
    porcellana.specularColor = new BABYLON.Color3(0, 0, 0);
    bricks = new BABYLON.StandardMaterial('bricks', scene); //11
    bricks.diffuseTexture = new BABYLON.Texture("./assets/textures/bricks.jpg", scene);
    hv = new BABYLON.StandardMaterial('hv', scene); //12
    hv.diffuseTexture = new BABYLON.Texture("./assets/textures/hv.png", scene);
    hv.specularColor = new BABYLON.Color3(0, 0, 0);
}
    
function colori(scene, numerocol) {
    if (numerocol == 0) {
      return colgrigio;
    } else if (numerocol == 1) {
      return colrosso;
    } else if (numerocol == 2) {
      return colnero;
    } else if (numerocol == 3) {
      return metal;
    } else if (numerocol == 4) {
      return wood;
    } else if (numerocol == 5) {
      return gravel;
    } else if (numerocol == 6) {
      return rusted_steel;
    } else if (numerocol == 7) {
      return giallo;
    } else if (numerocol == 8) {
      return cemento;
    } else if (numerocol == 9) {
      return alluminio;
    } else if (numerocol == 10) {
      return porcellana;
    } else if (numerocol == 11) {
      return bricks;
    } else if (numerocol == 12) {
      return hv;
    }
}
