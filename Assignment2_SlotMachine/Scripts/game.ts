//INTERNAL DOC
/*Author: Benjamin Vanarragon
 * Last Modified By : Benjamin Vanarragon
 * Date Last Modified: October 16, 2014
 * Description: This is the typescript/javascript file that draws the images onto the cavas element in index.html, this also control the buttons, and event handlers
 * Revision History: Code is finished, haven't needed to revise anything yet.
 */

//declaring variables
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
//declaring images
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
//frame image, drawn over wheels
var frameImg = new Image();
frameImg.src = "images/frame.png";
var frame = new createjs.Bitmap(frameImg);
//x-out button
var closeWindowsImg = new Image();
closeWindowsImg.src = "images/close.png";
var closeWindows = new createjs.Bitmap(closeWindowsImg);
//cancel sign hovers over slot machine
var quit = new Image();
quit.src = "images/quitHover.png";
var quitHover = new createjs.Bitmap(quit);

//initializing audio files
var win = new Audio();
win.src = "sounds/slutmahines3.wav";
var backgroundNoise = new Audio();
backgroundNoise.src = "sounds/backgroundNoise.mp3";
backgroundNoise.volume = 0.4;
var buttonNoise = new Audio();
buttonNoise.src = "sounds/button.wav";
var oneCoin = new Audio();
oneCoin.src = "sounds/oneCoin.wav";
var thirtyCoins = new Audio();
thirtyCoins.src = "sounds/30Coins.wav";
var OneHundredCoins = new Audio();
OneHundredCoins.src = "sounds/100Coints.wav";

//initializing text elements for the player stats
var playerMoneyText = new createjs.Text("Player Money: " + playerMoney, "12px Tahoma", "White");
var betAmountText = new createjs.Text("Bet: " + playerBet, "12px Tahoma", "White");
var jackpotAmountText = new createjs.Text("Jackpot: " + jackpot, "12px Tahoma", "White");

//creating the stage that refers to the canvas element in index.html
var stage = new createjs.Stage(document.getElementById("canvas"));

//wheels that the shapes are drawn on
var wheel1;
var wheel2;
var wheel3;

//wheel images
var wheel1Img = new Image();
var wheel2Img = new Image();
var wheel3Img = new Image();
//setting the image sources to refer to the starting image with a "?"
wheel1Img.src = "images/spin.png";
wheel2Img.src = "images/spin.png";
wheel3Img.src = "images/spin.png";
//declaring the wheels array
var wheels = [wheel1 = new createjs.Bitmap(wheel1Img), wheel2 = new createjs.Bitmap(wheel2Img), wheel3 = new createjs.Bitmap(wheel3Img)];

//declaring buttons for slot machine
var spinBtn;
var bet5Btn;
var bet15Btn;
var resetBtn;

//this is the function that loads from the body of our html page
function init() {
    //setting the frames to 60 fps
    createjs.Ticker.setFPS(60);
    //this function draws the slot machine on the canvas
    drawSlotMachine();
    //updating the stage to show the changes so far
    stage.update();
    //this event listener is called every tick
    createjs.Ticker.addEventListener("tick", handleTick);
    //enables me to use mouseover and mouseout eventlisteners
    stage.enableMouseOver(20);
}

//this function is called 60 times a second, and updates the stage so user can see the changes occuring
function handleTick() {
    stage.update();  
}
//this function is called when the website loads, it draws the slot machine and plots the buttons on it, it also plots the fruits, and adds them to the stage
function drawSlotMachine() {
    //background slot machine
    var slotMachineBitmap = new createjs.Bitmap("images/slotMachine.png");
    slotMachineBitmap.scaleX = 0.64;
    slotMachineBitmap.scaleY = 0.64;
    stage.addChild(slotMachineBitmap);
    
    //spin button
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

    //bet 15 button
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

    //bet 5 button
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

    //reset button
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

    //adding the wheels array with the default wheel images ontop of the slot machine background
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

    //setting the images that were declared at the top of this file to actual images
    grapesImg.src = "images/grapes.png";
    bananasImg.src = "images/bananas.png";
    orangesImg.src = "images/oranges.png";
    cherriesImg.src = "images/cherries.png";
    barsImg.src = "images/bars.png";
    bellsImg.src = "images/bells.png";
    sevensImg.src = "images/sevens.png";
    blanksImg.src = "images/blanks.png";
    
    //this is put on the slot machine after the wheel images are drawn on the canvas so they don't overlap the borders   
    stage.addChild(frame);
    frame.scaleX = .64;
    frame.scaleY = .64;

    //adds the players money text object
    stage.addChild(playerMoneyText);
    playerMoneyText.x = 130;
    playerMoneyText.y = 573;

    //adds the bet amount text object
    stage.addChild(betAmountText);
    betAmountText.x = 295;
    betAmountText.y = 573;

    //adds the jackpot text object
    stage.addChild(jackpotAmountText);
    jackpotAmountText.x = 390;
    jackpotAmountText.y = 573;

    //adds the big red cancel image
    stage.addChild(quitHover);
    quitHover.x = -1000;
    quitHover.y = -1000;
    quitHover.scaleX = 1.2;
    quitHover.scaleY = 1.2;

    //adds the black x-out image in the top right above the slots, used anonymouse functions here
    stage.addChild(closeWindows);
    closeWindows.x = 500;
    closeWindows.y = 0;
    closeWindows.addEventListener("click", function () { window.close() });
    closeWindows.addEventListener("mouseover", function () { closeWindows.x += 1, closeWindows.y += 1, quitHover.x = 20, quitHover.y = 200 });
    closeWindows.addEventListener("mouseout", function () { closeWindows.x -= 1, closeWindows.y -= 1, quitHover.x = -1000, quitHover.y = -1000  });
    closeWindows.addEventListener("mousedown", function () { closeWindows.scaleX = 0.8, closeWindows.scaleY = 0.8, closeWindows.x += 10, closeWindows.y += 10  });
    closeWindows.addEventListener("pressup", function () {
    closeWindows.scaleX = 1, closeWindows.scaleY = 1, closeWindows.x -= 10, closeWindows.y -= 10});

    //background ambient noise that loops on the website
    backgroundNoise.addEventListener('ended', function () {
        
        this.currentTime = 0;
        this.play();
    }, false);
    backgroundNoise.play();

}
//Mouse up events, animates the buttons growing back to their original size
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
//Mouse Down Events, animates buttons shrinking when clicked down on
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

//Click Events, perform various tasks
//when user clicks spin, this validates that the user has enough money to make the bet, then calls the Reels function which randomly decided what fruits are picked
function clickHandlerSpin() {
    

    /* When the player clicks the spin button the game kicks off */
    buttonNoise.play();
    playerBet = playerBet;
    //if players money is 0
    if (playerMoney == 0) {
        //resets the game
        clickHandlerReset();
        showPlayerStats();
            
    }
    //if players bet is greater than the amount of money they have
    else if (playerBet > playerMoney) {
        //disable spin button and its event handlers
        spinBtn.alpha = 0.5;
        spinBtn.removeEventListener("click", clickHandlerSpin);
        spinBtn.removeEventListener("mouseover", overHandlerSpinBtn);
        spinBtn.removeEventListener("mouseout", outHandlerSpinBtn);
        spinBtn.removeEventListener("mousedown", downHandlerSpinBtn);
        spinBtn.removeEventListener("pressup", upHandlerSpinBtn);
            alert("You don't have enough Money to place that bet.");
            
    }
    //if player bet is less then or equal to 0, disable spin button and provide error msg
    else if (playerBet <= 0) {
        spinBtn.removeEventListener("click", clickHandlerSpin);
        spinBtn.removeEventListener("mouseover", overHandlerSpinBtn);
        spinBtn.removeEventListener("mouseout", outHandlerSpinBtn);
        spinBtn.removeEventListener("mousedown", downHandlerSpinBtn);
        spinBtn.removeEventListener("pressup", upHandlerSpinBtn);
        spinBtn.alpha = 0.5;
        alert("All bets must be greater than 0");
    }
    //if player bet is valid
    else if (playerBet <= playerMoney) {
        spinBtn.alpha = 1;
            //call reels function, and store it in spinResult
            spinResult = Reels();
            fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
            $("div#result>p").text(fruits);
            determineWinnings();
            turn++;
            showPlayerStats();
            playerMoneyText.text = "Player Money: " + playerMoney;
            //playerMoney = playerMoney - playerBet + winnings;
            jackpotAmountText.text = "Jackpot: " + jackpot;
            //after the images are drawn on, draw the frame to prevent border overlaps
            stage.addChild(frame);
            frame.scaleX = .64;
            frame.scaleY = .64;

    }
        //general error
        else {
            alert("Please enter a valid bet amount");
        }

}

//when user clicks the bet 15 btn, it plays a noise, sets the playerBet value, and changes the playerbet text value, and if its a valid bet amount re-enable spinBtn
function clickHandlerBet15() {
    playerBet = 15;
    buttonNoise.play();
    betAmountText.text = "Bet: " + playerBet;
    if (playerBet <= playerMoney) {
        spinBtn.addEventListener("click", clickHandlerSpin);
        spinBtn.addEventListener("mouseover", overHandlerSpinBtn);
        spinBtn.addEventListener("mouseout", outHandlerSpinBtn);
        spinBtn.addEventListener("mousedown", downHandlerSpinBtn);
        spinBtn.addEventListener("pressup", upHandlerSpinBtn);
        spinBtn.alpha = 1;
    }
    else {
        spinBtn.alpha = 0.5;
    }
    
}
//when user clicks the bet 5 btn, it plays a noise, sets the playerBet value, and changes the playerbet text value, and if its a valid bet amount re-enable spinBtn
function clickHandlerBet5() {
    playerBet = 5;
    buttonNoise.play();
    betAmountText.text = "Bet: " + playerBet;
    if (playerBet <= playerMoney) {
        spinBtn.addEventListener("click", clickHandlerSpin);
        spinBtn.addEventListener("mouseover", overHandlerSpinBtn);
        spinBtn.addEventListener("mouseout", outHandlerSpinBtn);
        spinBtn.addEventListener("mousedown", downHandlerSpinBtn);
        spinBtn.addEventListener("pressup", upHandlerSpinBtn);
        spinBtn.alpha = 1;
    }
    else {
        spinBtn.alpha = 0.5;
    }
}
    
//resets the game to original values, and resets text objects, and wheel images to default images, and calls the drawSlotMachine function again
function clickHandlerReset() {
    buttonNoise.play();
    if (confirm("The game will now reset.")) {
        playerBet = 0;
        playerMoney = 1000;
        jackpot = 5000;
        wheels[0].image = wheel1Img;
        wheels[1].image = wheel2Img;
        wheels[2].image = wheel3Img;
        
        playerMoneyText.text = "Player Money: " + playerMoney;
        betAmountText.text = "Bet: " + playerBet;
        jackpotAmountText.text = "Jackpot: " + jackpot;

        drawSlotMachine();
    }
    
}


//Mouse Over handlers, animate a btn jump when user hovers over button
function overHandlerBet15() {

    bet15Btn.x += 1;
    bet15Btn.y += 1;
}

function overHandlerBet5() {
    bet5Btn.x += 1;
    bet5Btn.y += 1;
}
function overHandlerSpinBtn() {
    spinBtn.x += 1;
    spinBtn.y += 1;
}
function overHandlerResetBtn() {
    resetBtn.x += 1;
    resetBtn.y += 1;
}

//Mouse Out, puts button back to original position when user stops hovering over button
function outHandlerBet15() {
    bet15Btn.x -= 1;
    bet15Btn.y -= 1;
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

/* When this function is called it determines the wheels images results and draws them onto the canvas element
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                //checks what spin value is and places the correct image on the correct wheel, ex: if spin is 2 places it on 2nd wheel etc.
                if (spin == 0) {
                    wheels[spin].x = 190; wheels[spin].y = 420;
                }
                else if (spin == 1) {
                    wheels[spin].x = 285; wheels[spin].y = 420;
                }
                else if (spin == 2) {
                    wheels[spin].x = 375; wheels[spin].y = 420;
                }

                //sets the wheels image to blank image in this instance, below are all the other options, same code
                wheels[spin].image = blanksImg;
                //position it correctly according to blankImg size
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



