if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
let playerwins = 0
let computerwins = 0
let playerbouts = 0
let computerbouts = 0
let playerVictories = 0
let computerVictories = 0

const handleButtonClick = (event) => {
  const player = event.target.className
  const computer = getComputerMove()
  $('figure.player img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${player}.svg`
  $('figure.computer img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${computer}.svg`

  if (player === 'rock') {
    if (computer === 'scissors') {
      playerwins++
    } if (computer === 'paper') {
      computerwins++
    }
  }
  if (player === 'paper') {
    if (computer === 'rock') {
      playerwins++
    } if (computer === 'scissors') {
      computerwins++
    }
  }
  if (player === 'scissors') {
    if (computer === 'paper') {
      playerwins++
    } if (computer === 'rock') {
      computerwins++
    }
  }

  if (playerwins >= 2) {
    playerbouts++
    resetRound()
  }
  if (computerwins >= 2) {
    computerbouts++
    resetRound()
  }
  $('span.player').textContent = playerwins
  $('span.computer').textContent = computerwins

  if (playerbouts >= 2) {
    playerVictories++
    gameOver(true)
  }
  if (computerbouts >= 2) {
    computerVictories++
    gameOver(false)
  }
  $('span.playerbout').textContent = playerbouts
  $('span.computerbout').textContent = computerbouts
  $('span.playerVictories').textContent = playerVictories
  $('span.computerVictories').textContent = computerVictories
}

const getComputerMove = () => {
  const moves = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}

const gameOver = (playerDidWin) => {
  if (playerDidWin) {
    $('.dialog h3').textContent = 'You won!'
  } else {
    $('.dialog h3').textContent = 'You lost!'
  }
  setTimeout(() => {
    $('body').className = 'modal'
  }, 200)
}

const resetGame = () => {
  // TODO: Probably need to do more to reset the game here...
  $('figure.player img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('figure.computer img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('body').className = ''
  // rounds area
  playerwins = 0
  computerwins = 0
  $('span.player').textContent = playerwins
  $('span.computer').textContent = computerwins
  // bouts area
  playerbouts = 0
  computerbouts = 0
  $('span.playerbout').textContent = playerbouts
  $('span.computerbout').textContent = computerbouts
}

const resetRound = () => {
  if (playerbouts >= 1 || computerbouts >= 1) {
    playerwins = 0
    computerwins = 0
    $('span.player').textContent = playerwins
    $('span.computer').textContent = computerwins
    console.log('here')
  }
}

const main = () => {
  const buttons = $$('.player-input button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
  $('.dialog button').addEventListener('click', resetGame)
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
