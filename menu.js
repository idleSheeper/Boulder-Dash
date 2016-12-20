var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

var logo = new Image();
logo.addEventListener('load', startUpMenu(150) , false);
logo.src = "Images/miner.png";

var menuList=['Play', 'Settings' , 'High Scores'];
var settingsMenu = ['600x400' , '900x600' , 'Back'];
var option = 0;
var activeFunction = 0; // 0-main menu, 1-play, 2-setting, 3-high score
var idAction;

var MapRow; //How much rows and columns map's
var MapColumn;
var Miner;
var scale = 1;
var sizeField = 50 * scale;
var step;
var sheet;
var tileSheet = new Image();;

function drawMenu() {
    c.clearRect(0, 0, canvas.width, canvas.height); 
    c.font = 84 * scale + 'px Impact';
    c.textAlign = 'center';
    c.fillStyle = 'yellow';
    c.fillText("Boulder Dash", canvas.width / 2, canvas.height / 5);
    c.font = 24 * scale + 'px Impact';
    c.textAlign = 'right';
    c.fillText('by Damian Borecki', canvas.width * 0.9, canvas.height * 0.3);
    c.drawImage(logo, canvas.width * 0.15, canvas.height * 0.23 , logo.width * 0.5 * scale, logo.height * 0.5 * scale);
}

function drawMainMenu() {
    c.font = 32 * scale + 'px Impact';
    c.textAlign = 'center';
    c.strokeStyle  = 'yellow';
    for(var i = 0; i < menuList.length; i++) {
        if(i != option) c.fillText(menuList[i], canvas.width * 0.74, canvas.height * 0.66 + i *canvas.height * 0.1); 
        else c.strokeText(menuList[i], canvas.width * 0.74, canvas.height * 0.66 + i *canvas.height * 0.1); 
    }
}

function drawSettingsMenu() {
    c.font = 32 * scale + 'px Impact';
    c.textAlign = 'center';
    c.strokeStyle  = 'yellow';
    for(var i = 0; i < settingsMenu.length; i++) {
        if(i != option) c.fillText(settingsMenu[i], canvas.width * 0.74, canvas.height * 0.66 + i * canvas.height * 0.1); 
        else c.strokeText(settingsMenu[i], canvas.width * 0.74, canvas.height * 0.66 + i * canvas.height * 0.1); 
    }
}

function startGame() {
    drawScene();
}

function drawScene() {    
    readKey();
    drawMap();
    Miner.draw();
    colisionDiamond();
    colisionGround();
    colisionRock();
    dashingRock();
    avalanche();
    allDiamond();
    c.textAlign = 'left';
    c.fillText('Time: '+ Math.floor(time/1000) , 30, sizeField * 0.70);
    c.textAlign = 'right';
    c.fillText("Diamond: " + collectedDiamond + "/" + countDiamond, canvas.width - 30, sizeField * 0.7);
    isExit();
    if(time > 0) time -= 20;
    else GameOver('Time over!');
}

function startUpMenu( time) {
    idAction = setInterval(drawActiveFunction, time );
}  

function drawActiveFunction() {
    if(activeFunction == 1) startGame();
    else if(activeFunction == 0) readKeyMenu();
        else if(activeFunction == 2) readKeyMenuSettings();
            else if(activeFunction == 4) GameOver("AVALANCHE!");
                else if(activeFunction == 3) GameSuccess();
                    else if(activeFunction == 5) showHighScores();
                        else if(activeFunction == 6) drawTop();
}

function readKeyMenu() {
    drawMenu(); 
    drawMainMenu()
        if(upPressed) { option = (option + 2) % 3;}
        if(downPressed) { option = (option + 1) % 3;}     
        if(enterPressed) 
        {             
            switch(option)
            {
                case 0:
                    activeFunction =1;
                    clearInterval(idAction); 
                    loadMap(levels[currentLevel]);
                    startUpMenu(20);
               break;
                case 1:
                    activeFunction =2;
               break;
               
            default:
                activeFunction = 5;
            }
                     option = 0;
            }
    } 
    
function readKeyMenuSettings() {
    drawMenu();  
    drawSettingsMenu();
    
    if(upPressed) { option = (option + 2) % 3;}
        else if(downPressed) { option = (option + 1) % 3;}     
        else if(enterPressed) 
        {  
           switch(option)
            {
                case 0:
            canvas.width = 600;
            canvas.height =400;
            scale = 1;
            
               break;
                case 1:
            canvas.width = 900;
            canvas.height = 600;
            scale = 1.5;
               break;
            default:
                activeFunction = 0;
                option = 0;
            }      
    } 
}