
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var gameover = false;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.
  // 0 1 2
  // 3 4 5
  // 6 7 8
  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    // Above: Horizontal wins
	|| spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
	// Above: Vertical wins
	|| spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
	// Above: Diagonal wins
  )
  {
    console.log('somebody won');
	gameover = true;
	$(document).trigger('game-win', [currentPlayer]);
    // TODO: Trigger 'game-win' event with the winning player as the event data
  }
};
$(document).on('click', '#board .space', function (e) {
	if ( gameover === false ) {
		var spaceNum = $(e.currentTarget).index();
		console.log('You clicked on space #' + spaceNum);

		// Marks the space with the current player's name
		// TODO: Don't mark it unless the space is blank
		if (spaces[spaceNum]) {
			console.log('That space has been played.');
		} else {
			spaces[spaceNum] = currentPlayer;
			// Adds a class to elem so css can take care of the visuals
			$('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
			checkForWinner();
			setNextTurn();
		};
	};
}); 

$(document).on('game-win', function (e, winner) {
	alert( winner +" won!");
});

// Start the game
setNextTurn();
