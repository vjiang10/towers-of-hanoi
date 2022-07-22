// include algorithm for animating solution according to standard rules

// checks whether a move is valid
export const isValidMove = (gameState, procedure, from, to) => {
	return commonCheck(gameState, from, to) && (
		procedure <= 1 ? true :
		procedure === 2 ? adjacentCheck(from, to) : 
		false
	);
}

// check if a move follows common rule (larger disc cannot be stacked on top of a smaller one)
const commonCheck = (gameState, from, to) => {
	const radius = gameState[from].at(-1);
	const toTower = gameState[to];
	return (
		from !== to && (
			toTower.length === 0 || 
			radius < toTower.at(-1) ||
			radius - toTower.at(-1) < 0.002
		)
	);
}

// check if a move is valid based on adjacent puzzle rules
const adjacentCheck = (from, to) => {
	return Math.abs(to - from) === 1;
}

// checks for winning condition
export const winCondition = (procedure, numDiscs, sourceTower, destTower) => {
	return procedure === 1 ? 
		bicolorWinCondition(numDiscs, sourceTower, destTower) : 
		commonWinCondition(numDiscs, destTower);
}

// checks for common win condition (all discs at destTower)
const commonWinCondition = (numDiscs, destTower) => 
	destTower && destTower.length === numDiscs;

// checks for winning condition based on bicolor puzzle rules
// 1. towers are both monochrome and are at src and dest
// 2. bottom discs need to be switched
const bicolorWinCondition = (numDiscs, sourceTower, destTower) => {
	const patternCheck = () => {
		let isWin = true;
		sourceTower && sourceTower.forEach((radius, index) => {
			const compare = (0.7-0.38*index/(numDiscs-1) - (index%2 ? 0 : 0.01));
			isWin = isWin && Math.abs(radius - compare) < 0.001;
		});
		return isWin;
	}
	
	return (
		sourceTower && 
		destTower &&
		sourceTower.length === numDiscs &&
		destTower.length === numDiscs &&
		patternCheck()
	);
}
