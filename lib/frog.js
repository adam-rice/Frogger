function Frog(x, y, r, sAngle, eAngle, speedX, speedY, level, lives, canMove) {
  this.x = x || 310;
  this.y = y || 470;
  this.r = r || 15;
  this.sAngle = sAngle || 0;
  this.eAngle = eAngle || 2 * Math.PI;
  this.speedX = speedX || 40;
  this.speedY = speedY || 44;
  this.level = level || 1;
  this.lives = lives || 3;
  this.canMove = true;
}

function checkForLives() {
  if (this.lives === 0) {
    this.canMove = false;
  }
}

Frog.prototype = {
  draw: function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.sAngle, this.eAngle);
    ctx.fillStyle = '#99CC99';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#A55999';
    ctx.stroke();
    return this;
  },
  moveDown: function(canvas) {
    if (this.y < canvas.height - 60 && this.x > 290 && this.x < 320 || this.y < canvas.height - 90) {
      this.y += this.speedY;
    }
  },
  moveUp: function(canvas) {
    if (this.y > canvas.height - 460 && this.canMove === true) {
      this.y -= this.speedY;
    }
  },
  moveRight: function(canvas) {
    if (this.x < canvas.width - 60 && this.y < 470) {
      this.x += this.speedX;
    }
  },
  moveLeft: function(canvas) {
    if (this.x > canvas.width - 530 && this.y < 470) {
      this.x -= this.speedX;
    }
  },
  winner: function(levelCompleteScreen, gameWonScreen) {
    if (this.y < 50 && this.x < 90 || this.y < 50 && this.x > 210 && this.x < 240 || this.y < 50 && this.x > 370 && this.x < 400 || this.y < 50 && this.x > 530 && this.x < 560) {
      this.level++;
      this.canMove = false;
      if (this.level < 3) {
        levelCompleteScreen.style.display='block';
        return (this.x = 310, this.y = 470);
        } else if (this.level === 3) {
        levelCompleteScreen.style.display='block';
        return (this.x = 310, this.y = 470);
        }
        else if (this.level > 3) {
        gameWonScreen.style.display='block';
        return (this.x = 310, this.y = 470);
      }
    }
  },
  drowns: function(gameLostScreen) {
    if (this.y < 50 && this.x > 90 && this.x < 210 || this.y < 50 && this.x > 230 && this.x < 370 || this.y < 50 && this.x > 390 && this.x < 550 ) {
      this.lives--;
      checkForLives();
      if (this.lives > 0) {
        return (this.x = 310, this.y = 470);
      } else
      gameLostScreen.style.display='block';
      return (this.x = 310, this.y = 470);
    }
  },
  livesDisplay: function(frogFirstLife, frogSecondLife, frogFinalLife, zeroImg) {
    if (this.lives === 2) {
      frogFirstLife.classList.add('hide');
    } else if (this.lives === 1) {
      frogSecondLife.classList.add('hide');
    } else if (this.lives === 0) {
      frogFinalLife.classList.add('hide');
      zeroImg.classList.remove('hide');
    }
  },
  detectCollision: function (vehicle, gameLostScreen) {
    //FROG
    var frogLeftEdge = {x: this.x-this.r, y: this.y};
    var frogRightEdge = {x: this.x+this.r, y: this.y};
    var frogTopEdge ={x: this.x, y: this.y-this.r};
    var frogBottomEdge = {x: this.x, y: this.y+this.r};
    //VEHICLE
    var vehicleTopLeftCorner = {x: vehicle.x, y: vehicle.y};
    var vehicleTopRightCorner = {x: vehicle.x + vehicle.width, y: vehicle.y};
    var vehicleBottomRightCorner = {x: vehicle.x + vehicle.width, y: vehicle.y + vehicle.height};
    var vehicleBottomLeftCorner = {x: vehicle.x, y: vehicle.y + vehicle.height};
    if (frogLeftEdge.x <= vehicleBottomRightCorner.x && frogRightEdge.x >= vehicleBottomLeftCorner.x && frogBottomEdge.y >= vehicleTopRightCorner.y && frogTopEdge.y <= vehicleTopLeftCorner.y) {
      this.lives--;
      checkForLives();
      if (this.lives > 0) {
        return (this.x = 310, this.y = 470);
      } else
      gameLostScreen.style.display='block';
      return (this.x = 310, this.y = 470);
    }
  }
};

module.exports = Frog;
