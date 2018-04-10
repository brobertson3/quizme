/*
 * Object of messages that will go in the speech bubble
 */
const speechBubble = {
	_questionNumber: 1,
	_correct: '',
	_greeting: "Let's see how much you know about this great guy.",
	_question: `Ready for question `,
	set questionNumber(number) {
		if (typeof number === 'number') {
			this._questionNumber = number;
		} else {
			return 'Question number needs to be an integer.';
		}
	},
	get questionNumber() {
		return this._questionNumber;
	},
	_correctResponse: `Yes, ${this._correct} was the right answer.`,
	_wrongResponse: `Oh no! That's not quite right. ${this._correct} is what you were looking for.`,
	set correct(letter) {
		if (letter === 'A' || letter === 'B' || letter === 'C' || letter === 'D') {
			this._correct = letter;
		} else {
			return "This is not a valid input.";
		}
	},
	get correct() {
		return this._correct;
	},
	_salutations: `Let's see how you did.`
};

/*
 * Object of questions and corresponding answers.
 */
 const questionAnswer = {
 	_totalScore: 0,
 	_numberOfQuestions: 4,
 	_questionOne: ["Question One", "A. Something goes here", "B. Something goes here",
 	               "C. Something goes here", "D. Something goes here", "A"],
 	_questionTwo: ["Question Two", "A. Something goes here", "B. Something goes here",
 	               "C. Something goes here", "D. Something goes here", "B"],
 	_questionThree: ["Question Three", "A. Something goes here", "B. Something goes here",
 	               "C. Something goes here", "D. Something goes here", "C"],
 	_questionFour: ["Question Four", "A. Something goes here", "B. Something goes here",
 	               "C. Something goes here", "D. Something goes here", "D"],
 	get totalScore () {
 		return this._totalScore;
 	},
 	set totalScore (score) {
 		this._totalScore = score;
 	},
 	get numberOfQuestions () {
 		return this._numberOfQuestions;
 	},
 	get questionOne () {
 		return this._questionOne;
 	},
 	get questionTwo () {
 		return this._questionTwo;
 	},
 	get questionThree () {
 		return this._questionThree;
 	},
 	get questionFour () {
 		return this._questionFour;
 	}

 };

// Starts off everything
const init = () => {
	// Start game
	// document.getElementById('start-btn').addEventListener("click", startGame);
	getQuestions('One');
	// Update the speech bubble to say Welcome and Question 1
	document.getElementById('speech-text').textContent = speechBubble._greeting;
}

// Reinitialize the visibility of the components.
const newGame = () => {
	speechBubble.questionNumber = 1;
	questionAnswer.totalScore = 0;
	document.querySelector('.left-pane').classList.add('hidden');
	document.querySelector('.right-pane').classList.add('hidden');
	document.querySelector('.score-area').classList.add('hidden');
	document.querySelector('.question-area').classList.remove('hidden');
	document.querySelector('.choices-area').classList.remove('hidden');
	document.getElementById('start-btn').classList.remove('hidden');
	$('.choice-btn').removeClass('correct incorrect disabled');
	$('.choice-btn').click(evaluateAnswer);
	init();
}

/* Function to start the game. Adds the 'hidden' class to the start button.
 * Removes the 'hidden' class from the left and right-pane. Makes start
 * button disappear and everything else visible.
 */ 
const startGame = () => {
	document.getElementById('start-btn').classList.add('hidden');
	document.querySelector('.right-pane').classList.remove('hidden');
	document.querySelector('.left-pane').classList.remove('hidden');
}

// // Start game
// document.getElementById('start-btn').addEventListener("click", startGame);

// // Update the speech bubble to say Welcome and Question 1
// document.getElementById('speech-text').textContent = speechBubble._greeting;

// Display all options for current question
const getQuestions = (number) => {
	document.querySelector('.question-area').textContent = questionAnswer[`question${number}`][0];
	document.getElementById('choice-a').textContent = questionAnswer[`question${number}`][1];
	document.getElementById('choice-b').textContent = questionAnswer[`question${number}`][2];
	document.getElementById('choice-c').textContent = questionAnswer[`question${number}`][3];
	document.getElementById('choice-d').textContent = questionAnswer[`question${number}`][4];
};

const nextQuestion = () => {
	// On click of an answer, evaluate whether correct
	$('.choice-btn').click(evaluateAnswer);
	$('.choice-btn').removeClass('incorrect correct disabled');
};

const checkScore = () => {
	let percentage = Math.floor((questionAnswer.totalScore / questionAnswer.numberOfQuestions) * 100);
	// Hide the right pane elements
	document.querySelector('.question-area').classList.add('hidden');
	document.querySelector('.choices-area').classList.add('hidden');
	document.getElementById('check-score-btn').classList.add('hidden');
	document.querySelector('.score-area').classList.remove('hidden');
	document.getElementById('score').textContent = `${percentage}%`;
};

const evaluateAnswer = event => {
	let curr = '';
	// console.log(event.target.id);
	switch (speechBubble.questionNumber) {
		case 1:
			curr = 'One';
			break;
		case 2:
			curr = 'Two';
			break;
		case 3:
			curr = 'Three';
			break;
		case 4:
			curr = 'Four';
			break
		default:
			console.log('Invalid number selected.')
			break;
	}

	// Deregister the click event handler
	$('.choice-btn').off("click");
	// Add the disabled class, which will stop the hover effect
	//TODO need to make the color stay the same as before though
	$('.choice-btn').addClass('disabled');

	// If the correct answer is chosen, add point to score.
	if (event.target.id[7].toUpperCase() === questionAnswer[`question${curr}`][5]) {
		console.log('That is correct');
		questionAnswer.totalScore = questionAnswer.totalScore + 1;
		event.target.classList.add('correct');
	} else {
		console.log("This is incorrect.");
		event.target.classList.add('incorrect');
	}

	if (curr !== 'Four') {
		// Show the next question button
		document.getElementById('next-btn').classList.remove('hidden');
		speechBubble.questionNumber++;

	} else {
		document.getElementById('next-btn').classList.add('hidden');
		// Show the check score button
		document.getElementById('check-score-btn').classList.remove('hidden');
		document.getElementById('check-score-btn').addEventListener('click', checkScore);
	}
	
}

//document.querySelectorAll('.choice-btn').addEventListener("click", evaluateAnswer);
// On click of start button, start the game
document.getElementById('start-btn').addEventListener("click", startGame);
// On click of an answer, evaluate whether correct
$('.choice-btn').click(evaluateAnswer);
// On click of Next Question button, repopulate the questions and answers
$('#next-btn').click(function () {
	let curr = '';
	switch (speechBubble.questionNumber) {
		case 1:
			curr = 'One';
			break;
		case 2:
			curr = 'Two';
			break;
		case 3:
			curr = 'Three';
			break;
		case 4:
			curr = 'Four';
			break
		default:
			console.log('Invalid number selected.')
			break;
	}
	getQuestions(curr);
	nextQuestion();
});
$('#new-game-btn').click(newGame);

/* TODO 
 * A.
 * x1. Calculate the score percentage when 'Check Score' pressed.
 * x2. Display that score percentage to the screen.
 * x3. Hide other elements in the right pane.
 * x4. Display a 'Play Again' button under the score (onclick start over game).
 *
 * B.
 * 1. Change the speech bubble to reflect what's happening in game
 *
 * C.
 * 1. Insert announcer under speech bubble
 * 2. Reactions change for correct/incorrect answers
 */


// let newObj = speechBubble;
// newObj.correct = 'A';
// console.log(newObj.correct);

// newObj.questionNumber = 3;
// console.log(newObj.questionNumber);
// console.log(newObj._question + newObj.questionNumber + '?');

// console.log(questionAnswer._questionOne[5]);
init();