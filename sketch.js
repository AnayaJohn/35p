//Create variables here
var happyDog, dogImg;
var foodS, foodStock;
var database;

function preload()
{
  //load images here
  dogImg = loadImage("sprites/dogImg.png");
  happyDog= loadImage("sprites/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();

  foodObj = new Food(30,200);

  dog= createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.5



  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background(46, 139, 87);

  

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function (data){
   lastFed=data.val();
  });

  foodObj.display();



  drawSprites();

  textSize(25);
  fill(255,255,254);
  stroke("black"); 
  text("Food remaining : "+foodS,130,480);
  

  fill("white");
  text("Note: Press UP_ARROW Key to feed Dog",20,50);

  if(lastFed>=12){
    text("Last Fed: " +lastFed%12+ "PM",350,30)
  }
  else if(lastFed===0){
    text("Last Fed: 12 AM",350,30);
  }
  else{
    text("Last Fed: "+ lastFed +"AM",350,30)
  }
  //add styles here

  

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });
  
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



