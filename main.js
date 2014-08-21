
var board = [];
var score = 0;

$(document).ready(function(){
	newgame();
});

$(document).keydown(function(event){
	switch(event.keyCode) {
		case 38: // up
			if( moveUp() ) {
			console.log('up');
				generateOneNumber();
				if( isgameover() ) gameover();
			}
			break;
		case 40: // down
			if( moveDown() ) {
			console.log('down');
				generateOneNumber();
				if( isgameover() ) gameover();
			}
			break;
		case 37: //left
			if( moveLeft() ) {
			console.log('left');
				generateOneNumber();
				if( isgameover() ) gameover();
			}
			break;
		case 39: //right
			if( moveRight() ) {
			console.log('right');
				generateOneNumber();
				if( isgameover() ) gameover();
			}
			break;
		default : break;

	}
	return false;
});

function newgame() {
	$('#gameover').hide();
	// 初始化棋盘格
	init();
	// 随机生成两个各自生成数字
	generateOneNumber();
	generateOneNumber();
}

function init() {
	// 初始化grid-cell
	var i, j;
	for (i = 0; i < 4; i++) {
		for(j=0; j < 4; j++) {
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}

	// 初始化board
	for(i = 0 ; i < 4 ; i++){
        board[i] = [];
        for(j = 0 ; j < 4 ; j++){
            board[i][j] = 0;
        }
    }

	// 更新board视图
	updateBoardView();
}

function generateOneNumber() {
	if( nospace( board ) ) {
		return false;
	}

	var randx = ~~(Math.random() * 4); // ~~ 等于 Math.floor()
	var randy = ~~(Math.random() * 4);
	while(true) {
		if( board[randx][randy] === 0 ) break;
		randx = ~~(Math.random() * 4);
		randy = ~~(Math.random() * 4);
	}

	var randNumber = Math.random() < 0.5 ? 2 : 4;
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
 		
 	console.log(randNumber);

	return true;
}

function updateBoardView() {
	$('.number-cell').remove();
	for(var i=0; i < 4; i++) {
		for(var j=0; j < 4; j++) {
			$('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var theNumbercell = $('#number-cell-' + i + '-' + j);

			if( board[i][j] === 0 ) {
				theNumbercell.css('width', '0px');
				theNumbercell.css('width', '0px');
				theNumbercell.css('top', getPosTop(i, j) + 50);
				theNumbercell.css('left', getPosLeft(i, j) + 50);
			} else {
				theNumbercell.css('width', '100px');
				theNumbercell.css('hide', '100px');
				theNumbercell.css('top', getPosTop(i, j));
				theNumbercell.css('left', getPosLeft(i, j));
				theNumbercell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumbercell.text(board[i][j]);
			}
		}
	}
}

function isgameover() {
	if(canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)) return false;
	return true;
}

function gameover() {
	$('#gameover').show();
}

function moveDown() {

	if(canMoveDown(board)) {
		return true;
	}

}

function moveUp() {

	if(!canMoveUp(board)) {
		return false;
	}

	// move up
	for(var i=1; i < 4; i++) {
		for(var j=0; j < 4; j++) {
			if(board[i][j] !== 0) {
				for(var k=0; k < i; k++) {
					if(board[j][k] === 0 && noBlockVertical(j, k, i, board)) {
						// move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
					} else if (board[i][j] == board[k][j] && noBlockVertical(j, k, i, board)) {
						// move
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
					}
				}
			}
		}
	}

	return true;
}

function moveLeft() {

	if(canMoveLeft(board)) {
		return true;
	}

}

function moveRight() {

	if(canMoveRight(board)) {
		return true;
	}
}




