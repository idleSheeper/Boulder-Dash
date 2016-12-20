var collectedDiamond = 0;
var dashRock = [];
var score = 0;
var time;

function colisionDiamond() {
    if(Map[Miner.id].type == 'D') {
        Map[Miner.id] = new Field( Miner.id, 'N');
        collectedDiamond += 1;
        score += 10;
    }
}

function colisionGround() {
    if(Map[Miner.id].type == 'G') 
        Map[Miner.id] = new Field( Miner.id, 'N')
}

function dashingRock() {
    if(Map[Miner.id - MapColumn].whatIs() == 'R')
        dashRock.push(new Rock(Map[Miner.id - MapColumn].id));             
}

function avalanche() {
    for(i=0; i<dashRock.length; i++) {
        r=dashRock[i];
        r.drawFallRock();
        if(r.active == 1) {
            if(r.y % sizeField == 0 ) r.id += MapColumn;
            if( (Map[r.id +MapColumn].whatIs() == 'N') || (r.id + MapColumn == Miner.id)) {
                r.fall();
            }
            else {
            Map[r.id]= new Rock(r.id);
            dashRock.splice(i,1);
            }          
        }
            
        else if((( r.y + 1.5 * sizeField < Miner.y )
            || ( (r.x - sizeField*0.99 > Miner.x) && (Miner.direction == 'l')) 
            || ( (r.x + sizeField*0.99 < Miner.x) && (Miner.direction == 'r')) ) 
            && (Miner.id != r.id + MapColumn)) {
            r.active = 1;
            Map[r.id]= new Field(r.id, 'N');
            if(Map[r.id-MapColumn].whatIs() == 'R') { 
                newRock = new Rock(Map[r.id - MapColumn].id);
                newRock.active = 1;
               dashRock.push(newRock);   
               newRock.fall();
               Map[newRock.id]= new Field(newRock.id, 'N');              
             } 
            r.fall();
        }       
    }   
}

function colisionRock() {
    for(i =0; i < dashRock.length; i++) {
       r = dashRock[i];
       if( (r.active == 1) && ((Miner.x +1>r.x) && (Miner.x < r.x + sizeField)) 
               && ((Miner.y < r.y +sizeField) && (r.y +sizeField < Miner.yEnd)) ) {           
            clearInterval(idAction); 
            activeFunction = 4;
            startUpMenu(20);
        }
    }
}

function allDiamond() {
    if(collectedDiamond == countDiamond) Map[levels[currentLevel].indexExit]= new Exitt(levels[currentLevel].indexExit);
}

function isExit() {
    if(Map[Miner.id].whatIs() == 'E') {  
        score += time ;
        currentLevel += 1;
        clearInterval(idAction); 
        activeFunction = 3;            
        startUpMenu(20);
    }
}

function GameSuccess() {  
        c.clearRect(0,0, canvas.width ,canvas.height);
        c.font = 64 *scale + 'px Impact';
        c.textAlign = 'center';
        c.fillText("Success!", canvas.width / 2, canvas.height / 4);
        c.font = 28 *scale + 'px Impact';
        c.fillText("Your score: "+ score, canvas.width / 2, canvas.height / 2);
        tryAgain("Next level!");
}

function GameOver(text) {
        c.clearRect(0,0, canvas.width ,canvas.height);
        c.font = 64 *scale + 'px Impact';
        c.textAlign = 'center';
        c.fillText(text, canvas.width / 2, canvas.height / 4);
        c.font = 28 *scale + 'px Impact';
        c.fillText("Your score: "+ score, canvas.width / 2, canvas.height *0.4);
        c.fillText("Game over, but...", canvas.width / 2, canvas.height *0.6);       
        tryAgain("Try again?");       
}

function tryAgain(text) {
        c.fillText(text, canvas.width / 2, canvas.height * 0.7);
        c.fillRect(canvas.width/2-sizeField, canvas.height*0.88-sizeField ,2*sizeField , sizeField);
        c.clearRect(canvas.width/2-sizeField*0.9, canvas.height*0.88-sizeField*0.9 ,2*sizeField*0.9 , sizeField*0.8);
        c.fillText("ENTER", canvas.width / 2, canvas.height *0.84);    
        if(enterPressed) {
            clearInterval(idAction); 
            activeFunction = 1;
            loadMap(levels[currentLevel]);
            Miner= new Man(sizeField, sizeField);
            startUpMenu(20);
            score = 0; 
        }
}