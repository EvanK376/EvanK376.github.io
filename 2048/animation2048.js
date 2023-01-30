function showNumberAnimation(x, y, randNum) {
  var curNum = document.getElementById('numberSec-' + x + '-' + y)
  curNum.style.backgroundColor = getBackgroundColor(randNum)
  curNum.style.color = getColor(randNum)
  curNum.innerHTML = randNum
  curNum.animate(
    {
      top: calTop(x) + 'px',
      left: calTop(y) + 'px',
      width: '100px',
      height: '100px'
    },
    50
  )
}

function showMoveAnimation(fromX, fromY, toX, toY) {
  var curNum = document.getElementById('numberSec-' + fromX + '-' + fromY)

  curNum.animate(
    {
      top: calTop(toX) + 'px',
      left: calLeft(toY) + 'px'
    },
    150
  )
}

function upDateScore(score, addedScore) {
  //更新数字动画
  const div = document.createElement('div')
  div.setAttribute('class', 'scoreAnimation')
  document.getElementsByClassName('animation')[0].appendChild(div)
  //更新数字
  document.getElementsByClassName('score')[0].innerHTML = score
  div.style.top = 55
  div.style.left = 55
  div.innerHTML = '+' + addedScore
  div.animate(
    {
      opacity: '0',
      top: '20px'
    },
    300
  )
  setTimeout('removeHelper()', 200)
}

/*
用原生JS写的动画，现实效果不佳
function showNumberAnimation(x, y, randNum) {
  var curNum = document.getElementById('numberSec-' + x + '-' + y)
  curNum.style.backgroundColor = getBackgroundColor(randNum)
  curNum.style.color = getColor(randNum)
  curNum.innerHTML = randNum

  var id = setInterval(animation, 5)
  var pos = 0
  var size = 0
  function animation() {
    if (pos == 100) {
      clearInterval(id)
    } else {
      pos += 10
      size += 6
      curNum.style.width = pos + 'px'
      curNum.style.height = pos + 'px'
      curNum.style.fontSize = size + 'px'
    }
    curNum.style.top = calTop(x)
    curNum.style.left = calLeft(y)
  }
}


function showHorizontalMoveAnimation(X, fromY, toY) {
  var curNum = document.getElementById('numberSec-' + X + '-' + fromY)
  var id = setInterval(animation, 100)
  var pos = 0

  function animation() {
    if (pos == calLeft(toY)) {
      clearInterval(id)
    } else {
      pos += 5
      curNum.style.left = pos + 'px'
    }
  }
}

function showVerticalMoveAnimation(Y, fromX, toX) {
  var curNum = document.getElementById('numberSec-' + fromX + '-' + Y)
  var id = setInterval(animation, 100)
  var pos = 0

  function animation() {
    if (pos == calTop(toX)) {
      clearInterval(id)
    } else {
      pos += 5
      curNum.style.top = pos + 'px'
    }
  }
}*/
