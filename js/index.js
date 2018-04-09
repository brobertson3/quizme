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
 	_questionOne: ["Question One", "A. Something goes here", "B. Something goes here",
 	               "C. Something goes here", "D. Something goes here", "A"],
 	_questionTwo: ["Question Two", "A. Something goes here", "B. Something goes here",
 	               "C. Something goes here", "D. Something goes here", "B"],
 	_questionThree: ["Question Three", "A. Something goes here", "B. Something goes here",
 	               "C. Something goes here", "D. Something goes here", "C"],
 	_questionFour: ["Question Four", "A. Something goes here", "B. Something goes here",
 	               "C. Something goes here", "D. Something goes here", "D"],

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

document.getElementById('start-btn').addEventListener("click", startGame);
// let newObj = speechBubble;
// newObj.correct = 'A';
// console.log(newObj.correct);

// newObj.questionNumber = 3;
// console.log(newObj.questionNumber);
// console.log(newObj._question + newObj.questionNumber + '?');

// console.log(questionAnswer._questionOne[5]);