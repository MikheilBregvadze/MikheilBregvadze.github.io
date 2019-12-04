const gameDiv = document.getElementById("app");


class Game {
	gameData = {
		gameTable: [],
		whites: [],
		blacks: [],
		freePlace: [],
		currentPositions: {
			id: null,
			posX: null,
			posY: null
		}
	}
	whiteCheckerId = null;
	blackCheckerId = null;
	freeSeatId = null;

	load() {
		this.createGameArena();
		this.setPositionElements();
		this.getElementId();
	}

	createGameArena() {
		for(let r = 0; r < 8; r++) {
			const table = document.createElement("div");
		    table.setAttribute("class", "table");
			gameDiv.appendChild(table);
			this.gameData.gameTable.push({
				row: []
			});
			for(let c = 0; c < 8; c++) {
				let odd = document.createElement('div');
		    	odd.setAttribute('class', 'odd');
		    	odd.setAttribute('id', 'odd' + '-' + r + c);

		    	let even = document.createElement('div');
		    	even.setAttribute('class', 'even');
		    	even.setAttribute('id', 'odd' + '-' + r + c);
		    	if(c % 2 === r % 2) {
					table.appendChild(odd);
		    	}else {
					table.appendChild(even);
		    	}

		    	if(r < 3 && c % 2 === r % 2) {
		    		let roundBlack = document.createElement('div');
		    		roundBlack.setAttribute('class', 'black checker');
					odd.appendChild(roundBlack);
					this.gameData.gameTable[r].row.push({
						name: 'black',
						id: "black-" + r + c,
		    			posX: 10 + c * 70,
		    			posY: 10 + r * 70,
		    			type: 1,
		    			status: "off"
					})
				}else if(r < 3){
					this.gameData.gameTable[r].row.push({
						type: 2
					})
				}else if(r > 4 && c % 2 === r % 2) {
					let roundWhite = document.createElement('div');
					roundWhite.setAttribute('class', 'white checker');
					odd.appendChild(roundWhite);

					this.gameData.gameTable[r].row.push({
						name: 'white',
						id: "white-" + r + c,
						posX: 10 + c * 70,
						posY: 360 + (r - 5) * 70,
						type: -1,
						status: "off"
					})
				}else {
					if(c % 2 === r % 2) {
						let freeSeat = document.createElement('div');
						freeSeat.setAttribute('class', 'freeSeat checker');
						odd.appendChild(freeSeat);
						this.gameData.gameTable[r].row.push({
							name: 'freeSeat',
							id: "free-" + r + c,
							posX: 10 + c * 70,
							posY: 360 + (r - 5) * 70,
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

	setPositionElements() {
		let blacks = document.querySelectorAll('.black');
		let whites = document.querySelectorAll('.white');

		let countOfBalls = whites.length;
		let table = this.gameData.gameTable;
		for(let r = 0; r < table.length; r++) {
			for(let c = 0; c < table[r].row.length; c++) {
				if(table[r].row[c].name === 'white') {
					console.log(table[r].row[c].posY);
					console.log(c);
						whites[c].style.top = table[r].row[c].posY + 'px';
						whites[c].style.left = table[r].row[c].posX + 'px';
						whites[c].setAttribute('id', table[r].row[c].id);
				}
			}
		}

		// for(let i = 0; i < countOfBalls; i++) {
			// whites[i].style.top = this.gameData.whites[i].posY + 'px';
			// whites[i].style.left = this.gameData.whites[i].posX + 'px';
			// whites[i].setAttribute('id', this.gameData.whites[i].id);

		// 	blacks[i].style.top = this.gameData.blacks[i].posY + 'px';
		// 	blacks[i].style.left = this.gameData.blacks[i].posX + 'px';
		// 	blacks[i].setAttribute('id', this.gameData.blacks[i].id);
		// }

		// for(let i = 0; i < this.gameData.freePlace.length; i++) {
		// 	let freePlace = document.querySelectorAll('.freeSeat');

		// 	freePlace[i].style.top = this.gameData.freePlace[i].posY + 'px';
		// 	freePlace[i].style.left = this.gameData.freePlace[i].posX + 'px';
		// 	freePlace[i].setAttribute('id', this.gameData.freePlace[i].id);
		// }
	}

	changePosition() {
		if(this.blackCheckerId !== null || this.whiteCheckerId !== null || this.freeSeatId !== null) {

			let freeSeat = this.gameData.freePlace;
			let blacks = this.gameData.blacks;
			let whites = this.gameData.whites;

			for(let f = 0; f < freeSeat.length; f++) {
				for(let b = 0; b < blacks.length; b++) {
					if(blacks[b].id === this.blackCheckerId) {
						this.gameData.currentPositions.id = blacks[b].id;
						this.gameData.currentPositions.posX = blacks[b].posX;
						this.gameData.currentPositions.posY = blacks[b].posY;
						this.gameData.currentPositions.status = 'on';

						if(this.freeSeatId === freeSeat[f].id){
							blacks[b].posX = freeSeat[f].posX;
							blacks[b].posY = freeSeat[f].posY;
						}
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
				if(selectorName[i].classList.contains('black')) {
					parent.blackCheckerId = elementId;
				}else if(selectorName[i].classList.contains('white')) {
					parent.whiteCheckerId = elementId;
				}else if(selectorName[i].classList.contains('freeSeat')) {
					parent.freeSeatId = elementId;
				}
				parent.changePosition();
			});
		}
		if(elementId !== null) return elementId;
	}

	gameTicker() {
		setInterval(() => {
			
		}, 100);
	}
}


const chessGame = new Game();

window.addEventListener("load", function(){
	chessGame.load();
	chessGame.gameTicker();
});
