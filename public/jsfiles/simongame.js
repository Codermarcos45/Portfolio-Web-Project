let gameSeq= [];
let userSeq = [];
let h2 = document.querySelector('h2');
let btns  = ['red', 'yellow', 'purple','skyblue'];

let getStared = false;
let level = 0;
let highScore = 0;

document.addEventListener('keypress', function() {
    if(getStared == false) {
        getStared = true;
        console.log("game started!");


        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
}

function levelUp() {
    userSeq = [];
    level++;
    if(level > highScore) {
        highScore = level;
    }
    
    h2.innerText = `Level ${level}`;
    
    let ranIdx = Math.floor(Math.random() * 3)+1;
    let ranColor = btns[ranIdx];
    gameSeq.push(ranColor);
    console.log(gameSeq);
    let ranBtn = document.querySelector(`.${ranColor}`);   
    btnFlash(ranBtn);
}

function checkSequence(idx) {

    if(gameSeq[idx] === userSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        setTimeout(() => {
            background();
            h2.innerHTML = `Your score : ${level}<br> Game Over! Press any key to restart`;
            reset();
        }, 1000);
    }
}

function background() {
    let body = document.querySelector('body');
    body.style.backgroundColor = 'red';
    setTimeout(() => {
        body.style.backgroundColor = 'white';
    }, 150);

    
}

function reset() {
    getStared = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}


function btnPress() {
    userFlash(this);
    
    let userColor = this.getAttribute('id');
    userSeq.push(userColor);

    checkSequence(userSeq.length-1);
}



let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener('click', btnPress);
}



//highest score

let h3 = document.querySelector('h3');

h3.innerText = `Highest Score : ${highScore}`;