//global variables:
const canvas = document.getElementById('pong');

const context = canvas.getContext('2d');

//objects:
const net = {
    x: (canvas.width - 2)/2,
    y: 0,
    width: 2,
    height: 10,
    color: 'white'
}

const ball = {
    x: 100,
    y: 100,
    vx: 3,
    vy: 3,
    radius: 5,
    speed: 7,
    color: 'white',
    };

const user = {
    x: 0,
    y: 150,
    width: 20,
    height: 100,
    color: 'white',
    score: 0
    };

const computer = {
   x: 580,
   y: 150,
   width: 20,
   height: 100,
   color: 'white',
   score: 0
    }

//functions:
function drawRect(x, y, w, h, color){
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
const hitDetection = (ball, user) => {
  user.x < (ball.x + ball.radius) &&
  user.y < (ball.y + ball.radius) &&
  (user.x + user.width) > ball.x - ball.radius &&
  (user.y + user.height) > (ball.y - ball.radius)

  return (
    user.left < ball.right &&
    user.top < ball.bottom &&
    user.right > ball.left &&
    user.bottom > ball.top
  ) 
}

hitDetection(ball, user);

const ballVx = () => {
  ball.vx -= ball.vx;
}

const ballVy = () => {
  ball.vy -= ballvy;
}

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
  
  if (ball.y + ball.radius + ball.vy > canvas.height || ball.y - ball.radius + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.radius + ball.vx > canvas.width || ball.x - ball.radius + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  if (hitDetection(ball, user) === true) {
    ballVy();
    ballVx();
  }

  if (hitDetection()) {
    console.log("Hit detected");
    ballVy();
    ballVx();
 }
//attempt at controlling user/computer paddle boundries.
  if (user.height + user.width > canvas.height || user.height + user.width < 0) {
    user.height -= user.height;
  }
  
  if (computer.height < 0 || computer.height > 400) {
    computer.height -= computer.height;
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