const board = new Array()
var score = 0
var addedScore = 0
const hasMerged = new Array()

window.onload = function () {
  newGame()
}

//开始新游戏
function newGame() {
  //初始化游戏
  initial()
  //随机生成两个数字
  generateOneNumber()
  generateOneNumber()
}

function initial() {
  score = 0
  document.getElementsByClassName('score')[0].innerHTML = score

  document.getElementById('gameover').style.visibility = 'hidden'

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      var newSec = document.getElementById('section-' + i + '-' + j)
      newSec.style.top = calTop(i)
      newSec.style.left = calLeft(j)
    }
  }

  // 生成4*4数字数组
  for (let i = 0; i < 4; i++) {
    board[i] = new Array()
    hasMerged[i] = new Array()
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0
      hasMerged[i] = false
    }
  }

  generateBoard()
}

function generateBoard() {
  // 删除已有的数字
  const parentNode = document.getElementsByClassName('game-sections')[0]
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      var child = document.getElementById('numberSec-' + i + '-' + j)
      if (child != null) child.remove()
    }
  }

  // 添加数字
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const div = document.createElement('div')
      div.setAttribute('class', 'numberSec')
      div.setAttribute('id', 'numberSec-' + i + '-' + j)
      parentNode.appendChild(div)
      const curNum = document.getElementById('numberSec-' + i + '-' + j)

      //数字为0，即无数字
      if (board[i][j] == 0) {
        curNum.style.top = calTop(i) + 50
        curNum.style.left = calLeft(j) + 50
        curNum.style.width = 0
        curNum.style.height = 0
        //有数字
      } else {
        curNum.style.top = calTop(i)
        curNum.style.left = calLeft(j)
        curNum.style.backgroundColor = getBackgroundColor(board[i][j])
        curNum.style.color = getColor(board[i][j])
        curNum.style.fontSize = getFontSize(board[i][j])
        curNum.style.width = 100
        curNum.style.height = 100
        curNum.innerHTML = board[i][j]
      }
    }
  }
}

function generateOneNumber() {
  if (!moreSpace(board)) {
    return false
  }
  //随机生成坐标
  var times = 0
  do {
    var randomX = parseInt(Math.floor(Math.random() * 4))
    var randomY = parseInt(Math.floor(Math.random() * 4))
    if (board[randomX][randomY] == 0) break
    times++
  } while (times < 50)

  // 如果随机寻找空位尝试次数太多，直接人为寻找空位
  if (times == 50) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] == 0) {
          randomX = i
          randomY = j
        }
      }
    }
  }

  //随机生成数字
  let randNum = Math.random() < 0.7 ? 2 : 4

  //展示数字
  board[randomX][randomY] = randNum
  showNumberAnimation(randomX, randomY, randNum)
  setTimeout('generateBoard()', 30)
  return true
}

window.onkeydown = function (event) {
  addedScore = 0
  switch (event.keyCode) {
    case 37: // left
      if (MoveLeft()) {
        setTimeout('generateOneNumber()', 20)
        setTimeout('isGameOver()', 200)
      }
      break

    case 38: // up
      if (MoveUp()) {
        setTimeout('generateOneNumber()', 20)
        setTimeout('isGameOver()', 200)
      }
      break

    case 39: // right
      if (MoveRight()) {
        setTimeout('generateOneNumber()', 20)
        setTimeout('isGameOver()', 200)
      }
      break

    case 40: // down
      if (MoveDown()) {
        setTimeout('generateOneNumber()', 20)
        setTimeout('isGameOver()', 200)
      }
      break
    default:
      break
  }
}

function isGameOver() {
  if (!moreSpace(board) && !canMoveLeft(board) && !canMoveRight(board) && !canMoveUp(board) && !canMoveDown(board)) {
    showGameOver()
  }
}

function MoveLeft() {
  if (!canMoveLeft(board)) return false

  //开始逐一格子左移
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 0; k < j; k++) {
          //左边有空格，且中间无遮挡物
          if (board[i][k] == 0 && noHorizontalBlock(i, k, j, board)) {
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            //左边数字相等，且中间无遮挡物
          } else if (board[i][k] == board[i][j] && noHorizontalBlock(i, k, j, board) && !hasMerged[i][k]) {
            showMoveAnimation(i, j, i, k)
            board[i][k] += board[i][j]
            board[i][j] = 0
            hasMerged[i][k] = true
            //更新分数
            score += board[i][k]
            addedScore += board[i][k]
          }
        }
      }
    }
  }
  if (addedScore != 0) {
    upDateScore(score, addedScore)
  }
  setTimeout('generateBoard()', 200)
  return true
}

function MoveRight() {
  if (!canMoveRight(board)) return false

  //开始逐一格子右移
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (let k = 3; k > j; k--) {
          //右边有空格，且中间无遮挡物
          if (board[i][k] == 0 && noHorizontalBlock(i, j, k, board)) {
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            //右边数字相等，且中间无遮挡物
          } else if (board[i][k] == board[i][j] && noHorizontalBlock(i, j, k, board) && !hasMerged[i][k]) {
            showMoveAnimation(i, j, i, k)
            board[i][k] += board[i][j]
            board[i][j] = 0
            hasMerged[i][k] = true
            //更新分数
            score += board[i][k]
            addedScore += board[i][k]
          }
        }
      }
    }
  }
  if (addedScore != 0) {
    upDateScore(score, addedScore)
  }
  setTimeout('generateBoard()', 200)
  return true
}

function MoveUp() {
  if (!canMoveUp(board)) return false

  //开始逐一格子上移
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 0; k < i; k++) {
          //上边有空格，且中间无遮挡物
          if (board[k][j] == 0 && noVerticalBlock(j, k, i, board)) {
            showMoveAnimation(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            //上边数字相等，且中间无遮挡物
          } else if (board[k][j] == board[i][j] && noVerticalBlock(j, k, i, board) && !hasMerged[k][j]) {
            showMoveAnimation(i, j, k, j)
            board[k][j] += board[i][j]
            board[i][j] = 0
            hasMerged[k][j] = true
            //更新分数
            score += board[k][j]
            addedScore += board[k][j]
          }
        }
      }
    }
  }
  if (addedScore != 0) {
    upDateScore(score, addedScore)
  }
  setTimeout('generateBoard()', 200)
  return true
}

function MoveDown() {
  if (!canMoveDown(board)) return false

  //开始逐一格子下移
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 3; k > i; k--) {
          //下边有空格，且中间无遮挡物
          if (board[k][j] == 0 && noVerticalBlock(j, i, k, board)) {
            showMoveAnimation(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            //下边数字相等，且中间无遮挡物
          } else if (board[k][j] == board[i][j] && noVerticalBlock(j, i, k, board) && !hasMerged[k][j]) {
            showMoveAnimation(i, j, k, j)
            board[k][j] += board[i][j]
            board[i][j] = 0
            hasMerged[k][j] = true
            //更新分数
            score += board[k][j]
            addedScore += board[k][j]
          }
        }
      }
    }
  }
  if (addedScore != 0) {
    upDateScore(score, addedScore)
  }
  setTimeout('generateBoard()', 200)
  return true
}
