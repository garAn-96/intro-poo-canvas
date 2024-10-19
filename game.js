// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// Clase Ball (Pelota)
class Ball {
constructor(x, y, radius, speedX, speedY) {
this.x = x;
this.y = y;
this.radius = radius;
this.speedX = speedX;
this.speedY = speedY;
}
draw() {
ctx.beginPath();
ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
ctx.fillStyle = 'yellow' ;
ctx.fill();
ctx.closePath();
}

draw1() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'green' ;
    ctx.fill();
    ctx.closePath();
    }

draw2() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle ='red';
        ctx.fill();
        ctx.closePath();
 }

 draw3() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue' ;
    ctx.fill();
    ctx.closePath();
    }

draw4() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle ='pink';
        ctx.fill();
        ctx.closePath();
 }

move() {
this.x += this.speedX;
this.y += this.speedY;
// Colisión con la parte superior e inferior
if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
this.speedY = -this.speedY;
}
}
reset() {
this.x = canvas.width / 2;
this.y = canvas.height / 2;
this.speedX = -this.speedX; // Cambia dirección al resetear
}
}

// Clase Paddle (Paleta)
class Paddle {
constructor(x, y, width, height, isPlayerControlled = false) {
this.x = x;
this.y = y;
this.width = width;
this.height = height;
this.isPlayerControlled = isPlayerControlled;
this.speed = 5;
}
draw() {
ctx.fillStyle = 'purple';
ctx.fillRect(this.x, this.y, this.width, 200);
}
draw5() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(this.x, this.y, this.width, 100);
    }
move(direction) {
if (direction === 'up' && this.y > 0) {
this.y -= this.speed;
} else if (direction === 'down' && this.y + this.height < canvas.height) {
this.y += this.speed;
}
}
// Movimiento de la paleta automática (IA)
    autoMove(ball) {
    if (ball.y < this.y + this.height / 2) {
    this.y -= this.speed;
    } else if (ball.y > this.y + this.height / 2) {
    this.y += this.speed;
    }
    
    }
    }
    // Clase Game (Controla el juego)
class Game {
    constructor() {
    this.ball = new Ball(canvas.width / 2, canvas.height / 2, 5, 4, 4);
    this.ball1 = new Ball(canvas.width / 2, canvas.height / 2, 15, 10, 10);
    this.ball2 = new Ball(canvas.width / 2, canvas.height / 2, 8, 4, 4);
    this.ball3 = new Ball(canvas.width / 2, canvas.height / 2, 20, 12, 12);
    this.ball4 = new Ball(canvas.width / 2, canvas.height / 2, 10, 8, 8);
    this.paddle1 = new Paddle(0, canvas.height / 2 - 50, 10, 100, true); // Controlado por eljugador
    this.paddle2 = new Paddle(canvas.width - 10, canvas.height  / 2 - 50, 10, 100); // Controlado por la computadora
    this.keys = {}; // Para capturar las teclas
    }
    draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ball.draw();
    this.ball1.draw1();
    this.ball2.draw2();
    this.ball3.draw3();
    this.ball4.draw4();
    this.paddle1.draw();
    this.paddle2.draw5();
    }
    update() {
    this.ball.move();
    this.ball1.move();
    this.ball2.move();
    this.ball3.move();
    this.ball4.move();
    // Movimiento de la paleta 1 (Jugador) controlado por teclas
    if (this.keys['ArrowUp']) {
    this.paddle1.move('up');
    }
    if (this.keys['ArrowDown']) {
    this.paddle1.move('down');
    }
   // Movimiento de la paleta 2 (Controlada por IA) 
   this.paddle2.autoMove(this.ball, this.ball1,this.ball2,this.ball3, this.ball4); 
 
   // Colisiones con las paletas 
   if (this.ball.x - this.ball.radius <= this.paddle1.x + this.paddle1.width && 
       this.ball.y >= this.paddle1.y && this.ball.y <= this.paddle1.y + 200) { 
       this.ball.speedX = -this.ball.speedX; 
   } 

   if (this.ball.x + this.ball.radius >= this.paddle2.x && 
       this.ball.y >= this.paddle2.y && this.ball.y <= this.paddle2.y + this.paddle2.height) { 
       this.ball.speedX = -this.ball.speedX; 
   } 

   // Detectar cuando la pelota sale de los bordes (punto marcado) 
   if (this.ball.x - this.ball.radius <= 0 || this.ball.x + this.ball.radius >= canvas.width) { 
       this.ball.reset(); 
   } 
   // Colisiones con las paletas 
   if (this.ball1.x - this.ball1.radius <= this.paddle1.x + this.paddle1.width && 
       this.ball1.y >= this.paddle1.y && this.ball1.y <= this.paddle1.y + 200) { 
       this.ball1.speedX = -this.ball1.speedX; 
   } 

   if (this.ball1.x + this.ball1.radius >= this.paddle2.x && 
       this.ball1.y >= this.paddle2.y && this.ball1.y <= this.paddle2.y + this.paddle2.height) { 
       this.ball1.speedX = -this.ball1.speedX; 
   } 

   // Detectar cuando la pelota sale de los bordes (punto marcado) 
   if (this.ball1.x - this.ball1.radius <= 0 || this.ball1.x + this.ball1.radius >= canvas.width) { 
       this.ball1.reset(); 
   } 
      // Colisiones con las paletas 
      if (this.ball2.x - this.ball2.radius <= this.paddle1.x + this.paddle1.width && 
        this.ball2.y >= this.paddle1.y && this.ball2.y <= this.paddle1.y + 200) { 
        this.ball2.speedX = -this.ball2.speedX; 
    } 
 
    if (this.ball2.x + this.ball2.radius >= this.paddle2.x && 
        this.ball2.y >= this.paddle2.y && this.ball2.y <= this.paddle2.y + this.paddle2.height) { 
        this.ball2.speedX = -this.ball2.speedX; 
    } 
 
    // Detectar cuando la pelota sale de los bordes (punto marcado) 
    if (this.ball2.x - this.ball2.radius <= 0 || this.ball2.x + this.ball2.radius >= canvas.width) { 
        this.ball2.reset(); 
    } 
    // Colisiones con las paletas 
    if (this.ball3.x - this.ball3.radius <= this.paddle1.x + this.paddle1.width && 
        this.ball3.y >= this.paddle1.y && this.ball3.y <= this.paddle1.y + 200) { 
        this.ball3.speedX = -this.ball3.speedX; 
    } 
 
    if (this.ball3.x + this.ball3.radius >= this.paddle2.x && 
        this.ball3.y >= this.paddle2.y && this.ball3.y <= this.paddle2.y + this.paddle2.height) { 
        this.ball3.speedX = -this.ball3.speedX; 
    } 
 
    // Detectar cuando la pelota sale de los bordes (punto marcado) 
    if (this.ball3.x - this.ball3.radius <= 0 || this.ball3.x + this.ball3.radius >= canvas.width) { 
        this.ball3.reset(); 
    } 
    // Colisiones con las paletas 
    if (this.ball4.x - this.ball4.radius <= this.paddle1.x + this.paddle1.width && 
        this.ball4.y >= this.paddle1.y && this.ball4.y <= this.paddle1.y + 200) { 
        this.ball4.speedX = -this.ball4.speedX; 
    } 
 
    if (this.ball4.x + this.ball4.radius >= this.paddle2.x && 
        this.ball4.y >= this.paddle2.y && this.ball4.y <= this.paddle2.y + this.paddle2.height) { 
        this.ball4.speedX = -this.ball4.speedX; 
    } 
 
    // Detectar cuando la pelota sale de los bordes (punto marcado) 
    if (this.ball4.x - this.ball4.radius <= 0 || this.ball4.x + this.ball4.radius >= canvas.width) { 
        this.ball4.reset(); 
    } 
            
    }
    // Captura de teclas para el control de la paleta
    handleInput() {
        window.addEventListener('keydown', (event) => {
        this.keys[event.key] = true;
        });
        window.addEventListener('keyup', (event) => {
        this.keys[event.key] = false;
        });
    }
    run() {
        this.handleInput();
        const gameLoop = () => {
        this.update();
        this.draw();
        requestAnimationFrame(gameLoop);
        };
        gameLoop();
        }
    }
        // Crear instancia del juego y ejecutarlo
        const game = new Game();
        game.run();    