////////////////////////////////////////
/////////// Nieskończone ///////////////
////////////////////////////////////////

var login10 = ['a', 'b' , 'c' ,'r', 'y', 'j', 'k', 'y', 'j', 'k'];
var scores = [10, 9, 8, 7, 6, 5, 4,3 ,2, 0];
var alfabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','W','X','Y','Z', '.', '-', 'Del'];
var currentLater =0;
var login ='';
score = 0;

function showHighScores() {
 drawAlfabet();
}

function drawTop() {
    c.clearRect(0, 0, canvas.width, canvas.height); 
    c.drawImage(logo, canvas.width *0.10, canvas.height *0.15 , logo.width * 0.5 *scale, logo.height *0.5 *scale);
    c.textAlign = 'center';
    c.fillStyle = 'yellow';
    c.font = 70 * scale + 'px Impact';
    c.fillText('TOP TEN:', canvas.width *0.6, canvas.height *(0.2) ); 
    c.font = 18 * scale + 'px Impact';
    for(i =0; i < scores.length; i++) {
        c.textAlign = 'right';
        c.fillText((i+1)+'.' , canvas.width *0.6, canvas.height *(0.33+i*0.06) );
        c.fillText(login10[i], canvas.width *0.7, canvas.height *(0.33+i*0.06) );
        c.fillText(scores[i], canvas.width *0.8, canvas.height *(0.33+i*0.06) );
    }
}

function checkScore() {
    if(score> scores[9]) {}; 
}
  
function drawAlfabet() {
    c.clearRect(0, 0, canvas.width, canvas.height); 
    c.textAlign = 'left';
    c.fillStyle = 'yellow';
    c.font = 36 *scale +'px Impact';
    c.fillText('Your name:    ' + login, canvas.width * 0.2, canvas.height * (0.2) ); 
    c.textAlign = 'center';
    for(i =0; i < alfabet.length; i++) {
        if(currentLater != i)c.fillText(alfabet[i] , canvas.width *(0.2 +0.1 *(i % 7) ), canvas.height *(0.4 +0.15 *Math.floor(i / 7)) );
        else c.strokeText(alfabet[i] , canvas.width *(0.2 +0.1 *(i % 7) ), canvas.height *(0.4 +0.15 *Math.floor(i / 7)) );
    }

    if(upPressed) currentLater = (currentLater -7 + alfabet.length) % alfabet.length;
    if(downPressed) currentLater = (currentLater +7 + alfabet.length ) % alfabet.length ; 
    if(leftPressed) currentLater = (currentLater -1 + alfabet.length ) % alfabet.length ; 
    if(rightPressed) currentLater =(currentLater +1 + alfabet.length ) % alfabet.length; 
    if(enterPressed) 
        if((login.length < 3) && (currentLater != alfabet.length -1) ) login = login+ alfabet[currentLater] ; 
        else if(currentLater == alfabet.length -1) login = '';
            else if(login.length == 3) {
                for(i =9; i>0; i--) {
                    if(scores[i-1] > score ) {
                         scores[i] =score;
                         var tab = [];
                         tab = tab.concat(scores.slice(0, i+1 ));
                         scores=[];     
                         scores = tab;
                         activeFunction =6;
                         break;
                     }
                }
            }
}