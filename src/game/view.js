class View {
    constructor() {
        this.app = this.getElement('#root');
        this.table = this.getElement('#table');
        this.checkersParent = this.getElement('#checkers');
    }

    drawChessBackground() {
        for (let i = 0; i < 64; i++) {
            this.table
                .appendChild(this.createElement("div", ''))
                .style.backgroundColor = parseInt((i / 8) + i + "") % 2 === 0 ? TABLE_CELL_COLOR_DARK : TABLE_CELL_COLOR_LIGHT;
        }
    }

    drawCheckers(gameTable) {
        let checkerDiv = null;
        for(let r = 0; r < gameTable.length; r++) {
            for(let c = 0; c < gameTable[r].row.length; c++) {
                if((r > 1 && r < 10) && (c > 1 && c < 10)) {
                    if(gameTable[r].row[c].name === 'white' || gameTable[r].row[c].name === 'black' || gameTable[r].row[c].name === 'freeSeat') {
                        checkerDiv = this.createElement("div", '');
                        this.setAttributes(checkerDiv, {'id': gameTable[r].row[c].id, 'data-player': gameTable[r].row[c].name === 'white' ? 0 : 1, 'data-king': 0, 'data-row': r, 'data-column': c, 'class': 'checker'});
                        checkerDiv.style.cssText = `top: ${gameTable[r].row[c].posY}px; left: ${gameTable[r].row[c].posX}px`;
                        this.checkersParent.appendChild(checkerDiv);

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

    bindToggleChecker(handler) {
        let checker = document.querySelectorAll('.checker');
        for(let i = 0; i < checker.length; i++) {
            checker[i].addEventListener('click', function() {
                let r = parseFloat(checker[i].getAttribute('data-row'));
                let c = parseFloat(checker[i].getAttribute('data-column'));
                let isKing = parseFloat(checker[i].getAttribute('data-king'));   
                let type = parseFloat(checker[i].getAttribute('data-player'));   
                handler({r, c, isKing: !!isKing, type});
            })
        }
    }

    drawActiveFreeSeats(activeFreeSeats) {
        console.log(activeFreeSeats);
        // // let element = document.getElementById(id)
        // if(element) document.getElementById(id).classList.add('currentAfterWhite');
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
    
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    setAttributes(el, attrs) {
        for(let key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
}