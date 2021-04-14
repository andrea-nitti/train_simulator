//Funzione per sceglere il nome della prossima stazione
const listaCitta = ["Agrigento","Alessandria","Ancona","Aosta","Arezzo","Ascoli Piceno","Asti","Avellino","Bari","Barletta-Andria-Trani","Belluno","Benevento","Bergamo","Biella","Bologna","Bolzano","Brescia","Brindisi","Cagliari",
                  "Caltanissetta","Campobasso","Caserta","Catania","Catanzaro","Chieti","Como","Cosenza","Cremona","Crotone","Cuneo","Enna","Fermo","Ferrara","Firenze","Foggia","Forlì-Cesena","Frosinone","Genova","Gorizia","Grosseto",
                  "Imperia","Isernia","L'Aquila","La Spezia","Latina","Lecce","Lecco","Livorno","Lodi","Lucca","Macerata","Mantova","Massa-Carrara","Matera","Messina","Milano","Modena","Monza e Brianza","Napoli","Novara","Nuoro",
                  "Oristano","Palermo","Padova","Parma","Pavia","Perugia","Pesaro e Urbino","Pescara","Piacenza","Pisa","Pistoia","Pordenone","Potenza","Prato","Reggio Calabria","Ragusa","Ravenna","Reggio Emilia","Rieti","Rimini","Roma",
                  "Rovigo","Salerno","Sassari","Savona","Siena","Siracusa","Sondrio","Sud Sardegna","Taranto","Teramo","Terni","Torino","Trapani","Trento","Treviso","Trieste","Udine","Varese","Venezia","Verbano-Cusio-Ossola","Vercelli",
                  "Verona","Vibo Valentia","Vicenza","Viterbo","Tokyo","La citta' incantata","Akihabara","Namek","Valhalla","Asgard","Inferno","Purgatorio","Paradiso","Mosca","Via Lattea","Andromeda","Proxima Centauri","Luna","Marte",
                  "Cortemaggiore","Regno dei funghi","Essecorta"];

//scritte sul cartello (tratto da https://doc.babylonjs.com/divingDeeper/materials/using/dynamicTexture)
function createSigns(scene) {
    let listaCartelli = []; //salvo in un array tutte le parent_mesh dei cartelli
    for(let i=0; i<listaCitta.length; i++) {
        let parent_mesh = BABYLON.Mesh.CreateBox("box", 1.0, scene);    //a questa mesh ancoro il cartello
        parent_mesh.isVisible = false;  //rendo l'ancora invisibile
        const material = new BABYLON.StandardMaterial("material", scene);
        material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        const planeWidth = 10;
        const planeHeight = 3;
        let DTWidth = planeWidth * 60;      //i moltiplicatori sono uguali per mantenere l'aspect ratio
        let DTHeight = planeHeight * 60;
        let nome_stazione = listaCitta[i];
        for(let n=1; n<=2; n++) {   //creo due dynamicTextures (e due piani a cui ancorarle) poiché quella singola non sarebbe visibile da dietro quando la telecamera la oltrepassa
            let dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene);
            let ctx = dynamicTexture.getContext();
            ctx.font = "12px Arial";    //12 è la dimensione del font
            let larghezza_testo = ctx.measureText(nome_stazione).width + 7.5; //il valore +5 permette di lasciare un po' di bordo blu
            let font_size = Math.floor(DTWidth / (larghezza_testo / 12)); //larghezza_testo / size coincide con il ratio
            let font = font_size + "px Arial";
            //if(nome_stazione == undefined) dynamicTexture.drawText(nome_stazione, null, null, font, "#FF0000", "#000000", true);
            dynamicTexture.drawText(nome_stazione, null, null, font, "#FFFFFF", "#120A8F", true);   //text, position_x (0=left), position_y (0=bottom), font type, text color, background color, InvertY (default is true - y increases downwards)
            material.diffuseTexture = dynamicTexture;
            let plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, scene);
            plane.material = material;
            plane.position.x = -30;
            plane.position.y = 12.8;
            //plane.position.z = (z_offset + chunk_size) - 20;
            if(n==2) plane.rotation.y = Math.PI;
            plane.setParent(parent_mesh);
        }
        parent_mesh.position.z = -10000;
        listaCartelli.push(parent_mesh);
    }
    return listaCartelli;
}
