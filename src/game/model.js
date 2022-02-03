class Model {
    constructor() {
        this.activeFreeSeats = [];
        this.playerTurn = 0;
        this.boardInfo = [];
        this.checkerInfo = { 
            selected: false, 
            row: 0, 
            column: 0, 
            isKing: false
        };
        this.moveChecker = [];
    }

    init() {
        this.createGameObject();
    }

    createGameObject() {
        for(let r = 0; r < 12; r++) {
            this.boardInfo.push({
                row: []
            });
            for(let c = 0; c < 12; c++) {
                if(r > 1 && r < 5 && c % 2 === r % 2) {
                    this.boardInfo[r].row.push({
                        name: 'black',
                        id: "black-" + r + c,
                        posX: 8 + (c - 2) * 80,
                        posY: 8 + (r - 2) * 80,
                        type: 1,
                        status: "off",
                        isKing: false
                    })
                } else if (r < 5){
                    this.boardInfo[r].row.push({
                        id: r.toString(),
                        type: 2
                    })
                } else if (r > 6 && r < 10 && c % 2 === r % 2) {
                    this.boardInfo[r].row.push({
                        name: 'white',
                        id: "white-" + r + c,
                        posX: 8 + (c - 2) * 80,
                        posY: 330 + (r - 6) * 80,
                        type: 0,
                        status: "off",
                        isKing: false
                    })
                } else {
                    if(c % 2 === r % 2 && c < 10 && r < 9) {
                    this.boardInfo[r].row.push({
                        name: 'freeSeat',
                        id: "free-" + r + c,
                        posX: 8 + (c - 2) * 80,
                        posY: 330 + (r - 6) * 80,
                        type: 2,
                        status: "off",
                        isKing: false
                    })
                    }else {
                        this.boardInfo[r].row.push({
                            id: r.toString(),
                            type: 3
                        })
                    }
                }
            }
        }
    }

    bindBoardChanged(callback) {
        this.onBoardChanged = callback;
    }

    _commit(board) {
        this.bindBoardChanged(1111);
    }

    setSelectedCheckerPosition(checker) {
        const checkerType = this.boardInfo[checker.r].row[checker.c].type;
        if(checkerType !== 2) {
            this.checkerInfo = checker;
            this.checkIfCheckerCanMove(checker, checkerType);
        } else {
            this.changePositions(checker, checkerType);
        }
    }

    changePositions(checker, checkerType) {
        if(checkerType !== 2) return;

        for(let i = 0; i < this.activeFreeSeats.length; i++) {
            if(this.activeFreeSeats[i].id === `free-${checker.r}${checker.c}`) {
                this.playerTurn = this.boardInfo[this.checkerInfo.r].row[this.checkerInfo.c].type === 0 ? 1 : 0;
                const [ freeSeatX, freeSeatY ] = [this.activeFreeSeats[i].posX, this.activeFreeSeats[i].posY];

                const currentChecker = this.boardInfo[this.checkerInfo.r].row[this.checkerInfo.c];
                
                this.boardInfo[this.checkerInfo.r].row[this.checkerInfo.c] = this.activeFreeSeats[i];
                this.boardInfo[checker.r].row[checker.c].posX = currentChecker.posX;
                this.boardInfo[checker.r].row[checker.c].posY = currentChecker.posY;
                this.boardInfo[checker.r].row[checker.c].id = 'free-' + this.checkerInfo.r + this.checkerInfo.c;

                this.boardInfo[checker.r].row[checker.c] = currentChecker;
                this.boardInfo[checker.r].row[checker.c].posX = freeSeatX;
                this.boardInfo[checker.r].row[checker.c].posY = freeSeatY;
                const type = this.boardInfo[checker.r].row[checker.c].type === 0 ? 'white' : 'black';
                this.boardInfo[checker.r].row[checker.c].id = type + '-' + checker.r + checker.c;

                this.boardInfo[checker.r].row[checker.c]['r'] = this.checkerInfo.r;
                this.boardInfo[checker.r].row[checker.c]['c'] = this.checkerInfo.c;

                this.boardInfo[this.checkerInfo.r].row[this.checkerInfo.c]['r'] = checker.r;
                this.boardInfo[this.checkerInfo.r].row[this.checkerInfo.c]['c'] = checker.c;

                this.moveChecker.push(this.boardInfo[checker.r].row[checker.c], this.boardInfo[this.checkerInfo.r].row[this.checkerInfo.c]);
            }
        }
    }

    checkIfCheckerCanMove(checker, checkerType) {
        this.moveChecker = [];
        this.activeFreeSeats = [];

        if((checkerType === 0) && (this.playerTurn === 0)) { // 'White Checker Turn'

            if(this.boardInfo[checker.r - 1].row[checker.c - 1].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r - 1].row[checker.c - 1]);
            }

            if(this.boardInfo[checker.r - 1].row[checker.c + 1].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r - 1].row[checker.c + 1]);
            }

            if(this.boardInfo[checker.r - 1].row[checker.c + 1].type === 1 && this.boardInfo[checker.r - 2].row[checker.c + 2].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r - 2].row[checker.c + 2]);
            }

            if(this.boardInfo[checker.r - 1].row[checker.c - 1].type === 1 && this.boardInfo[checker.r - 2].row[checker.c - 2].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r - 2].row[checker.c - 2]);
            }

        } else if((checkerType === 1) && (this.playerTurn === 1)) { // 'Black Checker Turn'

            if(this.boardInfo[checker.r + 1].row[checker.c - 1].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r + 1].row[checker.c - 1]);
            }

            if(this.boardInfo[checker.r + 1].row[checker.c + 1].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r + 1].row[checker.c + 1]);
            }

            if(this.boardInfo[checker.r + 1].row[checker.c + 1].type === 0 && this.boardInfo[checker.r + 2].row[checker.c + 2].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r + 2].row[checker.c + 2]);
            }

            if(this.boardInfo[checker.r + 1].row[checker.c - 1].type === 0 && this.boardInfo[checker.r + 2].row[checker.c - 2].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r + 2].row[checker.c - 2]);
            }

        }
    }
}