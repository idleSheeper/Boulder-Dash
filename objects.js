function Field(id, type) {
  this.id = id;
  this.type = type;
  this.x = (id % MapColumn) * sizeField; 
  this.y = Math.floor( id / MapColumn ) * sizeField; 
  this.picture = 0; 
}

Field.prototype.draw = function() {
    c.drawImage(tileSheet, 0, this.picture * sizeField, sizeField, sizeField, Xmap + this.x, Ymap + this.y, sizeField, sizeField);
};

Field.prototype.whatIs = function() {
    return this.type;
};

function Wall(id) {
  Field.call(this, id, 'W');
  this.picture = 1; 
};
Wall.prototype = Object.create(Field.prototype);
Wall.prototype.constructor = Wall;

function Ground(id) {
  Field.call(this, id, 'G');
  this.picture = 2; 
};

Ground.prototype = Object.create(Field.prototype);
Ground.prototype.constructor = Ground;

function Rock(id) {
  Field.call(this, id, 'R');
  this.picture = 3; 
  this.active =0;
};
Rock.prototype = Object.create(Field.prototype);
Rock.prototype.constructor = Rock;

Field.prototype.draw = function() {
    c.drawImage(tileSheet, 0, 200, sizeField, sizeField, Xmap + this.x, Ymap + this.y, sizeField, sizeField);
    c.drawImage(tileSheet, 0, this.picture * sizeField, sizeField, sizeField, Xmap + this.x, Ymap + this.y, sizeField, sizeField);
};
Rock.prototype.fall = function() {
    this.y += sizeField * 0.02;
};
Rock.prototype.drawFallRock = function() {
    c.drawImage(tileSheet, 0, this.picture * sizeField, sizeField, sizeField, Xmap + this.x, Ymap + this.y, sizeField, sizeField);    
}

function Diamond(id) {
  Field.call(this, id, 'D');
  this.picture = 5; 
};
Diamond.prototype = Object.create(Field.prototype);
Diamond.prototype.constructor = Diamond;
Field.prototype.draw = function() {
    c.drawImage(tileSheet, 0, 0, sizeField, sizeField, Xmap + this.x, Ymap + this.y, sizeField,sizeField);
    c.drawImage(tileSheet, 0, this.picture * sizeField, sizeField, sizeField, Xmap + this.x, Ymap + this.y, sizeField, sizeField);
};

function Man(xstart, ystart) {
  this.x = xstart;
  this.y = ystart;
  this.id = MapColumn +1;
  this.xEnd = this.x + sizeField; 
  this.yEnd = this.y + sizeField; 
  this.direction = '0';
}
Man.prototype.draw = function() {
    c.drawImage(tileSheet, 0, 4 * sizeField, sizeField, sizeField, Xmap + this.x, Ymap + this.y, sizeField, sizeField);
};

Man.prototype.isGoing = function() {
    if(((Miner.x % sizeField != 0) || (Miner.y % sizeField != 0)) && Miner.direction != '0') return true;
    else return false;
};

Man.prototype.ModifyMan = function(x, y, newId) {
  this.x += x;
  this.y += y;
  this.id += newId;
  this.xEnd = this.x + sizeField; 
  this.yEnd = this.y + sizeField; 
};

Man.prototype.ModifyDirection = function(newDirection) {
  this.direction = newDirection;
};

function Exitt(id) {
  Field.call(this, id, 'E');
  this.picture = 6; 
};
Exitt.prototype = Object.create(Field.prototype);
Exitt.prototype.constructor = Exitt;

function Level(map, time, row, col, indexExit) {
    this.map = map;
    this.time = time;
    this.MapRow = row; //How much rows and columns map's
    this.MapColumn = col;
    this.indexExit = indexExit;
}

