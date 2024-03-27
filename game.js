let seqGame = [];
let seqUser = []; 
let btns = ["red", "green", "yellow", "blue"];
 
let started = false;
let level = 0;
let highscore = 1;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 500);
}


function levelUp(){
    seqUser = [];
    level++;
    if(level >= highscore){
        highscore = level;
    }
    h2.innerText = `Level ${level}`;


     let randIdx = Math.floor(Math.random() * 3); 
     let randColor = btns[randIdx];
     let randBtn = document.querySelector(`.${randColor}`);

    seqGame.push(randColor);
    console.log(seqGame);
    gameFlash(randBtn);
}


function checkAns(idx){

    if(seqUser[idx] === seqGame[idx]){
        if(seqUser.length == seqGame.length){
            setTimeout(levelUp, 1000);
        }
        // console.log("same value");
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to start.`;
        h3.innerHTML =`Highest Score =  ${highscore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000);
        reset();
    }
}




function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    seqUser.push(userColor);

    checkAns(seqUser.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    seqGame = [];
    seqUser = [];
    level = 0;
}