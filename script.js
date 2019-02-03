//global variables:
const canvas = document.getElementById('pong');

const context = canvas.getContext('2d');

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
    (paddle.x + paddle.width) > (this.x - this.radius) &&
    (paddle.y + paddle.height) > (this.y - this.radius)
  }

  bounce(paddle) {
    if (ball.hitDet(paddle)) {
      let hitPoint = this.y - paddle.y + paddle.height/2;
    
      hitPoint = hitPoint / paddle.height/2;
    
      let angle45 = Math.PI/4 * hitPoint;
    
      let direction = this.x + this.radius < canvas.width/2 ? 1 : -1;
    
      this._vx = direction * this.speed * Math.cos(angle45);
      this._vy = this.speed * Math.sin(angle45);

      this.speed += 1;
    
      console.log("hit det", paddle);
    } 
  }

  wall() {
    if (this.y + this.radius + this.vy > canvas.height ||
        this.y - this.radius + this._vy < 0) {
        this._vy = -this._vy;
    }
  }

  score() {
    if (this.x - this.radius < 0) {
      computer.score++;
      ball.reset();
      console.log('The computer scored!') 
    } else if (this.x + this.radius > canvas.width) {
      user.score++;
      ball.reset();
      console.log('You scored!')
    }
  }
}

class Paddle {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    this.width = 20;
    this.height = 100;
    this.color = 'white';
    this.score = 0;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  move(y) {
    this._y = y;
  }
}
const ball = new Ball(canvas.width/2, canvas.height/2, 5);

const user = new Paddle(0, (canvas.height - 100) / 2);

const computer = new Paddle(canvas.width - 20, canvas.height - 100/2);

const net = {
  x: canvas.width/2,
  y: 0,
  width: 2,
  height: 10,
  color: 'white'
}

function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
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

const renderGame = () => {

  let paddle = (this.x + this.radius < canvas.width/2) ? user : computer;

  function drawScore(newScore, x, y) {
    context.fillStyle = 'white';
    context.font = '70px arial';
    context.fillText(newScore, x, y);
  }

  function drawNet() {
    for(let i = 0; i <= canvas.height; i+=15) {
      drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
  }
  context.clearRect(0,0, canvas.width, canvas.height);
  
  drawNet();
  drawScore(user.score, canvas.width/4, canvas.height/4);
  drawScore(computer.score, 3 * canvas.width/4, canvas.height/4);
  drawUserPaddle(user);
  drawComputerPaddle(computer);
  drawBall(ball);
  ball.move();

  raf = window.requestAnimationFrame(renderGame);
  
  computer.move(ball.y - (computer.y + computer.height/2) * 0.1)
  ball.score();
  ball.wall();
  ball.bounce(user);
  ball.bounce(computer);
  
}

function mousePosition(event) {
  let rectangle = canvas.getBoundingClientRect();
  user.move(event.clientY - rectangle.top - user.height/2);
}

canvas.addEventListener('mouseover', function() {
  raf = window.requestAnimationFrame(renderGame);
});
      
canvas.addEventListener('mouseout', function() {
  window.cancelAnimationFrame(raf);
});

canvas.addEventListener('mousemove', mousePosition);