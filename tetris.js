document.addEventListener('DOMContentLoaded', () => {
  const chosen = 0
  const musicList = ["./audio/1 - Track 1.mp3",
    "./audio/2 - Track 2.mp3",
    "./audio/3 - Track 3.mp3",
    "./audio/4 - Track 4.mp3"]
  var myMusic
  var clearSound = new Audio("./audio/clear.wav")
  var landSound = new Audio("./audio/fall.wav")
  var gameOverSound = new Audio("./audio/gameover.wav")
  var gameOverbool
  var pauseBool
  var idleBool = true
  const grid = document.querySelector('.gridContainer')
  let squares = Array.from(document.querySelectorAll('.gridContainer div'))
  const scoreDisp = document.querySelector('#Score')
  const startButt = document.querySelector('#startButton')
  const buttTrack1 = document.querySelector('#butt1')
  const buttTrack2 = document.querySelector('#butt2')
  const buttTrack3 = document.querySelector('#butt3')
  const buttTrack4 = document.querySelector('#butt4')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  let clicks = 0
  let menuClicked = false
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple'
  ]
  function playTrack1() {
    sessionStorage.setItem(chosen, 0)
    return chosen
  }
  function playTrack2() {
    sessionStorage.setItem(chosen, 1)
    return chosen
  }
  function playTrack3() {
    sessionStorage.setItem(chosen, 2)
    return chosen
  }
  function playTrack4() {
    sessionStorage.setItem(chosen, 3)
    return chosen
  }
  function clearPlay() {
    clearSound.play()
  }

  function landPlay() {
    landSound.play()
  }

  function gameOverPlay() {
    gameOverSound.play()
  }

  function BGMPlay() {
    myMusic.play()
    myMusic.loop = true
  }

  function BGMPause() {
    myMusic.pause()
  }

  //The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const jTetromino = [
    [1, width * 2 + 1, width + 1, 0],
    [width * 2 + 2, width * 2 + 1, width * 2, width + 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [width, width + 1, width + 2, width * 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const sTetromino = [
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]
  const theTetrominoes = [lTetromino, jTetromino, zTetromino, sTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  console.log(theTetrominoes[0][0])

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  //draw the Tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
      squares[currentPosition + index].style.backgroundColor = ''

    })
  }

  //assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      if (gameOverbool == false)
        if (pauseBool == false) {
          idleBool == false
          moveLeft()
        }
    } else if (e.keyCode === 38) {
      if (gameOverbool == false)
        if (pauseBool == false) {
          idleBool == false
          rotate()
        }
    } else if (e.keyCode === 39) {
      if (gameOverbool == false)
        if (pauseBool == false) {
          idleBool == false
          moveRight()
        }
    } else if (e.keyCode === 40) {
      idleBool == false
      if (gameOverbool == false)
        if (pauseBool == false) {
          idleBool == false
          moveDown()
        }
    }
    else
      idleBool == true
  }
  document.addEventListener('keyup', control)

  //move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  //freeze function
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      landPlay()
      score += 5
      scoreDisp.innerHTML = score
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if (!isAtLeftEdge) currentPosition -= 1
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
  }

  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if (!isAtRightEdge) currentPosition += 1
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }
    draw()
  }


  function isAtRight() {
    return current.some(index => (currentPosition + index + 1) % width === 0)
  }

  function isAtLeft() {
    return current.some(index => (currentPosition + index) % width === 0)
  }

  function checkRotatedPosition(P) {
    P = P || currentPosition
    if ((P + 1) % width < 4) {
      if (isAtRight()) {
        currentPosition += 1
        checkRotatedPosition(P)
      }
    }
    else if (P % width > 5) {
      if (isAtLeft()) {
        currentPosition -= 1
        checkRotatedPosition(P)
      }
    }
  }

  //rotate the tetromino
  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    checkRotatedPosition()
    draw()
  }

  //show up-next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll('.miniGrid div')
  const displayWidth = 4
  const displayIndex = 0


  //the Tetrominos without rotations
  const upNextTet = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [1, displayWidth * 2 + 1, displayWidth + 1, 0],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [displayWidth + 2, displayWidth * 2 + 1, displayWidth * 2 + 2, displayWidth * 3 + 1],
    [displayWidth + 2, displayWidth * 2 + 1, displayWidth * 2 + 2, displayWidth * 2 + 3],
    [displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1, displayWidth * 2 + 2],
    [2, displayWidth + 2, displayWidth * 2 + 2, displayWidth * 3 + 2]
  ]

  //display the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTet[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }
  if (buttTrack1) {
    buttTrack1.addEventListener('click', () => {
      playTrack1()
    })
  }
  if (buttTrack2) {
    buttTrack2.addEventListener('click', () => {
      playTrack2()
    })
  }
  if (buttTrack3) {
    buttTrack3.addEventListener('click', () => {
      playTrack3()
    })
  }
  if (buttTrack4) {
    buttTrack4.addEventListener('click', () => {
      playTrack4()
    })
  }

  if (buttTrack1) {
    buttTrack1.addEventListener('click', () => {
      if (menuClicked == true) {
        BGMPause()
        menuClicked = false
      }
      else {
        menuClicked = true
        var chosener = sessionStorage.getItem(chosen)
        myMusic = new Audio(musicList[chosener])
        BGMPlay()
      }
    })
  }
  if (buttTrack2) {
    buttTrack2.addEventListener('click', () => {
      if (menuClicked == true) {
        BGMPause()
        menuClicked = false
      }
      else {
        menuClicked = true
        var chosener = sessionStorage.getItem(chosen)
        myMusic = new Audio(musicList[chosener])
        BGMPlay()
      }

    })
  }
  if (buttTrack3) {
    buttTrack3.addEventListener('click', () => {
      if (menuClicked == true) {
        BGMPause()
        menuClicked = false
      }
      else {
        menuClicked = true
        var chosener = sessionStorage.getItem(chosen)
        myMusic = new Audio(musicList[chosener])
        BGMPlay()
      }
    })
  }
  if (buttTrack4) {
    buttTrack4.addEventListener('click', () => {
      if (menuClicked == true) {
        BGMPause()
        menuClicked = false
      }
      else {
        menuClicked = true
        var chosener = sessionStorage.getItem(chosen)
        myMusic = new Audio(musicList[chosener])
        BGMPlay()
      }
    })
  }
  if (startButt) {
    startButt.addEventListener('click', () => {
      if (timerId) {
        pauseBool = true
        idleBool = false
        clearInterval(timerId)
        timerId = null
        BGMPause()
      } else {
        pauseBool = false
        draw()
        console.log(idleBool)
        if(!current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
          timerId = setInterval(moveDown, 1000)
        }
        if (clicks == 0) {
          gameOverbool = false
          nextRandom = Math.floor(Math.random() * theTetrominoes.length)
          displayShape()
        }
        var chosener = sessionStorage.getItem(chosen)
        myMusic = new Audio(musicList[chosener])
        BGMPlay()
        clicks++
      }
    })
  }


  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 100
        scoreDisp.innerHTML = score
        clearPlay()
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  //game over
  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      gameOverbool = true
      scoreDisp.innerHTML = 'GAME OVER! </br> TOTAL SCORE IS: ' + score
      BGMPause()
      gameOverPlay()
      clearInterval(timerId)
    }
  }

})