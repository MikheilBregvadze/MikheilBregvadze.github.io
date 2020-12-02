class Checker {
    constructor() {
        this.counterId = 0;
        this.ifKingKills = [];
        this.ifKingNotKills = [];
    }
    load() {
        try {
            this.createGameArea();
            this.drawGameBackground();
            this.drawCheckers();
            this.getElementId();
        } catch(err) {
            console.log(err);
        }
    }

    createGameArea() {
        for(let r = 0; r < 12; r++) {
            gameInfo.gameTable.push({
                row: []
            });
            for(let c = 0; c < 12; c++) {
                if(r > 1 && r < 5 && c % 2 === r % 2) {
                    gameInfo.gameTable[r].row.push({
                    name: 'black',
                    id: "black-" + r + c,
                    posX: 8 + (c - 2) * 80,
                    posY: 8 + (r - 2) * 80,
                    type: 1,
                    status: "off",
                    isKing: false
                    })
                } else if (r < 5){
                    gameInfo.gameTable[r].row.push({
                    type: 2
                    })
                } else if (r > 6 && r < 10 && c % 2 === r % 2) {
                    gameInfo.gameTable[r].row.push({
                    name: 'white',
                    id: "white-" + r + c,
                    posX: 8 + (c - 2) * 80,
                    posY: 330 + (r - 6) * 80,
                    type: 1,
                    status: "off",
                    isKing: false
                    })
                } else {
                    if(c % 2 === r % 2 && c < 10 && r < 9) {
                    gameInfo.gameTable[r].row.push({
                        name: 'freeSeat',
                        id: "free-" + r + c,
                        posX: 8 + (c - 2) * 80,
                        posY: 330 + (r - 6) * 80,
                        type: 0,
                        status: "off",
                        isKing: false
                    })
                    }else {
                        gameInfo.gameTable[r].row.push({
                            type: 2
                        })
                    }
                }
            }
        }
    }

    drawGameBackground() {
        for (let i = 0; i < 64; i++){
            document.getElementById("table")
                .appendChild(document.createElement("div"))
                .style.backgroundColor = parseInt((i / 8) + i + "") % 2 === 0 ? '#4A2317' : '#EEC588';
        }
    }

    drawCheckers() {
        let checkerDiv = null;
        const gameTable = gameInfo.gameTable;
        for(let r = 0; r < gameTable.length; r++) {
            for(let c = 0; c < gameTable[r].row.length; c++) {
                if((r > 1 && r < 10) && (c > 1 && c < 10)) {
                    if(gameTable[r].row[c].name === 'white' || gameTable[r].row[c].name === 'black' || gameTable[r].row[c].name === 'freeSeat') {
                        checkerDiv = document.createElement('div');
                        setAttributes(checkerDiv, {'id': gameTable[r].row[c].id, 'data-king': 0, 'data-row': r, 'data-column': c, 'class': 'checker'});
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

    checkIfPieceCanKill(type, elementId) {
        const table = gameInfo.gameTable;
        let arr = [];
        for(let row = 2; row < 10; row++) {
            for(let column = 2; column < 10; column++) {
                if(gameInfo.gameTable[row].row[column].isKing && gameInfo.gameTable[row].row[column].name === type) {
                    if(this.checkKingMove(row, column, "down", "left", type)) {
                        arr.push(gameInfo.gameTable[row].row[column]);
                        console.log(gameInfo.gameTable[row].row[column]);
                    } else if(this.checkKingMove(row, column, "down", "right", type)) {
                        arr.push(gameInfo.gameTable[row].row[column]);
                        console.log(gameInfo.gameTable[row].row[column]);
                    } else if(this.checkKingMove(row, column, "up", "left", type)) {
                        arr.push(gameInfo.gameTable[row].row[column]);
                        console.log(gameInfo.gameTable[row].row[column]);
                    } else if(this.checkKingMove(row, column, "up", "right", type)) {
                        arr.push(gameInfo.gameTable[row].row[column]);
                        console.log(gameInfo.gameTable[row].row[column]);
                    }
                }
                if(gameInfo.gameTable[row].row[column].type === 1) {
                    if (type === 'white') {
                        if((table[row].row[column].name === "white" && table[row - 1].row[column - 1].name === "black") && table[row - 2].row[column - 2].name === "freeSeat" && column > 3) {
                            arr.push(gameInfo.gameTable[row].row[column]);
                        }
                        if((table[row].row[column].name === "white" && table[row - 1].row[column + 1].name === "black") && table[row - 2].row[column + 2].name === "freeSeat") {
                            arr.push(gameInfo.gameTable[row].row[column]);
                            console.log(gameInfo.gameTable[row].row[column]);
                        }
                    } else if (type === 'black') {
                        if((table[row].row[column].name === "black" && table[row + 1].row[column - 1].name === "white") && table[row + 2].row[column - 2].name === "freeSeat" && column > 3) {
                            arr.push(gameInfo.gameTable[row].row[column]);
                            console.log(gameInfo.gameTable[row].row[column]);
                        }
                        if((table[row].row[column].name === "black" && table[row + 1].row[column + 1].name === "white") && table[row + 2].row[column + 2].name === "freeSeat") {
                            arr.push(gameInfo.gameTable[row].row[column]);
                            console.log(gameInfo.gameTable[row].row[column]);
                        }
                    }
                }
            }
        }
        
        if(arr.length === 0) return true;
        for(let i = 0; i < arr.length; i++) {
            if(elementId === arr[i].id) {
                return true;
            }
        }
    }

    changePositionPiece(type, element, row, column, isKing) {
        const table = gameInfo.gameTable;
        let elementId = element.getAttribute('id');
        if(type !== gameInfo.isPlayerTurnType && type !== "freeSeat") return;
        if(type !== "freeSeat") {
            gameInfo.currentPiece.row = row;
            gameInfo.currentPiece.column = column;
            gameInfo.currentPiece.type = type;
            gameInfo.currentPiece.elementId = elementId;
            gameInfo.currentPiece.isKing = isKing;
            gameInfo.currentPiece.posX = table[row].row[column].posX;
            gameInfo.currentPiece.posY = table[row].row[column].posY;
            gameInfo.currentPiece.obj = table[row].row[column];

            if(isKing) {
                gameInfo.currentKing = gameInfo.gameTable[row].row[column];
                gameInfo.currentKing.row = row;
                gameInfo.currentKing.col = column;
                if(!this.checkIfPieceCanKill(type, elementId, gameInfo.currentKing)) {
                    this.removeActiveClassFreeSeat('currentAfterWhite');
                    // return;
                } else {
                    this.moveKingPiece(row, column, gameInfo.currentKing, 'down', 'right');
                    this.moveKingPiece(row, column, gameInfo.currentKing, 'down', 'left');
                    this.moveKingPiece(row, column, gameInfo.currentKing, 'up', 'right');
                    this.moveKingPiece(row, column, gameInfo.currentKing, 'up', 'left');
                    this.ifKingKills = [];
                    this.ifKingNotKills = [];
                    return;
                }
            }

            if(type === 'white') {
                if(!this.checkIfPieceCanKill(type, elementId)) {
                    this.removeActiveClassFreeSeat('currentAfterWhite');
                    return;
                }
                element.classList.add("active");
                const arr = [];

                if(table[row - 1].row[column - 1].name === "black" && table[row - 2].row[column - 2].name === "freeSeat" && column > 3) {
                    arr.push({row: row - 2, column: column - 2});
                }
                if(table[row - 1].row[column + 1].name === "black" && table[row - 2].row[column + 2].name === "freeSeat") {
                    arr.push({row: row - 2, column: column + 2});
                }

                this.removeActiveClassFreeSeat('currentAfterWhite');
                for(let i = 0; i < arr.length; i++) {
                    this.addActiveClassNextPositions(arr[i].row, arr[i].column, 'currentAfterWhite');
                    if(i === arr.length - 1) return;
                }

                if(table[row - 1].row[column - 1].name === "freeSeat") {
                    arr.push({row: row - 1, column: column - 1});
                }
                
                if(table[row - 1].row[column + 1].name === "freeSeat") {
                    arr.push({row: row - 1, column: column + 1});
                }

                this.removeActiveClassFreeSeat('currentAfterWhite');

                for(let i = 0; i < arr.length; i++) {
                    this.addActiveClassNextPositions(arr[i].row, arr[i].column, 'currentAfterWhite');
                }

            } else {
                if(!this.checkIfPieceCanKill(type, elementId)) {
                    this.removeActiveClassFreeSeat('currentAfterWhite');
                    return;
                }
                element.classList.add("active");    
                const arr = [];

                if(table[row + 1].row[column - 1].name === "white" && table[row + 2].row[column - 2].name === "freeSeat" && column > 3) {
                    arr.push({row: row + 2, column: column - 2});
                }

                if(table[row + 1].row[column + 1].name === "white" && table[row + 2].row[column + 2].name === "freeSeat") {
                    arr.push({row: row + 2, column: column + 2});
                }

                this.removeActiveClassFreeSeat('currentAfterWhite');
                for(let i = 0; i < arr.length; i++) {
                    this.addActiveClassNextPositions(arr[i].row, arr[i].column, 'currentAfterWhite');
                    if(i === arr.length - 1) return;
                }

                if(table[row + 1].row[column - 1].name === "freeSeat") {
                    arr.push({row: row + 1, column: column - 1});
                }
                
                if(table[row + 1].row[column + 1].name === "freeSeat") {
                    arr.push({row: row + 1, column: column + 1});
                }

                this.removeActiveClassFreeSeat('currentAfterWhite');

                for(let i = 0; i < arr.length; i++) {
                    this.addActiveClassNextPositions(arr[i].row, arr[i].column, 'currentAfterWhite');
                }
            }
        } else {
            if(!element.classList.contains('currentAfterWhite')) return;
            const r = gameInfo.currentPiece.row;
            const c = gameInfo.currentPiece.column;
            const type = gameInfo.currentPiece.type;
            const isKing = gameInfo.currentPiece.isKing;

            gameInfo.currentFreeSeat.obj = table[row].row[column];

            gameInfo.currentFreeSeat.row = row;
            gameInfo.currentFreeSeat.column = column;
            gameInfo.currentFreeSeat.elementId = elementId;
            gameInfo.currentFreeSeat.posX = table[row].row[column].posX;
            gameInfo.currentFreeSeat.posY = table[row].row[column].posY;
            if(isKing) {
                if(!gameInfo.moveKingWithoutKill) {
                    this.changePositionsPiecesAfterMove();
                    this.addNewFreeSeatAfterKill(row, column, elementId, true);
                } else {
                    this.changePositionsPiecesAfterMove();
                }
            } else {
                if(type !== 'freeSeat') {
                    if(r - row === 1 || row - r === 1) {
                        this.changePositionsPiecesAfterMove();
                    } else {
                        this.changePositionsPiecesAfterMove();
                        this.addNewFreeSeatAfterKill(row, column, elementId);
                    }
                }
            }
            
            if((row === 9 && gameInfo.gameTable[row].row[column].name === "black") ||
               (row === 2 && gameInfo.gameTable[row].row[column].name === "white")) {
                gameInfo.gameTable[row].row[column].isKing = true;
                let kingPiece = document.getElementById(gameInfo.gameTable[row].row[column].id)
                kingPiece.classList.add('king');
                kingPiece.setAttribute('data-king', '1');
            }
            this.removeActiveClassFreeSeat('currentAfterWhite');
            
            if(type === "white") {
                gameInfo.isPlayerTurnType = "black"
            } else {
                gameInfo.isPlayerTurnType = "white"
            }
        }
    }

    checkKingMove(row, column, whereFrom, side, name) {
        let countSameTypePiece = 0;
        for(let k = 0; k < 13; k++) {
            if(column < 2 || column > 9 || row < 2 && row > 9) break;

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
                        

                if(gameInfo.gameTable[row].row[column].name !== "freeSeat") {
                    if (gameInfo.gameTable[row - 1].row[column - 1].type === 2 || 
                        gameInfo.gameTable[row - 1].row[column - 1].name !==  "freeSeat" &&
                        side === 'left' && whereFrom === "down") {
                        countSameTypePiece++;
                    }else if (gameInfo.gameTable[row - 1].row[column - 1].type === 2 ||
                            gameInfo.gameTable[row - 1].row[column + 1].name !==  "freeSeat" && 
                            side === 'right' && whereFrom === "down") {
                        countSameTypePiece++;
                    }else if (gameInfo.gameTable[row - 1].row[column - 1].type === 2 ||
                            gameInfo.gameTable[row + 1].row[column - 1].name !==  "freeSeat" && 
                            side === 'left' && whereFrom === "up") {
                        countSameTypePiece++;
                    }else if (gameInfo.gameTable[row - 1].row[column - 1].type === 2 ||
                            gameInfo.gameTable[row + 1].row[column + 1].name !==  "freeSeat" &&
                            side === 'right' && whereFrom === "up") {
                        countSameTypePiece++;
                    }
                }

                if(countSameTypePiece > 0) {
                    break;
                }

                if(column - 1 === 1 && gameInfo.gameTable[row].row[column].name === "freeSeat") {
                    this.ifKingNotKills.push({r: row, c: column});
                    break
                } else if(column - 1 <= 1) {
                    break
                }

            if (((gameInfo.gameTable[row].row[column].name === "white" || 
                gameInfo.gameTable[row].row[column].name === "black") && 
                gameInfo.gameTable[row].row[column].name !== name) && 
                gameInfo.gameTable[row - 1].row[column + 1].name === "freeSeat" && 
                whereFrom === "down") 
                {

                return 1;

            } else if(((gameInfo.gameTable[row].row[column].name === "white" || 
                        gameInfo.gameTable[row].row[column].name === "black") && 
                        gameInfo.gameTable[row].row[column].name !== name) && 
                        gameInfo.gameTable[row - 1].row[column - 1].name === "freeSeat" && 
                        whereFrom === "down" && column - 1 !== 1) 
                    {

                return 1;

            } else if(((gameInfo.gameTable[row].row[column].name === "white" ||
                        gameInfo.gameTable[row].row[column].name === "black") && 
                        gameInfo.gameTable[row].row[column].name !== name) && 
                        gameInfo.gameTable[row + 1].row[column + 1].name === "freeSeat" && 
                        whereFrom === "up" && side === 'right' && column + 1 < 10) 
                    {

                return 1;

            }else if(((gameInfo.gameTable[row].row[column].name === "white" || 
                        gameInfo.gameTable[row].row[column].name === "black") && 
                        gameInfo.gameTable[row].row[column].name !== name) && 
                        gameInfo.gameTable[row + 1].row[column - 1].name === "freeSeat" && 
                        whereFrom === "up" && column - 1 !== 0 && column + 1 < 10) 
                    {

                return 1;

            }
        }
    }

    moveKingPiece(r, c, currentKing, whereFrom, side) {

        let row = currentKing.row;
        let column = currentKing.col;
        let countSameTypePiece = 0;

        for(let k = 0; k < 13; k++) {
            if(column < 2 || column > 9 || row < 2 && row > 9) break;

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
                    

            if(gameInfo.gameTable[row].row[column].name !== "freeSeat") {
                if (gameInfo.gameTable[row - 1].row[column - 1].type === 2 || 
                    gameInfo.gameTable[row - 1].row[column - 1].name !==  "freeSeat" &&
                    side === 'left' && whereFrom === "down") {
                    countSameTypePiece++;
                }else if (gameInfo.gameTable[row - 1].row[column - 1].type === 2 ||
                          gameInfo.gameTable[row - 1].row[column + 1].name !==  "freeSeat" && 
                          side === 'right' && whereFrom === "down") {
                    countSameTypePiece++;
                }else if (gameInfo.gameTable[row - 1].row[column - 1].type === 2 ||
                          gameInfo.gameTable[row + 1].row[column - 1].name !==  "freeSeat" && 
                          side === 'left' && whereFrom === "up") {
                    countSameTypePiece++;
                }else if (gameInfo.gameTable[row - 1].row[column - 1].type === 2 ||
                          gameInfo.gameTable[row + 1].row[column + 1].name !==  "freeSeat" &&
                          side === 'right' && whereFrom === "up") {
                    countSameTypePiece++;
                }
            }

            if(countSameTypePiece > 0) {
                break;
            }

            if(column - 1 === 1 && gameInfo.gameTable[row].row[column].name === "freeSeat") {
                this.ifKingNotKills.push({r: row, c: column});
                break
            } else if(column - 1 <= 1) {
                break
            }

            if (((gameInfo.gameTable[row].row[column].name === "white" || 
                  gameInfo.gameTable[row].row[column].name === "black") && 
                  gameInfo.gameTable[row].row[column].name !== currentKing.name) && 
                  gameInfo.gameTable[row - 1].row[column + 1].name === "freeSeat" && 
                  whereFrom === "down") {
                this.removeActiveClassFreeSeat('currentAfterWhite');
                this.ifKingKills.push({r: row - 1, c: side === 'left' ? column - 1 : column + 1});
                break;
            } else if(((gameInfo.gameTable[row].row[column].name === "white" || 
                        gameInfo.gameTable[row].row[column].name === "black") && 
                        gameInfo.gameTable[row].row[column].name !== currentKing.name) && 
                        gameInfo.gameTable[row - 1].row[column - 1].name === "freeSeat" && 
                        whereFrom === "down" && column - 1 !== 1) {
                this.removeActiveClassFreeSeat('currentAfterWhite');
                this.ifKingKills.push({r: row - 1, c: column - 1});
                break;
            } else if(((gameInfo.gameTable[row].row[column].name === "white" ||
                        gameInfo.gameTable[row].row[column].name === "black") && 
                        gameInfo.gameTable[row].row[column].name !== currentKing.name) && 
                        gameInfo.gameTable[row + 1].row[column + 1].name === "freeSeat" && 
                        whereFrom === "up" && side === 'right' && column + 1 < 10) {
                this.removeActiveClassFreeSeat('currentAfterWhite');
                this.ifKingKills.push({r: row + 1, c: side === 'left' ? column - 1 : column + 1});
                break;
            }else if(((gameInfo.gameTable[row].row[column].name === "white" || 
                       gameInfo.gameTable[row].row[column].name === "black") && 
                       gameInfo.gameTable[row].row[column].name !== currentKing.name) && 
                       gameInfo.gameTable[row + 1].row[column - 1].name === "freeSeat" && 
                       whereFrom === "up" && column - 1 !== 0 && column + 1 < 10) {
                this.removeActiveClassFreeSeat('currentAfterWhite');
                this.ifKingKills.push({r: row + 1, c: column - 1});
                break;
            }else {
                if(gameInfo.gameTable[row].row[column].name !== currentKing.name) {
                    this.removeActiveClassFreeSeat('currentAfterWhite');
                    gameInfo.moveKingWithoutKill = true;
                    this.ifKingNotKills.push({r: row, c: column});
                } else {
                    break
                }
            }
        }
        
        if (this.ifKingKills.length > 0) {
            gameInfo.moveKingWithoutKill = false;
            for(let i = 0; i < this.ifKingKills.length; i++) {
                this.addActiveClassNextPositions(this.ifKingKills[i].r, this.ifKingKills[i].c, 'currentAfterWhite', true);
            }
        } else {
            for(let i = 0; i < this.ifKingNotKills.length; i++) {
                this.addActiveClassNextPositions(this.ifKingNotKills[i].r, this.ifKingNotKills[i].c, 'currentAfterWhite', true);
            }
        }

    }

    addNewFreeSeatAfterKill(row, column, elementId, isKing) {
        const r = gameInfo.currentPiece.row;
        const c = gameInfo.currentPiece.column;

        if(row > r && column > c) {
            this.replaceFreeSeatAfterKill(row - 1, column - 1, elementId, isKing);
        } else if (row > r && column < c) {
            this.replaceFreeSeatAfterKill(row - 1, column + 1, elementId, isKing);
        } else if (row < r && column > c) {
            this.replaceFreeSeatAfterKill(row + 1, column - 1, elementId, isKing);
        } else if (row < r && column < c) {
            this.replaceFreeSeatAfterKill(row + 1, column + 1, elementId, isKing);
        }

    }

    replaceFreeSeatAfterKill(r, c, elementId, isKing) {
        this.counterId++
        gameInfo.beforeKilled.obj = gameInfo.gameTable[r].row[c];
        gameInfo.beforeKilled.row = r;
        gameInfo.beforeKilled.column = c;
        gameInfo.beforeKilled.elementId = elementId;
    
        gameInfo.gameTable[r].row[c] = {
            id: 'free-' + r + c + this.counterId,
            name: 'freeSeat',
            posX: gameInfo.beforeKilled.obj.posX,
            posY: gameInfo.beforeKilled.obj.posY,
            status: 'off',
            type: 0
        };

        let newFeeSeat = document.getElementById(gameInfo.beforeKilled.obj.id);
        newFeeSeat.id = 'free-' + r + c + this.counterId;
        if(gameInfo.beforeKilled.obj.name === 'black') {
            newFeeSeat.classList.remove('black');
        }else {
            newFeeSeat.classList.remove('white');
        }
        newFeeSeat.classList.add('freeSeat');
    }

    changePositionsPiecesAfterMove() {
        gameInfo.gameTable[gameInfo.currentFreeSeat.row].row[gameInfo.currentFreeSeat.column] = gameInfo.currentPiece.obj;
        let freeSeat = document.getElementById(gameInfo.currentFreeSeat.elementId);
        freeSeat.style.top = gameInfo.currentPiece.posY + 'px';
        freeSeat.style.left = gameInfo.currentPiece.posX + 'px';
        gameInfo.gameTable[gameInfo.currentFreeSeat.row].row[gameInfo.currentFreeSeat.column].posY = gameInfo.currentFreeSeat.posY;
        gameInfo.gameTable[gameInfo.currentFreeSeat.row].row[gameInfo.currentFreeSeat.column].posX = gameInfo.currentFreeSeat.posX;
        setAttributes(freeSeat, { 'data-row': gameInfo.currentPiece.row, 'data-column': gameInfo.currentPiece.column });

        gameInfo.gameTable[gameInfo.currentPiece.row].row[gameInfo.currentPiece.column] = gameInfo.currentFreeSeat.obj;

        let checker = document.getElementById(gameInfo.currentPiece.elementId);
        checker.style.top = gameInfo.currentFreeSeat.posY + 'px';
        checker.style.left = gameInfo.currentFreeSeat.posX + 'px';
        gameInfo.gameTable[gameInfo.currentPiece.row].row[gameInfo.currentPiece.column].posY = gameInfo.currentPiece.posY;
        gameInfo.gameTable[gameInfo.currentPiece.row].row[gameInfo.currentPiece.column].posX = gameInfo.currentPiece.posX;
        setAttributes(checker, { 'data-row': gameInfo.currentFreeSeat.row, 'data-column': gameInfo.currentFreeSeat.column });
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
                let row = parseFloat(this.getAttribute('data-row'));
                let column = parseFloat(this.getAttribute('data-column'));
                let isking = parseFloat(this.getAttribute('data-king'));
                if(selectorName[i].classList.contains('black')) {
                    parent.changePositionPiece('black', this, row, column,  isking === 0 ? false : true);
                }else if(selectorName[i].classList.contains('white')) {
                    parent.changePositionPiece('white', this, row, column,  isking === 0 ? false : true);
                }else if(selectorName[i].classList.contains('freeSeat')) {
                    parent.changePositionPiece('freeSeat', this, row, column, isking === 0 ? false : true);
                }
                return elementId;
            });
        }
        if(elementId !== null) return elementId;
    }

    addActiveClassNextPositions(r, c, className) {
        let element = document.getElementById(gameInfo.gameTable[r].row[c].id)
        if(element) document.getElementById(gameInfo.gameTable[r].row[c].id).classList.add(className);
    }

    removeActiveClassFreeSeat(className) {
        let freeSeat = document.querySelectorAll('.freeSeat');
        for(let i = 0; i < freeSeat.length; i++) {
            freeSeat[i].classList.remove(className);
        }
    }

}

const checker = new Checker();
checker.load();