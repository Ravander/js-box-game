var game = {
  canvas: document.getElementById("gameCanvas"),
  state: 0,
  init: function() {
    
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "30px Verdana";
    this.frame = 0;
    this.state = 1;
    
    window.addEventListener("keydown", (e) => {
      game.keys = (game.keys || []);
      game.keys[e.keyCode] = true;
    });

    window.addEventListener("keyup", (e) => {
      game.keys[e.keyCode] = false; 
    });
    
    this.player = new GameObject(300, 200, 30, 30, "#2196f3", 0, 0);
    this.enemies = [];
    this.score = 0;
    this.fps = 50;

    this.interval = setInterval(function() {
      update();
      draw();
    }, 1000 / this.fps);

    this.started = true;
  },

  countSeconds: function() {
    if (this.frame == 50) {
      this.frame = 0;
      this.score++;
      return 1;
    } else {
      return 0;
    }
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  pause: function() {
    this.state = 0;
    clearInterval(this.interval);
  },

  resume: function() {
    this.state = 1;
    this.interval = setInterval(function() {
      update();
      draw();
    }, 1000 / this.fps);
  },

  stop: function() {
    clearInterval(this.interval);
    this.state = 0;
    this.started = false;
    delete game.keys;
    this.player.velX = 0;
    this.player.velY = 0;
  }
};

function GameObject(x, y, width, height, color, velX, velY) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.velX = velX;
  this.velY = velY;

  this.update = () => {
    this.x += this.velX;
    this.y += this.velY;
  };

  this.draw = () => {
    game.ctx.fillStyle = this.color;
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.checkCollision = (otherObj) => {
    let myLeft = this.x;
    let myRight = this.x + (this.width);
    let myTop = this.y;
    let myBottom = this.y + (this.height);
    let otherLeft = otherObj.x;
    let otherRight = otherObj.x + otherObj.width;
    let otherTop = otherObj.y;
    let otherBottom = otherObj.y + otherObj.height;
    let crash = true;
    if ((myBottom < otherTop) ||
      (myTop > otherBottom) ||
      (myRight < otherLeft) ||
      (myLeft > otherRight)) {
      crash = false;
    }
    return crash;
  };

  this.checkBoundaries = () => {
    let myLeft = this.x;
    let myRight = this.x + (this.width);
    let myTop = this.y;
    let myBottom = this.y + (this.height);
    let outOfBounds = false;
    if ((myLeft <= 0) ||
      (myRight >= game.canvas.width) ||
      (myTop <= 0) ||
      (myBottom >= game.canvas.height)) {
      outOfBounds = true;
    }
    return outOfBounds;
  };
} 

function createEnemy() {
  let speedX, speedY, x, y;
  speedX = speedY = x = y = 0;

  let speed = Math.floor((Math.random() * 6) + 1);
  let size = (30 + Math.floor((Math.random() * 10) + 1));
  let type = Math.floor((Math.random() * 4) + 1);

  switch (type) {
    case 1:
      x = 0;
      y = Math.floor((Math.random() * 450) + 1);
      speedX = speed;
      break;
    case 2:
      x = 610;
      y = Math.floor((Math.random() * 450) + 1);
      speedX = -speed;
      break;
    case 3:
      y = 0;
      x = Math.floor((Math.random() * 610) + 1);
      speedY = speed;
      break;
    case 4:
      y = 450;
      x = Math.floor((Math.random() * 610) + 1);
      speedY = -speed;
      break;
    default:
      y = 450;
      x = Math.floor((Math.random() * 610) + 1);
      speedY = -speed;
      break;
  }
  game.enemies.push(new GameObject(x, y, size, size, "#FF0000", speedX, speedY)); 
}

function init() {
  if (game.state == 0) {
    game.init();
  } else {
    game.stop();
    game.init();
  }
}

function checkKeyPresses() {
  if ((game.keys && game.keys[37]) || (game.keys && game.keys[65])) {
    game.player.velX = -3; 
  } else if ((game.keys && game.keys[39]) || (game.keys && game.keys[68]))  {
    game.player.velX = 3; 
  } else { 
    game.player.velX = 0; 
  }

  if ((game.keys && game.keys[38]) || (game.keys && game.keys[87])) {
    game.player.velY = -3; 
  } else if ((game.keys && game.keys[40]) || (game.keys && game.keys[83])) {
    game.player.velY = 3; 
  } else { 
    game.player.velY = 0; 
  }
}

function checkGrowth(sec) {
  if ((sec != 0) && ((sec % 10) == 0)) {
    game.player.width += 10;
    game.player.height += 10;
    game.player.x -= 5;
    game.player.y -= 5;
  }
}

function printScore() {
  game.ctx.fillStyle = "#2196f3";
  game.ctx.fillText("pojot: " + game.score, 10, 470);
}

function gameOver() {
  game.stop();

  let save = confirm("haluatko tallentaa?");
  if (save == true) {
    let playerName = prompt("taiteilijanimesi:", "anonyymi");
    if (playerName != null) {
      let scoreString = game.score.toString();
      sendScore(playerName, scoreString);
    }
  } 
}

function sendScore(name, score) {
  let http = new XMLHttpRequest();
  let params = "name=" + name + "&score=" + score;

  http.open("POST", "../php/addscore.php", true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      alert("pisteesi on tallennettu!");
      console.log(this.responseText);
    } else {
      console.log(this.responseText);
    }
  }
  http.send(params);
}

function pauseAndResume() {
  if (game.started) {
    if (game.state == 1) {
      game.pause();
    } else {
      game.resume();
    }
  }
}

function update() {
  if (game.state == 1) {
    game.clear();
    checkKeyPresses();
    game.player.update();
    game.frame++;
    if (game.countSeconds() == 1) {
      createEnemy();
      checkGrowth(game.score);
    }
    let enemiesL = game.enemies.length;
    for (let i = 0; i < enemiesL; i++) {
      game.enemies[i].update();
      if (game.player.checkCollision(game.enemies[i])) {
        gameOver();
      }  
    } 
    if (game.player.checkBoundaries()) {
      gameOver();
    }
  }
}

function draw() {
  game.player.draw();
  printScore();
  let enemiesL = game.enemies.length;
  for (let i = 0; i < enemiesL; i++) {
    game.enemies[i].draw();
  } 
}
