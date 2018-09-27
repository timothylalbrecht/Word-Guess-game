/*
    HANGMAN
*/

var wordBank =           // Word list array
    [
        "giraffe",
        "rhino",
        "antelope",
        "elephant",
        "hyena",
        "lion",
        "leopard",
        "hippo",
        "cheetah",
        "buffalo",
        "wildebeest"
    ];



var underScore = [];
var rightLetter = [];
var wrongLetter = [];
var guessesLeft = 8;
var userGuesses = [];
var randWord;
var letterCounter = 0;
var winCounter = 0;
var hasFinished = false;


function startGame(){
    //hide all the winning images
    document.getElementById("antelope").style.cssText = "display: none";
    document.getElementById("buffalo").style.cssText = "display: none";
    document.getElementById("cheetah").style.cssText = "display: none";
    document.getElementById("elephant").style.cssText = "display: none";
    document.getElementById("giraffe").style.cssText = "display: none";
    document.getElementById("hippo").style.cssText = "display: none";
    document.getElementById("hyena").style.cssText = "display: none";
    document.getElementById("leopard").style.cssText = "display: none";
    document.getElementById("lion").style.cssText = "display: none";
    document.getElementById("rhino").style.cssText = "display: none";
    document.getElementById("wildebeest").style.cssText = "display: none";
    document.getElementById("gameover").style.cssText = "display: none";


    //grab a word from the bank at random.
    randWord = wordBank[Math.floor(Math.random() * wordBank.length)];       
    console.log('random word = ' + randWord);
        for(var i = 0; i < randWord.length; i++)                        // iterate thru each letter of word
        {
            underScore.push('_');                                       // replace each letter with an underscore
        }

    //Print correct number of underscores for the selected word bank word.
    document.getElementById('empty-word').textContent = underScore.join(" ");

    guessesLeft = 8;

    //remaining guesses left
    document.getElementById('guesses-left').textContent = guessesLeft;
}

function resetGame(){       //reset game on page refresh and game win/loss.
    underScore = [];
    wrongLetter = [];
    document.getElementById("guessed-letters").textContent = wrongLetter;
    guessesLeft = 8;
    userGuesses = [];
    letterCounter = 0;
    randWord;
}

// function to determine a win or a loss
function winnerLoser(){
    if(letterCounter === randWord.length)
    {
        alert('You Win! Good Guess');
        winCounter++;
        hasFinished = true;
        document.getElementById("win-Counter").textContent = winCounter;
        resetGame();
        startGame();
    }
    else if(guessesLeft <= 0)
    {
        alert("Game Over!");
        document.getElementById("gameover").style.cssText = "display: block";
        hasFinished = true;
        resetGame();
        startGame();
    }        
}

function winPicture(){
    if(underScore[0] = "a")
    {
        document.getElementById("antelope").style.cssText = "display: block";
    }
}

// Guess a letter
document.onkeyup = function(event)
{
    hasFinished = false;
    userGuesses = event.key;                            // Set key pressed to userGuess
    //does the letter exist in the game word?
    if(randWord.indexOf(userGuesses) > -1)              // YES
    {
        for(var i = 0; i < randWord.length; i++)        // Loop through the word by letter
        {
            if(randWord[i] === userGuesses)             // if the index of randWord is the same as the guesses letter,
            {
                underScore[i] = userGuesses;            // replace that underscore with the letter             
                console.log(underScore);
                document.getElementById("empty-word").textContent = underScore.join(" ");   // fill underscore blanks with correct guesses
                letterCounter++;                        // originally tried to use winCounter here, but this caused issues if the user hit the same correct key multiple times
                winnerLoser();
            }
        }
    }
    else                                                // NO
    {
        wrongLetter.push(userGuesses);      // add to wrongLetter array
        guessesLeft--;                      // -1 from guesses remaining
        console.log(wrongLetter);
        console.log(guessesLeft);
        document.getElementById("guessed-letters").textContent = wrongLetter;   //print to page guessed letters
        document.getElementById("guesses-left").textContent = guessesLeft;      //print to page remaining guesses
        winnerLoser();
    }
}



