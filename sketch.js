var trex, trex_running, trex_collided;
var ground, invisibleGround, CloudsGroup,ObstaclesGroup,gameOver,restart,jump,die, groundImage,imgCloud,ani1,ani2,ani3,ani4,ani5,ani6,gamesoverani,restartani;

 var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
   var score = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  imgCloud = loadImage ("cloud.png");
  groundImage = loadImage("ground2.png")
    ani1 = loadImage("obstacle1.png");
    ani2 = loadImage("obstacle2.png");
    ani3 = loadImage("obstacle3.png");
    ani4 = loadImage("obstacle4.png");
    ani5 = loadImage("obstacle5.png");
    ani6 = loadImage("obstacle6.png");
    gamesoverani = loadImage("gameOver.png");
    restartani = loadImage("restart.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
}

function setup() {
  createCanvas(800, 300);
  
  trex = createSprite(50,280,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);
  
  ground = createSprite(200,280,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
  ObstaclesGroup  = new Group ()
  CloudsGroup  = new Group ()
  
  gameOver = createSprite(400,180,20,20);
  gameOver.addImage(gamesoverani);
  restart = createSprite(400,150,20,20);
  restart.addImage(restartani);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
}

function draw() {
  background(180);
  text("score-"+score,350,50)
  
  
  if(gameState === PLAY){
    
  //  console.log(trex.y);
    if(keyDown("space")&& trex.y>=261) {
    trex.velocityY = -10;
    jump.play()  
  }
  
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -(6 + 3*score/100);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
      score = score + Math.round(getFrameRate()/60);
    
  spawnClouds ()
  
   spawnObstacles()
    
    gameOver.visible = false;
    restart.visible = false;
    
    if(ObstaclesGroup.isTouching(trex)){
     gameState = END;
   die.play()
      
    }
    
   }
  else if (gameState === END){
         
   ground.velocityX = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    gameOver.visible =  true;
    restart.visible = true;
    trex.changeAnimation("collided", trex_collided);

    if(mousePressedOver(restart)){
     reset();
  }
  } 
  
  
  
  trex.collide(invisibleGround);
   
  

  
  


  drawSprites();
}

function spawnClouds (){
  if(frameCount% 80 === 0){
   var clouds = createSprite(800,110,20,20); 
   clouds.addImage(imgCloud);
  clouds.velocityX = -5;
  CloudsGroup.add(clouds);
    
    
    
  }
  
  
}

function spawnObstacles (){
  if(frameCount% 80 === 0){
   var obstacle = createSprite(800,270,20,20); 
   obstacle.velocityX = -(6 + 3*score/100);
  ObstaclesGroup.add(obstacle);
 
    
    
    
  var r = Math.round(random(1,6));
  console.log(r);
    switch(r){
        
      case 1: obstacle.addImage(ani1);    
      break;
      
      case 2: obstacle.addImage(ani2);    
      break;
      
      case 3: obstacle.addImage(ani3);    
      break;
      
      case 4: obstacle.addImage(ani4);    
      break;
      
      case 5: obstacle.addImage(ani5);    
      break;
      
      case 6: obstacle.addImage(ani6);    
      break;
    
      
    
    }
    
    obstacle.scale  = 0.5;
   
    
    
  }
}

function reset(){
  gameState = PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
 trex.changeAnimation("running",trex_running);
  restart.visible = false;
  gameOver.visible = false;
  score = 0;
 
  
  }

