const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const score = document.querySelector('.header-score');
const goHomeBtn = document.querySelector('.goHome-btn');


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQues(0);
    quesCounter(1);
    headerScore();
}


let quesCount = 0;
let quesNum = 1;
let userScore = 0;
let nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {

    if(quesCount < questions.length-1) {
        quesCount++;
        showQues(quesCount);

        quesNum++;
        quesCounter(quesNum);
        
    } else {
        showResult();
    }
}


let optionList = document.querySelector('.option-list');

//getting question from array
function showQues(index) {
    nextBtn.classList.remove('active');
    let ques = document.querySelector('.question-text');
    ques.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;
    let option = document.querySelectorAll('.option');
    for(let i=0;i<option.length;i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}


function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[quesCount].answer;
    let allOptions = optionList.children.length;

    if(userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore++;   
        headerScore();
    } else {
        answer.classList.add('wrong');

        //if user selected wrong answer then auto select correct answer
        for(let i=0;i<allOptions;i++) {
            if(optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    //if user has selected one option then disabled other options
    for(let i=0;i<allOptions;i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function headerScore() {
    score.textContent = `Score : ${userScore}/${questions.length}`;
}


function quesCounter(index) {
    let quesTotal = document.querySelector('.question-total');

    quesTotal.textContent = `${quesNum} of ${questions.length} Questions`
}


function showResult() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    let scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    let circularProgress = document.querySelector('.circular-progress');
    let progressValue = document.querySelector('.progress-value');
    let progressStart = -1;
    let progressEnd = (userScore/questions.length) * 100;
    let speed = 20;
    let progress = setInterval(() => {
        progressStart++;
        progressValue.textContent = `${progressStart}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStart * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
        if(progressStart == progressEnd) {
            clearInterval(progress);
        }
    }, speed);

}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    quesCount = 0;
    quesNum = 1;
    userScore = 0;

    showQues(quesCount);
    quesCounter(quesNum);
    headerScore(score);
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('acitve');

    quesCount = 0;
    quesNum = 1;
    userScore = 0;

    showQues(quesCount);
    quesCounter(quesNum);
}