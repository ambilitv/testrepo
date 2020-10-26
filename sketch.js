
var gameState = "play";

var mask,corona,maskImage,coronaImage,player,playerimg,garden, gardenimg;
var maskGroup,coronaGroup;

var score,timer;


function preload(){
  
  
  maskImage = loadImage("mask.png");
  
  coronaImage = loadImage("coronavirus.png");
  
  playerimg =loadImage("girl.png");

  Playermaskimage =loadImage("girlwithmask.png");
  
  gardenimg = loadImage("grassbackground.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  ground = createSprite(width/2,height/2,width,height);
  ground.addImage(gardenimg);
  ground.scale=3;
  player = createSprite(200, height-115, 100,100);
  player.addImage(playerimg);
  //player.addImage(Playermaskimage);
  player.scale =0.2;
  //Create Timer     
  timer = 0;   
  
  maskGroup = new Group();
  coronaGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background("skyblue");
  
  
  //moving the player  
player.x = World.mouseX;
if(gameState ==="play"){  

  maskfall(); 
  coronafall();
  
}
//Player Catching mask  
if (maskGroup.isTouching(player)) {
    player.addImage(Playermaskimage);
    maskGroup.destroyEach();
    if(timer<0){
    timer =  4 ;
    }else{
      timer =timer+2;
    }
}
if(timer <= 0){
  player.addImage(playerimg);

}
//Setting timer
if(World.frameCount%60 ===0){
  timer = timer-1;
}

//Showering of mask & Corona  
  
drawSprites();

//Display Timer  
textSize(25);
text("Timer: " + timer, 275, 25);

//Player catching corona
if(timer <= 0 && player.isTouching(coronaGroup) ){
   background("lightblue");
   textSize(35);
   fill("blue");
   text("Game over", 400, 50);
   textSize(45);
   text("Wear mask when you go out!!!!", 400, 200)
   text("Prevent Covid 19!!!", 400, 250)
   corona.velocityY=0;
   mask.velocityY =0;
   scene.velocityY= 0;
   player.velocityX=0;
   player.setAnimation("kid_34_excited_1");
   gameState = "end";
  }
  
//Player resistant to corona  
if(timer>0){
    coronaGroup.bounceOff(player);
  }
  
}
  
function maskfall() {
  if(World.frameCount%60 ===0){
     mask =createSprite(150, 10, 200,200);
     mask.addImage(maskImage);
     mask.velocityY =5;
     mask.scale =0.25;
     mask.x = Math.round(random(0,width));
     mask.collide(player);
     maskGroup.add(mask);
   }
}

function coronafall() {
   if(World.frameCount%120 ===0){
     corona = createSprite(150, 10, 200,200);
     corona.addImage(coronaImage);
     corona.scale =0.15;
     corona.velocityY=4;
     corona.x = Math.round(random(0,width));
     player.depth = corona.depth;
     coronaGroup.add(corona);
   }
} 