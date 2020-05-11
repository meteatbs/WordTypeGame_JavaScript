const word=document.getElementById('word');
const text=document.getElementById('text');
const timeEl=document.getElementById('time');
const scoreEl=document.getElementById('score');
const endgameEl=document.getElementById('end-game-container');
const difficultySelect=document.getElementById('difficulty');
const settings=document.getElementById('settings');
const settingsForm=document.getElementById('settings-form');
const settingsBtn=document.getElementById('settings-btn');

//List of words of game
const words=[ 'sigh',
'tense',
'airplane',
'ball',
'pies',
'juice',
'warlike',
'bad',
'north',
'dependent',
'steer',
'silver',
'highfalutin',
'superficial',
'quince',
'eight',
'feeble',
'admit',
'drag',
'loving'];

//Init word

let randomWord;

//Init score

let score=0;

//Init time
let time=10;

//Set difficulty to value in localstorage or medium

let difficulty=localStorage.getItem('difficulty')!==null?localStorage.getItem('difficulty'):'medium';

//Set difficulty select value eger difficulty secilmemisse medium yap secilmisse onu aktar

difficultySelect.value=localStorage.getItem('difficulty')!==null?localStorage.getItem('difficulty'):'medium';


//Focus on text box
text.focus();

//Start counting down every 1 s it will call this func(updatetime)
const timeInterval=setInterval(updateTime,1000);



//Generate Random word from arr
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];

}
// console.log(getRandomWord());


// Add word to DOM
function addWordToDOM() {
    randomWord=getRandomWord();
    word.innerHTML=randomWord;
}
//Update time
function updateTime() {
    // console.log(1);
    time--;
    timeEl.innerHTML=time+'s';
    if (time===0) {
        clearInterval(timeInterval);
        //End game
        gameOver();
    }

}

//Game over

function gameOver() {
    endgameEl.innerHTML=`
    <h1>Time ran out</h1>
    <p>Your final score is : ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display='flex';
}



addWordToDOM();
//Event listeners

//Update Score
function updateScore() {
    score++;
    scoreEl.innerHTML=score;
}

//Event listeners e is event prarameter

text.addEventListener('input',e=>{
const insertedText=e.target.value;
// console.log(insertedText);
if (insertedText===randomWord) {
    addWordToDOM();
    updateScore();
    //Clear
    e.target.value='';
    if (difficulty==='hard') {
        
        time+=2;
        
       
    } else if(difficulty==='medium'){
       
        time+=3;
        
    }
    else{
        
    time+=5;
    
    
    }
    
    updateTime();
    
}

});


//Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select 
settingsForm.addEventListener('change',e=>{
difficulty=e.target.value;
// console.log(difficulty);
localStorage.setItem('difficulty',difficulty);
location.reload();
});
