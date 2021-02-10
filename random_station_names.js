//Funzione per sceglere il nome della prossima stazione
let listaCitta = ["Agrigento","Alessandria","Ancona","Aosta","Arezzo","Ascoli Piceno","Asti","Avellino","Bari","Barletta-Andria-Trani","Belluno","Benevento","Bergamo","Biella","Bologna","Bolzano","Brescia","Brindisi","Cagliari",
                  "Caltanissetta","Campobasso","Caserta","Catania","Catanzaro","Chieti","Como","Cosenza","Cremona","Crotone","Cuneo","Enna","Fermo","Ferrara","Firenze","Foggia","Forlì-Cesena","Frosinone","Genova","Gorizia","Grosseto",
                  "Imperia","Isernia","L'Aquila","La Spezia","Latina","Lecce","Lecco","Livorno","Lodi","Lucca","Macerata","Mantova","Massa-Carrara","Matera","Messina","Milano","Modena","Monza e Brianza","Napoli","Novara","Nuoro",
                  "Oristano","Palermo","Padova","Parma","Pavia","Perugia","Pesaro e Urbino","Pescara","Pisa","Pistoia","Pordenone","Potenza","Prato","Reggio Calabria","Ragusa","Ravenna","Reggio Emilia","Rieti","Rimini","Roma","Rovigo",
                  "Salerno","Sassari","Savona","Siena","Siracusa","Sondrio","Sud Sardegna","Taranto","Teramo","Terni","Torino","Trapani","Trento","Treviso","Trieste","Udine","Varese","Venezia","Verbano-Cusio-Ossola","Vercelli",
                  "Verona","Vibo Valentia","Vicenza","Viterbo"];

function stationName() {
    let index = Math.floor(Math.random() * listaCitta.length);
    let station_name = listaCitta[index];
    listaCitta.splice(index, 1);    //il primo parametro indica la posizione dell'elemento nell'array; il secondo dice quanti elementi sono da rimuovere
    return station_name;
}
