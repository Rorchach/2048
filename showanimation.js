function showNumberWithAnimation(i, j, randNumber) {
	
	var numberCell = $('#number-cell-' + i + '-' + j);

	numberCell.css('background-color', getNumberBackgroundColor(randNumber));
	numberCell.css('color', getNumberColor(randNumber));
	numberCell.text( randNumber );

	numberCell.css({
		width: "100px",
		height: "100px",
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	});
}

function showMoveAnimation(fromx, formy, tox, toy) {
	
	var numberCell = $('#number-ceil-' + fromx + '-' + formy);
	
	numberCell.animate({
		top: getPosTop(tox, toy),
		left: getPosLeft(tox, toy)
	}, 200);
}