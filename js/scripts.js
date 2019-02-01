var elDiceOne       = document.getElementById('dice1');
var elDiceTwo       = document.getElementById('dice2');
var elComeOut       = document.getElementById('comeOutButton');
var elPointRoll     = document.getElementById('rollButton');
var elPointRoll2 = document.getElementById("rollButton2");


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

var color1;
var color2;

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
var currentPlayer = 0;


var MainPVP = new mainPVP();
var MainPVAI = new mainPVAI()


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

var previousRolls = [];
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

var string = [];
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
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }
}


// All Code below is experimental!!













  //POINT ROLL FUNCTION
  function pointRoll2(diceOne) {

  // sets dice variables
  // var diceTwo   = Math.floor((Math.random() * 6) + 1);

  //Dice reset and display

  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }
  }












  function mainPVAI() {
    this.playerArray = [];
    this.currentId = 0;
  }



  mainPVAI.prototype.findPlayers = function(id) {
    for (var i = 0; i < this.playersArray.length; i++) {
      if (this.playersArray[i]) {
        if (this.playersArray[i].id == id) {
          return this.playersArray[i];
        }
      }
    };
    return false;
  }












  mainPVAI.prototype.updateScore = function(score, player) {
    if (player == 0) {
      this.playersArray.player1Score = score;
    }
    if (player == 1) {
      this.playersArray.player2Score = score;
    }
  }




  mainPVAI.prototype.PVAI = function(players) {
    players.id = this.assignId2();
    this.playerArray.push(players);


  }






  mainPVAI.prototype.assignId2 = function() {
    this.currentId += 1;
    return this.currentId;
  }







  function pvaiMenu() {
    $("#menu").toggle();
    $("#pvaiMenu").toggle();

  }









  function addPlayer(firstPlayer, difficulty, firstPlayerScore, aiPlayerScore) {
    this.firstPlayer = firstPlayer,
    this.difficulty = difficulty,
    this.firstPlayerScore = firstPlayerScore,
    this.aiPlayerScore = aiPlayerScore

  }



  var color;
  var colorAI = "Blue";






































  function leftHold2() {
    currentPlayer = 1;
    $("#leftHold2").hide();
    $("#rightHold2").show();
    $(".side").css("background-color", colorAI);
  }

  function rightHold2() {
    currentPlayer = 0;
    $("#rightHold2").hide();
    $("#leftHold2").show();
    $(".side").css("background-color", color);
  }

  var previousRolls2 = [];
  function showPreviousRolls2(roll, string) {
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


















  function gamePlayAi(){

    var stringArray;
    var winScore = 30;
    var player1Score = 0;
    var AiScore = 0;
    var a = 0;
    var currentPlayerInfo = MainPVP.findPlayers(1);
    player1Score = currentPlayerInfo.firstPlayerScore;
    player2Score = currentPlayerInfo.aiPlayerScore;
    if(player1Score >= winScore || player2Score >= winScore) {

      $("#leftHold2").hide();
      $("#rightHold2").hide();
      $("#rollButton2").hide();
    }
    if (player1Score < winScore && player2Score < winScore) {
      if(a == 6) {
        a = 0;
      }
      if(currentPlayer == 0) {
        $("#lastRolls2").text("");
        var diceRoll = rollDice1();
        pointRoll(diceRoll);
        $("#diceRoll2").text(diceRoll);
        MainPVAI.playerRoll(diceRoll, currentPlayer, currentPlayerInfo);
        string = showPreviousRolls2(diceRoll, string);
        var stringArray = string.split(" ");
        var length = stringArray.length
        if (stringArray.length > 23) {
          string = removeFirst2(stringArray);
        }
        a++;
      }else if(currentPlayer == 1) {
        $("#lastRolls").text("");
        var diceRoll = rollDice1();
        pointRoll(diceRoll);
        $("#diceRoll2").text(diceRoll);
        MainPVAI.playerRoll(diceRoll, currentPlayer, currentPlayerInfo);
        string = showPreviousRolls2(diceRoll, string);
        var stringArray = string.split(" ");
        var length = stringArray.length;
        if (stringArray.length > 23) {
          string = removeFirst2(stringArray);
        }
        a++;

      }
    }
    player1Score = currentPlayerInfo.player1Score;
    player2Score = currentPlayerInfo.player2Score;
    if(player1Score >= winScore || player2Score >= winScore) {
      $("#leftHold2").hide();
      $("#rightHold2").hide();
      $("#rollButton2").hide();
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
  $("form#playerName").submit(function(evnet) {
    event.preventDefault();
    var player = $("input#player1").val();
    color = $("#singlePlayerColor").val();
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
    $("#pvaiMenu").toggle();
    $("#game2").toggle();
    $("#leftPlayer2").text(player);
    $("#rightPlayer2").text(aiPlayer);
    var player = new addPlayer(player, difficulty, playerScore, aiPlayerScore);
    $("#leftHold2").show();

    MainPVAI.PVAI(player);



  });
});
