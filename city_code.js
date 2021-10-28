"use strict";
function cittaP1(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    casaAlta(posx+64, posz-240, arrayOfCityMeshes);
    casaAlta(posx+64, posz-160, arrayOfCityMeshes);
    casaAlta(posx+64, posz-80, arrayOfCityMeshes);
    casaAlta(posx+160, posz-240, arrayOfCityMeshes);
    casaAlta(posx+160, posz-160, arrayOfCityMeshes);
    casaAlta(posx+160, posz-80, arrayOfCityMeshes);
    casaAlta(posx+260, posz+84, arrayOfCityMeshes);
    casaAlta(posx+460, posz-160, arrayOfCityMeshes);
    casaAlta(posx+430, posz-80, arrayOfCityMeshes);
    casaAlta(posx+470, posz+60, arrayOfCityMeshes);
    casaAlta(posx+380, posz+180, arrayOfCityMeshes);

    casaBassa(posx+70, posz+178, arrayOfCityMeshes);
    casaBassa(posx+140, posz+178, arrayOfCityMeshes);
    casaBassa(posx+208, posz+182, arrayOfCityMeshes);
    casaBassa(posx+280, posz+182, arrayOfCityMeshes);
    casaBassa(posx+266, posz+24, arrayOfCityMeshes);
    casaBassa(posx+342, posz+24, arrayOfCityMeshes);
    casaBassa(posx+340, posz+90, arrayOfCityMeshes);
    casaBassa(posx+240, posz-228, arrayOfCityMeshes);
    casaBassa(posx+302, posz-230, arrayOfCityMeshes);
    casaBassa(posx+360, posz-232, arrayOfCityMeshes);
    casaBassa(posx+420, posz-232, arrayOfCityMeshes);
    casaBassa(posx+482, posz-228, arrayOfCityMeshes);
    casaBassa(posx+478, posz, arrayOfCityMeshes);
    casaBassa(posx+458, posz+142, arrayOfCityMeshes);

    prato(scene, posx+140, posz+86, 128, arrayOfCityMeshes);
    prato(scene, posx+330, posz-80, 128, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz, arrayOfCityMeshes);

    muro(scene, posx+48, posz, arrayOfCityMeshes);
    muro(scene, posx+560, posz, arrayOfCityMeshes);
    
    if(cityTrees_boolean) {
        const cityTree = albero();
        const arrayOfTrees = [BABYLON.Matrix.Translation(posx+100, 0, posz+60),BABYLON.Matrix.Translation(posx+120, 0, posz+100),BABYLON.Matrix.Translation(posx+165, 0, posz+70),BABYLON.Matrix.Translation(posx+290, 0, posz-105),BABYLON.Matrix.Translation(posx+355, 0, posz-95),BABYLON.Matrix.Translation(posx+360, 0, posz-45)];
        cityTree.thinInstanceAdd(arrayOfTrees);
        cityTree.setParent(cityTreesParentNode);
    }
}

function cittaP2(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    casaBassa(posx+70, posz-220, arrayOfCityMeshes);
    casaBassa(posx+70, posz-140, arrayOfCityMeshes);
    casaBassa(posx+86, posz-60, arrayOfCityMeshes);
    casaBassa(posx+90, posz+20, arrayOfCityMeshes);
    casaBassa(posx+78, posz+100, arrayOfCityMeshes);
    casaBassa(posx+86, posz+180, arrayOfCityMeshes);

    casaBassa(posx+474, posz-220, arrayOfCityMeshes);
    casaBassa(posx+480, posz-140, arrayOfCityMeshes);
    casaBassa(posx+474, posz-60, arrayOfCityMeshes);
    casaBassa(posx+488, posz+20, arrayOfCityMeshes);
    casaBassa(posx+490, posz+100, arrayOfCityMeshes);
    casaBassa(posx+478, posz+180, arrayOfCityMeshes);

    prato(scene, posx+304, posz+128, 256, arrayOfCityMeshes);
    prato(scene, posx+304, posz-128, 256, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz, arrayOfCityMeshes);

    muro(scene, posx+48, posz, arrayOfCityMeshes);
    muro(scene, posx+560, posz, arrayOfCityMeshes);

    if(cityTrees_boolean) {
        const cityTree = albero();
        const arrayOfTrees = [];
        for(let r=200; r<401; r+=100) {
            for(let i=-230; i<221; i+=100) {
                if(Math.random() < 0.65) {
                    arrayOfTrees.push(BABYLON.Matrix.Translation(posx+r, 0, posz+i));
                }
            }
        }
        for(let r=225; r<376; r+=100) {
            for(let i=-205; i<196; i+=100) {
                if(Math.random() < 0.65) {
                    arrayOfTrees.push(BABYLON.Matrix.Translation(posx+r, 0, posz+i));
                }
            }
        }
        cityTree.thinInstanceAdd(arrayOfTrees);
        cityTree.setParent(cityTreesParentNode);
    }
}

function cittaP3(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    casaAlta(posx+400, posz+94, arrayOfCityMeshes);
    casaAlta(posx+400, posz+14, arrayOfCityMeshes);
    casaAlta(posx+400, posz-70, arrayOfCityMeshes);
    casaAlta(posx+400, posz-156, arrayOfCityMeshes);
    casaAlta(posx+320, posz-156, arrayOfCityMeshes);
    casaAlta(posx+236, posz-156, arrayOfCityMeshes);
    casaAlta(posx+150, posz-156, arrayOfCityMeshes);
    casaAlta(posx+150, posz-70, arrayOfCityMeshes);
    casaAlta(posx+150, posz+14, arrayOfCityMeshes);
    casaAlta(posx+150, posz+94, arrayOfCityMeshes);
    casaAlta(posx+236, posz+94, arrayOfCityMeshes);
    casaAlta(posx+320, posz+94, arrayOfCityMeshes);

    casaAlta(posx+54, posz-246, arrayOfCityMeshes);

    casaBassa(posx+150, posz-240, arrayOfCityMeshes);
    casaBassa(posx+214, posz-240, arrayOfCityMeshes);
    casaBassa(posx+276, posz-242, arrayOfCityMeshes);
    casaAlta(posx+338, posz-246, arrayOfCityMeshes);
    casaBassa(posx+410, posz-240, arrayOfCityMeshes);

    casaBassa(posx+492, posz-240, arrayOfCityMeshes);

    casaAlta(posx+486, posz-156, arrayOfCityMeshes);
    casaBassa(posx+492, posz-86, arrayOfCityMeshes);
    casaBassa(posx+494, posz-20, arrayOfCityMeshes);
    casaAlta(posx+492, posz+40, arrayOfCityMeshes);
    casaBassa(posx+492, posz+110, arrayOfCityMeshes);

    casaBassa(posx+492, posz+192, arrayOfCityMeshes);

    casaBassa(posx+150, posz+192, arrayOfCityMeshes);
    casaBassa(posx+216, posz+192, arrayOfCityMeshes);
    casaAlta(posx+274, posz+186, arrayOfCityMeshes);
    casaBassa(posx+342, posz+192, arrayOfCityMeshes);
    casaBassa(posx+412, posz+194, arrayOfCityMeshes);

    casaBassa(posx+60, posz+192, arrayOfCityMeshes);

    casaBassa(posx+62, posz-148, arrayOfCityMeshes);
    casaAlta(posx+60, posz-90, arrayOfCityMeshes);
    casaBassa(posx+60, posz-24, arrayOfCityMeshes);
    casaBassa(posx+60, posz+40, arrayOfCityMeshes);
    casaBassa(posx+62, posz+110, arrayOfCityMeshes);

    prato(scene, posx+300, posz, 128, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz, arrayOfCityMeshes);

    muro(scene, posx+48, posz, arrayOfCityMeshes);
    muro(scene, posx+560, posz, arrayOfCityMeshes);
}

function cittaP4(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    casaBassa(posx+142, posz-244, arrayOfCityMeshes);
    casaBassa(posx+202, posz-244, arrayOfCityMeshes);
    casaBassa(posx+262, posz-244, arrayOfCityMeshes);
    casaBassa(posx+320, posz-246, arrayOfCityMeshes);
    casaBassa(posx+382, posz-244, arrayOfCityMeshes);
    casaBassa(posx+442, posz-242, arrayOfCityMeshes);
    casaBassa(posx+500, posz-242, arrayOfCityMeshes);

    casaBassa(posx+502, posz-150, arrayOfCityMeshes);
    casaBassa(posx+500, posz-90, arrayOfCityMeshes);
    casaBassa(posx+500, posz-30, arrayOfCityMeshes);
    casaBassa(posx+502, posz+62, arrayOfCityMeshes);
    casaBassa(posx+500, posz+118, arrayOfCityMeshes);
    casaBassa(posx+504, posz+198, arrayOfCityMeshes);

    casaBassa(posx+410, posz-148, arrayOfCityMeshes);
    casaBassa(posx+410, posz-88, arrayOfCityMeshes);
    casaBassa(posx+410, posz-30, arrayOfCityMeshes);
    casaBassa(posx+408, posz+62, arrayOfCityMeshes);
    casaBassa(posx+410, posz+120, arrayOfCityMeshes);
    casaBassa(posx+408, posz+200, arrayOfCityMeshes);

    casaBassa(posx+142, posz-148, arrayOfCityMeshes);
    casaBassa(posx+144, posz-90, arrayOfCityMeshes);
    casaBassa(posx+144, posz-32, arrayOfCityMeshes);
    casaBassa(posx+140, posz+58, arrayOfCityMeshes);
    casaBassa(posx+140, posz+122, arrayOfCityMeshes);
    casaBassa(posx+142, posz+202, arrayOfCityMeshes);

    casaBassa(posx+338, posz+60, arrayOfCityMeshes);
    casaBassa(posx+278, posz+62, arrayOfCityMeshes);
    casaBassa(posx+210, posz+62, arrayOfCityMeshes);

    casaBassa(posx+342, posz+122, arrayOfCityMeshes);
    casaBassa(posx+280, posz+120, arrayOfCityMeshes);
    casaBassa(posx+210, posz+122, arrayOfCityMeshes);

    casaBassa(posx+340, posz+200, arrayOfCityMeshes);
    casaBassa(posx+280, posz+202, arrayOfCityMeshes);
    casaBassa(posx+208, posz+200, arrayOfCityMeshes);

    prato(scene, posx+300, posz-60, 200, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz, arrayOfCityMeshes);

    muro(scene, posx+48, posz, arrayOfCityMeshes);
    muro(scene, posx+560, posz, arrayOfCityMeshes);

    if(cityTrees_boolean) {
        const cityTree = albero();
        const arrayOfTrees = [BABYLON.Matrix.Translation(posx+66, 0, posz-236),BABYLON.Matrix.Translation(posx+70, 0, posz-144),BABYLON.Matrix.Translation(posx+70, 0, posz-32),BABYLON.Matrix.Translation(posx+72, 0, posz+64),BABYLON.Matrix.Translation(posx+70, 0, posz+163)];
        cityTree.thinInstanceAdd(arrayOfTrees);
        cityTree.setParent(cityTreesParentNode);
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

function prato(scene, posx, posz, dimensions, arrayOfCityMeshes) {
    const prato = BABYLON.MeshBuilder.CreatePlane('prato', {size: dimensions}, scene);
    prato.material = erba;
    prato.position.x = posx;
    prato.position.y = -0.8;
    prato.position.z = posz;
    prato.rotation.x = Math.PI/2;
    arrayOfCityMeshes.push(prato);
}

function albero() {
    const arrayOfTreeMeshes = [];
    albero1.forEach(x => {
        const partePianta = x.clone('albero1');
        arrayOfTreeMeshes.push(partePianta);
    });
    const pianta = BABYLON.Mesh.MergeMeshes(arrayOfTreeMeshes, true, true, undefined, false, true);
    pianta.alwaysSelectAsActiveMesh = true; //sempre visibile
    return pianta;
}

function createForest(scene, posx, posz, forestParentNode) {
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
    forestTree.setParent(forestParentNode);
    forestTree.thinInstanceAdd(arrayOfTrees);
    //casaBassa(posx+170, posz+380, parent_mesh);
    //casaBassa(posx+290, posz+20, parent_mesh);
    
    return forestTree;
}
