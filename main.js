
var board = new Array();
var score = 0;

$(document).ready(function(){
	newgame();
});

$(document).ready(function(event){
	switch(event.keyCode) {
		case 38: // up
			if( moveUp() ) {
				generateOneNumber();
				if( isgameover() ) gameover();
			}
			break;
		case 40: // down
			if( moveDown() ) {
				generateOneNumber();
				if( isgameover() ) gameover();
			}
			break;
		case 37: //left
			if( moveLeft() ) {
				generateOneNumber();
				if( isgameover() ) gameover();
			}
			break;
		case 39: //right
			if( moveRight() ) {
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
	for (var i = 0; i < 4; i++) {
		for(var j=0; j < 4; j++) {
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}

	// 初始化board
	for(var i = 0 ; i < 4 ; i++){
        board[i] = new Array();
        for( var j = 0 ; j < 4 ; j++){
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
		if( board[randx][randy] == 0 ) break;
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

			if( board[i][j] == 0 ) {
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







