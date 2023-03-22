const map = [1,1,1,1,1,3,3,3,1,1,1,1,1,
             1,0,0,0,0,1,1,1,0,0,0,0,1,
             1,0,1,0,0,0,0,0,0,0,1,0,1,
             1,0,0,0,1,1,1,1,1,0,0,0,1,
             1,0,1,0,0,0,2,0,0,0,1,0,1,
             1,0,1,0,1,0,0,0,1,0,1,0,1,
             1,0,0,0,1,0,0,0,1,0,0,0,1,
             1,0,1,0,1,0,0,0,1,0,1,0,1,
             1,0,0,0,0,1,1,1,0,0,0,0,1,
             1,0,1,1,0,0,0,0,0,1,0,0,1,
             1,0,0,0,0,1,1,1,0,0,0,0,1,
             1,1,1,1,1,3,3,3,1,1,1,1,1];
const game = document.querySelector(".game");

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
            console.log(newPosX);
            console.log(player.style.left);
            checkPoint();
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
            checkPoint();
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
            checkPoint();
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
            checkPoint();
         }
        }
       }, false);
    }

//Function that checks collision with a point and changes the score
function checkPoint () {
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
            currentScore += 1;
            score.innerHTML = currentScore;
           }
     }
}