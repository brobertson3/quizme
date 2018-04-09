/*
 * Object of messages that will go in the speech bubble
 */
const speechBubble = {
	_questionNumber: 4,
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

/* Function to start the game. Adds the 'hidden' class to the start button.
 * Removes the 'hidden' class from the left and right-pane. Makes start
 * button disappear and everything else visible.
 */ 
const startGame = () => {
	document.getElementById('start-btn').classList.add('hidden');
	document.querySelector('.right-pane').classList.remove('hidden');
	document.querySelector('.left-pane').classList.remove('hidden');
}

// Start game
document.getElementById('start-btn').addEventListener("click", startGame);

// Update the speech bubble to say Welcome and Question 1
document.getElementById('speech-text').textContent = speechBubble._greeting;

//Display all options for question 1
//TODO - make this a function..maybe a method
document.querySelector('.question-area').textContent = questionAnswer.questionOne[0];
document.getElementById('choice-a').textContent = questionAnswer.questionOne[1];
document.getElementById('choice-b').textContent = questionAnswer.questionOne[2];
document.getElementById('choice-c').textContent = questionAnswer.questionOne[3];
document.getElementById('choice-d').textContent = questionAnswer.questionOne[4];

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
	// If the correct answer is chosen, add point to score.
	if (event.target.id[7].toUpperCase() === questionAnswer[`question${curr}`][5]) {
		console.log('That is correct');
		questionAnswer.totalScore = questionAnswer.totalScore + 1;
	} else {
		console.log("This is incorrect.");
	}

}

//document.querySelectorAll('.choice-btn').addEventListener("click", evaluateAnswer);
$('.choice-btn').click(evaluateAnswer);

/* TODO 
 * 1. Wait for user selection of choice
 * 2. Once chosen, record the choice number
 * 3. Compare choice number to the correct answer
 * 4. Record whether it was right or wrong, add to the total score
 * 5. Display button for next question
 * 6. On click of next question, show the next question on the screen
 */


// let newObj = speechBubble;
// newObj.correct = 'A';
// console.log(newObj.correct);

// newObj.questionNumber = 3;
// console.log(newObj.questionNumber);
// console.log(newObj._question + newObj.questionNumber + '?');

// console.log(questionAnswer._questionOne[5]);