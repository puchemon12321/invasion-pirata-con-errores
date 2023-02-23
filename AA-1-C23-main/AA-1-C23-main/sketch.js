const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls=[];
var boats=[];
var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;
var boatAnimation = [];
var boatSpritedata, boatSpritesheet;
//var boat;
/*var arreglo = [1,2,3,4,5,6,7,8]
console.log(arreglo);
console.log(arreglo,length);
console.push(10);
console.push(500);
console.log(arreglo);
arreglo.pop();
console.log(arreglo);*/

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpritedata=loadJSON("assets/boat/boat.json");
  boatSpritesheet=loadImage("assets/boat/boat.png")
  cannonExplosion = loadSound("./asset/cannon_explosion.mp3")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) { var pos = boatFrames[i].position;
  var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
  boatAnimation.push(img);
 }

  //boat = new Boat (width,height-100, 200,200,-100);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i=0; i < balls.length;i++){
    showCannonBalls(balls[i], i);
for (var j = 0; j < boats.length; j++) {
   if (balls[i] !== undefined && boats[j] !== undefined) {
     var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
      
     if (collision.collide) {
       boats[j].remove(j);
        Matter.World.remove(world, balls[i].body);
         balls.splice(i, 1);
          i--; 
        } 
      } 
    } 
  }
}

  cannon.display();
  //cannonBall.display();
  
  
showBoats();


  function keyReleased(){
 if(keyCode === DOWN_ARROW){
  //cannonBall.shot();
  balls[balls.length-1].shot()
 } 
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
     cannonBall = new CannonBall(cannon.x, cannon.y);
     balls.push(cannonBall);
     }
 }


function showCannonBalls(ball,index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height -50){
    Matter.World.remove(world, ball.body);
    balls.splice(index,1);
  }
}

function showBoats() { if (boats.length > 0) { if ( boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300 ) { var positions = [-40, -60, -70, -20]; var position = random(positions); var boat = new Boat( width, height - 100, 170, 170, position, boatAnimation ); boats.push(boat); } for (var i = 0; i < boats.length; i++) { Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 }); boats[i].display(); boats[i].animate(); } } else { var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation); boats.push(boat); } }
function gameover(){
 swal({
    title: `¡Fin del juego!`,
    confirmButtonText: "Jugar de nuevo"
  },
  function (isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  )

  
}

 