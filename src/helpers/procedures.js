// should contain code for checking whether a move is valid (take in gameState arg)
// include algorithm for animating solution according to standard rules

// check function and animate function will take in an argument which chooses which check or algorithm to call!!!
// arg = 0 is standard Towers of Hanoi

// checks whether a move is valid
export const isValidMove = (procedure, gameState, from, to) => {
	const radius = gameState[from].at(-1);
	const toTower = gameState[to];
	return (toTower.length === 0 || radius < toTower.at(-1)) &&
		procedure === 0 ? true :
		procedure === 1 ? adjacentCheck(gameState, radius, to) : 
		procedure === 2 ? magneticCheck(gameState, radius, to) :
		procedure === 3 ? bicolorCheck(gameState, radius, to) :
		undefined;
}

// check if a move is valid based on standard puzzle rules
const adjacentCheck = (gameState, radius, to) => {

}

// check if a move is valid based on standard puzzle rules
const magneticCheck = (gameState, radius, to) => {

}

// check if a move is valid based on standard puzzle rules
const bicolorCheck = (gameState, radius, to) => {

}

