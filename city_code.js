"use strict";
function firstCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    officeBuilding(posx+64, posz-240, arrayOfCityMeshes);
    officeBuilding(posx+64, posz-160, arrayOfCityMeshes);
    officeBuilding(posx+64, posz-80, arrayOfCityMeshes);
    officeBuilding(posx+160, posz-240, arrayOfCityMeshes);
    officeBuilding(posx+160, posz-160, arrayOfCityMeshes);
    officeBuilding(posx+160, posz-80, arrayOfCityMeshes);
    officeBuilding(posx+260, posz+84, arrayOfCityMeshes);
    officeBuilding(posx+460, posz-160, arrayOfCityMeshes);
    officeBuilding(posx+430, posz-80, arrayOfCityMeshes);
    officeBuilding(posx+470, posz+60, arrayOfCityMeshes);
    officeBuilding(posx+380, posz+180, arrayOfCityMeshes);

    house(posx+70, posz+178, arrayOfCityMeshes);
    house(posx+140, posz+178, arrayOfCityMeshes);
    house(posx+208, posz+182, arrayOfCityMeshes);
    house(posx+280, posz+182, arrayOfCityMeshes);
    house(posx+266, posz+24, arrayOfCityMeshes);
    house(posx+342, posz+24, arrayOfCityMeshes);
    house(posx+340, posz+90, arrayOfCityMeshes);
    house(posx+240, posz-228, arrayOfCityMeshes);
    house(posx+302, posz-230, arrayOfCityMeshes);
    house(posx+360, posz-232, arrayOfCityMeshes);
    house(posx+420, posz-232, arrayOfCityMeshes);
    house(posx+482, posz-228, arrayOfCityMeshes);
    house(posx+478, posz, arrayOfCityMeshes);
    house(posx+458, posz+142, arrayOfCityMeshes);

    lawn(scene, posx+140, posz+86, 128, arrayOfCityMeshes);
    lawn(scene, posx+330, posz-80, 128, arrayOfCityMeshes);

    cityTerrain(scene, posx+302.5, posz, arrayOfCityMeshes);

    wall(scene, posx+48, posz, arrayOfCityMeshes);
    wall(scene, posx+560, posz, arrayOfCityMeshes);
    
    if(cityTrees_boolean) {
        const cityTree = treeModel();
        const arrayOfTrees = [BABYLON.Matrix.Translation(posx+100, 0, posz+60),BABYLON.Matrix.Translation(posx+120, 0, posz+100),BABYLON.Matrix.Translation(posx+165, 0, posz+70),BABYLON.Matrix.Translation(posx+290, 0, posz-105),BABYLON.Matrix.Translation(posx+355, 0, posz-95),BABYLON.Matrix.Translation(posx+360, 0, posz-45)];
        cityTree.thinInstanceAdd(arrayOfTrees);
        cityTree.setParent(cityTreesParentNode);
    }
}

function secondCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    house(posx+70, posz-220, arrayOfCityMeshes);
    house(posx+70, posz-140, arrayOfCityMeshes);
    house(posx+86, posz-60, arrayOfCityMeshes);
    house(posx+90, posz+20, arrayOfCityMeshes);
    house(posx+78, posz+100, arrayOfCityMeshes);
    house(posx+86, posz+180, arrayOfCityMeshes);

    house(posx+474, posz-220, arrayOfCityMeshes);
    house(posx+480, posz-140, arrayOfCityMeshes);
    house(posx+474, posz-60, arrayOfCityMeshes);
    house(posx+488, posz+20, arrayOfCityMeshes);
    house(posx+490, posz+100, arrayOfCityMeshes);
    house(posx+478, posz+180, arrayOfCityMeshes);

    lawn(scene, posx+304, posz+128, 256, arrayOfCityMeshes);
    lawn(scene, posx+304, posz-128, 256, arrayOfCityMeshes);

    cityTerrain(scene, posx+302.5, posz, arrayOfCityMeshes);

    wall(scene, posx+48, posz, arrayOfCityMeshes);
    wall(scene, posx+560, posz, arrayOfCityMeshes);

    if(cityTrees_boolean) {
        const cityTree = treeModel();
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

function thirdCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    officeBuilding(posx+400, posz+94, arrayOfCityMeshes);
    officeBuilding(posx+400, posz+14, arrayOfCityMeshes);
    officeBuilding(posx+400, posz-70, arrayOfCityMeshes);
    officeBuilding(posx+400, posz-156, arrayOfCityMeshes);
    officeBuilding(posx+320, posz-156, arrayOfCityMeshes);
    officeBuilding(posx+236, posz-156, arrayOfCityMeshes);
    officeBuilding(posx+150, posz-156, arrayOfCityMeshes);
    officeBuilding(posx+150, posz-70, arrayOfCityMeshes);
    officeBuilding(posx+150, posz+14, arrayOfCityMeshes);
    officeBuilding(posx+150, posz+94, arrayOfCityMeshes);
    officeBuilding(posx+236, posz+94, arrayOfCityMeshes);
    officeBuilding(posx+320, posz+94, arrayOfCityMeshes);

    officeBuilding(posx+54, posz-246, arrayOfCityMeshes);

    house(posx+150, posz-240, arrayOfCityMeshes);
    house(posx+214, posz-240, arrayOfCityMeshes);
    house(posx+276, posz-242, arrayOfCityMeshes);
    officeBuilding(posx+338, posz-246, arrayOfCityMeshes);
    house(posx+410, posz-240, arrayOfCityMeshes);

    house(posx+492, posz-240, arrayOfCityMeshes);

    officeBuilding(posx+486, posz-156, arrayOfCityMeshes);
    house(posx+492, posz-86, arrayOfCityMeshes);
    house(posx+494, posz-20, arrayOfCityMeshes);
    officeBuilding(posx+492, posz+40, arrayOfCityMeshes);
    house(posx+492, posz+110, arrayOfCityMeshes);

    house(posx+492, posz+192, arrayOfCityMeshes);

    house(posx+150, posz+192, arrayOfCityMeshes);
    house(posx+216, posz+192, arrayOfCityMeshes);
    officeBuilding(posx+274, posz+186, arrayOfCityMeshes);
    house(posx+342, posz+192, arrayOfCityMeshes);
    house(posx+412, posz+194, arrayOfCityMeshes);

    house(posx+60, posz+192, arrayOfCityMeshes);

    house(posx+62, posz-148, arrayOfCityMeshes);
    officeBuilding(posx+60, posz-90, arrayOfCityMeshes);
    house(posx+60, posz-24, arrayOfCityMeshes);
    house(posx+60, posz+40, arrayOfCityMeshes);
    house(posx+62, posz+110, arrayOfCityMeshes);

    lawn(scene, posx+300, posz, 128, arrayOfCityMeshes);

    cityTerrain(scene, posx+302.5, posz, arrayOfCityMeshes);

    wall(scene, posx+48, posz, arrayOfCityMeshes);
    wall(scene, posx+560, posz, arrayOfCityMeshes);
}

function fourthCity(scene, posx, posz, cityTrees_boolean, arrayOfCityMeshes, cityTreesParentNode) {
    house(posx+142, posz-244, arrayOfCityMeshes);
    house(posx+202, posz-244, arrayOfCityMeshes);
    house(posx+262, posz-244, arrayOfCityMeshes);
    house(posx+320, posz-246, arrayOfCityMeshes);
    house(posx+382, posz-244, arrayOfCityMeshes);
    house(posx+442, posz-242, arrayOfCityMeshes);
    house(posx+500, posz-242, arrayOfCityMeshes);

    house(posx+502, posz-150, arrayOfCityMeshes);
    house(posx+500, posz-90, arrayOfCityMeshes);
    house(posx+500, posz-30, arrayOfCityMeshes);
    house(posx+502, posz+62, arrayOfCityMeshes);
    house(posx+500, posz+118, arrayOfCityMeshes);
    house(posx+504, posz+198, arrayOfCityMeshes);

    house(posx+410, posz-148, arrayOfCityMeshes);
    house(posx+410, posz-88, arrayOfCityMeshes);
    house(posx+410, posz-30, arrayOfCityMeshes);
    house(posx+408, posz+62, arrayOfCityMeshes);
    house(posx+410, posz+120, arrayOfCityMeshes);
    house(posx+408, posz+200, arrayOfCityMeshes);

    house(posx+142, posz-148, arrayOfCityMeshes);
    house(posx+144, posz-90, arrayOfCityMeshes);
    house(posx+144, posz-32, arrayOfCityMeshes);
    house(posx+140, posz+58, arrayOfCityMeshes);
    house(posx+140, posz+122, arrayOfCityMeshes);
    house(posx+142, posz+202, arrayOfCityMeshes);

    house(posx+338, posz+60, arrayOfCityMeshes);
    house(posx+278, posz+62, arrayOfCityMeshes);
    house(posx+210, posz+62, arrayOfCityMeshes);

    house(posx+342, posz+122, arrayOfCityMeshes);
    house(posx+280, posz+120, arrayOfCityMeshes);
    house(posx+210, posz+122, arrayOfCityMeshes);

    house(posx+340, posz+200, arrayOfCityMeshes);
    house(posx+280, posz+202, arrayOfCityMeshes);
    house(posx+208, posz+200, arrayOfCityMeshes);

    lawn(scene, posx+300, posz-60, 200, arrayOfCityMeshes);

    cityTerrain(scene, posx+302.5, posz, arrayOfCityMeshes);

    wall(scene, posx+48, posz, arrayOfCityMeshes);
    wall(scene, posx+560, posz, arrayOfCityMeshes);

    if(cityTrees_boolean) {
        const cityTree = treeModel();
        const arrayOfTrees = [BABYLON.Matrix.Translation(posx+66, 0, posz-236),BABYLON.Matrix.Translation(posx+70, 0, posz-144),BABYLON.Matrix.Translation(posx+70, 0, posz-32),BABYLON.Matrix.Translation(posx+72, 0, posz+64),BABYLON.Matrix.Translation(posx+70, 0, posz+163)];
        cityTree.thinInstanceAdd(arrayOfTrees);
        cityTree.setParent(cityTreesParentNode);
    }
}

function wall(scene, posx, posz, arrayOfCityMeshes) {
    const wall = BABYLON.MeshBuilder.CreateBox('wall', {width: 512, height: 16, depth: 3}, scene);
    wall.material = bricks_rotated;
    wall.rotation.y = Math.PI/2;
    wall.position.x = posx;
    wall.position.y = 7;
    wall.position.z = posz;
    arrayOfCityMeshes.push(wall);
}

function officeBuilding(posx, posz, arrayOfCityMeshes) {
    convertModelToMesh(palazzo, arrayOfCityMeshes, {positionX: posx+32, positionY: 30, positionZ: posz+32});
}

function house(posx, posz, arrayOfCityMeshes) {
    convertModelToMesh(casa, arrayOfCityMeshes, {positionX: posx+25, positionY: 14, positionZ: posz+25});
}

function cityTerrain(scene, posx, posz, arrayOfCityMeshes) {
    const cityTerrain = BABYLON.MeshBuilder.CreatePlane('cityTerrain', {width: 512, height: 512}, scene);
    cityTerrain.material = cemento;
    cityTerrain.position.x = posx;
    cityTerrain.position.y = -0.8;
    cityTerrain.position.z = posz;
    cityTerrain.rotation.x = Math.PI/2;
    arrayOfCityMeshes.push(cityTerrain);
}

function lawn(scene, posx, posz, dimensions, arrayOfCityMeshes) {
    const lawn = BABYLON.MeshBuilder.CreatePlane('lawn', {size: dimensions}, scene);
    lawn.material = erba;
    lawn.position.x = posx;
    lawn.position.y = -0.8;
    lawn.position.z = posz;
    lawn.rotation.x = Math.PI/2;
    arrayOfCityMeshes.push(lawn);
}

function treeModel() {
    const arrayOfTreeMeshes = [];
    convertModelToMesh(albero1, arrayOfTreeMeshes, {});
    const tree = BABYLON.Mesh.MergeMeshes(arrayOfTreeMeshes, true, true, undefined, false, true);
    tree.alwaysSelectAsActiveMesh = true; //always visible
    return tree;
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
    const forestTree = treeModel();
    forestTree.setParent(forestParentNode);
    forestTree.thinInstanceAdd(arrayOfTrees);
    //house(posx+170, posz+380, parent_mesh);
    //house(posx+290, posz+20, parent_mesh);
    return forestTree;
}
