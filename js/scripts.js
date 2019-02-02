var gameOver = "false";
var string2 = [];
var previousRolls2 = [];
var numbersArray = [];
var firstDice = document.getElementById('dice1');
var secondDice = document.getElementById('dice2');
var color1;
var color2;
var currentPlayer = 0;
var previousRolls = [];
var string = [];
var color;
var colorAI = "Blue";
var currentPlayer2 = 0;
var easyCount = 0;
var mediumCount = 0;
var hardCount = 0;
var responses = 1;
var ai = document.getElementById("list");
var winScore;















function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}






function mainPVP() {
  this.playersArray = [];
  this.currentId = 0;
}


mainPVP.prototype.findPlayers = function(id) {
  for (var i = 0; i < this.playersArray.length; i++) {
    if (this.playersArray[i]) {
      if (this.playersArray[i].id == id) {
        return this.playersArray[i];
      }
    }
  };
  return false;
}

mainPVP.prototype.updateScore = function(score, player) {
  if (player == 0) {
    this.playersArray.player1Score = score;
  }
  if (player == 1) {
    this.playersArray.player2Score = score;
  }
}

mainPVP.prototype.PVP = function(players) {
  players.id = this.assignId();
  this.playersArray.push(players);
}

mainPVP.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

function pvpMenu() {
  $("#menu").toggle();
  $("#pvpMenu").toggle();
}

function hideStartGame() {
  $("#startGame").toggle();
  $("#menu").toggle();
}

function addPlayers(firstPlayer, secondPlayer, player1Score, player2Score) {
  this.firstPlayer = firstPlayer,
  this.secondPlayer = secondPlayer,
  this.player1Score = player1Score,
  this.player2Score = player2Score
}

function rollDice1() {
  return Math.floor((Math.random() * 6 + 1));

}



mainPVP.prototype.playerRoll = function(roll, player, currentPlayer) {
  if (player == 0){
    if(roll == 1){
      currentPlayer.player1Score = 0;
      $("#leftScore").text(currentPlayer.player1Score)
      leftHold();
      $(".side").css("background-color", color2);
    }else if(roll != 1){
      var score = currentPlayer.player1Score;
      currentPlayer.player1Score = score + roll;
      score = currentPlayer.player1Score;
      $("#leftScore").text(currentPlayer.player1Score);
    }
  }
  if (player == 1){
    if(roll == 1){
      currentPlayer.player2Score = 0;
      $("#rightScore").text(currentPlayer.player2Score)
      rightHold();
      $(".side").css("background-color", color1);
    }else if(roll != 1){
      var score = currentPlayer.player2Score;
      currentPlayer.player2Score = score + roll;
      score = currentPlayer.player2Score;
      $("#rightScore").text(currentPlayer.player2Score);
    }
  }
}



var MainPVP = new mainPVP();



function leftHold() {
  currentPlayer = 1;
  $("#leftHold").hide();
  $("#rightHold").show();
  $(".side").css("background-color", color2);
}

function rightHold() {
  currentPlayer = 0;
  $("#rightHold").hide();
  $("#leftHold").show();
  $(".side").css("background-color", color1);
}


function showPreviousRolls(roll, string) {
  var length = previousRolls.length;
  if(1 == roll) {
    $("#lastRolls").append("<li>" + string + '<img src="img/side1.png" height="60px" width="60px">' + "</li>");
    string = string + ' <img src=img/side1.png height=60px width=60px>';
  }
  if(2 == roll) {
    $("#lastRolls").append("<li>" + string + '<img src="img/side2.png" height="60px" width="60px">' + "</li>");
    string = string + ' <img src=img/side2.png height=60px width=60px>';
  }
  if(3 == roll) {
    $("#lastRolls").append("<li>" + string + '<img src="img/side3.png" height="60px" width="60px">' + "</li>");
    string = string + ' <img src=img/side3.png height=60px width=60px>';

  }
  if(4 == roll) {
    $("#lastRolls").append("<li>" + string + '<img src="img/side4.png" height="60px" width="60px">' + "</li>");
    string = string + ' <img src=img/side4.png height=60px width=60px>';
  }
  if(5 == roll) {
    $("#lastRolls").append("<li>" + string + '<img src="img/side5.png" height="60px" width="60px">' + "</li>");
    string = string + ' <img src=img/side5.png height=60px width=60px>';
  }
  if(6 == roll) {
    $("#lastRolls").append("<li>" + string + '<img src="img/side6.png" height="60px" width="60px">' + "</li>");
    string = string + ' <img src=img/side6.png height=60px width=60px>';
  }
  return string;
}



function removeFirst(array) {

  if(array[0] == "" || array[0] == "undefined") {
    array.splice(0 ,1);
  }
  var newArray;
  for(var i = 0; i < 4; i++) {
    newArray = array.shift();
  }
  array = array.toString();
  for(var a = 0; a < array.length; a++) {
    array = array.replace(",", " ");
  }
  return array;
}


function gamePlay(){

  var stringArray;
  var winScore = 100;
  var player1Score = 0;
  var player2Score = 0;
  var a = 0;
  var currentPlayerInfo = MainPVP.findPlayers(1);
  player1Score = currentPlayerInfo.player1Score;
  player2Score = currentPlayerInfo.player2Score;
  if(player1Score >= winScore || player2Score >= winScore) {

    $("#leftHold").hide();
    $("#rightHold").hide();
    $("#rollButton").hide();
  }
  if (player1Score < winScore && player2Score < winScore) {
    if(a == 6) {
      a = 0;
    }
    if(currentPlayer == 0) {
      $("#lastRolls").text("");
      var diceRoll = rollDice1();
      pointRoll(diceRoll);
      $("#diceRoll").text(diceRoll);
      MainPVP.playerRoll(diceRoll, currentPlayer, currentPlayerInfo);
      string = showPreviousRolls(diceRoll, string);
      var stringArray = string.split(" ");
      var length = stringArray.length
      if (stringArray.length > 23) {
        string = removeFirst(stringArray);
      }



      a++;


    }else if(currentPlayer == 1) {
      $("#lastRolls").text("");
      var diceRoll = rollDice1();
      pointRoll(diceRoll);
      $("#diceRoll").text(diceRoll);
      MainPVP.playerRoll(diceRoll, currentPlayer, currentPlayerInfo);
      string = showPreviousRolls(diceRoll, string);
      var stringArray = string.split(" ");
      var length = stringArray.length;
      if (stringArray.length > 23) {
        string = removeFirst(stringArray);
      }
      a++;

    }
  }
  player1Score = currentPlayerInfo.player1Score;
  player2Score = currentPlayerInfo.player2Score;
  if(player1Score >= winScore || player2Score >= winScore) {
    $("#leftHold").hide();
    $("#rightHold").hide();
    $("#rollButton").hide();
  }

}

function pointRoll(diceOne) {
  for (var i = 1; i <= 6; i++) {
    firstDice.classList.remove('show-' + i);
    if (diceOne === i) {
      firstDice.classList.add('show-' + i);
    }
  }
}


// All Code below is experimental!!


function mainPVAI() {
  this.playerArray = [];
  this.currentId2 = 0;
}

mainPVAI.prototype.findPlayer = function(id) {
  for (var i = 0; i < this.playerArray.length; i++) {
    if (this.playerArray[i]) {
      if (this.playerArray[i].id == id) {
        return this.playerArray[i];
      }
    }
  };
  return false;
}

mainPVAI.prototype.PVAI = function(player) {
  player.id = this.assignId2();
  this.playerArray.push(player);
}


function addPlayer(firstPlayer, difficulty, firstPlayerScore, aiPlayerScore) {
  this.player = firstPlayer,
  this.difficulty = difficulty,
  this.firstPlayerScore = firstPlayerScore,
  this.aiPlayerScore = aiPlayerScore
}


mainPVAI.prototype.updateScore = function(score, player) {
  if (player == 0) {
    this.playerArray.player1Score = score;
  }
  if (player == 1) {
    this.playerArray.player2Score = score;
  }
}

mainPVAI.prototype.assignId2 = function() {
  this.currentId2 += 1;
  return this.currentId2;
}





mainPVAI.prototype.playerRoll = function(roll, player, currentPlayer) {
  if (player == 0){
    if(roll == 1){
      currentPlayer.firstPlayerScore = 0;
      $("#leftScore2").text(currentPlayer.firstPlayerScore);
      $("#leftHold2").hide();
      $("#rollButton2").hide();
      setTimeout("leftHold2()", 4000);
      $("#aiResponses").append("<li class='list'>" + "HA! HA!" + "</li>");
      responses = responses + 1;
    }else if(roll != 1){
      var score = currentPlayer.firstPlayerScore;
      currentPlayer.firstPlayerScore = score + roll;
      score = currentPlayer.firstPlayerScore;
      $("#leftScore2").text(currentPlayer.firstPlayerScore);
    }
  }
  if (player == 1){
    if(roll == 1){
      currentPlayer.aiPlayerScore = 0;
      $("#rightScore2").text(currentPlayer.aiPlayerScore)
      responses = responses + 1;
      easyCount = 0;
      mediumCount = 0;
      hardCount = 0;
      currentPlayer2 = 0;
      $("#rollButton2").hide();
      $("#leftHold2").hide();
      setTimeout("rightHold2()", 4000);
      $("#aiResponses").append("<li class='list'>" + "Darn! It's Your Turn!" + "</li>");

    }else if(roll != 1){
      var score = currentPlayer.aiPlayerScore;
      currentPlayer.aiPlayerScore = score + roll;
      score = currentPlayer.aiPlayerScore;
      $("#rightScore2").text(currentPlayer.aiPlayerScore);
    }
  }
}






function pvaiMenu() {
  $("#menu").toggle();
  $("#pvaiMenu").toggle();

}


function pointRoll2(diceOne) {
  for (var i = 1; i <= 6; i++) {
    secondDice.classList.remove('show-' + i);
    if (diceOne === i) {
      secondDice.classList.add('show-' + i);
    }
  }
}





function leftHold2() {
  var currentPlayerInfo2 = MainPVAI.findPlayer(1);
  currentPlayer2 = 1;
  $("#leftHold2").hide();
  $("#rollButton2").hide();
  $(".side").css("background-color", colorAI);
}

function showHold2() {
  if(currentPlayer2 == 0 && gameOver == "false") {
    $("#leftHold2").show();
    $("#rollButton2").show();
  }
}

function rightHold2() {
  currentPlayer2 = 0;
  $("#rollButton2").show();
  $("#leftHold2").show();
  $(".side").css("background-color", color);
}

function showPreviousRolls2(roll, string2) {

  var length = previousRolls.length;
  if(1 == roll) {
    $("#lastRolls2").append("<li>" + string2 + ' <img src="img/side1.png" height="60px" width="60px"' + "</li>");
    string2 = string2 + ' <img src=img/side1.png height=60px width=60px>';
    numbersArray.push("1");
  }
  if(2 == roll) {
    $("#lastRolls2").append("<li>" + string2 + ' <img src="img/side2.png" height="60px" width="60px">' + "</li>");
    string2 = string2 + ' <img src=img/side2.png height=60px width=60px>';
    numbersArray.push("2");
  }
  if(3 == roll) {
    $("#lastRolls2").append("<li>" + string2 + ' <img src="img/side3.png" height="60px" width="60px">' + "</li>");
    string2 = string2 + ' <img src=img/side3.png height=60px width=60px>';
    numbersArray.push("3");

  }
  if(4 == roll) {
    $("#lastRolls2").append("<li>" + string2 + ' <img src="img/side4.png" height="60px" width="60px">' + "</li>");
    string2 = string2 + ' <img src=img/side4.png height=60px width=60px>';
    numbersArray.push("4");
  }
  if(5 == roll) {
    $("#lastRolls2").append("<li>" + string2 + ' <img src="img/side5.png" height="60px" width="60px">' + "</li>");
    string2 = string2 + ' <img src=img/side5.png height=60px width=60px>';
    numbersArray.push("5");
  }
  if(6 == roll) {
    $("#lastRolls2").append("<li>" + string2 + ' <img src="img/side6.png" height="60px" width="60px">' + "</li>");
    string2 = string2 + ' <img src=img/side6.png height=60px width=60px>';
    numbersArray.push("6");
  }
  return string2;
}

function removeFirst2(array) {

  if(array[0] == "" || array[0] == "undefined") {
    array.splice(0 ,1);
  }
  var newArray;
  for(var i = 0; i < 4; i++) {
    newArray = array.shift();
  }
  array = array.toString();
  for(var a = 0; a < array.length; a++) {
    array = array.replace(",", " ");
  }
  return array;
}


var MainPVAI = new mainPVAI();



function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}




function numberOfOnes() {
  var length = numbersArray.length;
  var iNum = 0;
  var otherNum = 0;
  var iPercentage = 0;
  for(var i = 0; i < length; i++) {
    var integer = numbersArray[i];
    if(integer == "1") {
      iNum = iNum + 1;
    }
    else {
      otherNum = otherNum + 1;
    }
  }
  iPercentage = (iNum / otherNum);
  return iPercentage;

}


let timerId = setTimeout(function tick() {
  console.log('tick');
  timerId = setTimeout(tick, 5000); // (*)
  easy();
  medium();
}, 2000);



function difference(player1Score, aiScore) {
  if(player1Score > aiScore) {
    return aiScore - player1Score;
  }
  if(player1Score < aiScore) {
    return aiScore - player1Score;
  }

}

function aiAlmost(aiScore) {
  return winScore - aiScore;

}

function playerAlmost(player1Score) {
  return winScore - player1Score;
}


function randomTo() {
  var randomized = Math.floor((Math.random() * 100 + 1));
  return randomized;
}
function randomStart() {
  var randomized = Math.floor((Math.random() * 4 + 1));
  return randomized;
}
function randomGo() {
  var randomized = Math.floor((Math.random() * 11 + 6));
  return randomized;
}

// gamePlayAi();
// rightHold2();

// 1/6 = 16.666667%

function medium() {
  var currentPlayerInfo2 = MainPVAI.findPlayer(1);
  var player1Score = currentPlayerInfo2.firstPlayerScore;
  var aiScore = currentPlayerInfo2.aiPlayerScore;
  var percentage = numberOfOnes();
  var playerToWin = playerAlmost(player1Score);
  var aiToWin = aiAlmost(aiScore);
  var space = difference(player1Score, aiScore);
  var random = randomTo();
  var randomSt = randomStart();
  var scoreToGo = randomGo();
  console.log("Percentage: " + percentage);
  console.log("Player to win: " + playerToWin);
  console.log("AI to Win: " + aiToWin);
  console.log("Difference: " + space);
  console.log("Random Int: " + random);
  console.log("Random Start: " + randomSt);


  if(currentPlayer2 == 1 && currentPlayerInfo2.difficulty == "Medium" && gameOver == "false"){
    if(numbersArray.length > randomSt || playerToWin < 20) {


      if(aiScore < scoreToGo) {
        if(percentage < 4) {
          if(random > 8) {
            gamePlayAi();
          } else {
            rightHold2();
          }
        } else {
          if(random > 20) {
            gamePlayAi();
          } else {
            rightHold2();
          }
        }
      } else if (aiScore <= player1Score) {
        debugger;
        if(playerToWin < 20) {
          if(percentage > 17.5) {
            if(random < 98) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }else if(percentage <= 17.5 && percentage > 17)  {
            if(random < 90) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 17 && percentage > 16.0) {
            if(random < 80) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 16.0) {
            if(random < 70) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }
        }else if(playerToWin >= 20 && playerToWin < 30) {
          if(percentage > 17) {
            if(random < 95) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }else if(percentage <= 17 && percentage > 16)  {
            if(random < 85) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 16 && percentage > 14) {
            if(random < 75) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 14) {
            if(random < 65) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }

        } else {
          if(percentage > 17) {
            if(random < 80) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }else if(percentage <= 17 && percentage > 15)  {
            if(random < 70) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 15 && percentage > 13) {
            if(random < 65) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 13) {
            if(random < 65) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }



        }


      } else if (aiScore > player1Score){
        debugger;
        if(aiToWin < 20) {
          if(percentage > 15) {
            if(random < 65) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }else if(percentage <= 15 && percentage > 13)  {
            if(random < 70) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 12 && percentage > 9) {
            if(random < 60) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage < 9) {
            if(random < 55) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }
        }else if(aiToWin >= 20 && aiToWin < 30) {
          if(percentage > 13) {
            if(random > 25) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }else if(percentage <= 13 && percentage > 12)  {
            if(random > 35) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 12 && percentage > 11) {
            if(random > 64) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 11) {
            if(random > 75) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }

        } else {
          if(percentage > 13) {
            if(random < 80) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }else if(percentage <= 13 && percentage > 10)  {
            if(random < 70) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 10 && percentage > 8) {
            if(random < 50) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          } else if(percentage <= 8) {
            if(random < 35) {
              gamePlayAi();
            } else {
              rightHold2();
            }
          }

        }


      }

    } else {
      gamePlayAi();
    }



    }


  if(responses > 12) {
    $('#aiResponses li').first().remove();
    responses = responses - 1;
  }
  if(responses > 15) {
    $('#aiResponses li').first().remove();
    responses = responses - 1;
  }
}






function easy() {
  var currentPlayerInfo2 = MainPVAI.findPlayer(1);
  if(currentPlayer2 == 1 && currentPlayerInfo2.difficulty == "Easy" && gameOver == "false") {
    if(easyCount == 0) {
      easyCount = easyCount + 1;
      $("#aiResponses").append("<li class='list'>" + "Rolling!" + "</li>");
      gamePlayAi();
      responses = responses + 1;
    }else {
      easyCount = 0;
      $("#aiResponses").append("<li class='list'>" + "Holding! Your turn!" + "</li>");
      rightHold2();
      responses = responses + 1;
    }
    if(responses > 12) {
      $('#aiResponses li').first().remove();
      responses = responses - 1;
    }
    if(responses > 15) {
      $('#aiResponses li').first().remove();
      responses = responses - 1;
    }
  }
}
















function gamePlayAi() {

  var stringArray2;
  winScore = 50;
  var aiPlayerScore = 0;
  var firstPlayerScore = 0;
  var a = 0;
  var currentPlayerInfo2 = MainPVAI.findPlayer(1);
  player1Score = currentPlayerInfo2.firstPlayerScore;
  aiScore = currentPlayerInfo2.aiPlayerScore;
  if(player1Score >= winScore || aiScore >= winScore) {

    $("#leftHold2").hide();
    $("#rightHold2").hide();
    $("#rollButton2").hide();
  }
  if (player1Score < winScore && aiScore < winScore) {
    if(a == 6) {
      a = 0;
    }
    if(currentPlayer2 == 0) {
      $("#leftHold2").hide();
      $("#rollButton2").hide();
      setTimeout("showHold2()", 4100);
      $("#lastRolls2").text("");
      var diceRoll = rollDice1();
      pointRoll2(diceRoll);
      $("#diceRoll2").text(diceRoll);
      MainPVAI.playerRoll(diceRoll, currentPlayer2, currentPlayerInfo2);
      string2 = showPreviousRolls2(diceRoll, string2);
      var stringArray2 = string2.split(" ");
      var length = stringArray2.length
      if (stringArray2.length > 23) {
        string2 = removeFirst2(stringArray2);
      }
      a++;
    } else if(currentPlayer2 == 1) {
      $("#lastRolls2").text("");
      var diceRoll = rollDice1();
      pointRoll2(diceRoll);
      $("#diceRoll2").text(diceRoll);
      MainPVAI.playerRoll(diceRoll, currentPlayer2, currentPlayerInfo2);
      string2 = showPreviousRolls2(diceRoll, string2);
      var stringArray2 = string2.split(" ");
      var length = stringArray2.length;
      if (stringArray2.length > 23) {
        string2 = removeFirst2(stringArray2);
      }
      a++;

    }
  }
  player1Score = currentPlayerInfo2.firstPlayerScore;
  aiScore = currentPlayerInfo2.aiPlayerScore;
  if(player1Score >= winScore || aiScore >= winScore) {
    $("#leftHold2").hide();
    $("#rightHold2").hide();
    $("#rollButton2").hide();
    gameOver = "true";
    if(aiScore >= winScore) {
      $("#aiResponses").append("<li class='list'>" + "HA! HA! I won the Game!" + "</li>");
      $("#whoWon").text("The AI Player has Won the Game. Better luck next Time!");
    }
    if(player1Score >= winScore) {
      $("#aiResponses").append("<li class='list'>" + "Good Game!" + "</li>");
      $("#whoWon").text("You defeated the AI Player and Won the Game!");
    }
  }
}



$(document).ready(function() {
  $("form#playerNames").submit(function(event) {
    event.preventDefault();
    var player1Score = 0;
    var player2Score = 0;
    var player1 = $("input#players1").val();
    var player2 = $("input#players2").val();
    color1 = $("#color1").val();
    color2 = $("#color2").val();
    $(".side").css("background-color",color1);
    $("#leftPlayer").css("color", color1);
    $("#rightPlayer").css("color", color2);
    $("#pvpMenu").toggle();
    $("#game").toggle();
    $("#leftPlayer").text(player1);
    $("#rightPlayer").text(player2);
    var players = new addPlayers(player1, player2, player1Score, player2Score);
    $("#leftHold").show();

    MainPVP.PVP(players);

  });
  $("form#playerName").submit(function(event) {
    event.preventDefault();
    var player = $("input#player1").val();
    color = $("#singlePlayerColor").val();
    console.log(color);
    var difficulty = $("#difficulty").val();
    var aiPlayer = difficulty + "AI";
    var playerScore = 0;
    var aiPlayerScore = 0;
    $("#pvaiMenu").toggle();
    $("#rightPlayer").text(player);
    $("#leftPlayer").text(difficulty + " AI");
    $(".side").css("background-color", color);
    $("#leftPlayer2").css("color", color);
    $("#rightPlayer2").css("color", colorAI);
    $("#pvaiMenu").hide();
    $("#game2").toggle();
    $("#leftPlayer2").text(player);
    $("#rightPlayer2").text(aiPlayer);
    console.log(player, difficulty, playerScore, aiPlayerScore);
    var player = new addPlayer(player, difficulty, playerScore, aiPlayerScore);
    console.log(player);
    $("#leftHold2").show();

    MainPVAI.PVAI(player);

  });
});
