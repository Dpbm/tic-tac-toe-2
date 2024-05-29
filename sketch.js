const barPadding = 10;
let barHeight = 0;
let barWidth = 0;
let end = false;



let order = {
  O: {
    index: 0,
    positions: []
  },
  X: {
    index: 0,
    positions: []
  }
};

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let actualPlayer = 'O';

function setup() {
  createCanvas(400, 400);
  barHeight = parseInt(height/3);
  barWidth = parseInt(width/3);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  stroke(255, 0, 0);
  drawBoard();
}

function drawBoard(){
    line(barPadding, barHeight, width-barPadding, barHeight);
    line(barPadding, barHeight*2, width-barPadding, barHeight*2);
  
    line(barWidth, barPadding, barWidth, height-barPadding);
    line(barWidth*2, barPadding, barWidth*2, height-barPadding);
  
  
    for (let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        const value = board[i][j];
        if(value == '')
          continue;
          
        
        let x = j*(barWidth) + (barWidth/2) - 15;
        let y = i*(barHeight) + (barHeight/2) + 15;
        
        textSize(40);
        text(value, x,y);
      }
    }
}

function mouseClicked() {
  if(end) return;
  
  let i = Math.trunc(mouseY/barHeight);
  let j = Math.trunc(mouseX/barWidth);
  
  if(board[i][j] != '')
    return;
  
  const ord = order[actualPlayer];
  if(ord.positions.length == 3){
    let r = ord.positions[ord.index];
    board[r[0]][r[1]] = '';
    ord.positions[ord.index] = [i, j];
    
    if(ord.index == 2)
      ord.index = 0;
    else
      ord.index++;
    
  }else{
    ord.positions.push([i, j]);
  }

  board[i][j] = actualPlayer;
  
  switchPlayer();
  gameOver();
}

function switchPlayer(){
  switch(actualPlayer){
    case 'X':
      actualPlayer = 'O';
      break;
    case 'O':
      actualPlayer = 'X';
      break;
    default:
      break;
  }
}

function gameOver(){
  
  
  for(let i of board){
    const row = i.join("");
    if(row == 'OOO' || row == "XXX"){
      console.log(`${row[0]} wins!`);
      end = true;
    }
  }
  
  for(let j = 0; j < 3; j++){
    let column = "";
    for(let i = 0; i < 3; i++){
      column += board[i][j];
    }
    
    if(column == 'OOO' || column == "XXX"){
      console.log(`${column[0]} wins!`);
      end = true;
    }
  }
  
  let diagonal = '';
  let secondDiagonal = '';
  for(let i = 0; i < 3; i++){
    diagonal += board[i][i];
    secondDiagonal += board[i][2-i];
  }
   
  if(diagonal == 'OOO' || diagonal == "XXX"){
    console.log(`${diagonal[0]} wins!`);
    end = true;
  }
  
  if(secondDiagonal == 'OOO' || secondDiagonal == "XXX"){
    console.log(`${secondDiagonal[0]} wins!`);
    end = true;
  }
  
  
  
}
