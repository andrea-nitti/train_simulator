"use strict";
const listaCitta = ["Agrigento","Alessandria","Ancona","Aosta","Arezzo","Ascoli Piceno","Asti","Avellino","Bari","Barletta-Andria-Trani","Belluno","Benevento","Bergamo","Biella","Bologna","Bolzano","Brescia","Brindisi","Cagliari",
                  "Caltanissetta","Campobasso","Caserta","Catania","Catanzaro","Chieti","Como","Cosenza","Cremona","Crotone","Cuneo","Enna","Fermo","Ferrara","Firenze","Foggia","Forlì-Cesena","Frosinone","Genova","Gorizia","Grosseto",
                  "Imperia","Isernia","L'Aquila","La Spezia","Latina","Lecce","Lecco","Livorno","Lodi","Lucca","Macerata","Mantova","Massa-Carrara","Matera","Messina","Milano","Modena","Monza e Brianza","Napoli","Novara","Nuoro",
                  "Oristano","Palermo","Padova","Parma","Pavia","Perugia","Pesaro e Urbino","Pescara","Piacenza","Pisa","Pistoia","Pordenone","Potenza","Prato","Reggio Calabria","Ragusa","Ravenna","Reggio Emilia","Rieti","Rimini","Roma",
                  "Rovigo","Salerno","Sassari","Savona","Siena","Siracusa","Sondrio","Sud Sardegna","Taranto","Teramo","Terni","Torino","Trapani","Trento","Treviso","Trieste","Udine","Varese","Venezia","Verbano-Cusio-Ossola","Vercelli",
                  "Verona","Vibo Valentia","Vicenza","Viterbo","Tokyo","La citta' incantata","Akihabara","Namek","Valhalla","Asgard","Inferno","Purgatorio","Paradiso","Mosca","Via Lattea","Andromeda","Proxima Centauri","Luna","Marte",
                  "Cortemaggiore","Regno dei funghi","Essecorta"];

//Scritte sui cartelli
function createSigns(scene, glowHalo) {
    const listaCartelli = []; //salvo in un array tutte i transferNode dei cartelli
    for(let i=0; i<listaCitta.length; i++) {
        const signParentNode = new BABYLON.TransformNode("signParentNode", scene);
        const stationSignMaterial = new BABYLON.StandardMaterial("stationSignMaterial", scene);
        stationSignMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        const DTWidth = planeWidth * 60;      //i moltiplicatori sono uguali per mantenere l'aspect ratio
        const DTHeight = planeHeight * 60;
        const nome_stazione = listaCitta[i];
        for(let n=1; n<=2; n++) {   //creo due dynamicTextures (e due piani a cui ancorarle) poiché quella singola non sarebbe visibile da dietro quando la telecamera la oltrepassa
            const stationSignDynamicTexture = new BABYLON.DynamicTexture("stationSignDynamicTexture", {width: DTWidth, height: DTHeight}, scene);
            const ctx = stationSignDynamicTexture.getContext();
            ctx.font = "12px Arial";    //12 è la dimensione del font
            const larghezza_testo = ctx.measureText(nome_stazione).width + 7.5; //il valore +5 permette di lasciare un po' di bordo blu
            const font_size = Math.floor(DTWidth / (larghezza_testo / 12)); //larghezza_testo / size coincide con il ratio
            const font = font_size + "px Arial";
            //if(nome_stazione == undefined) stationSignDynamicTexture.drawText(nome_stazione, null, null, font, "#FF0000", "#000000", true);
            stationSignDynamicTexture.drawText(nome_stazione, null, null, font, "#FFFFFF", "#120A8F", true);    //text, position_x (0=left), position_y (0=bottom), font type, text color, background color, InvertY (default is true - y increases downwards)
            stationSignMaterial.diffuseTexture = stationSignDynamicTexture;
            const plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, scene);
            plane.material = stationSignMaterial;
            glowHalo.addExcludedMesh(plane);
            plane.position.x = -30;
            plane.position.y = 12.8;
            if(n==2) plane.rotation.y = Math.PI;
            plane.setParent(signParentNode);
        }
        signParentNode.position.z = -10000;
        listaCartelli.push(signParentNode);
    }
    return listaCartelli;
}
