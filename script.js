//global variables:
const canvas = document.getElementById('pong');

const context = canvas.getContext('2d');

//objects:
const net = {
    x: (canvas.width)/2,
    y: 0,
    width: 2,
    height: 10,
    color: 'white'
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    vx: 5,
    vy: 5,
    radius: 5,
    speed: 20,
    color: 'white',
    }

const user = {
    x: 0, 
    y: (canvas.height - 100) / 2,
    width: 20,
    height: 100,
    color: 'white',
    score: 0,
    }

const computer = {
   x: canvas.width - 20,
   y: (canvas.height - 100) / 2,
   width: 20,
   height: 100,
   color: 'white',
   score: 0
    }

let player = (ball.x + ball.radius < canvas.width/2) ? user : computer;

//functions:

function resetBall() {
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.vx = 5;
}

function drawScore(newScore, x, y) {
  context.fillStyle = 'white';
  context.font = '70px arial';
  context.fillText(newScore, x, y);
}

function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function drawNet() {
  for(let i = 0; i <= canvas.height; i+=15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

const drawBall = function(ball) {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  context.closePath();
  context.fillStyle = ball.color;
  context.fill();
}

const drawUserPaddle = function(user) {
  context.beginPath();
  context.fillRect(user.x, user.y, user.width, user.height)
  context.closePath();
  context.fillStyle = user.color;
  context.fill();
}

const drawComputerPaddle = function(computer) {
  context.beginPath();
  context.fillRect(computer.x, computer.y, computer.width, computer.height)
  context.closePath();
  context.fillStyle = computer.color;
  context.fill();
}

const hitDetectionUser = (ball, user) => {
  return user.x < (ball.x + ball.radius) &&
  user.y < (ball.y + ball.radius) &&
  (user.x + user.width) > ball.x - ball.radius &&
  (user.y + user.height) > ball.y - ball.radius
}

const hitDetectionComputer = (ball, computer) => {
  return computer.x < (ball.x + ball.radius) &&
  computer.y < (ball.y + ball.radius) &&
  (computer.x + computer.width) > ball.x - ball.radius &&
  (computer.y + computer.height) > ball.y - ball.radius
}

//rendering:
function draw() {
  context.clearRect(0,0, canvas.width, canvas.height);

  drawNet();
  
  drawBall(ball);
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
  
  drawUserPaddle(user);
  user.x;
  user.y;

  drawComputerPaddle(computer);
computer.x;
computer.y;
  drawScore(user.score, canvas.width/4, canvas.height/4);

  drawScore(computer.score, 3 * canvas.width/4, canvas.height/4);

//computer AI:
computer.y += ((ball.y - (computer.y + computer.height/2))) * 0.1;
  
if (ball.y + ball.radius + ball.vy > canvas.height || ball.y - ball.radius + ball.vy < 0) {
    ball.vy = -ball.vy;
}

if (hitDetectionUser(ball, user)) {
  let hitPoint = ball.y - player.y + player.height/2;

  hitPoint = hitPoint / player.height/2;

  let angle45 = Math.PI/4 * hitPoint;

  let direction = ball.x + ball.radius < canvas.width/2 ? 1 : -1;

  ball.vx = direction * ball.speed * Math.cos(angle45);
  ball.vy = ball.speed * Math.sin(angle45);

  ball.speed += 0.5;

  console.log("User hit detected");
  

  console.log(ball.x + ball.radius < canvas.width/2)
}

if (hitDetectionComputer(ball, computer)) {
  let hitPoint = ball.y - player.y + player.height/2;

  hitPoint = hitPoint / player.height/2;

  let angle45 = Math.PI/4 * hitPoint;

  let direction = ball.x + ball.radius < canvas.width/2 ? 1 : -1;

  ball.vx = direction * ball.speed * Math.cos(angle45);
  ball.vy = ball.speed * Math.sin(angle45);

  ball.speed += 0.5;

  console.log("Computer hit detected");
  
}

if (computer.score > 0) {
  console.log('The computer scored!') 
} else if (user.score > 0) {
  console.log('You scored!')
}

if (ball.x - ball.radius < 0) {
  computer.score++;
  resetBall();
} else if (ball.x + ball.radius > canvas.width) {
  user.score++;
  resetBall();
}

}

canvas.addEventListener('mouseover', function() {
  raf = window.requestAnimationFrame(draw);
});
      
canvas.addEventListener('mouseout', function() {
  window.cancelAnimationFrame(raf);
});

canvas.addEventListener('mousemove', mousePosition);

  function newFunction() {
    return true;
  }

function mousePosition(event) {
  let rectangle = canvas.getBoundingClientRect();

  user.y = event.clientY - rectangle.top - user.height/2;
}