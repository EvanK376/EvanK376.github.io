function calTop(rowNum) {
  return 120 * rowNum + 20
}

function calLeft(colNum) {
  return 120 * colNum + 20
}

function getColor(number) {
  if (number == 2 || number == 4) {
    return '#726457'
  } else {
    return '#fafafa'
  }
}

function getFontSize(number) {
  switch (number) {
    case 128:
    case 256:
      return '45px'
    case 1024:
    case 2048:
      return '35px'
    default:
      return '55px'
  }
}
function getBackgroundColor(number) {
  switch (number) {
    case 2:
      return '#eee4da'

    case 4:
      return '#eee1c9'

    case 8:
      return '#f3b27a'
    case 16:
      return '#f69664'

    case 32:
      return '#f77c5f'

    case 64:
      return '#f75f3b'

    case 128:
      return '#edd073'

    case 256:
      return '#edcc61'

    case 512:
      return '#edc950'

    case 1024:
      return '#edc350'

    case 2048:
      return '#edc22e'

    case 4096:
      return '#eda72e'

    default:
      return '#706a5b'
  }
}

function moreSpace(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 0) return true
    }
  }
  return false
}

function canMoveLeft(board) {
  // 检查左侧是否还有空格
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) return true
      }
    }
  }

  return false
}

function canMoveRight(board) {
  // 检查右侧是否还有空格
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) return true
      }
    }
  }

  return false
}

function canMoveUp(board) {
  // 检查上方是否还有空格
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) return true
      }
    }
  }
}

function canMoveDown(board) {
  // 检查下方是否还有空格
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) return true
      }
    }
  }

  return false
}

function noHorizontalBlock(row, col1, col2, board) {
  //检查水平方向，中间是否没有遮挡
  for (let i = col1 + 1; i < col2; i++) {
    if (board[row][i] != 0) return false
  }

  return true
}

function noVerticalBlock(col, row1, row2, board) {
  //检查垂直方向，中间是否没有遮挡
  for (let i = row1 + 1; i < row2; i++) {
    if (board[i][col] != 0) return false
  }

  return true
}

function removeHelper() {
  document.getElementsByClassName('scoreAnimation')[0].remove()
}

function showGameOver() {
  document.getElementById('gameover').style.visibility = 'visible'
}
