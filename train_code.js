//////////////////////////// ! ! ! ! ! ZONA TRENO ! ! ! ! ! ////////////////////////////

//////////////////////////// ! ! ! ! ! ZONA TRENO ! ! ! ! ! ////////////////////////////

//////////////////////////// ! ! ! ! ! ZONA TRENO ! ! ! ! ! ////////////////////////////

function treno(scene) {
    carrozza(scene, 8, 100);
    carrozza(scene, 8, 170);
    locomotiva(scene, 8, 30, 3, -3, 33, Math.PI/16*5.7);
    locomotiva(scene, 8, 240, -3, 3, -33, Math.PI/16*10.3);
}

function locomotiva(scene, posx, posz, avaoind, avaoind2, avaoind3, rotazione) {

    centro(scene, posx, posz+avaoind, colori(scene, 2), 60);

    spigoli(scene, posx+1, 10.5, posz+avaoind, colori(scene, 1), 60);
    spigoli(scene, posx-1, 10.5, posz+avaoind, colori(scene, 1), 60);
    spigoli(scene, posx+1, 4.5, posz+avaoind2, colori(scene, 0), 72);
    spigoli(scene, posx-1, 4.5, posz+avaoind2, colori(scene, 0), 72);

    tettofondo(scene, posx, 3, posz+avaoind2, colori(scene, 0), 72);
    tettofondo(scene, posx, 12, posz+avaoind, colori(scene, 1), 60);

    ruota(scene, posx-2, posz-25, colori(scene, 2));
    ruota(scene, posx-2, posz-15, colori(scene, 2));
    ruota(scene, posx+2, posz-25, colori(scene, 2));
    ruota(scene, posx+2, posz-15, colori(scene, 2));
    ruota(scene, posx-2, posz+15, colori(scene, 2));
    ruota(scene, posx-2, posz+25, colori(scene, 2));
    ruota(scene, posx+2, posz+15, colori(scene, 2));
    ruota(scene, posx+2, posz+25, colori(scene, 2));

    musocen(scene, posx, posz-avaoind3, colori(scene, 1), rotazione);
    musolat(scene, posx+4, posz-avaoind3, colori(scene, 1));
    musolat(scene, posx-4, posz-avaoind3, colori(scene, 1));

}

function carrozza(scene, posx, posz) {

    centro(scene, posx, posz, colori(scene, 2), 66);

    spigoli(scene, posx+1, 10.5, posz, colori(scene, 1), 66);
    spigoli(scene, posx-1, 10.5, posz, colori(scene, 1), 66);
    spigoli(scene, posx+1, 4.5, posz, colori(scene, 0), 66);
    spigoli(scene, posx-1, 4.5, posz, colori(scene, 0), 66);

    tettofondo(scene, posx, 3, posz, colori(scene, 0), 66);
    tettofondo(scene, posx, 12, posz, colori(scene, 1), 66);

    ruota(scene, posx-2, posz-25, colori(scene, 2));
    ruota(scene, posx-2, posz-15, colori(scene, 2));
    ruota(scene, posx+2, posz-25, colori(scene, 2));
    ruota(scene, posx+2, posz-15, colori(scene, 2));
    ruota(scene, posx-2, posz+15, colori(scene, 2));
    ruota(scene, posx-2, posz+25, colori(scene, 2));
    ruota(scene, posx+2, posz+15, colori(scene, 2));
    ruota(scene, posx+2, posz+25, colori(scene, 2));

}

function ruota(scene, posx, posz, colore) {
    var ruota = BABYLON.MeshBuilder.CreateCylinder('ruota', {height: 0.4, diameter: 2}, scene);
    ruota.rotation.z = Math.PI/2;
    ruota.position.x = posx;
    ruota.position.y = 1.55;
    ruota.position.z = posz;
    ruota.material = colore;
}

function centro(scene, posx, posz, colore, lunghezza) {
    var carrozzacentro = BABYLON.MeshBuilder.CreateBox('carrozzacentro', {width: 8, height: 6, depth: lunghezza}, scene);
    carrozzacentro.position.x = posx;
    carrozzacentro.position.y = 7.5;
    carrozzacentro.position.z = posz;
    carrozzacentro.material = colore;
}

function tettofondo(scene, posx, posy, posz, colore, lunghezza) {
    var tettofondo = BABYLON.MeshBuilder.CreateBox('tettofondo', {width: 2, height: 3, depth: lunghezza}, scene);
    tettofondo.position.x = posx;
    tettofondo.position.y = posy;
    tettofondo.position.z = posz;
    tettofondo.material = colore;
}

function spigoli(scene, posx, posy, posz, colore, lunghezza) {
    var spigoli = BABYLON.MeshBuilder.CreateCylinder('spigoli', {height: lunghezza, diameter: 6}, scene);
    spigoli.rotation.x = Math.PI/2;
    spigoli.position.x = posx;
    spigoli.position.y = posy;
    spigoli.position.z = posz;
    spigoli.material = colore;
}

function musocen(scene, posx, posz, colore, rotazione) {
    var musocen = BABYLON.MeshBuilder.CreateBox('musocen', {height: 13.5, width: 8, depth: 0.1}, scene);
    musocen.rotation.x = rotazione;
    musocen.position.x = posx;
    musocen.position.y = 10.5;
    musocen.position.z = posz;
    musocen.material = colore;
}

function musolat(scene, posx, posz, colore) {
    var musolat = BABYLON.MeshBuilder.CreateBox('musocen', {height: 12, width: 3, depth: 0.1}, scene);
    musolat.rotation.z = Math.PI/2;
    musolat.rotation.y = Math.PI/2;
    musolat.position.x = posx;
    musolat.position.y = 6;
    musolat.position.z = posz;
    musolat.material = colore;
}

function train(scene) {
    arrayOfTrainMeshes = [];
    carrozza.forEach(x => {
        let parteTreno = x.clone('carrozza');
        parteTreno.position.x = 8;
        //parteTreno.material.wireframe = true;
        arrayOfTrainMeshes.push(parteTreno);
        if(parteTreno.material.diffuseTexture != null) {
            parteTreno.material.diffuseTexture.hasAlpha = true;
            //parteTreno.material.useAlphaFromDiffuseTexture = true;
            parteTreno.material.backFaceCulling = false;
        }
    });
    carrovuoto.forEach(x => {
        let parteCarro = x.clone('carrovuoto');
        parteCarro.position.x = 8;
        parteCarro.position.z = 70;
        arrayOfTrainMeshes.push(parteCarro);
    });
    var trainMesh = BABYLON.Mesh.MergeMeshes(arrayOfTrainMeshes, true, true, undefined, false, true);
    return trainMesh;
}
