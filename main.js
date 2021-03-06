(function(){
    console.log("connected")

const inputElm = document.querySelector("#input")
const formElm = document.querySelector("form")
const winingScoreElm = document.querySelector(".winScore")


const p1ScoreElm = document.querySelector(".p1Score")
const p2ScoreElm = document.querySelector(".p2Score")
const p1BtnElm = document.querySelector(".p1Btn")
const p2BtnElm = document.querySelector(".p2Btn")
const resetElm = document.querySelector(".reset")
const submitBtnElm = document.querySelector(".sub-btn")
const diceElm = document.querySelector(".dice")

let winScore = 0
let p1Score = 0
let p2Score = 0

winingScoreElm.textContent = "Please enter a score to start the game"
p1ScoreElm.textContent = 0
p2ScoreElm.textContent = 0
turn = ''

p1BtnElm.setAttribute('disabled', 'disabled')
p2BtnElm.setAttribute('disabled', 'disabled')

formElm.addEventListener('submit', e => {
    const  inputValue = +inputElm.value
    e.preventDefault()

    if(inputValue === '' || inputValue < 1 ){
        
        if(!document.querySelector('.inval-input')){
            formElm.insertAdjacentHTML('beforebegin','<p class = "inval-input"> Please enter valid number</p>')
            p1BtnElm.setAttribute('disabled', 'disabled')
            p2BtnElm.setAttribute('disabled', 'disabled')
            //inputElm.value = ''
        }
    }else {
        if(document.querySelector('.inval-input')){
            document.querySelector('.inval-input').remove()
        }
    winScore = +inputElm.value
    winingScoreElm.innerHTML =  ` Player who will score <b>${winScore}</b> first, will win the game.`
    inputElm.value = ''
    initStage()
    submitBtnElm.setAttribute('disabled', 'disabled')
    p1BtnElm.removeAttribute('disabled')
    p2BtnElm.removeAttribute('disabled')
    }
    
    inputElm.value = ''

})

p1BtnElm.addEventListener('click', e => {
        const result = genRanNum(5)
        p1Score = p1Score + result
        p1ScoreElm.textContent = p1Score
        if(result  === 3){
            turn = 'player-1'
            p2BtnElm.setAttribute('disabled', 'disabled')
            //p1BtnElm.insertAdjacentHTML('beforebegin', '<p class = "" >Player 1 turn again</p>')
        }else{
            turn = 'player-2'
            p1BtnElm.setAttribute('disabled', 'disabled')
            p2BtnElm.removeAttribute('disabled')
        }
        diceElm.innerHTML =  `Player-1 Scores: ${result}`
        
        //turn = 'player-2'
        //p1BtnElm.setAttribute('disabled', 'disabled')
        //p2BtnElm.removeAttribute('disabled')
    
    checkWinner()

})

//checking who is winner

// function checkWinner() {
//     const p1Winscore = winScore <= p1Score
//     const p2Winscore = winScore <= p2Score
//     if (p1Winscore || p2Winscore) {
//         p1BtnElm.setAttribute('disabled', 'disabled')
//         p2BtnElm.setAttribute('disabled', 'disabled')
//     }
//     displayWinner(p1Winscore, p2Winscore)
// }

function checkWinner() {
    if (p1Score >= winScore) {
        formElm.insertAdjacentHTML("beforebegin", "<h4><p class = 'winMsg'>Player 1 is the winner!</p></h4><p  class = 'restartMsg'>Press  Reset/Restart to Play the Game again</p>");
        p1BtnElm.setAttribute("disabled", "disabled");
        p2BtnElm.setAttribute("disabled", "disabled");
    } else if (p2Score >= winScore) {
        formElm.insertAdjacentHTML("beforebegin", "<h4><p class = 'winMsg'>Player 2 is the winner!</p></h4><p  class = 'restartMsg'>Press  Reset/Restart to Play the Game again</p>");
        p1BtnElm.setAttribute("disabled", "disabled");
        p2BtnElm.setAttribute("disabled", "disabled");
    }
}


// function displayWinner(p1, p2) {
//     if (p1) {
//         formElm.insertAdjacentHTML('beforebegin', '<p class = "winMsg" >Player 1 is winner</p>')
//     } else if (p2) {
//         formElm.insertAdjacentHTML('beforebegin', '<p class = "winMsg" >Player 2 is winner</p>')
//     }
// }


p2BtnElm.addEventListener('click', e => {
        const result = genRanNum(5)
        p2Score = p2Score + result
        p2ScoreElm.textContent = p2Score
        if(result  === 3){
            turn = 'player-2'
            p1BtnElm.setAttribute('disabled', 'disabled')
            //p2BtnElm.insertAdjacentHTML('beforebegin', '<p class = "" >Player 2 turn again</p>')
        }else{
            turn = 'player-1'
            p2BtnElm.setAttribute('disabled', 'disabled')
            p1BtnElm.removeAttribute('disabled')
        }
        diceElm.innerHTML =  `Player-2 Scores: ${result}`
        //p2BtnElm.setAttribute('disabled', 'disabled')
        //p1BtnElm.removeAttribute('disabled')
    
    checkWinner()
})

resetElm.addEventListener('click', e => {
    winingScoreElm.textContent = "Please enter a score to start the game"
    winScore = 0
    inputElm.value = ''
    initStage()
    submitBtnElm.removeAttribute('disabled')
    if(document.querySelector('.restartMsg')){
        document.querySelector('.restartMsg').remove()
    }
    if(document.querySelector('.dice')){
        document.querySelector('.dice').remove()
    }
})

function initStage(){
    p1Score = 0
    p2Score = 0
    turn = 'player-1'
    p1ScoreElm.textContent = p1Score
    p2ScoreElm.textContent = p2Score
    p1BtnElm.setAttribute('disabled', 'disabled')
    p2BtnElm.setAttribute('disabled', 'disabled')
    if(document.querySelector('.winMsg')){
        document.querySelector('.winMsg').remove()
    }
}

function genRanNum(max){
   return Math.floor(Math.random() * max + 1 )
}
})()