"use strict";
const cityList = ["Agrigento","Alessandria","Ancona","Aosta","Arezzo","Ascoli Piceno","Asti","Avellino","Bari","Barletta-Andria-Trani","Belluno","Benevento","Bergamo","Biella","Bologna","Bolzano","Brescia","Brindisi","Cagliari",
                  "Caltanissetta","Campobasso","Caserta","Catania","Catanzaro","Chieti","Como","Cosenza","Cremona","Crotone","Cuneo","Enna","Fermo","Ferrara","Firenze","Foggia","Forlì-Cesena","Frosinone","Genova","Gorizia","Grosseto",
                  "Imperia","Isernia","L'Aquila","La Spezia","Latina","Lecce","Lecco","Livorno","Lodi","Lucca","Macerata","Mantova","Massa-Carrara","Matera","Messina","Milano","Modena","Monza e Brianza","Napoli","Novara","Nuoro",
                  "Oristano","Palermo","Padova","Parma","Pavia","Perugia","Pesaro e Urbino","Pescara","Piacenza","Pisa","Pistoia","Pordenone","Potenza","Prato","Reggio Calabria","Ragusa","Ravenna","Reggio Emilia","Rieti","Rimini","Roma",
                  "Rovigo","Salerno","Sassari","Savona","Siena","Siracusa","Sondrio","Sud Sardegna","Taranto","Teramo","Terni","Torino","Trapani","Trento","Treviso","Trieste","Udine","Varese","Venezia","Verbano-Cusio-Ossola","Vercelli",
                  "Verona","Vibo Valentia","Vicenza","Viterbo","Tokyo","La citta' incantata","Akihabara","Namek","Valhalla","Asgard","Inferno","Purgatorio","Paradiso","Mosca","Via Lattea","Andromeda","Proxima Centauri","Luna","Marte",
                  "Cortemaggiore","Regno dei funghi","Essecorta"];

function createSigns(scene, glowHalo) {
    const signList = [];    //all signs transfer nodes are saved inside a single array
    for(let i=0; i<cityList.length; i++) {
        const signParentNode = new BABYLON.TransformNode("signParentNode", scene);
        const stationSignMaterial = new BABYLON.StandardMaterial("stationSignMaterial", scene);
        stationSignMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        const DTWidth = planeWidth * 60;    //multipliers are identical to mantain the aspect ratio
        const DTHeight = planeHeight * 60;
        const stationName = cityList[i];
        for(let n=1; n<=2; n++) {   //two dynamicTextures (and two planes) are needed because a single one isn't transparent
            const stationSignDynamicTexture = new BABYLON.DynamicTexture("stationSignDynamicTexture", {width: DTWidth, height: DTHeight}, scene);
            const ctx = stationSignDynamicTexture.getContext();
            ctx.font = "12px Arial";    //'12' indicates the font dimension
            const textWidth = ctx.measureText(stationName).width + 7.5; //'+7.5' allows to leave some border space
            const fontSize = Math.floor(DTWidth / (textWidth / 12));    //textWidth / size is the ratio
            const font = fontSize + "px Arial";
            //if(stationName == undefined) stationSignDynamicTexture.drawText(stationName, null, null, font, "#FF0000", "#000000", true);
            stationSignDynamicTexture.drawText(stationName, null, null, font, "#FFFFFF", "#120A8F", true);    //text, position_x (0=left), position_y (0=bottom), font type, text color, background color, InvertY (default is true - y increases downwards)
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
        signList.push(signParentNode);
    }
    return signList;
}
