//variávveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 20;
let rBolinha = dBolinha / 2

//velocidade da bolinha
let velocidadexBolinha = 8;
let velocidadeyBolinha = 8;

//variáveis minha Raquete
let xMinharaquete = 5;
let yMinharaquete = 150;
let largMinharaquete = 10;
let compMinhaRaquete = 90;

//variáveis raquete Oponente
let xRaqueteoponente = 585;
let yRaqueteoponente = 150;
let largRaqueteoponente = 10;
let compRaqueteoponente = 90;
let velocidadeOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//variáveis sons
let raquetada;
let ponto;
let trilha;


let colidiu = false;

function preload (){
  trilha = loadSound ("trilha.mp3")
  ponto = loadSound ("ponto.mp3")
  raquetada = loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha()
  movimentoBolinha()
  reconhecerBorda() 
  mostraRaquete(xMinharaquete, yMinharaquete)
  movimentoMinharaquete()
  //reconhecerMinharaquete()
  colisaoRaquete(xMinharaquete, yMinharaquete)
  colisaoRaquete(xRaqueteoponente, yRaqueteoponente)
  mostraRaquete (xRaqueteoponente, yRaqueteoponente)
  movimentaRaqueteOponente();
  incluirPlacar();
  marcaPontos();
  //movimentaRaqueteOponenteMulti();
  bolinhaNaoFicaPresa();
  calculaChanceDeErrar();
}

function mostraBolinha() {
  circle(xBolinha,yBolinha,dBolinha);
}

function movimentoBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function reconhecerBorda(){
  if (xBolinha + rBolinha > width ||
     xBolinha - rBolinha < 0 ) {
    velocidadexBolinha *= -1;
  }
   if (yBolinha + rBolinha > height || 
      yBolinha - rBolinha < 0) {
     velocidadeyBolinha *= -1;
  } 
  if (yMinharaquete <= 1 || 
    yMinharaquete > 315) {
    yMinharaquete *= -1;
  }
  
  
}
   

function mostraRaquete(x,y){
  rect (x, y,largMinharaquete,compMinhaRaquete)

}

function movimentoMinharaquete(){
  if (keyIsDown (UP_ARROW)) {
    yMinharaquete -= 10
  }
  if (keyIsDown (DOWN_ARROW)){
    yMinharaquete += 10
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteoponente - compRaqueteoponente / 2 - 30;
  yRaqueteoponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponenteMulti () {
  if (keyIsDown (87)) {
    yRaqueteoponente -= 10
  }
  if (keyIsDown (83)){
    yRaqueteoponente += 10
  }
  
}



function reconhecerMinharaquete(){
  if (xBolinha - rBolinha < xMinharaquete + largMinharaquete &&
      yBolinha + rBolinha > yMinharaquete &&
     yBolinha + rBolinha < yMinharaquete + compMinhaRaquete){        velocidadexBolinha *= -1;
                                                  
  }
}
  
function colisaoRaquete(x,y) {
 colidiu = collideRectCircle(x, y, largMinharaquete, compMinhaRaquete, xBolinha, yBolinha, dBolinha);
   if (colidiu){
    velocidadexBolinha *= -1
  raquetada.play();
   }
   
 }

function incluirPlacar(){
  stroke(250);
  textAlign(CENTER);
  textSize (18);
  fill(color(255,140,0));
  rect (130,10,40,20);
  fill(255);
  text (meusPontos, 150, 26);
   fill(color(255,140,0));
  rect (430,10,40,20);
  fill(255);
  text (pontosOponente, 450, 26);
   
  
}

function marcaPontos(){
  if (xBolinha <= 10){
    pontosOponente += 1
  ponto.play();
}
  if (xBolinha >= 590){
    meusPontos += 1
  ponto.play();}

}

function bolinhaNaoFicaPresa(){
    if (xBolinha - rBolinha < 0){
    xBolinha = 23
    }
}

  
