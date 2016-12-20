var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var enterPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
    else if(e.keyCode == 13) {
        enterPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
     else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
    else if(e.keyCode == 13) {
        enterPressed = false;
    }
}

var Xmap ;
var Ymap ;

function goto() {
    if( Miner.isGoing() ) {
        if(Miner.direction == 'l') {
            Miner.ModifyMan(-step, 0, 0);
            if((Miner.x > canvas.width *0.5) && (Miner.x < (MapColumn*sizeField - canvas.width*0.5))) Xmap += step;
        }
        else if(Miner.direction == 'r') {
            Miner.ModifyMan(step, 0, 0);
            if((Miner.x > canvas.width*0.5) && (Miner.x < (MapColumn*sizeField - canvas.width*0.5))) Xmap -= step;
        }
        else if(Miner.direction == 'u') {
            Miner.ModifyMan(0, -step, 0);
            if(( Miner.y > canvas.height*0.5) && (Miner.y < (MapRow*sizeField -canvas.height*0.5))) Ymap += step;
        }
        else if(Miner.direction == 'd') {
            Miner.ModifyMan(0, step, 0);   
            if(( Miner.y > canvas.height*0.5) && (Miner.y < (MapRow*sizeField -canvas.height*0.5))) Ymap -= step;
        }
        else Miner.ModifyDirection('0');
    }
}

function readKey() {
    if(rightPressed && (Miner.xEnd < MapColumn*sizeField) && (Map[Miner.id+1].whatIs() != 'W') && (Map[Miner.id+1].whatIs() != "R") && (!Miner.isGoing()) ) {      
        Miner.ModifyDirection('r');
        Miner.ModifyMan(step, 0, 1);
        if((Miner.x > canvas.width*0.5) && (Miner.x < (MapColumn*sizeField - canvas.width*0.5))) 
            Xmap -= step;
    } 
    else if(leftPressed && (Miner.x > 0) && (Map[Miner.id-1].whatIs() != 'W') && (Map[Miner.id-1].whatIs() != "R") && (!Miner.isGoing()) ) {             
        Miner.ModifyDirection('l');
        Miner.ModifyMan(-step, 0, -1);
        if((Miner.x > canvas.width*0.5) && (Miner.x < (MapColumn*sizeField - canvas.width*0.5))) 
            Xmap += step;
    }
    else if(upPressed && (Miner.y > 0) && (Map[Miner.id - MapColumn ].whatIs() != 'W') && (Map[Miner.id-MapColumn].whatIs() != "R") && (!Miner.isGoing())) {      
        Miner.ModifyDirection('u');
        Miner.ModifyMan(0, -step, -MapColumn); 
        if(( Miner.y > canvas.height*0.5) && (Miner.y < (MapRow*sizeField -canvas.height*0.5))) 
            Ymap += step;
    }
    
    else if(downPressed && (Miner.yEnd < MapRow*sizeField) && (Map[Miner.id + MapColumn].whatIs() != 'W') && (Map[Miner.id+ MapColumn].whatIs() != "R") && (!Miner.isGoing())) {      
        Miner.ModifyDirection('d');
        Miner.ModifyMan(0, step, MapColumn);
        if(( Miner.y > canvas.height*0.5) && (Miner.y < (MapRow*sizeField -canvas.height*0.5))) 
            Ymap -= step;
    }
    goto();    
}