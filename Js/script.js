(() => {
  // variables and constants
  const body = document.querySelector(".body");
  const gameInfo = document.querySelector(".result");
  const winnerStatus = document.querySelector(".winner");
  const greeting = document.querySelector(".greeting");
  const playAgain = document.querySelector(".play-again-btn");
  const player1 = document.querySelector(".player1");
  const player2 = document.querySelector(".player2");
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let track = [null, null, null, null, null, null, null, null, null];
  let turnId = 0;

  // event listener
  body.addEventListener("click", function handler(e) {
    let currentturnId = e.target.id;

    if (check(currentturnId)) {
      let currentPlayer = turn(turnId++);
      e.target.textContent = currentPlayer;
      track[currentturnId] = currentPlayer;

      // check win or draw
      let result = gameStatus(turnId);
      if (result === 1) {
        let winner = turn(turnId - 1);
        gameOver(winner);
        body.removeEventListener("click", handler);
      } else if (result === -1) {
        gameOver();
        body.removeEventListener("click", handler);
      } else {
        activePlayer(turnId);
      }
    }
  });

  // win or draw
  const gameStatus = (currId) => {
    for (let i = 0; i < 9; i++) {
      if (
        win[i] &&
        track[win[i][0]] != null &&
        track[win[i][0]] === track[win[i][1]] &&
        track[win[i][1]] === track[win[i][2]]
      ) {
        return 1;
      }
    }
    if (currId === 9) {
      return -1;
    }
  };

  // display game over
  const gameOver = (winner = "Draw") => {
    gameInfo.style.visibility = "visible";
    if (winner != "Draw") {
      winnerStatus.innerHTML = `Player ${winner} Win`;
    } else {
      greeting.style.visibility = "hidden";

      winnerStatus.innerHTML = `${winner}!!`;
    }
  };

  // to check wheather there is already clicked or not
  const check = (id) => {
    return track[id] !== null ? false : true;
  };

  //get whos turn is
  const turn = (turnID) => {
    return turnID % 2 == 0 ? "X" : "O";
  };

  // active player

  const activePlayer = (turnID) => {
    if (turnId % 2 !== 0) {
      player1.classList.remove("active");
      player2.classList.add("active");
    } else {
      player1.classList.add("active");
      player2.classList.remove("active");
    }
  };

  // play again
  playAgain.addEventListener("click", () => {
    window.location.reload();
  });
})();
