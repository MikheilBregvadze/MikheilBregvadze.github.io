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
                let player = parseFloat(checker[i].getAttribute('data-player'));   
                handler({r, c, isKing: !!isKing, player});
            })
        }
    }

    drawActiveFreeSeats(activeFreeSeats) {
        if(!activeFreeSeats) return;
        var list = document.querySelectorAll(".freeSeat.activeFreeSeat");
        if(list.length > 0) {
            for(let i = 0; i < list.length; i++) {
                list[i].classList.remove('activeFreeSeat');
            }
        }
        for(let i = 0; i < activeFreeSeats.length; i++) {// freeSeat activeFreeSeat
            let element = document.getElementById(activeFreeSeats[i].id)
            if(element) element.classList.add('activeFreeSeat');
        }
    }

    drawCheckerMove(info) {
        console.log(info);
        if(info.length === 0) return;
        const type = info[0].type === 0 ? 'white' : 'black';

        let checker = document.getElementById(type + '-' + info[0].r + info[0].c);
        let freeSeat = document.getElementById('free-' + info[1].r + info[1].c);

        checker.style.left = info[0].posX + 'px';
        checker.style.top = info[0].posY + 'px';

        this.setAttributes(checker, {'id': type + "-" + info[1].r + info[1].c, 'data-row': info[1].r, 'data-column': info[1].c});

        freeSeat.style.left = info[1].posX + 'px';
        freeSeat.style.top = info[1].posY + 'px';

        this.setAttributes(freeSeat, {'id': "free-" + info[0].r + info[0].c, 'data-row': info[0].r, 'data-column': info[0].c});
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