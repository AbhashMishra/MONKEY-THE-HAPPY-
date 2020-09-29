//to create variables
var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, rockGroup;
var survivalTime = 0;
var gameOver;
var score = 0;
var BS;
var gameOverSound;

function preload(){ 
  //to load monkey walking animation
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //to load the objects in the game
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  //to load image of gameover after touching the obstacle
  gameOver = loadImage("gameover.png");
  
  //to load sound for banana collecting
  BS = loadSound("096111088-game-coin-collect.m4a");
  
  //to load sound for the end;
  gameOverSound = loadSound("game-over-sound-effect.mp3");
}

function setup() {
  //to create canvas
  createCanvas(400, 400);
  
  //to create a image of gameover
  GO = createSprite(225,130,0,0);
  GO.addImage(gameOver);
  GO.scale = 0.4;
  GO.visible = false;
  
  //to create green grass
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
    
  //to create a sprite for monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  //to create survival time which counts that how longer does monkey has   survive in this game
  survivalTime = 0;
  
  //to create a score means that how many bananas does monkey has         collected
  score = 0;
  
  //to create a group of rock means obstacle.  
  rockGroup = createGroup();
  
  //to create a group of banana
  bananaGroup = createGroup();
  
}

function draw() {
  //to give white colour to the background
  background("white");
  
  //to give a stroke,textSize and colour for survival time text
  stroke("black");
  textSize(20);
  fill("black");
  
  //to create a gameState for PLAY
  if (gameState === PLAY) {
    //to call the functions
    Banana();
    Rock();
    //to create a if condition for banana that if monkey touches the         banana so the score will update as score 1; 
    if(bananaGroup.isTouching(monkey)) {
       bananaGroup.destroyEach();
       BS.play();
       score = score + 1;
    }  
   
   //to write text for survival time 
   text("Survival Time : "+ survivalTime,125,40);
    
   //to give a stroke,textSize and colour for score text 
   stroke("black");
   textSize(15);
   fill("black");
   //to write text for score
   text("Score : " + score,173,60);
    
   //to create a formula where survival time will update after 80 frames
   survivalTime = survivalTime + Math.round(getFrameRate()/60);
   
  //to create a if condition for monkey's jump effect by                   pressing space
  if(keyDown("space")&& monkey.y >= 100) {
     monkey.velocityY = -12;
  }
    
  //to give a gravity to the monkey  
  monkey.velocityY = monkey.velocityY + 0.8;
    
  //to give monkey collide with the ground  
  monkey.collide(ground);
    
  //to create a infinite ground
  if(ground.x < 0) {
     ground.x = ground.width/2;
  }  

  if(rockGroup.isTouching(monkey)) {
     gameState = END;
  }  
} 
else 
// to create a gamestate for End  
if(gameState === END) {                         
   monkey.velocityX = 0;
   monkey.velocityY = 0;
  
   bananaGroup.setLifetimeEach(-1);
   rockGroup.setLifetimeEach(-1);
  
   bananaGroup.setVelocityXEach(0);
   rockGroup.setVelocityXEach(0);
   
   survivalTime = 0;
  
   GO.visible = true;
  
   monkey.collide(ground);
   
   ground.velocityX = 0;
   score = 0;
}
  
  //to create the sprites
  drawSprites();
  
}
//to create a function for banana
function Banana(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,100,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    
    banana.y = Math.round(random(30,300));
   
    banana.velocityX = -7;
    banana.setLifetime = 100;
    
    //to add bananas to the new group
    bananaGroup.add(banana);
  }
}
//to create a function for rock means the obstacle
function Rock(){
  if(frameCount % 120 === 0){
    rock = createSprite(400,310,20,20);
    rock.addImage(obstaceImage);
    rock.scale=0.2;
   
    rock.velocityX=-7;
    rock.setLifetime=100;
    
    //to add rock means obstacle to the new group
    rockGroup.add(rock);
  }
}