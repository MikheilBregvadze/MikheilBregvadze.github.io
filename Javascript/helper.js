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