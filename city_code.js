"use strict";
function cittaP1(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentMesh) {
    casaAlta(posx+64, posz, arrayOfCityMeshes);
    casaAlta(posx+64, posz+80, arrayOfCityMeshes);
    casaAlta(posx+64, posz+160, arrayOfCityMeshes);
    casaAlta(posx+160, posz, arrayOfCityMeshes);
    casaAlta(posx+160, posz+80, arrayOfCityMeshes);
    casaAlta(posx+160, posz+160, arrayOfCityMeshes);
    casaAlta(posx+260, posz+324, arrayOfCityMeshes);
    casaAlta(posx+460, posz+80, arrayOfCityMeshes);
    casaAlta(posx+430, posz+160, arrayOfCityMeshes);
    casaAlta(posx+470, posz+300, arrayOfCityMeshes);
    casaAlta(posx+380, posz+420, arrayOfCityMeshes);

    casaBassa(posx+70, posz+418, arrayOfCityMeshes);
    casaBassa(posx+140, posz+418, arrayOfCityMeshes);
    casaBassa(posx+208, posz+422, arrayOfCityMeshes);
    casaBassa(posx+280, posz+422, arrayOfCityMeshes);
    casaBassa(posx+266, posz+264, arrayOfCityMeshes);
    casaBassa(posx+342, posz+264, arrayOfCityMeshes);
    casaBassa(posx+340, posz+330, arrayOfCityMeshes);
    casaBassa(posx+240, posz+12, arrayOfCityMeshes);
    casaBassa(posx+302, posz+10, arrayOfCityMeshes);
    casaBassa(posx+360, posz+8, arrayOfCityMeshes);
    casaBassa(posx+420, posz+8, arrayOfCityMeshes);
    casaBassa(posx+482, posz+12, arrayOfCityMeshes);
    casaBassa(posx+478, posz+240, arrayOfCityMeshes);
    casaBassa(posx+458, posz+382, arrayOfCityMeshes);

    prato(scene, posx+140, posz+326, 128, arrayOfCityMeshes);
    prato(scene, posx+330, posz+160, 128, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz+240, arrayOfCityMeshes);

    muro(scene, posx+48, posz+240, arrayOfCityMeshes);
    muro(scene, posx+560, posz+240, arrayOfCityMeshes);
    
    if(cityTrees_boolean) {
        const cityTree = albero();
        const arrayOfTrees = [BABYLON.Matrix.Translation(posx+100, 0, posz+300),BABYLON.Matrix.Translation(posx+120, 0, posz+340),BABYLON.Matrix.Translation(posx+165, 0, posz+310),BABYLON.Matrix.Translation(posx+290, 0, posz+135),BABYLON.Matrix.Translation(posx+355, 0, posz+145),BABYLON.Matrix.Translation(posx+360, 0, posz+195)];
        cityTree.thinInstanceAdd(arrayOfTrees);
        cityTree.setParent(cityTreesParentMesh);
    }
}

function cittaP2(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentMesh) {

    casaBassa(posx+70, posz+20, arrayOfCityMeshes);
    casaBassa(posx+70, posz+100, arrayOfCityMeshes);
    casaBassa(posx+86, posz+180, arrayOfCityMeshes);
    casaBassa(posx+90, posz+260, arrayOfCityMeshes);
    casaBassa(posx+78, posz+340, arrayOfCityMeshes);
    casaBassa(posx+86, posz+420, arrayOfCityMeshes);

    casaBassa(posx+474, posz+20, arrayOfCityMeshes);
    casaBassa(posx+480, posz+100, arrayOfCityMeshes);
    casaBassa(posx+474, posz+180, arrayOfCityMeshes);
    casaBassa(posx+488, posz+260, arrayOfCityMeshes);
    casaBassa(posx+490, posz+340, arrayOfCityMeshes);
    casaBassa(posx+478, posz+420, arrayOfCityMeshes);

    prato(scene, posx+304, posz+368, 256, arrayOfCityMeshes);
    prato(scene, posx+304, posz+112, 256, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz+240, arrayOfCityMeshes);

    muro(scene, posx+48, posz+240, arrayOfCityMeshes);
    muro(scene, posx+560, posz+240, arrayOfCityMeshes);
    
    if(cityTrees_boolean) {
        const cityTree = albero();
        const arrayOfTrees = [];
        for(let r=200; r<401; r+=100) {
            for(let i=10; i<461; i+=100) {
                if(Math.random() < 0.65) {
                    arrayOfTrees.push(BABYLON.Matrix.Translation(posx+r, 0, posz+i));
                }
            }
        }
        for(let r=225; r<376; r+=100) {
            for(let i=35; i<436; i+=100) {
                if(Math.random() < 0.65) {
                    arrayOfTrees.push(BABYLON.Matrix.Translation(posx+r, 0, posz+i));
                }
            }
        }
        cityTree.thinInstanceAdd(arrayOfTrees);
        cityTree.setParent(cityTreesParentMesh);
    }
}

function cittaP3(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentMesh) {

    casaAlta(posx+400, posz+334, arrayOfCityMeshes);
    casaAlta(posx+400, posz+254, arrayOfCityMeshes);
    casaAlta(posx+400, posz+170, arrayOfCityMeshes);
    casaAlta(posx+400, posz+84, arrayOfCityMeshes);
    casaAlta(posx+320, posz+84, arrayOfCityMeshes);
    casaAlta(posx+236, posz+84, arrayOfCityMeshes);
    casaAlta(posx+150, posz+84, arrayOfCityMeshes);
    casaAlta(posx+150, posz+170, arrayOfCityMeshes);
    casaAlta(posx+150, posz+254, arrayOfCityMeshes);
    casaAlta(posx+150, posz+334, arrayOfCityMeshes);
    casaAlta(posx+236, posz+334, arrayOfCityMeshes);
    casaAlta(posx+320, posz+334, arrayOfCityMeshes);

    casaAlta(posx+54, posz-6, arrayOfCityMeshes);

    casaBassa(posx+150, posz+0, arrayOfCityMeshes);
    casaBassa(posx+214, posz+0, arrayOfCityMeshes);
    casaBassa(posx+276, posz-2, arrayOfCityMeshes);
    casaAlta(posx+338, posz-6, arrayOfCityMeshes);
    casaBassa(posx+410, posz+0, arrayOfCityMeshes);

    casaBassa(posx+492, posz+0, arrayOfCityMeshes);

    casaAlta(posx+486, posz+84, arrayOfCityMeshes);
    casaBassa(posx+492, posz+154, arrayOfCityMeshes);
    casaBassa(posx+494, posz+220, arrayOfCityMeshes);
    casaAlta(posx+492, posz+280, arrayOfCityMeshes);
    casaBassa(posx+492, posz+350, arrayOfCityMeshes);

    casaBassa(posx+492, posz+432, arrayOfCityMeshes);

    casaBassa(posx+150, posz+432, arrayOfCityMeshes);
    casaBassa(posx+216, posz+432, arrayOfCityMeshes);
    casaAlta(posx+274, posz+426, arrayOfCityMeshes);
    casaBassa(posx+342, posz+432, arrayOfCityMeshes);
    casaBassa(posx+412, posz+434, arrayOfCityMeshes);

    casaBassa(posx+60, posz+432, arrayOfCityMeshes);

    casaBassa(posx+62, posz+92, arrayOfCityMeshes);
    casaAlta(posx+60, posz+150, arrayOfCityMeshes);
    casaBassa(posx+60, posz+216, arrayOfCityMeshes);
    casaBassa(posx+60, posz+280, arrayOfCityMeshes);
    casaBassa(posx+62, posz+350, arrayOfCityMeshes);

    prato(scene, posx+300, posz+240, 128, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz+240, arrayOfCityMeshes);

    muro(scene, posx+48, posz+240, arrayOfCityMeshes);
    muro(scene, posx+560, posz+240, arrayOfCityMeshes);
}

function cittaP4(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentMesh) {

    casaBassa(posx+142, posz-4, arrayOfCityMeshes);
    casaBassa(posx+202, posz-4, arrayOfCityMeshes);
    casaBassa(posx+262, posz-4, arrayOfCityMeshes);
    casaBassa(posx+320, posz-6, arrayOfCityMeshes);
    casaBassa(posx+382, posz-4, arrayOfCityMeshes);
    casaBassa(posx+442, posz-2, arrayOfCityMeshes);
    casaBassa(posx+500, posz-2, arrayOfCityMeshes);

    casaBassa(posx+502, posz+90, arrayOfCityMeshes);
    casaBassa(posx+500, posz+150, arrayOfCityMeshes);
    casaBassa(posx+500, posz+210, arrayOfCityMeshes);
    casaBassa(posx+502, posz+302, arrayOfCityMeshes);
    casaBassa(posx+500, posz+358, arrayOfCityMeshes);
    casaBassa(posx+504, posz+438, arrayOfCityMeshes);

    casaBassa(posx+410, posz+92, arrayOfCityMeshes);
    casaBassa(posx+410, posz+152, arrayOfCityMeshes);
    casaBassa(posx+410, posz+210, arrayOfCityMeshes);
    casaBassa(posx+408, posz+302, arrayOfCityMeshes);
    casaBassa(posx+410, posz+360, arrayOfCityMeshes);
    casaBassa(posx+408, posz+440, arrayOfCityMeshes);

    casaBassa(posx+142, posz+92, arrayOfCityMeshes);
    casaBassa(posx+144, posz+150, arrayOfCityMeshes);
    casaBassa(posx+144, posz+208, arrayOfCityMeshes);
    casaBassa(posx+140, posz+298, arrayOfCityMeshes);
    casaBassa(posx+140, posz+362, arrayOfCityMeshes);
    casaBassa(posx+142, posz+442, arrayOfCityMeshes);

    casaBassa(posx+338, posz+300, arrayOfCityMeshes);
    casaBassa(posx+278, posz+302, arrayOfCityMeshes);
    casaBassa(posx+210, posz+302, arrayOfCityMeshes);

    casaBassa(posx+342, posz+362, arrayOfCityMeshes);
    casaBassa(posx+280, posz+360, arrayOfCityMeshes);
    casaBassa(posx+210, posz+362, arrayOfCityMeshes);

    casaBassa(posx+340, posz+440, arrayOfCityMeshes);
    casaBassa(posx+280, posz+442, arrayOfCityMeshes);
    casaBassa(posx+208, posz+440, arrayOfCityMeshes);
    
    prato(scene, posx+300, posz+180, 200, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz+240, arrayOfCityMeshes);

    muro(scene, posx+48, posz+240, arrayOfCityMeshes);
    muro(scene, posx+560, posz+240, arrayOfCityMeshes);
    
    if(cityTrees_boolean) {
        const cityTree = albero();
        const arrayOfTrees = [BABYLON.Matrix.Translation(posx+66, 0, posz+4),BABYLON.Matrix.Translation(posx+70, 0, posz+96),BABYLON.Matrix.Translation(posx+70, 0, posz+208),BABYLON.Matrix.Translation(posx+72, 0, posz+304),BABYLON.Matrix.Translation(posx+70, 0, posz+403)];
        cityTree.thinInstanceAdd(arrayOfTrees);
        cityTree.setParent(cityTreesParentMesh);
    }
}

function muro(scene, posx, posz, arrayOfCityMeshes) {
    const muro = BABYLON.MeshBuilder.CreateBox('muro', {width: 512, height: 16, depth: 3}, scene);
    muro.material = bricks_rotated;
    muro.rotation.y = Math.PI/2;
    muro.position.x = posx;
    muro.position.y = 7;
    muro.position.z = posz;
    arrayOfCityMeshes.push(muro);
}

function casaAlta(posx, posz, arrayOfCityMeshes) {
    palazzo.forEach(x => {
        const buildingPart = x.clone('');
        buildingPart.position.x = posx+32;
        buildingPart.position.y = 30;
        buildingPart.position.z = posz+32;
        arrayOfCityMeshes.push(buildingPart);
    });
}

function casaBassa(posx, posz, arrayOfCityMeshes) {
    casa.forEach(x => {
        const housePart = x.clone('');
        housePart.position.x = posx+25;
        housePart.position.y = 14;
        housePart.position.z = posz+25;
        arrayOfCityMeshes.push(housePart);
    });
}

function terrenoCitta(scene, posx, posz, arrayOfCityMeshes) {
    const terrenoCitta = BABYLON.MeshBuilder.CreatePlane('terrenoCitta', {width: 512, height: 512}, scene);
    terrenoCitta.material = cemento;
    terrenoCitta.position.x = posx;
    terrenoCitta.position.y = -0.8;
    terrenoCitta.position.z = posz;
    terrenoCitta.rotation.x = Math.PI/2;
    arrayOfCityMeshes.push(terrenoCitta);
}

function prato(scene, posx, posz, size, arrayOfCityMeshes) {
    const prato = BABYLON.MeshBuilder.CreatePlane('prato', {width: size, height: size}, scene);
    prato.material = erba;
    prato.position.x = posx;
    prato.position.y = 0;
    prato.position.z = posz;
    prato.rotation.x = Math.PI/2;
    arrayOfCityMeshes.push(prato);
}

function albero() {
    const arrayOfTreeMeshes = []
    albero1.forEach(x => {
        const partePianta = x.clone('albero1');
        arrayOfTreeMeshes.push(partePianta);
    });
    const pianta = BABYLON.Mesh.MergeMeshes(arrayOfTreeMeshes, true, true, undefined, false, true);
    pianta.alwaysSelectAsActiveMesh = true; //sempre visibile
    return pianta;
}

function createForest(scene, posx, posz, forestParentMesh) {
    const arrayOfTrees = [];
    for(let x=0; x<256; x+=50) {
        for(let z=0; z<225; z+=50) {
            if(Math.random() < 0.75) {
                const matrix = BABYLON.Matrix.Translation(posx+65+x, 0, posz+z);
                arrayOfTrees.push(matrix);
            }
        }
    }
    const forestTree = albero();
    forestTree.setParent(forestParentMesh);
    forestTree.thinInstanceAdd(arrayOfTrees);
    //casaBassa(posx+170, posz+380, parent_mesh);
    //casaBassa(posx+290, posz+20, parent_mesh);
    
    return forestTree;
}
