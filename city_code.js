//////////////////////////// ! ! ! ! ! ZONA CITTÀ ! ! ! ! ! ////////////////////////////

//////////////////////////// ! ! ! ! ! ZONA CITTÀ ! ! ! ! ! ////////////////////////////

//////////////////////////// ! ! ! ! ! ZONA CITTÀ ! ! ! ! ! ////////////////////////////

function cittaP1(scene, posx, posz, citiesParentMesh) {
    casaAlta(scene, posx+64, posz, citiesParentMesh);
    casaAlta(scene, posx+64, posz+80, citiesParentMesh);
    casaAlta(scene, posx+64, posz+160, citiesParentMesh);
    casaAlta(scene, posx+160, posz, citiesParentMesh);
    casaAlta(scene, posx+160, posz+80, citiesParentMesh);
    casaAlta(scene, posx+160, posz+160, citiesParentMesh);
    casaAlta(scene, posx+260, posz+324, citiesParentMesh);
    casaAlta(scene, posx+460, posz+80, citiesParentMesh);
    casaAlta(scene, posx+430, posz+160, citiesParentMesh);
    casaAlta(scene, posx+470, posz+300, citiesParentMesh);
    casaAlta(scene, posx+380, posz+420, citiesParentMesh);

    casaBassa(scene, posx+70, posz+418, citiesParentMesh);
    casaBassa(scene, posx+140, posz+418, citiesParentMesh);
    casaBassa(scene, posx+208, posz+422, citiesParentMesh);
    casaBassa(scene, posx+280, posz+422, citiesParentMesh);
    casaBassa(scene, posx+266, posz+264, citiesParentMesh);
    casaBassa(scene, posx+342, posz+264, citiesParentMesh);
    casaBassa(scene, posx+340, posz+330, citiesParentMesh);
    casaBassa(scene, posx+240, posz+12, citiesParentMesh);
    casaBassa(scene, posx+302, posz+10, citiesParentMesh);
    casaBassa(scene, posx+360, posz+8, citiesParentMesh);
    casaBassa(scene, posx+420, posz+8, citiesParentMesh);
    casaBassa(scene, posx+482, posz+12, citiesParentMesh);
    casaBassa(scene, posx+478, posz+240, citiesParentMesh);
    casaBassa(scene, posx+458, posz+382, citiesParentMesh);

    prato(scene, posx+140, posz+326, citiesParentMesh);
    prato(scene, posx+330, posz+160, citiesParentMesh);

    terrenoCitta(scene, posx+302.5, posz+240, citiesParentMesh);

    muro(scene, posx+48, posz+240, Math.PI/2, citiesParentMesh);
    muro(scene, posx+560, posz+240, Math.PI/2, citiesParentMesh);
    
    albero(scene, posx+100, posz+300, citiesParentMesh);
    albero(scene, posx+120, posz+340, citiesParentMesh);
    albero(scene, posx+165, posz+310, citiesParentMesh);
    albero(scene, posx+170, posz+360, citiesParentMesh);

    albero(scene, posx+290, posz+135, citiesParentMesh);
    albero(scene, posx+310, posz+175, citiesParentMesh);
    albero(scene, posx+355, posz+145, citiesParentMesh);
    albero(scene, posx+360, posz+195, citiesParentMesh);
}

function cittaP2(scene, posx, posz, citiesParentMesh) {

    casaBassa(scene, posx+70, posz+20, citiesParentMesh);
    casaBassa(scene, posx+70, posz+100, citiesParentMesh);
    casaBassa(scene, posx+86, posz+180, citiesParentMesh);
    casaBassa(scene, posx+90, posz+260, citiesParentMesh);
    casaBassa(scene, posx+78, posz+340, citiesParentMesh);
    casaBassa(scene, posx+86, posz+420, citiesParentMesh);

    casaBassa(scene, posx+474, posz+20, citiesParentMesh);
    casaBassa(scene, posx+480, posz+100, citiesParentMesh);
    casaBassa(scene, posx+474, posz+180, citiesParentMesh);
    casaBassa(scene, posx+488, posz+260, citiesParentMesh);
    casaBassa(scene, posx+490, posz+340, citiesParentMesh);
    casaBassa(scene, posx+478, posz+420, citiesParentMesh);

    prato(scene, posx+240, posz+50, citiesParentMesh);
    prato(scene, posx+240, posz+178, citiesParentMesh);
    prato(scene, posx+368, posz+50, citiesParentMesh);
    prato(scene, posx+368, posz+178, citiesParentMesh);
    prato(scene, posx+240, posz+306, citiesParentMesh);
    prato(scene, posx+240, posz+434, citiesParentMesh);
    prato(scene, posx+368, posz+306, citiesParentMesh);
    prato(scene, posx+368, posz+434, citiesParentMesh);

    terrenoCitta(scene, posx+302.5, posz+240, citiesParentMesh);

    muro(scene, posx+48, posz+240, Math.PI/2, citiesParentMesh);
    muro(scene, posx+560, posz+240, Math.PI/2, citiesParentMesh);
    
    for(let r=200; r<401; r+=50) {
        for(let i=10; i<461; i+=50) {
            albero(scene, posx+r, posz+i, citiesParentMesh)
        }
    }

    for(let r=225; r<376; r+=50) {
        for(let i=35; i<436; i+=50) {
            albero(scene, posx+r, posz+i, citiesParentMesh)
        }
    }
}

function cittaP3(scene, posx, posz, citiesParentMesh) {

    casaAlta(scene, posx+400, posz+334, citiesParentMesh);
    casaAlta(scene, posx+400, posz+254, citiesParentMesh);
    casaAlta(scene, posx+400, posz+170, citiesParentMesh);
    casaAlta(scene, posx+400, posz+84, citiesParentMesh);
    casaAlta(scene, posx+320, posz+84, citiesParentMesh);
    casaAlta(scene, posx+236, posz+84, citiesParentMesh);
    casaAlta(scene, posx+150, posz+84, citiesParentMesh);
    casaAlta(scene, posx+150, posz+170, citiesParentMesh);
    casaAlta(scene, posx+150, posz+254, citiesParentMesh);
    casaAlta(scene, posx+150, posz+334, citiesParentMesh);
    casaAlta(scene, posx+236, posz+334, citiesParentMesh);
    casaAlta(scene, posx+320, posz+334, citiesParentMesh);

    casaAlta(scene, posx+54, posz-6, citiesParentMesh);

    casaBassa(scene, posx+150, posz+0, citiesParentMesh);
    casaBassa(scene, posx+214, posz+0, citiesParentMesh);
    casaBassa(scene, posx+276, posz-2, citiesParentMesh);
    casaAlta(scene, posx+338, posz-6, citiesParentMesh);
    casaBassa(scene, posx+410, posz+0, citiesParentMesh);

    casaBassa(scene, posx+492, posz+0, citiesParentMesh);

    casaAlta(scene, posx+486, posz+84, citiesParentMesh);
    casaBassa(scene, posx+492, posz+154, citiesParentMesh);
    casaBassa(scene, posx+494, posz+220, citiesParentMesh);
    casaAlta(scene, posx+492, posz+280, citiesParentMesh);
    casaBassa(scene, posx+492, posz+350, citiesParentMesh);

    casaBassa(scene, posx+492, posz+432, citiesParentMesh);

    casaBassa(scene, posx+150, posz+432, citiesParentMesh);
    casaBassa(scene, posx+216, posz+432, citiesParentMesh);
    casaAlta(scene, posx+274, posz+426, citiesParentMesh);
    casaBassa(scene, posx+342, posz+432, citiesParentMesh);
    casaBassa(scene, posx+412, posz+434, citiesParentMesh);

    casaBassa(scene, posx+60, posz+432, citiesParentMesh);

    casaBassa(scene, posx+62, posz+92, citiesParentMesh);
    casaAlta(scene, posx+60, posz+150, citiesParentMesh);
    casaBassa(scene, posx+60, posz+216, citiesParentMesh);
    casaBassa(scene, posx+60, posz+280, citiesParentMesh);
    casaBassa(scene, posx+62, posz+350, citiesParentMesh);

    prato(scene, posx+300, posz+240, citiesParentMesh);

    terrenoCitta(scene, posx+302.5, posz+240, citiesParentMesh);

    muro(scene, posx+48, posz+240, Math.PI/2, citiesParentMesh);
    muro(scene, posx+560, posz+240, Math.PI/2, citiesParentMesh);
}

function cittaP4(scene, posx, posz, citiesParentMesh) {

    casaBassa(scene, posx+142, posz-4, citiesParentMesh);
    casaBassa(scene, posx+202, posz-4, citiesParentMesh);
    casaBassa(scene, posx+262, posz-4, citiesParentMesh);
    casaBassa(scene, posx+320, posz-6, citiesParentMesh);
    casaBassa(scene, posx+382, posz-4, citiesParentMesh);
    casaBassa(scene, posx+442, posz-2, citiesParentMesh);
    casaBassa(scene, posx+500, posz-2, citiesParentMesh);

    casaBassa(scene, posx+502, posz+90, citiesParentMesh);
    casaBassa(scene, posx+500, posz+150, citiesParentMesh);
    casaBassa(scene, posx+500, posz+210, citiesParentMesh);
    casaBassa(scene, posx+502, posz+302, citiesParentMesh);
    casaBassa(scene, posx+500, posz+358, citiesParentMesh);
    casaBassa(scene, posx+504, posz+438, citiesParentMesh);

    casaBassa(scene, posx+410, posz+92, citiesParentMesh);
    casaBassa(scene, posx+410, posz+152, citiesParentMesh);
    casaBassa(scene, posx+410, posz+210, citiesParentMesh);
    casaBassa(scene, posx+408, posz+302, citiesParentMesh);
    casaBassa(scene, posx+410, posz+360, citiesParentMesh);
    casaBassa(scene, posx+408, posz+440, citiesParentMesh);

    casaBassa(scene, posx+142, posz+92, citiesParentMesh);
    casaBassa(scene, posx+144, posz+150, citiesParentMesh);
    casaBassa(scene, posx+144, posz+208, citiesParentMesh);
    casaBassa(scene, posx+140, posz+298, citiesParentMesh);
    casaBassa(scene, posx+140, posz+362, citiesParentMesh);
    casaBassa(scene, posx+142, posz+442, citiesParentMesh);

    casaBassa(scene, posx+338, posz+300, citiesParentMesh);
    casaBassa(scene, posx+278, posz+302, citiesParentMesh);
    casaBassa(scene, posx+210, posz+302, citiesParentMesh);

    casaBassa(scene, posx+342, posz+362, citiesParentMesh);
    casaBassa(scene, posx+280, posz+360, citiesParentMesh);
    casaBassa(scene, posx+210, posz+362, citiesParentMesh);

    casaBassa(scene, posx+340, posz+440, citiesParentMesh);
    casaBassa(scene, posx+280, posz+442, citiesParentMesh);
    casaBassa(scene, posx+208, posz+440, citiesParentMesh);

    prato(scene, posx+340, posz+156, citiesParentMesh);
    prato(scene, posx+260, posz+156, citiesParentMesh);
    prato(scene, posx+340, posz+200, citiesParentMesh);
    prato(scene, posx+260, posz+200, citiesParentMesh);

    terrenoCitta(scene, posx+302.5, posz+240, citiesParentMesh);

    muro(scene, posx+48, posz+240, Math.PI/2, citiesParentMesh);
    muro(scene, posx+560, posz+240, Math.PI/2, citiesParentMesh);
    
    albero(scene, posx+66, posz+4, citiesParentMesh);
    albero(scene, posx+70, posz+54, citiesParentMesh);
    albero(scene, posx+70, posz+96, citiesParentMesh);
    albero(scene, posx+68, posz+148, citiesParentMesh);
    albero(scene, posx+70, posz+208, citiesParentMesh);
    albero(scene, posx+74, posz+250, citiesParentMesh);
    albero(scene, posx+72, posz+304, citiesParentMesh);
    albero(scene, posx+70, posz+348, citiesParentMesh);
    albero(scene, posx+70, posz+403, citiesParentMesh);
    albero(scene, posx+68, posz+458, citiesParentMesh);
}

function muro(scene, posx, posz, rotazione, citiesParentMesh) {
    var muro = BABYLON.MeshBuilder.CreateBox('muro', {width: 512, height: 16, depth: 3},scene);
    muro.material = bricks_rotated;
    muro.rotation.y = rotazione;
    muro.position.x = posx;
    muro.position.y = 7;
    muro.position.z = posz;
    muro.setParent(citiesParentMesh);
}

function casaAlta(scene, posx, posz, citiesParentMesh) {
    //console.log({x:posx, z:posz});
    palazzo.forEach(x => {
        let palazzo = x.clone('palazzo');
        palazzo.position.x = posx+32;
        palazzo.position.y = 30;
        palazzo.position.z = posz+32;
        palazzo.setParent(citiesParentMesh);
    });
}

function casaBassa(scene, posx, posz, citiesParentMesh) {
    casa.forEach(x => {
        let casa = x.clone('casa');
        casa.position.x = posx+25;
        casa.position.y = 14;
        casa.position.z = posz+25;
        casa.setParent(citiesParentMesh);
    });
}

function terrenoCitta(scene, posx, posz, citiesParentMesh) {
    var terrenoCitta = BABYLON.MeshBuilder.CreatePlane('terrenoCitta', {width: 512, height: 512},scene);
    terrenoCitta.material = cemento;
    terrenoCitta.position.x = posx;
    terrenoCitta.position.y = -0.79;
    terrenoCitta.position.z = posz;
    terrenoCitta.rotation.x = Math.PI/2;
    terrenoCitta.setParent(citiesParentMesh);
}

function prato(scene, posx, posz, citiesParentMesh) {
    var prato = BABYLON.MeshBuilder.CreatePlane('prato', {width: 128, height: 128},scene);
    prato.material = erba;
    prato.position.x = posx;
    prato.position.y = 2;
    prato.position.z = posz;
    prato.rotation.x = Math.PI/2;
    prato.setParent(citiesParentMesh);
}

function albero(scene, posx, posz, parent_mesh) {
    tronco(scene, posx, posz, parent_mesh);
    foglie(scene, posx, posz, parent_mesh);
}

function tronco(scene, posx, posz, parent_mesh) {
    var tronco = BABYLON.MeshBuilder.CreateCylinder('tronco', {height: 18, diameter: 6}, scene);
    tronco.material = wood;
    tronco.position.y = 8;
    tronco.position.x = posx;
    tronco.position.z = posz;
    tronco.setParent(parent_mesh);
}

function foglie(scene, posx, posz, parent_mesh) {
    var foglie = BABYLON.MeshBuilder.CreateCylinder('foglie', {height: 70, diameterTop: 4, diameterBottom: 30, tesselation: 50}, scene);
    foglie.material = fogliame;
    foglie.position.y = 48;
    foglie.position.x = posx;
    foglie.position.z = posz;
    foglie.setParent(parent_mesh);
}

function foresta(scene, posx, posz) {
    let parent_mesh = BABYLON.Mesh.CreateBox("box", 1.0, scene);    //a questa mesh ancoro tutta la foresta
    parent_mesh.isVisible = false;  //rendo l'ancora invisibile

    albero(scene, posx+160, posz+40, parent_mesh);
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
    albero(scene, posx+88, posz+158, parent_mesh);

    casaBassa(scene, posx+170, posz+380, parent_mesh);
    casaBassa(scene, posx+290, posz+20, parent_mesh);
    
    return parent_mesh;
}
