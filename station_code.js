//Funzione per creare la stazione
function createStation(scene) {
    let parent_mesh = BABYLON.Mesh.CreateBox("box", 1.0, scene);    //a questa mesh ancoro tutta la stazione
    parent_mesh.isVisible = false;  //rendo l'ancora invisibile
    
    const planeWidth = 10;
    const planeHeight = 3;
    z_offset = 0 * chunk_size;
    
    let sostegno_v = BABYLON.MeshBuilder.CreateCylinder('sostegno_v', {diameter: 0.8, height: 8}, scene);   //palo di sostegno per il cartello
    sostegno_v.position.x = -30;
    sostegno_v.position.y = 7.2;
    sostegno_v.position.z = (z_offset + chunk_size) - 20;
    sostegno_v.setParent(parent_mesh);
        
    let sostegno_h = BABYLON.MeshBuilder.CreateCylinder('sostegno_h', {diameter: 0.8, height: planeWidth+1}, scene);   //parte verticale sopra il palo
    sostegno_h.rotation.z = Math.PI/2;
    sostegno_h.position.x = -30;
    sostegno_h.position.y = 11.2;
    sostegno_h.position.z = (z_offset + chunk_size) - 20;
    sostegno_h.setParent(parent_mesh);
    
    for(x_offset=-(planeWidth/2); x_offset<=(planeWidth/2); x_offset+=planeWidth) {
        let sost_v = BABYLON.MeshBuilder.CreateCylinder('sost_v', {diameter: 0.4, height: 3.2}, scene);   //bordi della scritta
        sost_v.position.x = x_offset - 30;
        sost_v.position.y = 12.8;
        sost_v.position.z = (z_offset + chunk_size) - 20;
        sost_v.setParent(parent_mesh);
    }
    
    for(let x_offset=-30; x_offset<=30; x_offset+=60) {
        let pavimentazione = BABYLON.MeshBuilder.CreateBox('pavimentazione', {height:4, width:25, depth: 3*chunk_size}, scene);
        pavimentazione.position.x = x_offset;
        pavimentazione.position.y = 1.2;
        pavimentazione.position.z = z_offset + chunk_size;
        pavimentazione.setParent(parent_mesh);
        
        let linea_gialla = BABYLON.MeshBuilder.CreatePlane('linea_gialla', {height: 3*chunk_size, width: 4, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        linea_gialla.material = colori(scene, 7);
        linea_gialla.rotation.x = Math.PI/2;
        if (x_offset < 0) linea_gialla.position.x = x_offset + 7.5;
        else linea_gialla.position.x = x_offset - 7.5;
        linea_gialla.position.y = 3.201;
        linea_gialla.position.z = z_offset + chunk_size;
        linea_gialla.setParent(parent_mesh);
        
        for(let ramp_z_offset=-3*chunk_size; ramp_z_offset<=3*chunk_size; ramp_z_offset+=6*chunk_size) {
            let rampa = BABYLON.MeshBuilder.CreatePolyhedron('rampa',{custom: {"vertex" : [[12,0,0],[-12,0,0],[12,0,50],[-12,0,50],[12,8,0],[-12,8,0]],"face" : [[1,0,2,3],[3,2,4,5],[5,4,0,1],[0,4,2],[1,3,5]]},size: 0.5},scene); //tratto dal file "shape_1.js"
            if (x_offset < 0) rampa.position.x = x_offset + 6.5;
            else rampa.position.x = x_offset - 6.5;
            rampa.position.y = -0.8;
            if(ramp_z_offset < 0) {
                rampa.rotation.y = Math.PI;
                rampa.position.z = (z_offset + chunk_size) + ramp_z_offset / 2;
            }
            else rampa.position.z = (z_offset + chunk_size) + ramp_z_offset / 2;
            rampa.setParent(parent_mesh);
        }
        //creazione di cartelli di pericolo (solo presso alcune stazioni)
        let pannello = BABYLON.MeshBuilder.CreatePlane('pannello', {width: 6, height: 2}, scene);
        if(x_offset < 0) pannello.rotation.y = Math.PI;
        pannello.material = colori(scene, 12);
        pannello.position.x = -18.5;
        pannello.position.y = 21;
        pannello.position.z = 0;
        pannello.setParent(parent_mesh);
    }
    let edificio = BABYLON.MeshBuilder.CreateBox('edificio', {height:25, width:30, depth: 3*chunk_size}, scene);
    edificio.material = colori(scene, 11);
    edificio.position.x = x_offset + 30 + 25/2;
    edificio.position.y = 25/2 - 0.8;
    edificio.position.z = z_offset + chunk_size;
    edificio.setParent(parent_mesh);
    let tettoia = BABYLON.MeshBuilder.CreateBox('tettoia', {height:0.65, width:12.5, depth: 3*chunk_size}, scene);
    tettoia.position.x = x_offset + 25/2 + 9;
    tettoia.position.y = 19;
    tettoia.position.z = z_offset + chunk_size;
    tettoia.setParent(parent_mesh);
    let cuneo = BABYLON.MeshBuilder.CreatePolyhedron('cuneo',{custom: {"vertex" : [[2,0,0],[0,0,0],[2,-2,0],[2,-2,6*chunk_size],[2,0,6*chunk_size],[0,0,6*chunk_size]],"face" : [[1,0,2,3],[3,2,4,5],[5,4,0,1],[0,4,2],[1,3,5]]},size: 0.5},scene);
    cuneo.position.x = x_offset + 26.5;
    cuneo.position.y = 18.675;
    cuneo.position.z = z_offset - chunk_size/2;
    cuneo.setParent(parent_mesh);
    return parent_mesh;
}
