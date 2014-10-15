var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var grapesImg = new Image();
var bananas = 0;
var bananasImg = new Image();
var oranges = 0;
var orangesImg = new Image();
var cherries = 0;
var cherriesImg = new Image();
var bars = 0;
var barsImg = new Image();
var bells = 0;
var bellsImg = new Image();
var sevens = 0;
var sevensImg = new Image();
var blanks = 0;
var blanksImg = new Image();
var frameImg = new Image();
frameImg.src = "images/frame.png";
var frame = new createjs.Bitmap(frameImg);

var win = new Audio();
win.src = "sounds/slutmahines3.wav";
var backgroundNoise = new Audio();
backgroundNoise.src = "sounds/backgroundNoise.mp3";
backgroundNoise.volume = 0.2;
var buttonNoise = new Audio();
buttonNoise.src = "sounds/button.wav";
var oneCoin = new Audio();
oneCoin.src = "sounds/oneCoin.wav";
var thirtyCoins = new Audio();
thirtyCoins.src = "sounds/30Coins.wav";
var OneHundredCoins = new Audio();
OneHundredCoins.src = "sounds/100Coints.wav";





var bet5BtnClicked = false;
var bet15BtnClicked = false;
var resetBtnClicked = false;
var spinBtnClicked = false;

var playerMoneyText = new createjs.Text("Player Money: " + playerMoney, "12px Tahoma", "White");
var betAmountText = new createjs.Text("Bet: " + playerBet, "12px Tahoma", "White");
var jackpotAmountText = new createjs.Text("Jackpot: " + jackpot, "12px Tahoma", "White");

var stage = new createjs.Stage(document.getElementById("canvas"));

var wheel1;
var wheel2;
var wheel3;

var wheel1Img = new Image();
var wheel2Img = new Image();
var wheel3Img = new Image();

wheel1Img.src = "images/spin.png";
wheel2Img.src = "images/spin.png";
wheel3Img.src = "images/spin.png";


var wheels = [wheel1 = new createjs.Bitmap(wheel1Img), wheel2 = new createjs.Bitmap(wheel2Img), wheel3 = new createjs.Bitmap(wheel3Img)];


var spinBtn;
var bet5Btn;
var bet15Btn;
var resetBtn;

function init() {
    createjs.Ticker.setFPS(60);

    drawSlotMachine();
    stage.update();
    createjs.Ticker.addEventListener("tick", handleTick);
    stage.enableMouseOver(20);
    //draws the slotmachine and buttons
    

}

function handleTick() {
    stage.update();
    
}

function drawSlotMachine() {
    var slotMachineBitmap = new createjs.Bitmap("images/slotMachine.png");
    slotMachineBitmap.scaleX = 0.64;
    slotMachineBitmap.scaleY = 0.64;
    stage.addChild(slotMachineBitmap);


    spinBtn = new createjs.Bitmap("images/spinBtn.png");
    spinBtn.x = 500;
    spinBtn.y = 265;
    spinBtn.scaleX = 0.3;
    spinBtn.scaleY = 0.3;
    spinBtn.addEventListener("click", clickHandlerSpin);
    spinBtn.addEventListener("mouseover", overHandlerSpinBtn);
    spinBtn.addEventListener("mouseout", outHandlerSpinBtn);
    spinBtn.addEventListener("mousedown", downHandlerSpinBtn);
    spinBtn.addEventListener("pressup", upHandlerSpinBtn);
    stage.addChild(spinBtn);

    bet15Btn = new createjs.Bitmap("images/bet15Btn.png");
    bet15Btn.x = 380;
    bet15Btn.y = 635;
    bet15Btn.scaleX = 0.35;
    bet15Btn.scaleY = 0.35;
    bet15Btn.addEventListener("click", clickHandlerBet15);
    bet15Btn.addEventListener("mouseover", overHandlerBet15);
    bet15Btn.addEventListener("mouseout", outHandlerBet15);
    bet15Btn.addEventListener("mousedown", downHandlerBet15);
    bet15Btn.addEventListener("pressup", upHandlerBet15);
    stage.addChild(bet15Btn);

    bet5Btn = new createjs.Bitmap("images/bet5Btn.png");
    bet5Btn.x = 260;
    bet5Btn.y = 635;
    bet5Btn.scaleX = 0.35;
    bet5Btn.scaleY = 0.35;
    bet5Btn.addEventListener("click", clickHandlerBet5);
    bet5Btn.addEventListener("mouseover", overHandlerBet5);
    bet5Btn.addEventListener("mouseout", outHandlerBet5);
    bet5Btn.addEventListener("mousedown", downHandlerBet5);
    bet5Btn.addEventListener("pressup", upHandlerBet5);
    stage.addChild(bet5Btn);

    resetBtn = new createjs.Bitmap("images/resetBtn.png");
    resetBtn.x = 140;
    resetBtn.y = 635;
    resetBtn.scaleX = 0.35;
    resetBtn.scaleY = 0.35;
    resetBtn.addEventListener("click", clickHandlerReset);
    resetBtn.addEventListener("mouseover", overHandlerResetBtn);
    resetBtn.addEventListener("mouseout", outHandlerResetBtn);
    resetBtn.addEventListener("mousedown", downHandlerResetBtn);
    resetBtn.addEventListener("pressup", upHandlerResetBtn);
    stage.addChild(resetBtn);

    stage.addChild(wheels[0]);
    wheels[0].x = 180;
    wheels[0].y = 420;
    wheels[0].scaleX = 0.5;
    wheels[0].scaleY = 0.5;
    stage.addChild(wheels[1]);
    wheels[1].x = 275;
    wheels[1].y = 420;
    wheels[1].scaleX = 0.5;
    wheels[1].scaleY = 0.5;
    stage.addChild(wheels[2]);
    wheels[2].x = 370;
    wheels[2].y = 420;
    wheels[2].scaleX = 0.5;
    wheels[2].scaleY = 0.5;



    grapesImg.src = "images/grapes.png";
    bananasImg.src = "images/bananas.png";
    orangesImg.src = "images/oranges.png";
    cherriesImg.src = "images/cherries.png";
    barsImg.src = "images/bars.png";
    bellsImg.src = "images/bells.png";
    sevensImg.src = "images/sevens.png";
    blanksImg.src = "images/blanks.png";
    

    var grapesTest = new createjs.Bitmap(grapesImg);
    var bananasTest = new createjs.Bitmap(bananasImg);
    var orangesTest = new createjs.Bitmap(orangesImg);
    var cherriesTest = new createjs.Bitmap(cherriesImg);
    var barsTest = new createjs.Bitmap(barsImg);
    var bellsTest = new createjs.Bitmap(bellsImg);
    var sevensTest = new createjs.Bitmap(sevensImg);
    var blanksTest = new createjs.Bitmap(blanksImg);
    
    
    
    stage.addChild(frame);
    frame.scaleX = .64;
    frame.scaleY = .64;

    /*
    stage.addChild(grapesTest);
    grapesTest.x = 190;
    grapesTest.y = 420;
    grapesTest.scaleX = 0.5;
    grapesTest.scaleY = 0.5;
    stage.addChild(bananasTest);
    bananasTest.x = 190;
    bananasTest.y = 420;
    stage.addChild(orangesTest);
    orangesTest.x = 185;
    orangesTest.y = 420;
    orangesTest.scaleX = 0.5;
    orangesTest.scaleY = 0.5;
    stage.addChild(cherriesTest);
    cherriesTest.x = 180;
    cherriesTest.y = 420;
    cherriesTest.scaleX = 0.5;
    cherriesTest.scaleY = 0.5;
    stage.addChild(barsTest);
    barsTest.x = 168;
    barsTest.y = 420;
    stage.addChild(bellsTest);
    bellsTest.x = 180;
    bellsTest.y = 420;
    bellsTest.scaleX = 0.7;
    bellsTest.scaleY = 0.7;
    stage.addChild(sevensTest);
    sevensTest.x = 180;
    sevensTest.y = 420;
    sevensTest.scaleX = 0.5;
    sevensTest.scaleY = 0.5;
    //stage.addChild(blanksTest);
    */

    stage.addChild(playerMoneyText);
    playerMoneyText.x = 130;
    playerMoneyText.y = 573;

    stage.addChild(betAmountText);
    betAmountText.x = 295;
    betAmountText.y = 573;

    stage.addChild(jackpotAmountText);
    jackpotAmountText.x = 390;
    jackpotAmountText.y = 573;

    backgroundNoise.addEventListener('ended', function () {
        
        this.currentTime = 0;
        this.play();
    }, false);
    backgroundNoise.play();

}
//Mouse up events
function upHandlerBet15() {
    bet15Btn.scaleX = 0.35;
    bet15Btn.scaleY = 0.35;
    bet15Btn.x -=5;
    bet15Btn.y -= 5;
    stage.update();
}
function upHandlerBet5() {
    bet5Btn.scaleX = 0.35;
    bet5Btn.scaleY = 0.35;
    bet5Btn.x -= 5;
    bet5Btn.y -= 5;
    stage.update();
}
function upHandlerSpinBtn() {
    spinBtn.scaleX = 0.3;
    spinBtn.scaleY = 0.3;
    spinBtn.x -= 7;
    spinBtn.y -= 8;
    stage.update();
}
function upHandlerResetBtn() {
    resetBtn.scaleX = 0.35;
    resetBtn.scaleY = 0.35;
    resetBtn.x -= 5;
    resetBtn.y -= 5;
    stage.update();
}
//Mouse Down Events
function downHandlerBet15() {
    bet15Btn.scaleX = 0.3;
    bet15Btn.scaleY = 0.3;
    bet15Btn.x = 385;
    bet15Btn.y = 640;
    
    stage.update();
}

function downHandlerBet5() {
    bet5Btn.scaleX = 0.3;
    bet5Btn.scaleY = 0.3;
    bet5Btn.x += 5;
    bet5Btn.y += 5;
    stage.update();
}

function downHandlerSpinBtn() {
    spinBtn.scaleX = 0.25;
    spinBtn.scaleY = 0.25;
    spinBtn.x += 7;
    spinBtn.y += 8;
    stage.update();
}

function downHandlerResetBtn() {
    resetBtn.scaleX = 0.3;
    resetBtn.scaleY = 0.3;
    resetBtn.x += 5;
    resetBtn.y += 5;
    stage.update();
}

//Click Events
function clickHandlerSpin() {
    
    spinBtnClicked = true;
    /* When the player clicks the spin button the game kicks off */
    buttonNoise.play();
        playerBet = playerBet;

        if (playerMoney == 0) {
            if (confirm("You ran out of Money! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();
            }
        }
        else if (playerBet > playerMoney) {
            alert("You don't have enough Money to place that bet.");
        }
        else if (playerBet <= 0) {
            alert("All bets must be greater than 0");
        }
        else if (playerBet <= playerMoney) {
            spinResult = Reels();
            fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
            $("div#result>p").text(fruits);
            determineWinnings();
            turn++;
            showPlayerStats();
            playerMoneyText.text = "Player Money: " + playerMoney;
            //playerMoney = playerMoney - playerBet + winnings;
            jackpotAmountText.text = "Jackpot: " + jackpot;
            stage.addChild(frame);
            frame.scaleX = .64;
            frame.scaleY = .64;

        }
        else {
            alert("Please enter a valid bet amount");
        }

}


function clickHandlerBet15() {
    buttonNoise.play();
    playerBet = 15;
    betAmountText.text = "Bet: " + playerBet;
    bet15BtnClicked = true;
    stage.update();
}

function clickHandlerBet5() {
    buttonNoise.play();
    playerBet = 5;
    betAmountText.text = "Bet: " + playerBet;
    bet5BtnClicked = true;
    stage.update();
}

function clickHandlerReset() {
    buttonNoise.play();
    if (confirm("reset?")) {
        playerBet = 0;
        jackpot = 5000;
        wheels[0].image = wheel1Img;
        wheels[1].image = wheel2Img;
        wheels[2].image = wheel3Img;
        playerMoney = 1000;
        playerMoneyText.text = "Player Money: " + playerMoney;
        betAmountText.text = "Bet: " + playerBet;
        jackpotAmountText.text = "Jackpot: " + jackpot;

        drawSlotMachine();
    }
    
}


//Mouse Over
function overHandlerBet15() {

    bet15Btn.x += 1;
    bet15Btn.y += 1;
    
    stage.update();
}

function overHandlerBet5() {
    bet5Btn.x += 1;
    bet5Btn.y += 1;
    stage.update();
}
function overHandlerSpinBtn() {
    spinBtn.x += 1;
    spinBtn.y += 1;
    stage.update();
}
function overHandlerResetBtn() {
    resetBtn.x += 1;
    resetBtn.y += 1;
    stage.update();
}

//Mouse Out
function outHandlerBet15() {
    bet15Btn.x -= 1;
    bet15Btn.y -= 1;
    stage.update();
    
}

function outHandlerBet5() {
    bet5Btn.x -= 1;
    bet5Btn.y -= 1;
    stage.update();
}

function outHandlerSpinBtn() {
    spinBtn.x -= 1;
    spinBtn.y -= 1;
    stage.update();
}

function outHandlerResetBtn() {
    resetBtn.x -= 1;
    resetBtn.y -= 1;
    stage.update();
}






/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 31 + 1);
    var jackPotWin = Math.floor(Math.random() * 31 + 1);
    if (jackPotTry == jackPotWin) {
        win.play();
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
        
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    if (winnings <= 5) {
        oneCoin.play();
    }
    else if (winnings > 15) {
        thirtyCoins.play();
    }
    else if (winnings > 49) {
        OneHundredCoins.play();
    }
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                if (spin == 0) {
                    wheels[spin].x = 190; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 285; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 375; wheels[spin].y = 420;
                }
                betLine[spin] = "blank";
                wheels[spin].image = blanksImg;
                wheels[spin].x -= 5;
                wheels[spin].y += 5;
                wheels[spin].scaleX = 0.45;
                wheels[spin].scaleY = 0.45;                
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                if (spin == 0) {
                    wheels[spin].x = 190; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 285; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 375; wheels[spin].y = 420;
                }
                betLine[spin] = "Gropes";
                wheels[spin].image = grapesImg;
                wheels[spin].x += 0;
                wheels[spin].y += 0;
                wheels[spin].scaleX = 0.5;
                wheels[spin].scaleY = 0.5;
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                if (spin == 0) {
                    wheels[spin].x = 190; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 285; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 375; wheels[spin].y = 420;
                }
                betLine[spin] = "Bonana";
                wheels[spin].image = bananasImg;
                wheels[spin].x += 0;
                wheels[spin].y += 0;
                wheels[spin].scaleX = 1;
                wheels[spin].scaleY = 1;
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                if (spin == 0) {
                    wheels[spin].x = 190; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 285; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 380; wheels[spin].y = 420;
                }
                betLine[spin] = "Orange";
                wheels[spin].image = orangesImg;
                wheels[spin].x -= 5;
                wheels[spin].y += 0;
                wheels[spin].scaleX = 0.5;
                wheels[spin].scaleY = 0.5;
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                if (spin == 0) {
                    wheels[spin].x = 183; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 280; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 375; wheels[spin].y = 420;
                }
                betLine[spin] = "Cherry";
                wheels[spin].image = cherriesImg;
                wheels[spin].x -= 5;
                wheels[spin].y += 0;
                wheels[spin].scaleX = 0.5;
                wheels[spin].scaleY = 0.5;
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                if (spin == 0) {
                    wheels[spin].x = 190; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 285; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 375; wheels[spin].y = 420;
                }
                betLine[spin] = "Bar";
                wheels[spin].image = barsImg;
                wheels[spin].x -= 15;
                wheels[spin].y += 0;
                wheels[spin].scaleX = 0.9;
                wheels[spin].scaleY = 0.9;
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                if (spin == 0) {
                    wheels[spin].x = 200; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 290; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 385; wheels[spin].y = 420;
                }
                betLine[spin] = "Bell";
                wheels[spin].image = bellsImg;
                wheels[spin].x -= 15;
                wheels[spin].y += 0;
                wheels[spin].scaleX = 0.7;
                wheels[spin].scaleY = 0.7;
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                if (spin == 0) {
                    wheels[spin].x = 197; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 290; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 385; wheels[spin].y = 420;
                }
                betLine[spin] = "Seven";
                wheels[spin].image = sevensImg;
                wheels[spin].x -= 10;
                wheels[spin].y += 0;
                wheels[spin].scaleX = 0.45;
                wheels[spin].scaleY = 0.45;
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}



