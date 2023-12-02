let turnAudio = new Audio("ting.wav");
let gameWin = new Audio("win-music.wav");
let turn = "X";
let turnInfo = document.querySelector('.info');
let gameOver = false;
let spantext = document.querySelectorAll('.boxText');
let rstBtn = document.getElementById('restartBtn');
let gif = document.getElementById('gif');
let lineAnimation = document.getElementsByClassName('line');

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// function to check for win
const checkWin = () => {
    let wins = [
        [0, 1, 2,  5,5,0],
        [3, 4, 5,  5,15,0],
        [6, 7, 8,  5,25,0],
        [0, 3, 6,  -5,15,90],
        [1, 4, 7,  5,15,90],
        [2, 5, 8,  15,15,90],
        [0, 4, 8,  5,15,45],
        [2, 4, 6,  5,15,-45]
    ]
    wins.forEach((e) => {
        if ((spantext[e[0]].innerText === spantext[e[1]].innerText) && (spantext[e[1]].innerText === spantext[e[2]].innerText) && (spantext[e[0]].innerText !== "")) {
            turnInfo.innerText = spantext[e[0]].innerText + "  Won!"
            gameOver = true;
            gameWin.play();
            gif.style.width = "180px";
            lineAnimation[0].style.width = "20vw"; 
            lineAnimation[0].style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
    })
};

// Game logic
spantext.forEach((e) => {
    e.addEventListener('click', () => {
        if (!gameOver) {
            if (e.innerText === '') {
                e.innerText = turn;
                turn = changeTurn();
                turnAudio.play();
                checkWin();
                if (!gameOver) {
                    turnInfo.innerText = "Turn for " + turn;

                    // Draw logic
                    let iterator = 0;
                    spantext.forEach((e) => {
                        if (e.innerText !== "") {
                            iterator += 1
                        }
                    })
                    if (iterator === 9) {
                        turnInfo.innerText = "Its Fuckin Draw!";
                    }
                }
                
            }
        }
    })
});

rstBtn.addEventListener('click', (e) => {
    gameOver = false;
    turn = "X";
    gif.style.width = "0";
    lineAnimation[0].style.width = "0";
    spantext.forEach((e) => {
        e.innerText = "";
    })
    turnInfo.innerText = "Turn for " + turn;
})


// document.write("abcd");