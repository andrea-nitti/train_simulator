//Funzione per creare l'ambiente
function createEnvironment(scene, tipperc, posz) {
    var randomnum = Math.round(Math.random() * 100);
    //tip è per capire se il blocco prima era foresta o città
    //perc è per capire con quale percentuale si deve
    //generare il blocco prima
    if (tipperc[0] == 1) {
        //città, le percentuali saranno 100% (solo il primo blocco)
        //80% (2), 60% (3), 40% (4), 20% (da 5 in poi)
          if (tipperc[1] == 100) {
              cittaRandom(scene, 20, posz);
              cittaRandom(scene, -629.5, posz);
              tipperc = [1, 85];
              return tipperc;
          } else if (tipperc[1] == 85) {
              if (randomnum < 85) {
                cittaRandom(scene, 20, posz);
                cittaRandom(scene, -629.5, posz);
                tipperc = [1, 70];
                return tipperc;
              } else {
                forestaRandom(scene, 20, posz);
                forestaRandom(scene, -629.5, posz);
                tipperc = [0,95];
                return tipperc;
            }
          } else if (tipperc[1] == 70) {
            if (randomnum < 70) {
                cittaRandom(scene, 20, posz);
                cittaRandom(scene, -629.5, posz);
                tipperc = [1, 55];
                return tipperc;
            } else {
                forestaRandom(scene, 20, posz);
                forestaRandom(scene, -629.5, posz);
                tipperc = [0,95];
                return tipperc;
            }
          } else if (tipperc[1] == 55) {
            if (randomnum < 55) {
                cittaRandom(scene, 20, posz);
                cittaRandom(scene, -629.5, posz);
                tipperc = [1, 40];
                return tipperc;
            } else {
                forestaRandom(scene, 20, posz);
                forestaRandom(scene, -629.5, posz);
                tipperc = [0,95];
                return tipperc;
            }
          } else if (tipperc[1] == 40) {
            if (randomnum < 40) {
                cittaRandom(scene, 20, posz);
                cittaRandom(scene, -629.5, posz);
                tipperc = [1, 25];
                return tipperc;
            } else {
                forestaRandom(scene, 20, posz);
                forestaRandom(scene, -629.5, posz);
                tipperc = [0,95];
                return tipperc;
            }
          } else if (tipperc[1] == 25) {
            if (randomnum < 25) {
                cittaRandom(scene, 20, posz);
                cittaRandom(scene, -629.5, posz);
                tipperc = [1, 10];
                return tipperc;
            } else {
                forestaRandom(scene, 20, posz);
                forestaRandom(scene, -629.5, posz);
                tipperc = [0,95];
                return tipperc;
            }
          } else {
            if (randomnum < 10) {
                cittaRandom(scene, 20, posz);
                cittaRandom(scene, -629.5, posz);
                tipperc = [1, 10];
                return tipperc;
            } else {
                forestaRandom(scene, 20, posz);
                forestaRandom(scene, -629.5, posz);
                tipperc = [0,95]
                return tipperc;
            }
        }
    } else {
          //foresta, le percentuali saranno 100% (solo il primo blocco)
          //90% (2), 80% (3), 70% (4), 60% (5), 50% (6), 40% (7),
          //30% (8), 20% (9), 10% (da 10 in poi)
          if (tipperc[1] == 95) {
              if (randomnum < 95) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 90];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 90) {
              if (randomnum < 90) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 85];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 85) {
              if (randomnum < 85) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 80];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 80) {
              if (randomnum < 80) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 75];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 75) {
              if (randomnum < 75) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 70];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 70) {
              if (randomnum < 70) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 65];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 65) {
              if (randomnum < 65) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 60];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 60) {
              if (randomnum < 60) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 55];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 55) {
              if (randomnum < 55) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 50];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 50) {
              if (randomnum < 50) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 45];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 45) {
              if (randomnum < 45) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 40];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 40) {
              if (randomnum < 40) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 35];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 35) {
              if (randomnum < 35) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 30];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 30) {
              if (randomnum < 30) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 25];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 25) {
              if (randomnum < 25) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 20];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 20) {
              if (randomnum < 20) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 15];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 15) {
              if (randomnum < 15) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 10];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else if (tipperc[1] == 10) {
              if (randomnum < 10) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 5];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          } else {
              if (randomnum < 5) {
                  forestaRandom(scene, 20, posz);
                  forestaRandom(scene, -629.5, posz);
                  tipperc = [0, 5];
                  return tipperc;
              } else {
                  cittaRandom(scene, 20, posz);
                  cittaRandom(scene, -629.5, posz);
                  tipperc = [1,85]
                  return tipperc;
              }
          }
    }
}

function cittaRandom(scene, posx, posz) {
    var random = Math.round(Math.random()*100);
    switch (true) {
        case random < 100 && random > 73:
          cittaP1(scene, posx, posz);
          break;
        case random < 74 && random > 48:
          cittaP2(scene, posx, posz);
          break;
        case random < 49 && random > 23:
          cittaP3(scene, posx, posz);
          break;
        case random < 24 && random > -1:
          cittaP4(scene, posx, posz);
          break;
    }
}

function forestaRandom(scene, posx, posz) {
    var random = Math.round(Math.random()*100);
    switch (true) {
        case random < 100 && random > 65:
          forestaP1(scene, posx, posz);
          break;
        case random < 66 && random > 32:
          forestaP2(scene, posx, posz);
          break;
        case random < 33 && random > -1:
          forestaP3(scene, posx, posz);
          break;
    }
}
