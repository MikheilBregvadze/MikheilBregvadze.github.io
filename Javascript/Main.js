// let gameDiv = document.getElementById('app');

let gameInfo = {
    data: {
        whites: [],
        blacks: [],
        freeSeats: []
    },
    row: null,
    column: null,

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
        test: [],
        freeSeatsCurrentPositions: {
            id: null,
            posX: null,
            posY: null,
            row: null,
            column: null,
            keyName: null
        }
    };
    load() {
        this.createGameArena();
        // this.createGameObject();
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
                if(this.blackCheckerId === this.gameData.gameTable[r].row[c].id) {
                    this.gameData.checkersCurrentPositions.row = r;
                    this.gameData.checkersCurrentPositions.column = c;

                    if(keyName === 'black' && this.gameData.checkersCurrentPositions.keyName !== 'black' && (this.gameData.gameTable[r + 1].row[c + 1].type === 0 || this.gameData.gameTable[r + 1].row[c - 1].type === 0)) {
                        this.checkerIsSelected = true;
                        addGameData(keyName);
                        console.log(keyName);
                    }

                    if(keyName === 'white' && this.gameData.checkersCurrentPositions.keyName !== 'white' && (this.gameData.gameTable[r - 1].row[c + 1].type === 0 || this.gameData.gameTable[r - 1].row[c - 1].type === 0)) {
                        addGameData(keyName);
                        this.checkerIsSelected = true;
                    }

                    if(keyName === 'freeSeat' && this.checkerIsSelected) {
                        let freeSeat = document.getElementById(this.gameData.gameTable[r].row[c].id);
                        freeSeat.style.id = this.gameData.checkersCurrentPositions.id;
                        freeSeat.style.left = this.gameData.checkersCurrentPositions.posX + 'px';
                        freeSeat.style.top = this.gameData.checkersCurrentPositions.posY + 'px';
                        this.gameData.test.push({
                            id: this.gameData.gameTable[r].row[c].id,
                            posX: this.gameData.gameTable[r].row[c].posX,
                            posY: this.gameData.gameTable[r].row[c].posY,
                            status: this.gameData.gameTable[r].row[c].status,
                            name: this.gameData.gameTable[r].row[c].name,
                            type: this.gameData.gameTable[r].row[c].type,
                        });

                        let checker = document.getElementById(this.gameData.checkersCurrentPositions.id);
                        checker.style.left = this.gameData.gameTable[r].row[c].posX + 'px';
                        checker.style.top = this.gameData.gameTable[r].row[c].posY + 'px';
                        this.checkerIsSelected = false;
                        this.gameData.gameTable[r].row[c] = this.gameData.gameTable[gameInfo.row].row[gameInfo.column];

                        if(this.gameData.checkersCurrentPositions.keyName === 'black' || this.gameData.checkersCurrentPositions.keyName === 'white') {
                            this.gameData.gameTable[gameInfo.row].row[gameInfo.column] = this.gameData.test[0];
                        }
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
                    parent.blackCheckerId = elementId;
                    parent.changePosition('black');
                }else if(selectorName[i].classList.contains('white')) {
                    parent.blackCheckerId = elementId;
                    parent.changePosition('white');
                }else if(selectorName[i].classList.contains('freeSeat')) {
                    parent.blackCheckerId = elementId;
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