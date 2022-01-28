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

    setSelectedCheckerPosition(checkerInfo) {
        this.checkerInfo = checkerInfo;

        this.checkIfCheckerCanMove(checkerInfo);
        this.activeFreeSeats = [checkerInfo];
    }

    checkIfCheckerCanMove(checker) {
        console.log(this.boardInfo[checker.r])
        if(checker.type === 0) { // 'White Checker Turn'
            // console.log(this.boardInfo[checker.r - 1].row[checker.c - 1].type, this.boardInfo[checker.r - 1].row[checker.c - 1].id);

            if(this.boardInfo[checker.r - 1].row[checker.c - 1].type === 2) {
                this.activeFreeSeats.push(this.boardInfo[checker.r - 1].row[checker.c - 1].id);
            }
        }
    }
}