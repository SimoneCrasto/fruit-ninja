var sword,swordImage;
var fruitGroup, fruit, fruit1, fruit2, fruit3, fruit4;
var enemyGroup, enemies, enemyImage;
var PLAY=1;
var END=0;
var gameState=1;
var gameOverImage;
var score=0;

function preload(){
   swordImage=loadImage("sword.png");
    fruit1=loadImage("fruit1.png")
    fruit2=loadImage("fruit2.png")
    fruit3=loadImage("fruit3.png")
    fruit4=loadImage("fruit4.png")
    enemyImage=loadAnimation("alien1.png","alien2.png")
  gameOverImage=loadImage("gameover.png")
}

function setup(){
   createCanvas(600, 600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}


function draw(){
  background("black");
  
  if(gameState===PLAY){
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    if (enemyGroup.isTouching(sword)){
      gameState=END;
    }
  }
  else if(gameState===END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
  }
  
  
  fruits();
  enemy();
  
  sword.y=World.mouseY
  sword.x=World.mouseX
  
drawSprites();
  
  fill("white");
  textSize(20)
  text("Score:"+ score,300,30)
}

function fruits(){
  if(World.frameCount%80===0){
    position=Math.round(random(1,2))
    fruit=createSprite(400,200,20,20);
    if(position==1){
      fruit.x=400
      fruit.velocityX=-(7+(score/4))
    }
    else { if (position==2){
      fruit.x=0
      fruit.velocityX=(7+(score/4))}
    }
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1);
      }
    else if (r == 2){
       fruit.addImage(fruit2);
       }
     else if (r == 3){
       fruit.addImage(fruit3);
      }
     else if (r == 4){
       fruit.addImage(fruit4);
       
    }
    fruit.y=Math.round(random(50,340));
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

   function enemy(){
     if (World.frameCount%200===0){
       enemies=createSprite(400,200,20,20);
       enemies.addAnimation("moving", enemyImage);
       enemies.y=Math.round(random(100,300));
        enemies.velocityX=-(8+(score/10))
       enemies.setLifetime=58;
       
       enemyGroup.add(enemies);
     }
   }