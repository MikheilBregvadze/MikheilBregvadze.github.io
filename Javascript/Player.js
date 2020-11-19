const user = {
    count: 0
};

class User {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.moveLength = 0;
        this.killCheckerCount = 0;
    }

    init() {

    }

    fillKillCheckerCount(type) {
        this.killCheckerCount++;
        document.querySelector(`.kill-checker-${type}-count`).setAttribute('id', `kill-player-${this.name}`);
        document.getElementById(`kill-player-${this.name}`).textContent = this.killCheckerCount;
    }

    stepsCount(type) {
        this.moveLength++;
        document.querySelector(`.step-count-${type}`).setAttribute('id', `player-${this.name}`);
        document.getElementById(`player-${this.name}`).textContent = this.moveLength;
    }
}

let playerWhite = null;
let playerBlack = null;

// Input manipulation

// document.getElementById('userForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const input = document.getElementById('userName');
//     if(input.value) {
//         if (!playerWhite) {
//             playerWhite = new User(input.value, 'white');
//             document.querySelector('.playerWhite').classList.add('fill');
//             document.querySelector('.playerWhiteName').textContent = input.value;
//             input.value = '';
//             user.count++;
//         } else {
//             playerBlack = new User(input.value, 'black');
//             document.querySelector('.playerBlack').classList.add('fill');
//             document.querySelector('.playerBlackName').textContent = input.value;
//             input.value = '';
//             user.count++;
//             e.path[1].style.display = 'none';
//         }
//     } else {
//         alert('Fill Input!!!');
//     }
// })