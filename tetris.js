document.addEventListener("DOMContentLoaded", () => {
  const chosen = 0;
  const musicList = [
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971976/tetris/1_-_Track_1_ns30xt.mp3",
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971977/tetris/2_-_Track_2_cevcuw.mp3",
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971977/tetris/3_-_Track_3_oqtoa2.mp3",
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971977/tetris/4_-_Track_4_ody05k.mp3"
  ];
  var myMusic;
  var verticalSound = new Audio(
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971974/tetris/Move_Vert_wtgaqg.mp3"
  );
  var horizontalSound = new Audio(
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971972/tetris/Move_Hor_n7mnq1.mp3"
  );
  var rotateSound = new Audio(
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971972/tetris/Rotate_ttkkea.mp3"
  );
  var clearSound = new Audio(
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971971/tetris/clear_nbkxsq.wav"
  );
  var landSound = new Audio(
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971970/tetris/fall_apdjlt.wav"
  );
  var gameOverSound = new Audio(
    "https://res.cloudinary.com/ddrrwygt1/video/upload/v1624971971/tetris/gameover_pfskwg.wav"
  );
  var gameOverbool;
  var pauseBool;
  var idleBool = true;
  const grid = document.querySelector(".gridContainer");
  let squares = Array.from(document.querySelectorAll(".gridContainer div"));
  const scoreDisp = document.querySelector("#Score");
  const scoreDispEnd = document.querySelector("#ScoreEnd");
  const startButt = document.querySelector("#startButton");
  const pauseButt = document.querySelector("#pauseButton");
  const cardView = document.querySelector("#instructionsCard");
  const buttTrack1 = document.querySelector("#butt1");
  const buttTrack2 = document.querySelector("#butt2");
  const buttTrack3 = document.querySelector("#butt3");
  const buttTrack4 = document.querySelector("#butt4");
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  let clicks = 0;
  let rowCount = 1;
  let menuClicked = false;
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "grey"
  ];
  function playTrack1() {
    sessionStorage.setItem(chosen, 0);
    return chosen;
  }
  function playTrack2() {
    sessionStorage.setItem(chosen, 1);
    return chosen;
  }
  function playTrack3() {
    sessionStorage.setItem(chosen, 2);
    return chosen;
  }
  function playTrack4() {
    sessionStorage.setItem(chosen, 3);
    return chosen;
  }
  function rotatePlay() {
    rotateSound.play();
    rotateSound.currentTime = 0;
  }
  function verticalPlay() {
    verticalSound.play();
    verticalSound.currentTime = 0;
  }
  function horizontalPlay() {
    horizontalSound.play();
    horizontalSound.currentTime = 0;
  }
  function clearPlay() {
    clearSound.play();
  }

  function landPlay() {
    landSound.play();
  }

  function gameOverPlay() {
    gameOverSound.play();
  }

  function BGMPlay() {
    myMusic.play();
    myMusic.loop = true;
  }

  function BGMPause() {
    myMusic.pause();
  }

  //The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const jTetromino = [
    [1, width * 2 + 1, width + 1, 0],
    [width * 2 + 2, width * 2 + 1, width * 2, width + 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [width, width + 1, width + 2, width * 2]
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const sTetromino = [
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];
  const theTetrominoes = [
    lTetromino,
    jTetromino,
    zTetromino,
    sTetromino,
    tTetromino,
    oTetromino,
    iTetromino
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  console.log(theTetrominoes[0][0]);

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  //draw the Tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }

  //assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 65) {
      if (gameOverbool == false)
        if (pauseBool == false) {
          idleBool == false;
          horizontalPlay();
          moveLeft();
        }
    } else if (e.keyCode === 87) {
      if (gameOverbool == false)
        if (pauseBool == false) {
          idleBool == false;
          rotatePlay();
          rotate();
        }
    } else if (e.keyCode === 68) {
      if (gameOverbool == false)
        if (pauseBool == false) {
          idleBool == false;
          horizontalPlay();
          moveRight();
        }
    } else if (e.keyCode === 83) {
      idleBool == false;
      if (gameOverbool == false)
        if (pauseBool == false) {
          idleBool == false;
          verticalPlay();
          moveDown();
        }
    } else idleBool == true;
  }
  document.addEventListener("keyup", control);

  //move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      current.forEach((index) => {
        squares[currentPosition + index].style.backgroundColor = colors[7];
      });
      landPlay();
      score += 5;
      scoreDisp.innerHTML = score;
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!isAtRightEdge) currentPosition += 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  function isAtRight() {
    return current.some((index) => (currentPosition + index + 1) % width === 0);
  }

  function isAtLeft() {
    return current.some((index) => (currentPosition + index) % width === 0);
  }

  function checkRotatedPosition(pos) {
    pos = pos || currentPosition;
    if ((pos + 1) % width < 4) {
      if (isAtRight()) {
        currentPosition += 1;
        checkRotatedPosition(pos);
      }
    } else if (pos % width > 5) {
      if (isAtLeft()) {
        currentPosition -= 1;
        checkRotatedPosition(pos);
      }
    }
  }

  //rotate the tetromino
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    checkRotatedPosition();
    draw();
  }

  //show up-next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll(".miniGrid div");
  const displayWidth = 4;
  const displayIndex = 0;

  //the Tetrominos without rotations
  const upNextTet = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [1, displayWidth * 2 + 1, displayWidth + 1, 0],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [
      displayWidth + 2,
      displayWidth * 2 + 1,
      displayWidth * 2 + 2,
      displayWidth * 3 + 1
    ],
    [
      displayWidth + 2,
      displayWidth * 2 + 1,
      displayWidth * 2 + 2,
      displayWidth * 2 + 3
    ],
    [
      displayWidth + 1,
      displayWidth + 2,
      displayWidth * 2 + 1,
      displayWidth * 2 + 2
    ],
    [2, displayWidth + 2, displayWidth * 2 + 2, displayWidth * 3 + 2]
  ];

  //display the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTet[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandom];
    });
  }
  if (buttTrack1) {
    buttTrack1.addEventListener("click", () => {
      playTrack1();
    });
  }
  if (buttTrack2) {
    buttTrack2.addEventListener("click", () => {
      playTrack2();
    });
  }
  if (buttTrack3) {
    buttTrack3.addEventListener("click", () => {
      playTrack3();
    });
  }
  if (buttTrack4) {
    buttTrack4.addEventListener("click", () => {
      playTrack4();
    });
  }

  if (buttTrack1) {
    buttTrack1.addEventListener("click", () => {
      if (menuClicked == true) {
        BGMPause();
        menuClicked = false;
      } else {
        menuClicked = true;
        var chosener = sessionStorage.getItem(chosen);
        myMusic = new Audio(musicList[chosener]);
        BGMPlay();
      }
    });
  }
  if (buttTrack2) {
    buttTrack2.addEventListener("click", () => {
      if (menuClicked == true) {
        BGMPause();
        menuClicked = false;
      } else {
        menuClicked = true;
        var chosener = sessionStorage.getItem(chosen);
        myMusic = new Audio(musicList[chosener]);
        BGMPlay();
      }
    });
  }
  if (buttTrack3) {
    buttTrack3.addEventListener("click", () => {
      if (menuClicked == true) {
        BGMPause();
        menuClicked = false;
      } else {
        menuClicked = true;
        var chosener = sessionStorage.getItem(chosen);
        myMusic = new Audio(musicList[chosener]);
        BGMPlay();
      }
    });
  }
  if (buttTrack4) {
    buttTrack4.addEventListener("click", () => {
      if (menuClicked == true) {
        BGMPause();
        menuClicked = false;
      } else {
        menuClicked = true;
        var chosener = sessionStorage.getItem(chosen);
        myMusic = new Audio(musicList[chosener]);
        BGMPlay();
      }
    });
  }
  if (pauseButt) {
    pauseButt.addEventListener("click", () => {
      if (timerId) {
        document.getElementById("startButton").classList.remove("hideMe");
        document.getElementById("instructionsCard").classList.remove("hideMe");
        startButt.innerHTML = "Resume";
        pauseBool = true;
        idleBool = false;
        clearInterval(timerId);
        timerId = null;
        BGMPause();
      }
    });
  }

  if (startButt) {
    startButt.addEventListener("click", () => {
      document.getElementById("startButton").classList.add("hideMe");
      document.getElementById("instructionsCard").classList.add("hideMe");
      pauseBool = false;
      draw();
      console.log(idleBool);
      if (
        !current.some((index) =>
          squares[currentPosition + index + width].classList.contains("taken")
        )
      ) {
        timerId = setInterval(moveDown, 1000);
      }
      if (clicks == 0) {
        gameOverbool = false;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayShape();
      }
      var chosener = sessionStorage.getItem(chosen);
      myMusic = new Audio(musicList[chosener]);
      BGMPlay();
      document.getElementById("menuList").classList.add("hideMe");
      clicks++;
    });
  }

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 100;
        scoreDisp.innerHTML = score;
        clearPlay();
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDispEnd.innerHTML = score;
      gameOverbool = true;
      document.getElementById("gameOver").classList.remove("hideMe");
      document.getElementById("instructionsCard").classList.remove("hideMe");
      document.getElementById("inGame").classList.add("hideMe");

      BGMPause();
      gameOverPlay();
      clearInterval(timerId);
    }
  }
});
