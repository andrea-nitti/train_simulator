//////////////////////////// ! ! ! ! ! ZONA CITTÀ ! ! ! ! ! ////////////////////////////

//////////////////////////// ! ! ! ! ! ZONA CITTÀ ! ! ! ! ! ////////////////////////////

//////////////////////////// ! ! ! ! ! ZONA CITTÀ ! ! ! ! ! ////////////////////////////

function cittaP1(scene, posx, posz) {
    casaAlta(scene, posx+64, posz);
    casaAlta(scene, posx+64, posz+80);
    casaAlta(scene, posx+64, posz+160);
    casaAlta(scene, posx+160, posz);
    casaAlta(scene, posx+160, posz+80);
    casaAlta(scene, posx+160, posz+160);
    casaAlta(scene, posx+260, posz+324);
    casaAlta(scene, posx+460, posz+80);
    casaAlta(scene, posx+430, posz+160);
    casaAlta(scene, posx+470, posz+300);
    casaAlta(scene, posx+380, posz+420);

    casaBassa(scene, posx+70, posz+418);
    casaBassa(scene, posx+140, posz+418);
    casaBassa(scene, posx+208, posz+422);
    casaBassa(scene, posx+280, posz+422);
    casaBassa(scene, posx+266, posz+264);
    casaBassa(scene, posx+342, posz+264);
    casaBassa(scene, posx+340, posz+330);
    casaBassa(scene, posx+240, posz+12);
    casaBassa(scene, posx+302, posz+10);
    casaBassa(scene, posx+360, posz+8);
    casaBassa(scene, posx+420, posz+8);
    casaBassa(scene, posx+482, posz+12);
    casaBassa(scene, posx+478, posz+240);
    casaBassa(scene, posx+458, posz+382);

    prato(scene, posx+140, posz+326, colori(scene, 6));
    prato(scene, posx+330, posz+160, colori(scene, 6));

    terrenoCitta(scene, posx+302.5, posz+240);

    muro(scene, posx+48, posz+240, Math.PI/2);
    muro(scene, posx+560, posz+240, Math.PI/2);
}

function cittaP2(scene, posx, posz) {

    casaBassa(scene, posx+70, posz+20);
    casaBassa(scene, posx+70, posz+100);
    casaBassa(scene, posx+86, posz+180);
    casaBassa(scene, posx+90, posz+260);
    casaBassa(scene, posx+78, posz+340);
    casaBassa(scene, posx+86, posz+420);

    casaBassa(scene, posx+474, posz+20);
    casaBassa(scene, posx+480, posz+100);
    casaBassa(scene, posx+474, posz+180);
    casaBassa(scene, posx+488, posz+260);
    casaBassa(scene, posx+490, posz+340);
    casaBassa(scene, posx+478, posz+420);

    prato(scene, posx+240, posz+50, colori(scene, 6));
    prato(scene, posx+240, posz+178, colori(scene, 6));
    prato(scene, posx+368, posz+50, colori(scene, 6));
    prato(scene, posx+368, posz+178, colori(scene, 6));
    prato(scene, posx+240, posz+306, colori(scene, 6));
    prato(scene, posx+240, posz+434, colori(scene, 6));
    prato(scene, posx+368, posz+306, colori(scene, 6));
    prato(scene, posx+368, posz+434, colori(scene, 6));

    terrenoCitta(scene, posx+302.5, posz+240);

    muro(scene, posx+48, posz+240, Math.PI/2);
    muro(scene, posx+560, posz+240, Math.PI/2);
}

function cittaP3(scene, posx, posz) {

    casaAlta(scene, posx+400, posz+334);
    casaAlta(scene, posx+400, posz+254);
    casaAlta(scene, posx+400, posz+170);
    casaAlta(scene, posx+400, posz+84);
    casaAlta(scene, posx+320, posz+84);
    casaAlta(scene, posx+236, posz+84);
    casaAlta(scene, posx+150, posz+84);
    casaAlta(scene, posx+150, posz+170);
    casaAlta(scene, posx+150, posz+254);
    casaAlta(scene, posx+150, posz+334);
    casaAlta(scene, posx+236, posz+334);
    casaAlta(scene, posx+320, posz+334);

    casaAlta(scene, posx+54, posz-6);

    casaBassa(scene, posx+150, posz+0);
    casaBassa(scene, posx+214, posz+0);
    casaBassa(scene, posx+276, posz-2);
    casaAlta(scene, posx+338, posz-6);
    casaBassa(scene, posx+410, posz+0);

    casaBassa(scene, posx+492, posz+0);

    casaAlta(scene, posx+486, posz+84);
    casaBassa(scene, posx+492, posz+154);
    casaBassa(scene, posx+494, posz+220);
    casaAlta(scene, posx+492, posz+280);
    casaBassa(scene, posx+492, posz+350);

    casaBassa(scene, posx+492, posz+432);

    casaBassa(scene, posx+150, posz+432);
    casaBassa(scene, posx+216, posz+432);
    casaAlta(scene, posx+274, posz+426);
    casaBassa(scene, posx+342, posz+432);
    casaBassa(scene, posx+412, posz+434);

    casaBassa(scene, posx+60, posz+432);

    casaBassa(scene, posx+62, posz+92);
    casaAlta(scene, posx+60, posz+150);
    casaBassa(scene, posx+60, posz+216);
    casaBassa(scene, posx+60, posz+280);
    casaBassa(scene, posx+62, posz+350);

    prato(scene, posx+300, posz+240, colori(scene, 6));

    terrenoCitta(scene, posx+302.5, posz+240);

    muro(scene, posx+48, posz+240, Math.PI/2);
    muro(scene, posx+560, posz+240, Math.PI/2);
}

function cittaP4(scene, posx, posz) {

    casaBassa(scene, posx+142, posz-4);
    casaBassa(scene, posx+202, posz-4);
    casaBassa(scene, posx+262, posz-4);
    casaBassa(scene, posx+320, posz-6);
    casaBassa(scene, posx+382, posz-4);
    casaBassa(scene, posx+442, posz-2);
    casaBassa(scene, posx+500, posz-2);

    casaBassa(scene, posx+502, posz+90);
    casaBassa(scene, posx+500, posz+150);
    casaBassa(scene, posx+500, posz+210);
    casaBassa(scene, posx+502, posz+302);
    casaBassa(scene, posx+500, posz+358);
    casaBassa(scene, posx+504, posz+438);

    casaBassa(scene, posx+410, posz+92);
    casaBassa(scene, posx+410, posz+152);
    casaBassa(scene, posx+410, posz+210);
    casaBassa(scene, posx+408, posz+302);
    casaBassa(scene, posx+410, posz+360);
    casaBassa(scene, posx+408, posz+440);

    casaBassa(scene, posx+142, posz+92);
    casaBassa(scene, posx+144, posz+150);
    casaBassa(scene, posx+144, posz+208);
    casaBassa(scene, posx+140, posz+298);
    casaBassa(scene, posx+140, posz+362);
    casaBassa(scene, posx+142, posz+442);

    casaBassa(scene, posx+338, posz+300);
    casaBassa(scene, posx+278, posz+302);
    casaBassa(scene, posx+210, posz+302);

    casaBassa(scene, posx+342, posz+362);
    casaBassa(scene, posx+280, posz+360);
    casaBassa(scene, posx+210, posz+362);

    casaBassa(scene, posx+340, posz+440);
    casaBassa(scene, posx+280, posz+442);
    casaBassa(scene, posx+208, posz+440);

    prato(scene, posx+340, posz+156, colori(scene, 6));
    prato(scene, posx+260, posz+156, colori(scene, 6));
    prato(scene, posx+340, posz+200, colori(scene, 6));
    prato(scene, posx+260, posz+200, colori(scene, 6));

    terrenoCitta(scene, posx+302.5, posz+240);

    muro(scene, posx+48, posz+240, Math.PI/2);
    muro(scene, posx+560, posz+240, Math.PI/2);
}

function muro(scene, posx, posz, rotazione) {
    var muro = BABYLON.MeshBuilder.CreateBox('muro', {width: 512, height: 16, depth: 3},scene);
    muro.rotation.y = rotazione;
    muro.position.x = posx;
    muro.position.y = 7;
    muro.position.z = posz;
}

function casaAlta(scene, posx, posz) {
    casaAltaLato(scene, posx+32, 30, posz, 0, 0, colori(scene, 2));
    casaAltaLato(scene, posx, 30, posz+32, Math.PI/2, 0, colori(scene, 2));
    casaAltaLato(scene, posx+32, 30, posz+64, Math.PI, 0, colori(scene, 2));
    casaAltaLato(scene, posx+64, 30, posz+32, (Math.PI/2)*3, 0, colori(scene, 2));
    casaAltaLato(scene, posx+32, 62, posz+32, 0, Math.PI/2, colori(scene, 2));
}

function casaBassa(scene, posx, posz) {
    casaBassaLato(scene, posx+25, posz, 0, colori(scene, 1));
    casaBassaLato(scene, posx, posz+25, Math.PI/2, colori(scene, 1));
    casaBassaLato(scene, posx+25, posz+50, Math.PI, colori(scene, 1));
    casaBassaLato(scene, posx+50, posz+25, (Math.PI/2)*3, colori(scene, 1));

    casaBassaTetto(scene, posx+25, posz+12.4, 0, colori(scene, 4));
    casaBassaTetto(scene, posx+25, posz+37.1, Math.PI, colori(scene, 4));

    casaBassaTriangolo(scene, posx, posz+24.8, Math.PI/2, colori(scene, 1));
    casaBassaTriangolo(scene, posx+50, posz+24.8, (Math.PI/2)*3, colori(scene, 1));
}

function casaAltaLato(scene, posx, posy, posz, rotazioney, rotazionex, colore) {
    var casaAltaLato = BABYLON.MeshBuilder.CreatePlane('casaAltaLato', {width: 64, height: 64} ,scene);
    casaAltaLato.material = colore;
    casaAltaLato.position.x = posx;
    casaAltaLato.position.y = posy;
    casaAltaLato.position.z = posz;
    casaAltaLato.rotation.y = rotazioney;
    casaAltaLato.rotation.x = rotazionex;
}

function casaBassaLato(scene, posx, posz, rotazione, colore) {
    var casaBassaLato = BABYLON.MeshBuilder.CreatePlane('casaBassaLato', {width: 50, height: 30} ,scene);
    casaBassaLato.material = colore;
    casaBassaLato.position.x = posx;
    casaBassaLato.position.y = 14;
    casaBassaLato.position.z = posz;
    casaBassaLato.rotation.y = rotazione;
}

function casaBassaTetto(scene, posx, posz, rotazione, colore) {
    var casaBassaTetto = BABYLON.MeshBuilder.CreatePlane('casaBassaTetto', {width: 50, height: 35} ,scene);
    casaBassaTetto.position.x = posx;
    casaBassaTetto.position.y = 41.2;
    casaBassaTetto.position.z = posz;
    casaBassaTetto.rotation.y = rotazione;
    casaBassaTetto.rotation.x = Math.PI/4;
    casaBassaTetto.material = colore;
}

function casaBassaTriangolo(scene, posx, posz, rotazione, colore) {
    var casaBassaTriangolo = BABYLON.MeshBuilder.CreatePlane('casaBassaTriangolo', {width: 35, height: 35} ,scene);
    casaBassaTriangolo.position.x = posx;
    casaBassaTriangolo.position.y = 29;
    casaBassaTriangolo.position.z = posz;
    casaBassaTriangolo.rotation.y = rotazione;
    casaBassaTriangolo.rotation.z = Math.PI/4;
    casaBassaTriangolo.material = colore;
}

function terrenoCitta(scene, posx, posz, colore) {
    var terrenoCitta = BABYLON.MeshBuilder.CreatePlane('terrenoCitta', {width: 512, height: 512},scene);
    terrenoCitta.position.x = posx;
    terrenoCitta.position.y = -1;
    terrenoCitta.position.z = posz;
    terrenoCitta.rotation.x = Math.PI/2;
}

function prato(scene, posx, posz, colore) {
    var prato = BABYLON.MeshBuilder.CreatePlane('prato', {width: 128, height: 128},scene);
    prato.position.x = posx;
    prato.position.y = 2;
    prato.position.z = posz;
    prato.rotation.x = Math.PI/2;
    prato.material = colore;

}
