const gameInfo = {
    gameTable: [],
    currentPiece: {
        row: null,
        column: null,
        type: null,
        elementId: null,
        obj: null
    },
    currentFreeSeat: {
        row: null,
        column: null,
        elementId: null,
        obj: null
    },
    beforeKilled: {
        row: null,
        column: null,
        elementId: null,
        obj: null
    },
    currentKing: null,
    moveKingWithoutKill: false,
    isPlayerTurnType: 'white'
}

function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

window.addEventListener('resize', reportWindowSize);
// window.addEventListener('onload', reportWindowSize);
window.document.onload = reportWindowSize();

function reportWindowSize() {
  let windowWidth = document.getElementById('app').offsetWidth;
  let windowHeight = document.getElementById('app').offsetHeight;
  let o_left = null;

  if(windowHeight < windowWidth)
    windowWidth = windowHeight

  let gameWidth = 740;
  let gameScale = 0;

  if(windowWidth < 705) {
    gameScale =  windowWidth / gameWidth;

    document.getElementById('game').style.transform = `scale(${gameScale})`;
    document.getElementById('game-div').style.left = `${(windowWidth / 2) / gameScale}px`;
    document.getElementById('game-div').style.marginLeft = `-346px`;
  } else {
    document.getElementById('game').style.transform = `scale(1)`;
    document.getElementById('game-div').style.left = `auto`;
    document.getElementById('game-div').style.margin = `auto`;
  }
}