var words = ["AWESOME","SATURDAY","GRAUDATION"];
var word;       
var wordout;    
var worduser;   
var hmitem = 0;
var wins = 0;
var loss = 0;
function closeCatMenu() {
    document.getElementById("catOverlay").style.display = "none";
    makeWordList();
}

function openCatMenu() {
    alert("Work in progress!");
    document.getElementById("catOverlay").style.display = "block";
}

function makeWordList() {
    
}

function setup() {
    wordout = document.getElementById("word");
    alphabetTable();
}

function alphabetTable() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var table = document.getElementById("alphabet");
    table.innerHTML = "";
    var k = 0;
    for(var i = 0; i < 26; i++) {
        var row = document.createElement("td");
        for(var j = 0; j < 1; j++) {
            if(alphabet[k] != undefined) {
                var cell = document.createElement("tr");
                var text = document.createTextNode(alphabet[k]);
                cell.setAttribute("onclick", "guess('" + alphabet[k] + "');");
                cell.setAttribute("id", "letter" + alphabet[k]);
                
                cell.appendChild(text);
                row.appendChild(cell);
                k++;
            } 
        } 
        table.appendChild(row);
    } 
} 


function newWord() {
    word = words[Math.floor(Math.random() * words.length)];
    

    
    worduser = "";
    for(var i = 0; i < word.length; i++) {
        worduser += "_";
    }
    wordout.innerHTML = "";
    for(i = 0; i < worduser.length; i++) {
        wordout.innerHTML += worduser[i] + " ";
    }
    wordout.innerHTML += " (" + word.length + ")";
    alphabetTable();
    hmitem = 0;
    var c = document.getElementById("hangman");
    var ctx = c.getContext("2d");
    ctx.strokeColor = "#000000";
    ctx.clearRect(0, 0, 200, 200);
}

function guess(letter) {
    var check = 0;
    // alert(letter);
    document.getElementById("letter" + letter).removeAttribute("onclick");
    document.getElementById("letter" + letter).style.textDecoration = "line-through";
    
    for(i = 0; i < word.length; i++) {
        if(word[i] == letter) {
            var strInArr = [];
            for(j = 0; j < worduser.length; j++) {
                strInArr.push(worduser[j]);
            }
            strInArr[i] = letter;
            worduser = "";
            for(j = 0; j < strInArr.length; j++) {
                if(strInArr[j] != "_") {
                    worduser += strInArr[j];
                }
                else {
                    worduser += "_";
                }
            }
        } // if correct
        else {
            check++;
        }
    } // for i
    wordout.innerHTML = "";
    for(i = 0; i < worduser.length; i++) {
        wordout.innerHTML += worduser[i] + " ";
    }
    wordout.innerHTML += " (" + word.length + ")";
    if(check == word.length) {
        updateCtx();
    }
    checkComp();
} // guess()

function updateCtx() {
    var isAdding = true;
    var c = document.getElementById("hangman");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    switch(hmitem) {
        case 0:
            ctx.moveTo(10, 190);
            ctx.lineTo(110, 190);
            ctx.stroke();
            break;
        case 1:
            ctx.moveTo(60, 190);
            ctx.lineTo(60, 50);
            ctx.stroke();
            break;
        case 2:
            ctx.moveTo(60, 50);
            ctx.lineTo(135, 50);
            ctx.stroke();
            break;
        case 3:
            ctx.moveTo(60, 70);
            ctx.lineTo(80, 50);
            ctx.stroke();
            break;
        case 4:
            ctx.moveTo(135, 50);
            ctx.lineTo(135, 60);
            ctx.stroke();
            break;
        case 5:
            ctx.arc(135, 70, 10, 0, 2 * Math.PI);
            ctx.stroke();
            break;
        case 6:
            ctx.moveTo(135, 80);
            ctx.lineTo(135, 120);
            ctx.stroke();
            break;
        case 7:
            ctx.moveTo(135, 120);
            ctx.lineTo(120, 145);
            ctx.stroke();
            ctx.moveTo(135, 120);
            ctx.lineTo(150, 145);
            ctx.stroke();
            break;
        case 8:
            ctx.moveTo(135, 100);
            ctx.lineTo(120, 80);
            ctx.stroke();
            ctx.moveTo(135, 100);
            ctx.lineTo(150, 80);
            ctx.stroke();
            
            alert("You lost! The correct answer was: " + word);
            document.getElementById("losses").innerHTML = "Losses: " + ++loss;
            newWord();
            isAdding = false;
            break;
        default:
            alert("Failure");
    } // switch
    ctx.closePath();
    if(isAdding) {
        hmitem++;
    }
    else {
        isAdding = true;
    }
} // updateCtx()

function checkComp() {
    var check = 0;
    // alert(worduser);
    for(var i = 0; i < worduser.length; i++) {
        if(worduser[i] == "_") {
            check++;
        } // if
    } // for i
    // alert(check);
    if(check == 0) {
        wins++;
        setTimeout(function toRun() {
            alert("Correct!");
            newWord();
        }, 500);
        document.getElementById("wins").innerHTML = "Wins: " + wins;
    }
} // checkComp()







