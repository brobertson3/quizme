/*
 * Object of messages that will go in the speech bubble
 */
const speechBubble = {
	_questionNumber: 1,
	_correct: '',
	_greeting: "How's it going? I hope you're ready to learn a little about me. Press the 'Start Game' button to begin!",
	_question: 'Are you ready for Question ',
	_correctResponse: ' was the right answer. Nicely done!',
	_wrongResponse: "Oh no! That's not quite right. What you were looking for was choice ",
	_checkScorePrompt: "All finished! Check and see how you did!",
	_allCorrect: "Wow, you got them all right! Looks like you know some about me, but there's much more to learn. Check out the links to the right. Or you can play again!",
	_someWrongBeginning: "Uh oh. Looks like you got ",
	_someWrongEnding: " wrong. Looks like you can learn more about me. Check out the links to the right to get to know me. Or play again!",
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
	get question() {
		return this._question + this._questionNumber + '?';
	},
	get correctResponse() {
		return "'" + this._correct + "'" + this._correctResponse;
	},
	get wrongResponse() {
		return this._wrongResponse + "'" + this._correct + "'";
	},
	get checkScorePrompt() {
		return this._checkScorePrompt;
	},
	get allCorrect() {
		return this._allCorrect;
	},
	get someWrong() {
		return this._someWrongBeginning + (4 - questionAnswer.totalScore) + this._someWrongEnding;
	},
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
 	_questionOne: ["1. Where does Brent currently live?", "A. Brea, CA", "B. Baltimore, MD",
 	               "C. Seattle, WA", "D. Portland, OR", "A"],
 	_questionTwo: ["2. What languages is Brent experienced in?", "A. HTML5", "B. CSS3",
 	               "C. JavaScript", "D. All of the above", "D"],
 	_questionThree: ["3. What position is Brent currently looking to fill?", "A. Web Developer", "B. UI Developer",
 	               "C. UI/UX Designer", "D. All of the above", "D"],
 	_questionFour: ["4. When is Brent available to start?", "A. Not looking", "B. Immediately",
 	               "C. A few months", "D. Next year", "B"],
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
	// Update the speech bubble to say Welcome
	document.getElementById('speech-text').textContent = speechBubble._greeting;
}

// Reinitialize the visibility of the components.
const newGame = () => {
	speechBubble.questionNumber = 1;
	questionAnswer.totalScore = 0;
	// document.querySelector('.left-pane').classList.add('hidden');
	// document.querySelector('.right-pane').classList.add('hidden');
	document.querySelector('.score-area').classList.add('hidden');
	// document.querySelector('.question-area').classList.remove('hidden');
	// document.querySelector('.choices-area').classList.remove('hidden');
	document.getElementById('start-btn').classList.remove('hidden');
	$('.choice-btn').removeClass('correct incorrect disabled');
	$('.choice-btn').click(evaluateAnswer);
	$('#image-area img').attr('src', 'img/StartStickman.svg');
	init();
}

/* Function to start the game. Adds the 'hidden' class to the start button.
 * Removes the 'hidden' class from the left and right-pane. Makes start
 * button disappear and everything else visible.
 */ 
const startGame = () => {
	document.getElementById('speech-text').textContent = speechBubble.question;
	document.getElementById('start-btn').classList.add('hidden');
	document.querySelector('.question-area').classList.remove('hidden');
	$('#image-area img').attr('src', 'img/QuestionStickman.svg');
	$('.choices-area').removeClass('hidden');

	// document.querySelector('.right-pane').classList.remove('hidden');
	// document.querySelector('.left-pane').classList.remove('hidden');
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
	document.getElementById('speech-text').textContent = speechBubble.question;
	document.getElementById('next-btn').classList.add('hidden');
	$('#image-area img').attr('src', 'img/QuestionStickman.svg');
};

const checkScore = () => {
	let percentage = Math.floor((questionAnswer.totalScore / questionAnswer.numberOfQuestions) * 100);
	// Hide the right pane elements
	document.querySelector('.question-area').classList.add('hidden');
	document.querySelector('.choices-area').classList.add('hidden');
	document.getElementById('check-score-btn').classList.add('hidden');
	document.querySelector('.score-area').classList.remove('hidden');
	document.getElementById('score').textContent = `${percentage}%`;
	$('#image-area img').attr('src', 'img/StartStickman.svg');
	if (questionAnswer.totalScore < 4) {
		document.getElementById('speech-text').textContent = speechBubble.someWrong;
	}  else {
		document.getElementById('speech-text').textContent = speechBubble.allCorrect;
	}
};

const evaluateAnswer = event => {
	let curr = '';
	let index = 0;
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
	//Set the correct variable for the speech bubble to use
	speechBubble.correct = questionAnswer[`question${curr}`][5];
	// If the correct answer is chosen, add point to score.
	if (event.target.id[7].toUpperCase() === questionAnswer[`question${curr}`][5]) {
		// console.log('That is correct');
		questionAnswer.totalScore = questionAnswer.totalScore + 1;
		event.target.classList.add('correct');
		$('#image-area img').attr('src', 'img/CorrectStickman.svg');
		document.getElementById('speech-text').textContent = speechBubble.correctResponse;
	} else {
		// console.log("This is incorrect.");
		event.target.classList.add('incorrect');
		// Find the index of the correct answer
		switch (questionAnswer[`question${curr}`][5]) {
			case 'A':
				index = 0;
				break;
			case 'B':
				index = 1;
				break;
			case 'C':
				index = 2;
				break;
			case 'D':
				index = 3;
				break;
			default:
				break;
		}

		// Change the color of the correct answer to green
		$('.choice-btn').eq(index).addClass('correct');

		$('#image-area img').attr('src', 'img/IncorrectStickman.svg');
		document.getElementById('speech-text').textContent = speechBubble.wrongResponse + '.';
	}

	if (curr !== 'Four') {
		// Show the next question button
		document.getElementById('next-btn').classList.remove('hidden');
		speechBubble.questionNumber++;

	} else {
		// document.getElementById('next-btn').classList.add('hidden');
		// Show the check score button
		document.getElementById('check-score-btn').classList.remove('hidden');
		document.getElementById('speech-text').textContent += ' ' + speechBubble.checkScorePrompt;
		// document.getElementById('check-score-btn').addEventListener('click', checkScore);
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

// Registering event listeners
$('#new-game-btn').click(newGame);
document.getElementById('check-score-btn').addEventListener('click', checkScore);

init();