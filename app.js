const map = [1,1,1,1,1,3,3,3,1,1,1,1,1,
             1,0,0,0,0,1,1,1,0,0,0,0,1,
             1,0,1,0,0,0,0,0,0,0,1,0,1,
             1,0,0,0,1,1,1,1,1,0,0,0,1,
             1,0,1,0,0,0,2,0,0,0,1,0,1,
             1,0,1,0,1,0,0,0,1,0,1,0,1,
             1,0,0,0,0,4,4,4,0,0,0,0,1,
             1,0,1,0,1,0,0,0,1,0,1,0,1,
             1,0,0,0,0,1,1,1,0,0,0,0,1,
             1,0,1,1,0,0,0,0,0,1,1,0,1,
             1,0,0,0,0,1,1,1,0,0,0,0,1,
             1,1,1,1,1,3,3,3,1,1,1,1,1];
const game = document.querySelector(".game");

// Sound effects
let sWalk = new Audio('./sfx/walk.wav');
let sHurt = new Audio('./sfx/hurt.wav');
let sPoint = new Audio('./sfx/point.wav');
let sWin = new Audio('./sfx/win.wav');
let sLose = new Audio('./sfx/lose.wav');

let keysPressed = 0;
let startText = document.querySelector(".startText");

drawMap();
playerMovement();

// Function that draws map from the array (0 = background, 1 = wall, 2 = player)
function drawMap() {
    for (i = 0; i < map.length; i++) {
        if (map[i] === 1) {
            game.innerHTML += '<div class="wall"></div>';
        }
        else if (map[i] === 2){
            game.innerHTML += '<div class="background"><div class="player"></div></div>';
        }
        else if (map[i] === 3){
            game.innerHTML += '<div class="black"></div>';
        }
        else if (map[i] === 4){
            game.innerHTML += '<div class="background"><div class="enemy"></div></div>';
        }
        else {
            game.innerHTML += '<div class="background"><div class="point"></div></div>';
        }
    }
    
};

const player = document.querySelector(".player");
const allWalls = document.querySelectorAll(".wall");
let newPosX = 192;
let newPosY = 144;

// Function that detects collision with walls and lets player move
function playerMovement() {
    window.addEventListener('keydown', function (e) {
        if (e.key === 'd') {
        let wallPosX;
        let wallPosY;
        let canGoRight = 1;
         for (let i=0; i < allWalls.length; i++){
            wallPosX = allWalls[i].getBoundingClientRect().left;
            wallPosY = allWalls[i].getBoundingClientRect().top;
            if ((newPosX) === wallPosX - 32 && newPosY === wallPosY) {
                canGoRight = 0;
               }
         }
         if (canGoRight === 1) {
            newPosX += 32;
            player.style.left = newPosX + "px";
            sWalk.play();
            checkPoint();
            hurtPlayer();
         }
        }
       }, false);
      
       window.addEventListener('keydown', function (e) {
        if (e.key === 'a') {
        let wallPosX;
        let wallPosY;
        let canGoLeft = 1;
         for (let i=0; i < allWalls.length; i++){
            wallPosX = allWalls[i].getBoundingClientRect().right;
            wallPosY = allWalls[i].getBoundingClientRect().top;
            if ((newPosX) === wallPosX && newPosY === wallPosY) {
                canGoLeft = 0;
               }
         }
         if (canGoLeft === 1) {
            newPosX -= 32;
            player.style.left = newPosX + "px";
            sWalk.play();
            checkPoint();
            hurtPlayer();
         }
        }
       }, false);
    
       window.addEventListener('keydown', function (e) {
        if (e.key === 'w') {
        let wallPosX;
        let wallPosY;
        let canGoUp = 1;
         for (let i=0; i < allWalls.length; i++){
            wallPosX = allWalls[i].getBoundingClientRect().right;
            wallPosY = allWalls[i].getBoundingClientRect().top;
            if ((newPosX) === wallPosX-32 && newPosY === wallPosY+32) {
                canGoUp = 0;
               }
         }
         if (canGoUp === 1) {
            newPosY -= 32;
            player.style.top = newPosY + "px";
            sWalk.play();
            checkPoint();
            hurtPlayer();
         }
        }
       }, false);
    
       window.addEventListener('keydown', function (e) {
        if (e.key === 's') {
        let wallPosX;
        let wallPosY;
        let canGoDown = 1;
         for (let i=0; i < allWalls.length; i++){
            wallPosX = allWalls[i].getBoundingClientRect().left;
            wallPosY = allWalls[i].getBoundingClientRect().top;
            if ((newPosX) === wallPosX && newPosY === wallPosY-32) {
                canGoDown = 0;
               }
         }
         if (canGoDown === 1) {
            newPosY += 32;
            player.style.top = newPosY + "px";
            sWalk.play();
            checkPoint();
            hurtPlayer();
         }
        }
       }, false);
    }

//Function that checks collision with a point and changes the score
function checkPoint() {
    const allPoints = document.querySelectorAll(".point");
    let pointPosX;
    let pointPosY;
    let score = document.querySelector("#scoreCount");
    let currentScore = parseInt(score.innerHTML);

    for (let i=0; i < allPoints.length; i++){
        pointPosX = allPoints[i].getBoundingClientRect().left;
        pointPosY = allPoints[i].getBoundingClientRect().top;
        if (newPosX === (pointPosX-12) && newPosY === (pointPosY-12)) {
            allPoints[i].remove();
            sPoint.play();
            currentScore += 1;
            score.innerHTML = currentScore;
           }
     }

     if (currentScore === 76) {
        sWin.play();
        alert("You won! 🏆\nClick OK to play again!");
        location.reload();
     }
}

//Function that hurts the player and moves to start position
function hurtPlayer() {
    const allEnemies = document.querySelectorAll(".enemy");
    let enemyPosX;
    let enemyPosY;
    let lives = document.querySelector("#livesCount");
    let currentLives = parseInt(lives.innerHTML);

    for (let i=0; i < allEnemies.length; i++){
        enemyPosX = allEnemies[i].getBoundingClientRect().left;
        enemyPosY = allEnemies[i].getBoundingClientRect().top;
        
        if (newPosX === (enemyPosX) && newPosY === (enemyPosY)) {
            currentLives -= 1;
            lives.innerHTML = currentLives;
            sHurt.play();
            newPosX = 192;
            newPosY = 144;
            
            player.style.left = 192 + "px";
            player.style.top = 144 + "px";

           }

           if (currentLives === 0) {
            sLose.play();
            alert("You lost 😔 \nClick OK to try again.");
            location.reload();
         }
    }
}

//Function that randomizes enemy walk, collision and hurts player on collision
function enemyWalk() {
    const allEnemies = document.querySelectorAll(".enemy");
    const allWalls = document.querySelectorAll(".wall");
    let lives = document.querySelector("#livesCount");
    let currentLives = parseInt(lives.innerHTML);

    for (let i = 0; i < allEnemies.length; i++) {
      let enemyPosX = allEnemies[i].getBoundingClientRect().left;
      let enemyPosY = allEnemies[i].getBoundingClientRect().top;
      let direction = Math.floor(Math.random() * 4); // Update the direction calculation
  
      let newEnemyPosX = enemyPosX;
      let newEnemyPosY = enemyPosY;
  
      if (direction === 0 && enemyPosX > 0) { // Check if the enemy is not touching the left wall
        newEnemyPosX -= 32;
      } else if (direction === 1 && enemyPosX < document.documentElement.clientWidth - 32) { // Check if the enemy is not touching the right wall
        newEnemyPosX += 32;
      } else if (direction === 2 && enemyPosY > 0) { // Check if the enemy is not touching the top wall
        newEnemyPosY -= 32;
      } else if (direction === 3 && enemyPosY < document.documentElement.clientHeight - 32) { // Check if the enemy is not touching the bottom wall
        newEnemyPosY += 32;
      }

      if (newEnemyPosX === newPosX && newEnemyPosY === newPosY) {
            currentLives -= 1;
            lives.innerHTML = currentLives;
            sHurt.play();
            newPosX = 192;
            newPosY = 144;
            
            player.style.left = 192 + "px";
            player.style.top = 144 + "px";
      }

      if (currentLives === 0) {
        sLose.play();
        alert("You lost 😔 \nClick OK to try again.");
        location.reload();
     }
  
      // Check if the new position of the enemy collides with any wall
      let collision = false;
      for (let j = 0; j < allWalls.length; j++) {
        let wallPosX = allWalls[j].getBoundingClientRect().left;
        let wallPosY = allWalls[j].getBoundingClientRect().top;
  
        if (newEnemyPosX === wallPosX && newEnemyPosY === wallPosY) {
          collision = true;
          break;
        }
      }
  
      // If there is no collision with a wall, update the enemy's position
      if (!collision) {
        allEnemies[i].style.left = `${newEnemyPosX}px`;
        allEnemies[i].style.top = `${newEnemyPosY}px`;
      }
    }
  }
  window.addEventListener('keydown', function (e) {
    keysPressed += 1;
    if (keysPressed === 1){
        setInterval(enemyWalk, 500);
        startText.remove();
    }
  });