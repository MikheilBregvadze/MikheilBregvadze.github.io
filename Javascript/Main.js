let gameInfo = {
    data: {
        whites: [],
        blacks: [],
        freeSeats: []
    },
    row: null,
    column: null,

    killerCheckerCurrentRow: null,
    killerCheckerCurrentColumn: null,

    freeSeatsRow: null,
    freeSeatsColumn: null,
    checkerParent: null,
};

class Game {
    gameData = {
        gameTable: [],
        whites: [],
        blacks: [],
        freePlace: [],
        checkersCurrentPositions: {
            id: null,
            posX: null,
            posY: null,
            row: null,
            column: null,
            keyName: null
        },
        maybeKilled: {
            id: null,
        },
        freeSeat: [],
        notFreeSeats: [],
        freeSeatsCurrentPositions: {
            id: null,
            posX: null,
            posY: null,
            row: null,
            column: null,
            keyName: null
        }
    };
    oneStepIsFinished = true ;
    load() {
        this.createGameArena();
        this.drawGameBackground();
        this.createCheckers();
        this.getElementId();
    }

    createGameArena() {
        for(let r = 0; r < 10; r++) {
            this.gameData.gameTable.push({
                row: []
            });
            for(let c = 0; c < 10; c++) {

                if(r < 4 && c % 2 === r % 2) {
                    this.gameData.gameTable[r].row.push({
                        name: 'black',
                        id: "black-" + r + c,
                        posX: 8 + (c - 1) * 80,
                        posY: 8 + (r - 1) * 80,
                        type: 1,
                        status: "off"
                    })
                }else if(r < 3){
                    this.gameData.gameTable[r].row.push({
                        type: 2
                    })
                }else if(r > 5 && c % 2 === r % 2) {
                    this.gameData.gameTable[r].row.push({
                        name: 'white',
                        id: "white-" + r + c,
                        posX: 8 + (c - 1) * 80,
                        posY: 330 + (r - 5) * 80,
                        type: -1,
                        status: "off"
                    })
                }else {
                    if(c % 2 === r % 2) {
                        this.gameData.gameTable[r].row.push({
                            name: 'freeSeat',
                            id: "free-" + r + c,
                            posX: 8 + (c - 1) * 80,
                            posY: 330 + (r - 5) * 80,
                            type: 0,
                            status: "off"
                        })
                    }else {
                        this.gameData.gameTable[r].row.push({
                            type: 2
                        })
                    }
                }
            }
        }
    }

    drawGameBackground() {
        for (let i = 0; i < 64; i++){
            document.getElementById("table").appendChild(document.createElement("div")).style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? '#ababab' : 'white';
        }
    }

    createCheckers() {
        let div = null;
        for(let r = 0; r < this.gameData.gameTable.length; r++) {
            for(let c = 0; c < this.gameData.gameTable[r].row.length; c++) {
                if((r > 0 && r < 9) && (c > 0 && c < 9)) {
                    if(this.gameData.gameTable[r].row[c].name === 'white' || this.gameData.gameTable[r].row[c].name === 'black' || this.gameData.gameTable[r].row[c].name === 'freeSeat') {
                        div = document.createElement('div');
                        div.setAttribute('class', 'checker');
                        div.setAttribute('id', this.gameData.gameTable[r].row[c].id);
                        div.style.left = this.gameData.gameTable[r].row[c].posX + 'px';
                        div.style.top = this.gameData.gameTable[r].row[c].posY + 'px';
                        document.getElementById('checkers').appendChild(div);

                        if(this.gameData.gameTable[r].row[c].name === 'white') {
                            div.setAttribute('class', 'white checker');
                        }else if(this.gameData.gameTable[r].row[c].name === 'black') {
                            div.setAttribute('class', 'black checker');
                        }else {
                            div.setAttribute('class', 'freeSeat checker');
                        }
                    }
                }
            }
        }
    }

    changePosition(keyName) {
        let parent = this;
        for(let r = 0; r < this.gameData.gameTable.length; r++) {
            for(let c = 0; c < this.gameData.gameTable[r].row.length; c++) {
                if(this.currentChecker === this.gameData.gameTable[r].row[c].id) {
                    this.gameData.checkersCurrentPositions.row = r;
                    this.gameData.checkersCurrentPositions.column = c;

                    if(keyName === 'black' && !this.oneStepIsFinished) {
                        this.checkerIsSelected = true;
                        addGameData(keyName);
                    }
                    if(keyName === 'white' && this.oneStepIsFinished && (this.gameData.gameTable[r - 1].row[c + 1].type === 0 || this.gameData.gameTable[r - 1].row[c - 1].type === 0)) {
                        addGameData(keyName);
                        this.checkerIsSelected = true;
                    }

                    if(keyName === 'freeSeat' && this.checkerIsSelected) {
                        if(this.gameData.checkersCurrentPositions.keyName !== this.gameData.gameTable[r+1].row[c+1].name && gameInfo.row + 2 === r && (gameInfo.column - 2 === c || gameInfo.column + 2 === c)) {
                            console.log(this.gameData.gameTable[r].row[c].id);
                            if(gameInfo.column > c) {
                                this.killBlackChecker(r, c, 'killLeft');
                            }else {
                                this.killBlackChecker(r, c, 'killRight');
                            }
                        }else if(((this.gameData.checkersCurrentPositions.keyName === 'black' && gameInfo.row + 1 !== r) || !(gameInfo.column - 1 === c || gameInfo.column + 1 === c))) {
                            return;
                        }else if(((this.gameData.checkersCurrentPositions.keyName === 'white' && gameInfo.row - 1 !== r) || !(gameInfo.column - 1 === c || gameInfo.column + 1 === c))) {
                            return;
                        }else {
                            this.killBlackChecker(r,c);
                        }
                        this.endProcess();
                    }
                    function addGameData(keyName) {
                        parent.gameData.checkersCurrentPositions.id = parent.gameData.gameTable[r].row[c].id;
                        parent.gameData.checkersCurrentPositions.posX = parent.gameData.gameTable[r].row[c].posX;
                        parent.gameData.checkersCurrentPositions.posY = parent.gameData.gameTable[r].row[c].posY;
                        parent.gameData.checkersCurrentPositions.status = 'on';
                        parent.gameData.checkersCurrentPositions.keyName = keyName;
                        parent.gameData.checkersCurrentPositions.row = r;
                        parent.gameData.checkersCurrentPositions.column = c;
                        parent.checkerIsSelected = true;
                        gameInfo.row = r;
                        gameInfo.column = c;
                    }
                }
            }
        }
    }

    killBlackChecker(r, c, actionName) {
        let freeSeat = document.getElementById(this.gameData.gameTable[r].row[c].id);
        this.gameData.notFreeSeats.push({
            id: this.gameData.checkersCurrentPositions.id,
            posX: this.gameData.gameTable[r].row[c].posX,
            posY: this.gameData.gameTable[r].row[c].posY,
            status: this.gameData.gameTable[r].row[c].status,
            name: this.gameData.checkersCurrentPositions.keyName,
            type: 1,
        });
        this.addFreeSeats(r, c);
        freeSeat.style.id = this.gameData.checkersCurrentPositions.id;
        freeSeat.style.left = this.gameData.checkersCurrentPositions.posX + 'px';
        freeSeat.style.top = this.gameData.checkersCurrentPositions.posY + 'px';

        let checker = document.getElementById(this.gameData.checkersCurrentPositions.id);
        checker.style.left = this.gameData.gameTable[r].row[c].posX + 'px';
        checker.style.top = this.gameData.gameTable[r].row[c].posY + 'px';
        this.checkerIsSelected = false;

        if(actionName === 'killRight') {
            this.gameData.maybeKilled.id = this.gameData.gameTable[r - 1].row[c - 1].id;
            this.createNewFreeSeats(r-1, c-1, 'killRight');
            this.gameData.gameTable[r].row[c] = this.gameData.notFreeSeats[this.gameData.notFreeSeats.length - 1]; // Killer checkers row.
            this.replaceFreeSeatAfterKill(gameInfo.row, gameInfo.column, 'killRight');
        }else if(actionName === 'killLeft') {
            this.gameData.maybeKilled.id = this.gameData.gameTable[r - 1].row[c + 1].id;
            this.createNewFreeSeats(r-2, c+2, 'killLeft');
            this.gameData.gameTable[r].row[c] = this.gameData.notFreeSeats[this.gameData.notFreeSeats.length - 1]; // Killer checkers row.
            this.replaceFreeSeatAfterKill(gameInfo.row + 1, gameInfo.column + 1, 'killLeft');
        }else {
            this.gameData.gameTable[r].row[c] = this.gameData.notFreeSeats[this.gameData.notFreeSeats.length - 1];
            this.gameData.gameTable[gameInfo.row].row[gameInfo.column] = this.gameData.freeSeat[this.gameData.freeSeat.length - 1];
        }
    }

    createNewFreeSeats(r, c, keyName) {
        let row = null;
        if(keyName === 'killLeft') {
            row = r + 2;
        }else {
            row = r;
        }
        this.gameData.gameTable[r].row[c] = {
            id: 'free-' + (c - 1) + (row - 1),
            name: 'freeSeat',
            posX: this.gameData.gameTable[r].row[c].posX,
            posY: this.gameData.gameTable[r].row[c].posY,
            status: 'off',
            type: 0
        };
    }

    replaceFreeSeatAfterKill(r, c, keyName) {
        let row = null;
        if(keyName === 'killLeft') {
            row = r + 1;
        }else {
            row = r;
        }
        this.gameData.gameTable[r].row[c] = {
            id: 'free-' + (r + 1) + (c + 1),
            name: 'freeSeat',
            posX: 8 + (c - 1) * 80,
            posY: 330 + (r - 5) * 80,
            status: 'off',
            type: 0
        };
        let newFeeSeat = document.getElementById(this.gameData.maybeKilled.id);
        newFeeSeat.id = 'free-' + c + row;
        newFeeSeat.classList.remove('white');
        newFeeSeat.classList.add('freeSeat');
    }

    addFreeSeats(r, c) {
        this.gameData.freeSeat.push({
            id: this.gameData.gameTable[r].row[c].id,
            posX: this.gameData.checkersCurrentPositions.posX,
            posY: this.gameData.checkersCurrentPositions.posY,
            status: this.gameData.gameTable[r].row[c].status,
            name: this.gameData.gameTable[r].row[c].name,
            type: this.gameData.gameTable[r].row[c].type,
        });
    }

    endProcess() {
        if(this.gameData.checkersCurrentPositions.keyName === 'black') {
            this.oneStepIsFinished = true;
        }else if(this.gameData.checkersCurrentPositions.keyName === 'white') {
            this.oneStepIsFinished = false;
        }
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
                    parent.currentChecker = elementId;
                    parent.changePosition('black');
                }else if(selectorName[i].classList.contains('white')) {
                    parent.currentChecker = elementId;
                    parent.changePosition('white');
                }else if(selectorName[i].classList.contains('freeSeat')) {
                    parent.currentChecker = elementId;
                    parent.changePosition('freeSeat');
                }
                this.className += " active";
                return elementId
            });
        }
        if(elementId !== null) return elementId;
    }


}

const chessGame = new Game();

window.addEventListener("load", function(){
    chessGame.load();
});