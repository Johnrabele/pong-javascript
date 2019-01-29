class Ball {
  constructor(x, y, speed) {
    this._x = x;
    this._y = y;
    this._vx = speed;
    this._vy = speed;
    this.radius = 5;
    this.color = 'white';
    this.intX = x;
    this.intY = y;
    this.speed = speed;
    this.intSpeed = speed;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get vx() {
    return this._vx;
  }

  get vy() {
    return this._vy;
  }
  
  move() {
    this._x += this.vx;
    this._y += this.vy;
  }

  reset() {
    this._x = this.intX;
    this._y = this.intY;
    this._vx = this.intSpeed;
    this._vy = this.intSpeed;
    this.speed =this.intSpeed;
  }

  hitDet(paddle) {
    return paddle.x < (this.x + this.radius) &&
    paddle.y < (this.y + this.radius) &&
    (paddle.x + paddle.width) > this.x - this.radius &&
    (paddle.y + paddle.height) > this.y - this.radius
  }

  bounce(paddle) {
    if (ball.hitDet(paddle)) {
      let hitPoint = this.y - player.y + player.height/2;
    
      hitPoint = hitPoint / player.height/2;
    
      let angle45 = Math.PI/4 * hitPoint;
    
      let direction = this.x + this.radius < canvas.width/2 ? 1 : -1;
    
      this._vx = direction * this.speed * Math.cos(angle45);
      this._vy = this.speed * Math.sin(angle45);

      this.speed += 1;
    
      console.log("hit det", paddle);
    } 
  }

  wall() {
    if (this.y + this.radius + this.vy > canvas.height || this.y - this.radius + this._vy < 0) {
      this._vy = -this._vy;
    }
  }

  score() {
    if (this.x - this.radius < 0) {
      computer.score++;
      ball.reset();
    } else if (this.x + this.radius > canvas.width) {
      user.score++;
      ball.reset();
    }
  }
}

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

const ball = new Ball(canvas.width/2, canvas.height/2, 5);

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

let player = (this.x + this.radius < canvas.width/2) ? user : computer;

//functions:

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

//rendering:
function draw() {
  context.clearRect(0,0, canvas.width, canvas.height);

  drawNet();
  
  drawBall(ball);
  ball.move();

  raf = window.requestAnimationFrame(draw);
  
  drawUserPaddle(user);
  drawComputerPaddle(computer);
  drawScore(user.score, canvas.width/4, canvas.height/4);

  drawScore(computer.score, 3 * canvas.width/4, canvas.height/4);

  //computer AI:
  computer.y += ((ball.y - (computer.y + computer.height/2))) * 0.1;
  
  ball.score();
  ball.wall();
  ball.bounce(user);
  ball.bounce(computer);
}
ball.reset();
if (computer.score > 0) {
  console.log('The computer scored!') 
} else if (user.score > 0) {
  console.log('You scored!')
}

canvas.addEventListener('mouseover', function() {
  raf = window.requestAnimationFrame(draw);
});
      
canvas.addEventListener('mouseout', function() {
  window.cancelAnimationFrame(raf);
});

canvas.addEventListener('mousemove', mousePosition);


function mousePosition(event) {
  let rectangle = canvas.getBoundingClientRect();
  user.y = event.clientY - rectangle.top - user.height/2;
}
