var Map = [];
var countDiamond = 0;
var levels = [];
var currentLevel = 1;
var Xmap;
var Ymap;
levels[0] =new Level( [
 'W','W','W','W','W','W','W','W','W','W','W','W',
 'W','N','R','G','G','G','W','W','G','G','G','W',
 'W','G','G','R','W','G','G','G','G','G','D','W',
 'W','G','G','G','G','G','G','G','G','G','W','W',
 'W','G','G','G','G','D','G','W','W','G','G','W',
 'W','G','G','G','W','W','G','G','R','W','G','W',
 'W','G','G','G','G','G','G','G','G','G','G','W',
 'W','W','W','W','W','W','W','W','W','W','W','W'], 15000, 8, 12, 35);
 levels[1] =new Level( [
 'W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W',
 'W','N','G','G','G','W','W','N','R','G','G','G','W','W','G','G','G','W',
 'W','G','R','G','G','G','W','W','G','G','G','W','W','G','G','R','W','W',
 'W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W',
 'W','G','G','G','G','G','G','G','G','G','G','G','G','N','R','G','G','W',
 'W','G','G','G','G','G','G','G','G','G','G','D','G','W','W','G','G','W',
 'W','N','G','G','G','G','W','W','G','G','G','W','W','G','G','G','W','W',
 'W','G','R','W','G','W','W','N','R','G','G','G','W','W','G','G','D','W',
 'W','G','G','G','G','G','G','G','G','G','G','W','W','N','R','G','G','W',
 'W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'], 35000, 10, 18, 35);
 levels[2] =new Level( [
 'W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W',
 'W','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','W',
 'W','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','W',
 'W','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','W',
 'W','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','W',
 'W','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','W',
 'W','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','W',
 'W','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','W',
 'W','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','W',
 'W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'], 85000, 10, 18, 35);



function loadMap(level) {
    sizeField = 50 *scale;
    step = sizeField * 0.04;
    MapRow = level.MapRow;
    MapColumn = level.MapColumn;
    countDiamond = 0;
    collectedDiamond = 0 ;
    time = level.time;
    dashRock = [];
    Xmap = 0;
    Ymap = 0;
    if(sizeField == 50) sheet ="Images/man_sheet2.png";
    else sheet = "Images/new_sheet.png";
    tileSheet.src = sheet;
    Miner = new Man(sizeField, sizeField);
    
    for(var i=0; i<level.map.length ; i++) {
    if(level.map[i] == 'G') {Map[i] = new Ground(i);}
        else if(level.map[i] == 'W') {Map[i] = new Wall(i);}
          else if(level.map[i] == 'R') {Map[i] = new Rock(i);}
              else if(level.map[i] == 'D') {Map[i] = new Diamond(i); countDiamond += 1;}
                   else if(level.map[i] == 'N') {Map[i] = new Field(i, 'N');}
    }
}

function drawMap(){
    for( i=0; i<Map.length ; i++){
        Map[i].draw();
    }
}