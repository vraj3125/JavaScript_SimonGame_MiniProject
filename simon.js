// 1. keypress -> start Game
// 2. buttonflash + level 1
// 3. button pressed -> check user <-> game


let gameSeq = [];
let userSeq = [];
let btns = ["red","green","purple","yellow"];
let level = 0;
let started = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false)
    {
        console.log("Game Started!");
        started = true;
    }
    
    levelUp();
})


function gameFlash(btn)
{
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    },300);
}


function userFlash(btn)
{
    btn.classList.add("userFlash");

    setTimeout(function(){
        btn.classList.remove("userFlash");
    },300);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random button choose
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
    
}
function checkAns(idx){
    // console.log("Curr level: ",level);  
    // let idx = level - 1;
    if(userSeq[idx]===gameSeq[idx])
    {
        // console.log("same color..");
        if(userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp(),1000);
        }
        
    }
    else{
        h2.innerHTML = `GAME OVER!! YOUR SCORE WAS <b>${level*10}</b> <br>Press Any Key To Start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },300)
        reset();
    }

}



function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}


let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}