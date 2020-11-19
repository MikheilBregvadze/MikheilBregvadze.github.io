let game = {
    gameTable: [],
    freeSeat: [],
    notFreeSeats: [],
    freeSeatForBlacks: [],
    notFreeSeatsFroBlacks: [],
    checkersCurrentPositions: {
        id: null,
        posX: null,
        posY: null,
        row: null,
        column: null,
        keyName: null,
        isKing: false
    },
    currentKiller: null,

    row: null,
    column: null,

    maybeKilled: {
        id: null,
    },
    isPlayerTurn: 'white',
    currentChecker: null,
    kingPositionToKill: [
        [2, 2],[2, 4], [2, 6],
        [3, 3], [3, 5], [3, 7],
        [4, 2],[4, 4], [4, 6],
        [5, 3], [5, 5], [5, 7],
        [6, 2],[6, 4], [6, 6],
        [7, 3], [7, 5], [7, 7]
    ],
    currentKing: {},
    moveKingWithoutKill: false
}

let counterId = 0;

class Game {
    constructor() {
      this.oneStepIsFinished = true ;
      this.isAlsoKillingPlace = [];
      this.ifKingNotKill = [];
    }

    load() {
      alert(5);
      try {
        alert(5);
        this.createGameArena();
        this.drawGameBackground();
        this.drawCheckers();
        this.getElementId();
      } catch(err) {
        alert(err)
      }
    }

    createGameArena() {
        for(let r = 0; r < 10; r++) {
            game.gameTable.push({
                row: []
            });
            for(let c = 0; c < 10; c++) {

                if(r < 4 && c % 2 === r % 2) {
                    game.gameTable[r].row.push({
                        name: 'black',
                        id: "black-" + r + c,
                        posX: 8 + (c - 1) * 80,
                        posY: 8 + (r - 1) * 80,
                        type: 1,
                        status: "off",
                        isKing: false
                    })
                }else if(r < 3){
                    game.gameTable[r].row.push({
                        type: 2
                    })
                }else if(r > 5 && c % 2 === r % 2) {
                    game.gameTable[r].row.push({
                        name: 'white',
                        id: "white-" + r + c,
                        posX: 8 + (c - 1) * 80,
                        posY: 330 + (r - 5) * 80,
                        type: -1,
                        status: "off",
                        isKing: false
                    })
                }else {
                    if(c % 2 === r % 2) {
                        game.gameTable[r].row.push({
                            name: 'freeSeat',
                            id: "free-" + r + c,
                            posX: 8 + (c - 1) * 80,
                            posY: 330 + (r - 5) * 80,
                            type: 0,
                            status: "off",
                            isKing: false
                        })
                    }else {
                        game.gameTable[r].row.push({
                            type: 2
                        })
                    }
                }
            }
        }
    }

    drawGameBackground() {
        for (let i = 0; i < 64; i++){
            document.getElementById("table").appendChild(document.createElement("div")).style.backgroundColor = parseInt((i / 8) + i + "") % 2 === 0 ? '#4A2317' : '#EEC588';
        }
    }

    drawCheckers() {
        let checkerDiv = null;
        const gameTable = game.gameTable;
        for(let r = 0; r < gameTable.length; r++) {
            for(let c = 0; c < gameTable[r].row.length; c++) {
                if((r > 0 && r < 9) && (c > 0 && c < 9)) {
                    if(gameTable[r].row[c].name === 'white' || gameTable[r].row[c].name === 'black' || gameTable[r].row[c].name === 'freeSeat') {
                        checkerDiv = document.createElement('div');
                        setAttributes(checkerDiv, {'id': gameTable[r].row[c].id, 'class': 'checker'});
                        checkerDiv.style.cssText = `top: ${gameTable[r].row[c].posY}px; left: ${gameTable[r].row[c].posX}px`;
                        document.getElementById('checkers').appendChild(checkerDiv);

                        if(gameTable[r].row[c].name === 'white') {
                            checkerDiv.classList.add('white');
                        }else if(gameTable[r].row[c].name === 'black') {
                            checkerDiv.classList.add('black');
                        }else {
                            checkerDiv.classList.add('freeSeat');
                        }
                    }
                }
            }
        }
    }

    moveKingPiece(r, c, currentKing, whereFrom, side) {
        let row = currentKing.row;
        let column = currentKing.col;
        let countSameTypePiece = 0;
        for(let t = 0; t <= 8; t++) {
            if(row >= 1 && column >= 1 && row <= 8 && column <= 8) {

                if(whereFrom === "down" && side === 'right') {
                    row--;
                    column++;
                } else if(whereFrom === "down" && side === 'left') {
                    row--;
                    column--;
                } else if (whereFrom === "up" && side === 'left') {
                    row++;
                    column--;
                } else if (whereFrom === "up" && side === 'right') {
                    row++;
                    column++;
                }
                if(game.gameTable[row + 1] === undefined || game.gameTable[row - 1] === undefined || game.gameTable[row + 1].row[column + 1] === undefined ||
                   game.gameTable[row + 1].row[column - 1] === undefined || game.gameTable[row - 1].row[column + 1] === undefined ||
                   game.gameTable[row - 1].row[column - 1] === undefined) {
                    break;
                }

                if(game.gameTable[row].row[column].name !== "freeSeat") {
                    if (game.gameTable[row - 1].row[column - 1].name !==  "freeSeat" && side === 'left' && whereFrom === "down") {
                        countSameTypePiece++;
                    }else if (game.gameTable[row - 1].row[column + 1].name !==  "freeSeat" && side === 'right' && whereFrom === "down") {
                        countSameTypePiece++;
                    }else if (game.gameTable[row + 1].row[column - 1].name !==  "freeSeat" && side === 'left' && whereFrom === "up") {
                        countSameTypePiece++;
                    }else if (game.gameTable[row + 1].row[column + 1].name !==  "freeSeat" && side === 'right' && whereFrom === "up") {
                        countSameTypePiece++;
                    }
                }
                if(countSameTypePiece > 0) {
                    break;
                }

                if(((game.gameTable[row].row[column].name === "white" || game.gameTable[row].row[column].name === "black") && game.gameTable[row].row[column].name !== currentKing.name) && game.gameTable[row - 1].row[column + 1].name === "freeSeat" && whereFrom === "down") {
                    this.removeActiveClassFreeSeat('currentAfterWhite');
                    this.isAlsoKillingPlace.push({r: row - 1, c: side === 'left' ? column - 1 : column + 1});
                    break;
                } else if(((game.gameTable[row].row[column].name === "white" || game.gameTable[row].row[column].name === "black") && game.gameTable[row].row[column].name !== currentKing.name) && game.gameTable[row - 1].row[column - 1].name === "freeSeat" && whereFrom === "down" && column - 1 !== 0) {
                    this.removeActiveClassFreeSeat('currentAfterWhite');
                    this.isAlsoKillingPlace.push({r: row - 1, c: column - 1});
                    break;
                } else if(((game.gameTable[row].row[column].name === "white" || game.gameTable[row].row[column].name === "black") && game.gameTable[row].row[column].name !== currentKing.name) && game.gameTable[row + 1].row[column + 1].name === "freeSeat" && whereFrom === "up" && side === 'right') {
                    this.removeActiveClassFreeSeat('currentAfterWhite');
                    this.isAlsoKillingPlace.push({r: row + 1, c: side === 'left' ? column - 1 : column + 1});
                    break;
                }else if(((game.gameTable[row].row[column].name === "white" || game.gameTable[row].row[column].name === "black") && game.gameTable[row].row[column].name !== currentKing.name) && game.gameTable[row + 1].row[column - 1].name === "freeSeat" && whereFrom === "up" && column - 1 !== 0) {
                    this.removeActiveClassFreeSeat('currentAfterWhite');
                    this.isAlsoKillingPlace.push({r: row + 1, c: column - 1});
                    break;
                }else {
                    if(column - 1 !== 0 && game.gameTable[row].row[column].name !== currentKing.name) {
                        this.removeActiveClassFreeSeat('currentAfterWhite');
                        game.moveKingWithoutKill = true;
                        this.ifKingNotKill.push({r: row, c: column});
                    } else {
                        break
                    }
                }
            }
        }
        if (this.isAlsoKillingPlace.length > 0) {
            game.moveKingWithoutKill = false;
            for(let i = 0; i < this.isAlsoKillingPlace.length; i++) {
                this.addActiveClassNextPositions(this.isAlsoKillingPlace[i].r, this.isAlsoKillingPlace[i].c, 'currentAfterWhite', true);
            }
        } else {
            for(let i = 0; i < this.ifKingNotKill.length; i++) {
                this.addActiveClassNextPositions(this.ifKingNotKill[i].r, this.ifKingNotKill[i].c, 'currentAfterWhite', true);
            }
        }
    }

    changePosition(keyName, element) {
        // if(user.count !== 2 || game.isPlayerTurn !== game.currentChecker) return;
        element.classList.add("active");
        let elementId = element.getAttribute('id');
        let parent = this;
        const gameTable = game.gameTable;
        const curPos = game.checkersCurrentPositions;
        for(let r = 0; r < gameTable.length; r++) {
            for(let c = 0; c < gameTable[r].row.length; c++) {
                // if(this.currentChecker === gameTable[r].row[c].id && this.canMovePiece(keyName, r, c)) {
                if(this.currentChecker === gameTable[r].row[c].id) {
                    if(gameTable[r].row[c].isKing && gameTable[r].row[c].id === elementId && (keyName === 'black' && !this.oneStepIsFinished || keyName === 'white' && this.oneStepIsFinished)) {
                        game.currentKing = gameTable[r].row[c];
                        game.currentKing.row = r;
                        game.currentKing.col = c;
                        this.moveKingPiece(r, c, game.currentKing, 'down', 'left');
                        this.moveKingPiece(r, c, game.currentKing, 'down', 'right');
                        this.moveKingPiece(r, c, game.currentKing, 'up', 'left');
                        this.moveKingPiece(r, c, game.currentKing, 'up', 'right');
                        this.isAlsoKillingPlace = [];
                        this.ifKingNotKill = [];

                        addGameData(keyName, true);
                        return;
                    }
                    if(keyName === 'black' && !this.oneStepIsFinished) {
                        this.checkerIsSelected = true;
                        addGameData(keyName);

                        this.removeActiveClassFreeSeat('currentAfterBlack');
                        if(game.gameTable[r+1].row[c+1].name === "freeSeat") {
                            this.addActiveClassNextPositions(r + 1, c + 1, 'currentAfterBlack', false);
                        }else if(game.gameTable[r+1].row[c+1].name === "white" && game.gameTable[r+2].row[c+2].name === "freeSeat") {
                            this.addActiveClassNextPositions(r + 2, c + 2, 'currentAfterBlack', true);
                            break
                        }

                        if(game.gameTable[r+1].row[c-1].name === "freeSeat") {
                            this.addActiveClassNextPositions(r + 1, c - 1, 'currentAfterBlack', true);
                        }else if(game.gameTable[r+1].row[c-1].name === "white" && game.gameTable[r+2].row[c-2].name === "freeSeat") {
                            this.removeActiveClassFreeSeat('currentAfterBlack');
                            this.addActiveClassNextPositions(r + 2, c - 2, 'currentAfterBlack', true);
                        }

                        game.currentKiller = gameTable[r + 1].row[c - 1];
                    }
                    if(keyName === 'white' && this.oneStepIsFinished) {
                        game.currentKiller = gameTable[r + 1].row[c - 1];
                        addGameData(keyName);

                        this.removeActiveClassFreeSeat('currentAfterWhite');
                        if(game.gameTable[r-1].row[c-1].name === "freeSeat") {
                            this.addActiveClassNextPositions(r - 1, c - 1, 'currentAfterWhite', true);
                        }else if(game.gameTable[r-1].row[c-1].name === "black" && game.gameTable[r-2].row[c-2].name === "freeSeat") {
                            this.addActiveClassNextPositions(r - 2, c - 2, 'currentAfterWhite', true);
                            break
                        }

                        if (game.gameTable[r-2].row[c+2] === undefined) return;
                        if(game.gameTable[r-1].row[c+1].name === "freeSeat") {
                            this.addActiveClassNextPositions(r - 1, c + 1, 'currentAfterWhite', false);
                        }else if(game.gameTable[r-1].row[c+1].name === "black" && game.gameTable[r-2].row[c+2].name === "freeSeat") {
                            this.removeActiveClassFreeSeat('currentAfterWhite');
                            this.addActiveClassNextPositions(r - 2, c + 2, 'currentAfterWhite', true);
                        }

                        this.checkerIsSelected = true;
                    }
                    if(keyName === 'freeSeat' && this.checkerIsSelected) {
                        if(game.currentKing !== null) {
                            if(game.gameTable[game.checkersCurrentPositions.row].row[game.checkersCurrentPositions.column].isKing && document.getElementById(elementId).classList.contains('currentAfterWhite')) {
                                if(!game.moveKingWithoutKill) {
                                    if(game.checkersCurrentPositions.row > r) {
                                        this.killBlackChecker(r, c, game.column > c ? 'killLeft' : 'killRight', true, true);
                                    } else {
                                        this.killWhiteChecker(r, c, game.column > c ? 'killLeft' : 'killRight', true);
                                    }
                                    this.removeActiveClassFreeSeat('currentAfterBlack');
                                    this.removeActiveClassFreeSeat('currentAfterWhite');
                                    this.endProcess();
                                    return game.currentKing = null;
                                } else {
                                    this.movesKingWithoutKill(r,c, game.column > c ? 'killLeft' : 'killRight', true);
                                    return game.currentKing = null;
                                }
                                // this.endProcess();
                            }
                        }
                        if((gameTable[r - 1].row[c + 1].name === 'white' || gameTable[r - 1].row[c - 1].name === 'white') && game.row + 2 === r && (game.column - 2 === c || game.column + 2 === c)) {
                            if(game.column > c) {
                                this.killBlackChecker(r, c, 'killLeft');
                            }else {
                                this.killBlackChecker(r, c, 'killRight');
                            }
                            this.removeActiveClassFreeSeat('currentAfterBlack');
                        }else if((curPos.name !== 'white' &&
                                  gameTable[r + 1].row[c - 1].name === 'black' ||
                                  gameTable[r + 1].row[c + 1].name === 'black') &&
                                  game.row - 2 === r &&
                                 (game.column - 2 === c || game.column + 2 === c))
                        {
                            this.removeActiveClassFreeSeat('currentAfterBlack');
                            if(game.column > c) {
                                this.killWhiteChecker(r, c, 'killLeft');
                            }else {
                                this.killWhiteChecker(r, c, 'killRight');
                            }
                        } else if(((curPos.keyName === 'black' && game.row + 1 !== r) || !(game.column - 1 === c || game.column + 1 === c))) {
                            return;
                        }else if(((curPos.keyName === 'white' && game.row - 1 !== r) || !(game.column - 1 === c || game.column + 1 === c))) {
                            return;
                        }else {
                            if(game.checkersCurrentPositions.keyName === "black") {
                                if(!document.getElementById(elementId).classList.contains('currentAfterBlack')) {
                                    return
                                }
                            } else {
                                if(!document.getElementById(elementId).classList.contains('currentAfterWhite')) {
                                    return
                                }
                            }
                            this.removeActiveClassFreeSeat('currentAfterBlack');
                            this.removeActiveClassFreeSeat('currentAfterWhite');
                            this.killBlackChecker(r,c);
                        }
                        this.endProcess();
                    }
                    function addGameData(keyName, checkIsKing) {
                        game.checkersCurrentPositions.id = game.gameTable[r].row[c].id;
                        game.checkersCurrentPositions.posX = game.gameTable[r].row[c].posX;
                        game.checkersCurrentPositions.posY = game.gameTable[r].row[c].posY;
                        game.checkersCurrentPositions.status = 'on';
                        game.checkersCurrentPositions.keyName = keyName;
                        game.checkersCurrentPositions.isKing = !!checkIsKing;
                        game.checkersCurrentPositions.row = r;
                        game.checkersCurrentPositions.column = c;
                        parent.checkerIsSelected = true;
                        game.row = r;
                        game.column = c;
                    }

                    if((r === 8 && game.gameTable[r].row[c].name === "black") || (r === 1 && game.gameTable[r].row[c].name === "white")) {
                        game.gameTable[r].row[c].isKing = true;
                        document.getElementById(game.gameTable[r].row[c].id).classList.add('king');
                    }
                }
            }
        }
    }

    canMovePiece(keyName, row, column) {
        const gameTable = game.gameTable;
        let arr = [];
        for(let r = 1; r < gameTable.length - 1; r++) {
            for (let c = 1; c < gameTable[r].row.length - 1; c++) {
                // debugger

                if(keyName === 'black' && !this.oneStepIsFinished) {
                    if(game.gameTable[r+1].row[c+1].name === "white" && game.gameTable[r+2].row[c+2].name === "freeSeat") {
                        arr.push(1);
                        break
                    }
                    if(game.gameTable[r+1].row[c-1].name === "white" && game.gameTable[r+2].row[c-2].name === "freeSeat") {
                        arr.push(1);
                    }
                }
                if(keyName === 'white' && this.oneStepIsFinished) {
                    if(game.gameTable[r-1].row[c-1].name === "black" && game.gameTable[r-2].row[c-2].name === "freeSeat") {
                        arr.push(1);
                        break
                    }

                    if(game.gameTable[r-1].row[c+1].name === "black" && game.gameTable[r-2].row[c+2].name === "freeSeat") {
                        arr.push(1);
                    }
                }
            }
        }

        return !arr.length;


    }

    killWhiteChecker(r, c, actionName, isKing) {
        this.addFreeSeats(r, c);
        this.removeActiveClassFreeSeat('currentAfterWhite');
        if(isKing) {
            this.fillSeats(game.notFreeSeats, r, c, isKing);
            game.maybeKilled.id = game.gameTable[r - 1].row[c - 1].id;
            this.createNewFreeSeats(game.currentKing.row, game.currentKing.col);
            if(actionName === "killLeft") game.maybeKilled.id = game.gameTable[r - 1].row[c + 1].id;
            this.replaceFreeSeatAfterKill(r - 1, actionName === "killRight" ? c - 1 : c + 1, game.checkersCurrentPositions.keyName === "white" ? "black" : "white");
            game.gameTable[r].row[c] = game.notFreeSeats[game.notFreeSeats.length - 1]; // Killer checkers row.
        }else if(actionName === 'killRight') {
            this.fillSeats(game.notFreeSeatsFroBlacks, r, c, isKing);
            game.maybeKilled.id = game.gameTable[r + 1].row[c - 1].id;
            this.createNewFreeSeats(r + 2, c - 2);
            game.gameTable[r].row[c] = game.notFreeSeatsFroBlacks[game.notFreeSeatsFroBlacks.length - 1]; // Killer checkers row.
            this.replaceFreeSeatAfterKill(game.row - 1, game.column + 1, 'black');
        }else if(actionName === 'killLeft') {
            this.fillSeats(game.notFreeSeatsFroBlacks, r, c, isKing);
            game.maybeKilled.id = game.gameTable[r + 1].row[c + 1].id;
            this.createNewFreeSeats(r + 2, c + 2);
            game.gameTable[r].row[c] = game.notFreeSeatsFroBlacks[game.notFreeSeatsFroBlacks.length - 1]; // Killer checkers row.
            this.replaceFreeSeatAfterKill(game.row - 1, game.column - 1, 'black');
        }else {
            this.fillSeats(game.notFreeSeatsFroBlacks, r, c, isKing);
            game.gameTable[r].row[c] = game.notFreeSeats[game.notFreeSeats.length - 1];
            game.gameTable[game.row].row[game.column] = game.freeSeat[game.freeSeat.length - 1];
        }
        // playerBlack.fillKillCheckerCount('black');
    }

    killBlackChecker(r, c, actionName, isKing, isKill) {
        this.fillSeats(game.notFreeSeats, r, c, isKing);
        this.addFreeSeats(r, c);
        if(isKing) {
            game.maybeKilled.id = game.gameTable[r + 1].row[c - 1].id;
            this.createNewFreeSeats(game.currentKing.row, game.currentKing.col);
            if(actionName === "killLeft") game.maybeKilled.id = game.gameTable[r + 1].row[c + 1].id;
            if(isKill) {
                this.replaceFreeSeatAfterKill(r + 1, actionName === "killRight" ? c - 1 : c + 1, game.checkersCurrentPositions.keyName === "white" ? "black" : "white");
            } else {
                game.gameTable[r].row[c] = game.notFreeSeats[game.notFreeSeats.length - 1];
                game.gameTable[game.row].row[game.column] = game.freeSeat[game.freeSeat.length - 1];
            }
            game.gameTable[r].row[c] = game.notFreeSeats[game.notFreeSeats.length - 1]; // Killer checkers row.
        } else if(actionName === 'killRight') {
            game.maybeKilled.id = game.gameTable[r - 1].row[c - 1].id;
            this.createNewFreeSeats(r - 2, c - 2);
            game.gameTable[r].row[c] = game.notFreeSeats[game.notFreeSeats.length - 1]; // Killer checkers row.
            this.replaceFreeSeatAfterKill(game.row + 1, game.column + 1, 'white');
        }else if(actionName === 'killLeft') {
            game.maybeKilled.id = game.gameTable[r - 1].row[c + 1].id;
            this.createNewFreeSeats(r-2, c+2);
            game.gameTable[r].row[c] = game.notFreeSeats[game.notFreeSeats.length - 1]; // Killer checkers row.
            this.replaceFreeSeatAfterKill(game.row + 1, game.column - 1, 'white');
        }else {
            game.gameTable[r].row[c] = game.notFreeSeats[game.notFreeSeats.length - 1];
            game.gameTable[game.row].row[game.column] = game.freeSeat[game.freeSeat.length - 1];
        }
        // if(actionName !== undefined) playerWhite.fillKillCheckerCount('white');
    }

    movesKingWithoutKill(r, c, actionName, isKing) {
        this.removeActiveClassFreeSeat('currentAfterBlack');
        this.removeActiveClassFreeSeat('currentAfterWhite');
        this.killBlackChecker(r,c, actionName, isKing);
        this.endProcess();
    }

    fillSeats(arr, r, c, checkKing) {
        arr.push({
            id: game.checkersCurrentPositions.id,
            posX: game.gameTable[r].row[c].posX,
            posY: game.gameTable[r].row[c].posY,
            status: game.gameTable[r].row[c].status,
            name: game.checkersCurrentPositions.keyName,
            type: 1,
            isKing: !!checkKing
        });
    }

    createNewFreeSeats(r, c) {
        game.gameTable[r].row[c] = game.freeSeat[game.freeSeat.length - 1];
    }

    replaceFreeSeatAfterKill(r, c, keyName) {
        console.log(r, c);
        counterId++;
        game.gameTable[r].row[c] = {
            id: 'new-free-' + r + c + counterId,
            name: 'freeSeat',
            posX: 8 + (c - 1) * 80,
            posY: 330 + (r - 5) * 80,
            status: 'off',
            type: 0
        };
        let newFeeSeat = document.getElementById(game.maybeKilled.id);
        newFeeSeat.id = 'new-free-' + r + c + counterId;
        if(keyName === 'black') {
            newFeeSeat.classList.remove('black');
        }else {
            newFeeSeat.classList.remove('white');
        }
        newFeeSeat.classList.add('freeSeat');
    }

    addFreeSeats(r, c) {
        game.freeSeat.push({
            id: game.gameTable[r].row[c].id,
            posX: game.checkersCurrentPositions.posX,
            posY: game.checkersCurrentPositions.posY,
            status: game.gameTable[r].row[c].status,
            name: game.gameTable[r].row[c].name,
            type: game.gameTable[r].row[c].type,
        });

        let freeSeat = document.getElementById(game.gameTable[r].row[c].id);
        freeSeat.style.id = game.checkersCurrentPositions.id;
        freeSeat.style.left = game.checkersCurrentPositions.posX + 'px';
        freeSeat.style.top = game.checkersCurrentPositions.posY + 'px';

        let checker = document.getElementById(game.checkersCurrentPositions.id);
        checker.style.left = game.gameTable[r].row[c].posX + 'px';
        checker.style.top = game.gameTable[r].row[c].posY + 'px';
        this.checkerIsSelected = false;
    }

    endProcess() {
        if(game.checkersCurrentPositions.keyName === 'black') {
            this.oneStepIsFinished = true;
            game.isPlayerTurn = "white";
            // playerWhite.stepsCount("white");
            // this.addCurrentStatus('black');
        }else if(game.checkersCurrentPositions.keyName === 'white') {
            this.oneStepIsFinished = false;
            game.isPlayerTurn = "black";
            // playerBlack.stepsCount("black");
            // this.addCurrentStatus('white');
        }
    }
    addCurrentStatus(type) {
        document.querySelector(`.player-white-active`).classList.remove('current');
        document.querySelector(`.player-black-active`).classList.remove('current');
        document.querySelector(`.player-${type}-active`).classList.add('current');
    }
    getElementId() {
        let selectorName = document.querySelectorAll('.checker');
        let elementId = null;

        let parent = this;
        for(let i = 0; i < selectorName.length; i++) {
            selectorName[i].addEventListener('click', function() {
                elementId = selectorName[i].id;
                let current = document.getElementsByClassName("active");
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" active", "");
                }
                if(selectorName[i].classList.contains('black')) {
                    game.currentChecker = 'black';
                    parent.currentChecker = elementId;
                    parent.changePosition('black', this);
                }else if(selectorName[i].classList.contains('white')) {
                    game.currentChecker = 'white';
                    parent.currentChecker = elementId;
                    parent.changePosition('white', this);
                }else if(selectorName[i].classList.contains('freeSeat')) {
                    parent.currentChecker = elementId;
                    parent.changePosition('freeSeat', this);
                }
                return elementId;
            });
        }
        if(elementId !== null) return elementId;
    }

    addActiveClassNextPositions(r, c, className) {
        let element = document.getElementById(game.gameTable[r].row[c].id)
        if(element) document.getElementById(game.gameTable[r].row[c].id).classList.add(className);
    }

    removeActiveClassFreeSeat(className) {
        let freeSeat = document.querySelectorAll('.freeSeat');
        for(let i = 0; i < freeSeat.length; i++) {
            freeSeat[i].classList.remove(className);
        }
    }
}

const checker = new Game();

window.addEventListener("load", function(){
  alert(checker);
    // checker.load();
});

checker.load();
