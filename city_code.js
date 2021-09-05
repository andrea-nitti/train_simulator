"use strict";
function cittaP1(scene, posx, posz, arrayOfCityMeshes) {
    casaAlta(scene, posx+64, posz, arrayOfCityMeshes);
    casaAlta(scene, posx+64, posz+80, arrayOfCityMeshes);
    casaAlta(scene, posx+64, posz+160, arrayOfCityMeshes);
    casaAlta(scene, posx+160, posz, arrayOfCityMeshes);
    casaAlta(scene, posx+160, posz+80, arrayOfCityMeshes);
    casaAlta(scene, posx+160, posz+160, arrayOfCityMeshes);
    casaAlta(scene, posx+260, posz+324, arrayOfCityMeshes);
    casaAlta(scene, posx+460, posz+80, arrayOfCityMeshes);
    casaAlta(scene, posx+430, posz+160, arrayOfCityMeshes);
    casaAlta(scene, posx+470, posz+300, arrayOfCityMeshes);
    casaAlta(scene, posx+380, posz+420, arrayOfCityMeshes);

    casaBassa(scene, posx+70, posz+418, arrayOfCityMeshes);
    casaBassa(scene, posx+140, posz+418, arrayOfCityMeshes);
    casaBassa(scene, posx+208, posz+422, arrayOfCityMeshes);
    casaBassa(scene, posx+280, posz+422, arrayOfCityMeshes);
    casaBassa(scene, posx+266, posz+264, arrayOfCityMeshes);
    casaBassa(scene, posx+342, posz+264, arrayOfCityMeshes);
    casaBassa(scene, posx+340, posz+330, arrayOfCityMeshes);
    casaBassa(scene, posx+240, posz+12, arrayOfCityMeshes);
    casaBassa(scene, posx+302, posz+10, arrayOfCityMeshes);
    casaBassa(scene, posx+360, posz+8, arrayOfCityMeshes);
    casaBassa(scene, posx+420, posz+8, arrayOfCityMeshes);
    casaBassa(scene, posx+482, posz+12, arrayOfCityMeshes);
    casaBassa(scene, posx+478, posz+240, arrayOfCityMeshes);
    casaBassa(scene, posx+458, posz+382, arrayOfCityMeshes);

    prato(scene, posx+140, posz+326, arrayOfCityMeshes);
    prato(scene, posx+330, posz+160, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz+240, arrayOfCityMeshes);

    muro(scene, posx+48, posz+240, arrayOfCityMeshes);
    muro(scene, posx+560, posz+240, arrayOfCityMeshes);
    
    /*albero(scene, posx+100, posz+300, arrayOfCityMeshes);
    albero(scene, posx+120, posz+340, arrayOfCityMeshes);
    albero(scene, posx+165, posz+310, arrayOfCityMeshes);
    //albero(scene, posx+170, posz+360, arrayOfCityMeshes);

    albero(scene, posx+290, posz+135, arrayOfCityMeshes);
    //albero(scene, posx+310, posz+175, arrayOfCityMeshes);
    albero(scene, posx+355, posz+145, arrayOfCityMeshes);
    albero(scene, posx+360, posz+195, arrayOfCityMeshes);*/
}

function cittaP2(scene, posx, posz, arrayOfCityMeshes) {

    casaBassa(scene, posx+70, posz+20, arrayOfCityMeshes);
    casaBassa(scene, posx+70, posz+100, arrayOfCityMeshes);
    casaBassa(scene, posx+86, posz+180, arrayOfCityMeshes);
    casaBassa(scene, posx+90, posz+260, arrayOfCityMeshes);
    casaBassa(scene, posx+78, posz+340, arrayOfCityMeshes);
    casaBassa(scene, posx+86, posz+420, arrayOfCityMeshes);

    casaBassa(scene, posx+474, posz+20, arrayOfCityMeshes);
    casaBassa(scene, posx+480, posz+100, arrayOfCityMeshes);
    casaBassa(scene, posx+474, posz+180, arrayOfCityMeshes);
    casaBassa(scene, posx+488, posz+260, arrayOfCityMeshes);
    casaBassa(scene, posx+490, posz+340, arrayOfCityMeshes);
    casaBassa(scene, posx+478, posz+420, arrayOfCityMeshes);

    prato(scene, posx+240, posz+50, arrayOfCityMeshes);
    prato(scene, posx+240, posz+178, arrayOfCityMeshes);
    prato(scene, posx+368, posz+50, arrayOfCityMeshes);
    prato(scene, posx+368, posz+178, arrayOfCityMeshes);
    prato(scene, posx+240, posz+306, arrayOfCityMeshes);
    prato(scene, posx+240, posz+434, arrayOfCityMeshes);
    prato(scene, posx+368, posz+306, arrayOfCityMeshes);
    prato(scene, posx+368, posz+434, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz+240, arrayOfCityMeshes);

    muro(scene, posx+48, posz+240, arrayOfCityMeshes);
    muro(scene, posx+560, posz+240, arrayOfCityMeshes);
    
    /*for(let r=200; r<401; r+=50) {
        for(let i=10; i<461; i+=50) {
            albero(scene, posx+r, posz+i, arrayOfCityMeshes)
        }
    }

    for(let r=225; r<376; r+=50) {
        for(let i=35; i<436; i+=50) {
            albero(scene, posx+r, posz+i, arrayOfCityMeshes)
        }
    }*/
}

function cittaP3(scene, posx, posz, arrayOfCityMeshes) {

    casaAlta(scene, posx+400, posz+334, arrayOfCityMeshes);
    casaAlta(scene, posx+400, posz+254, arrayOfCityMeshes);
    casaAlta(scene, posx+400, posz+170, arrayOfCityMeshes);
    casaAlta(scene, posx+400, posz+84, arrayOfCityMeshes);
    casaAlta(scene, posx+320, posz+84, arrayOfCityMeshes);
    casaAlta(scene, posx+236, posz+84, arrayOfCityMeshes);
    casaAlta(scene, posx+150, posz+84, arrayOfCityMeshes);
    casaAlta(scene, posx+150, posz+170, arrayOfCityMeshes);
    casaAlta(scene, posx+150, posz+254, arrayOfCityMeshes);
    casaAlta(scene, posx+150, posz+334, arrayOfCityMeshes);
    casaAlta(scene, posx+236, posz+334, arrayOfCityMeshes);
    casaAlta(scene, posx+320, posz+334, arrayOfCityMeshes);

    casaAlta(scene, posx+54, posz-6, arrayOfCityMeshes);

    casaBassa(scene, posx+150, posz+0, arrayOfCityMeshes);
    casaBassa(scene, posx+214, posz+0, arrayOfCityMeshes);
    casaBassa(scene, posx+276, posz-2, arrayOfCityMeshes);
    casaAlta(scene, posx+338, posz-6, arrayOfCityMeshes);
    casaBassa(scene, posx+410, posz+0, arrayOfCityMeshes);

    casaBassa(scene, posx+492, posz+0, arrayOfCityMeshes);

    casaAlta(scene, posx+486, posz+84, arrayOfCityMeshes);
    casaBassa(scene, posx+492, posz+154, arrayOfCityMeshes);
    casaBassa(scene, posx+494, posz+220, arrayOfCityMeshes);
    casaAlta(scene, posx+492, posz+280, arrayOfCityMeshes);
    casaBassa(scene, posx+492, posz+350, arrayOfCityMeshes);

    casaBassa(scene, posx+492, posz+432, arrayOfCityMeshes);

    casaBassa(scene, posx+150, posz+432, arrayOfCityMeshes);
    casaBassa(scene, posx+216, posz+432, arrayOfCityMeshes);
    casaAlta(scene, posx+274, posz+426, arrayOfCityMeshes);
    casaBassa(scene, posx+342, posz+432, arrayOfCityMeshes);
    casaBassa(scene, posx+412, posz+434, arrayOfCityMeshes);

    casaBassa(scene, posx+60, posz+432, arrayOfCityMeshes);

    casaBassa(scene, posx+62, posz+92, arrayOfCityMeshes);
    casaAlta(scene, posx+60, posz+150, arrayOfCityMeshes);
    casaBassa(scene, posx+60, posz+216, arrayOfCityMeshes);
    casaBassa(scene, posx+60, posz+280, arrayOfCityMeshes);
    casaBassa(scene, posx+62, posz+350, arrayOfCityMeshes);

    prato(scene, posx+300, posz+240, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz+240, arrayOfCityMeshes);

    muro(scene, posx+48, posz+240, arrayOfCityMeshes);
    muro(scene, posx+560, posz+240, arrayOfCityMeshes);
}

function cittaP4(scene, posx, posz, arrayOfCityMeshes) {

    casaBassa(scene, posx+142, posz-4, arrayOfCityMeshes);
    casaBassa(scene, posx+202, posz-4, arrayOfCityMeshes);
    casaBassa(scene, posx+262, posz-4, arrayOfCityMeshes);
    casaBassa(scene, posx+320, posz-6, arrayOfCityMeshes);
    casaBassa(scene, posx+382, posz-4, arrayOfCityMeshes);
    casaBassa(scene, posx+442, posz-2, arrayOfCityMeshes);
    casaBassa(scene, posx+500, posz-2, arrayOfCityMeshes);

    casaBassa(scene, posx+502, posz+90, arrayOfCityMeshes);
    casaBassa(scene, posx+500, posz+150, arrayOfCityMeshes);
    casaBassa(scene, posx+500, posz+210, arrayOfCityMeshes);
    casaBassa(scene, posx+502, posz+302, arrayOfCityMeshes);
    casaBassa(scene, posx+500, posz+358, arrayOfCityMeshes);
    casaBassa(scene, posx+504, posz+438, arrayOfCityMeshes);

    casaBassa(scene, posx+410, posz+92, arrayOfCityMeshes);
    casaBassa(scene, posx+410, posz+152, arrayOfCityMeshes);
    casaBassa(scene, posx+410, posz+210, arrayOfCityMeshes);
    casaBassa(scene, posx+408, posz+302, arrayOfCityMeshes);
    casaBassa(scene, posx+410, posz+360, arrayOfCityMeshes);
    casaBassa(scene, posx+408, posz+440, arrayOfCityMeshes);

    casaBassa(scene, posx+142, posz+92, arrayOfCityMeshes);
    casaBassa(scene, posx+144, posz+150, arrayOfCityMeshes);
    casaBassa(scene, posx+144, posz+208, arrayOfCityMeshes);
    casaBassa(scene, posx+140, posz+298, arrayOfCityMeshes);
    casaBassa(scene, posx+140, posz+362, arrayOfCityMeshes);
    casaBassa(scene, posx+142, posz+442, arrayOfCityMeshes);

    casaBassa(scene, posx+338, posz+300, arrayOfCityMeshes);
    casaBassa(scene, posx+278, posz+302, arrayOfCityMeshes);
    casaBassa(scene, posx+210, posz+302, arrayOfCityMeshes);

    casaBassa(scene, posx+342, posz+362, arrayOfCityMeshes);
    casaBassa(scene, posx+280, posz+360, arrayOfCityMeshes);
    casaBassa(scene, posx+210, posz+362, arrayOfCityMeshes);

    casaBassa(scene, posx+340, posz+440, arrayOfCityMeshes);
    casaBassa(scene, posx+280, posz+442, arrayOfCityMeshes);
    casaBassa(scene, posx+208, posz+440, arrayOfCityMeshes);

    prato(scene, posx+340, posz+156, arrayOfCityMeshes);
    prato(scene, posx+260, posz+156, arrayOfCityMeshes);
    prato(scene, posx+340, posz+200, arrayOfCityMeshes);
    prato(scene, posx+260, posz+200, arrayOfCityMeshes);

    terrenoCitta(scene, posx+302.5, posz+240, arrayOfCityMeshes);

    muro(scene, posx+48, posz+240, arrayOfCityMeshes);
    muro(scene, posx+560, posz+240, arrayOfCityMeshes);
    
    /*albero(scene, posx+66, posz+4, arrayOfCityMeshes);
    //albero(scene, posx+70, posz+54, arrayOfCityMeshes);
    albero(scene, posx+70, posz+96, arrayOfCityMeshes);
    //albero(scene, posx+68, posz+148, arrayOfCityMeshes);
    albero(scene, posx+70, posz+208, arrayOfCityMeshes);
    //albero(scene, posx+74, posz+250, arrayOfCityMeshes);
    albero(scene, posx+72, posz+304, arrayOfCityMeshes);
    //albero(scene, posx+70, posz+348, arrayOfCityMeshes);
    albero(scene, posx+70, posz+403, arrayOfCityMeshes);
    //albero(scene, posx+68, posz+458, arrayOfCityMeshes);
    */
}

function muro(scene, posx, posz, arrayOfCityMeshes) {
    let muro = BABYLON.MeshBuilder.CreateBox('muro', {width: 512, height: 16, depth: 3},scene);
    muro.material = bricks_rotated;
    muro.rotation.y = Math.PI/2;
    muro.position.x = posx;
    muro.position.y = 7;
    muro.position.z = posz;
    arrayOfCityMeshes.push(muro);
}

function casaAlta(scene, posx, posz, arrayOfCityMeshes) {
    palazzo.forEach(x => {
        let partePalazzo = x.clone('palazzo');
        partePalazzo.position.x = posx+32;
        partePalazzo.position.y = 30;
        partePalazzo.position.z = posz+32;
        arrayOfCityMeshes.push(partePalazzo);
    });
}

function casaBassa(scene, posx, posz, arrayOfCityMeshes) {
    casa.forEach(x => {
        let parteCasa = x.clone('casa');
        parteCasa.position.x = posx+25;
        parteCasa.position.y = 14;
        parteCasa.position.z = posz+25;
        arrayOfCityMeshes.push(parteCasa);
    });
}

function terrenoCitta(scene, posx, posz, arrayOfCityMeshes) {
    let terrenoCitta = BABYLON.MeshBuilder.CreatePlane('terrenoCitta', {width: 512, height: 512},scene);
    terrenoCitta.material = cemento;
    terrenoCitta.position.x = posx;
    terrenoCitta.position.y = -0.79;
    terrenoCitta.position.z = posz;
    terrenoCitta.rotation.x = Math.PI/2;
    arrayOfCityMeshes.push(terrenoCitta);
}

function prato(scene, posx, posz, arrayOfCityMeshes) {
    let prato = BABYLON.MeshBuilder.CreatePlane('prato', {width: 128, height: 128},scene);
    prato.material = erba;
    prato.position.x = posx;
    prato.position.y = 2;
    prato.position.z = posz;
    prato.rotation.x = Math.PI/2;
    arrayOfCityMeshes.push(prato);
}

function albero(scene, posx, posz, parent_mesh) {
    let x = Math.floor(Math.random() * 2);
    vegetali[x].forEach(x => {
        let partePianta = x.clone('alberoscelto');
        partePianta.position.x = posx;
        partePianta.position.y = 0;
        partePianta.position.z = posz;
        partePianta.setParent(parent_mesh);
    });
}

function foresta(scene, posx, posz) {
    let parent_mesh = BABYLON.Mesh.CreateBox("box", 1.0, scene);    //a questa mesh ancoro tutta la foresta
    parent_mesh.isVisible = false;  //rendo l'ancora invisibile

    /*albero(scene, posx+160, posz+40, parent_mesh);
    albero(scene, posx+324, posz+388, parent_mesh);
    albero(scene, posx+176, posz+216, parent_mesh);
    albero(scene, posx+103, posz+300, parent_mesh);
    albero(scene, posx+65, posz+415, parent_mesh);
    albero(scene, posx+456, posz+399, parent_mesh);
    albero(scene, posx+401, posz+233, parent_mesh);
    albero(scene, posx+69, posz+69, parent_mesh);
    albero(scene, posx+388, posz+71, parent_mesh);
    albero(scene, posx+380, posz+165, parent_mesh);
    albero(scene, posx+420, posz+102, parent_mesh);
    albero(scene, posx+456, posz+16, parent_mesh);
    albero(scene, posx+505, posz+312, parent_mesh);
    albero(scene, posx+300, posz+260, parent_mesh);
    albero(scene, posx+282, posz+148, parent_mesh);
    albero(scene, posx+260, posz+440, parent_mesh);
    albero(scene, posx+470, posz+140, parent_mesh);
    albero(scene, posx+88, posz+158, parent_mesh);*/
    for(let i=0; i<500; i+=50) albero(scene, posx+65, posz+i, parent_mesh);

    //casaBassa(scene, posx+170, posz+380, parent_mesh);
    //casaBassa(scene, posx+290, posz+20, parent_mesh);
    
    return parent_mesh;
}
