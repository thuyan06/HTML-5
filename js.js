function startGame() { 
const roadarea = document.querySelector('.road');
let player = { step: 5, passedCars: 0, level: 1 };
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyUp);

function keydown(ev) {
  keys[ev.key] = true;
}

function keyUp(ev) {
  keys[ev.key] = false;
}

function movelines() {
}


function movevehicles(playercar) {
  let vehicles = document.querySelectorAll('.vehicle');
  let playercarboun = playercar.getBoundingClientRect();

  vehicles.forEach(function (item) {
    let othercarboun = item.getBoundingClientRect();

    // Auf Kollision mit dem Spieler prüfen

    if (
      !(
        playercarboun.bottom < othercarboun.top ||
        playercarboun.top > othercarboun.bottom ||
        playercarboun.left > othercarboun.right ||
        playercarboun.right < othercarboun.left
      )
    ) {
      // Game Over
      player.start = false;
      showGameOver();
    }

    if (item.y > 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + 'px';

      // PassedCars-Zähler erhöhen
      player.passedCars++;

      // Überprüfen Sie, ob der Spieler genügend Autos für das nächste Level passiert hat
      if (player.passedCars === 5 && player.level === 1) {
        player.level = 2;
        showNextLevel();
      } else if (player.passedCars === 10 && player.level === 2) {
        player.level = 3;
        showNextLevel();
      }
    }

    item.y = item.y + player.step;
    item.style.top = item.y + 'px';
  });
}


function showNextLevel() {
  let nextLevelMsg = document.createElement('div');
  nextLevelMsg.textContent = 'Congratulations! You reached level ' + player.level;
  nextLevelMsg.style.color = 'white';
  nextLevelMsg.style.fontSize = '24px';
  nextLevelMsg.style.position = 'absolute';
  nextLevelMsg.style.top = '50%';
  nextLevelMsg.style.left = '50%';
  nextLevelMsg.style.transform = 'translate(-50%, -50%)';
  nextLevelMsg.style.zIndex = '9999';
  roadarea.appendChild(nextLevelMsg);

  setTimeout(function () {
    roadarea.removeChild(nextLevelMsg);
  }, 3000);
}


function showGameOver(congratulations = false) {
  let gameOver = document.createElement('div');
  gameOver.style.color = congratulations ? 'green' : 'red';
  gameOver.style.fontSize = '40px';
  gameOver.style.position = 'absolute';
  gameOver.style.top = '50%';
  gameOver.style.left = '50%';
  gameOver.style.transform = 'translate(-50%, -50%)';
  gameOver.style.zIndex = '9999';
  roadarea.appendChild(gameOver);

  if (congratulations) {
    // Congratulations box
    gameOver.textContent = 'Congratulations!';
  } else {
    // Game over box
    gameOver.textContent = 'Game Over';
  }

  let tryAgainBtn = document.createElement('button');
  tryAgainBtn.textContent = 'Play Again';
  tryAgainBtn.style.fontSize = '24px';
  tryAgainBtn.style.padding = '10px 20px';
  tryAgainBtn.style.marginTop = '20px';
  tryAgainBtn.style.cursor = 'pointer';
  tryAgainBtn.addEventListener('click', resetGame);
  gameOver.appendChild(tryAgainBtn);
}

function resetGame() {
// Spieler zurücksetzen
  player.start = false;
  player.passedCars = 0;
  player.roundPassedCars = 0;

  // Strasse leeren
  roadarea.innerHTML = '';

  // Spiel nochmals starten
  init();
}  
    
    function playarea()
    {
        let playercar = document.querySelector('.car')
        let road = roadarea.getBoundingClientRect();
        if(player.start)
        {



            movelines();
            movevehicles(playercar);
            if (keys.ArrowUp && player.y > (road.top + 80)) // 80 is car heighz
           {
                player.y = player.y - player.step;
           }
                                
           
                if(keys.ArrowDown && player.y < (road.bottom - 80))
                {
                player.y = player.y + player.step;
                }
                                
            
            
                        if (keys.ArrowLeft && player.x > 0 )
                            {
                                player.x = player.x - player.step;

                            }

                                
            
                                if (keys.ArrowRight && player.x <(road.width-64) ) //width (50) + BORDER(2* 7)
                                {
                                    player.x = player.x + player.step;

                                }
                                    
                playercar.style.top = player.y +'px';
                playercar.style.left = player.x +'px';

                window.requestAnimationFrame (playarea);
        }
    }
        

            function init()
        {
            player.start = true;
            window.requestAnimationFrame (playarea);


            let playercar = document.createElement('div');
            playercar.setAttribute('class', 'car')
            roadarea.appendChild (playercar);

            player.x = playercar.offsetLeft;
            player.y = playercar.offsetTop;
            
            // roadlines repeated
            for (x=0; x < 5; x++)
            {
            let roadlines = document.createElement('div');
            roadlines.setAttribute('class', 'line');
            roadlines.y = x * 150;
            roadlines.style.top = roadlines.y + 'px';
            roadarea.appendChild(roadlines);
             }
             //vehicles in road generate randomly
             for (x=0; x < 4; x++)
             { 
                let vehicles = document.createElement('div');
                vehicles.setAttribute('class', 'vehicle');
                vehicles.y = ((x+1)* 300 ) * -1;
                vehicles.style.top = vehicles.y +'px';
                //roadwidth = 400, vehicle width = 50
                vehicles.style.left = Math.floor(Math.random() * 350) + 'px';
                roadarea.appendChild(vehicles);
             }

        }

init();
    }