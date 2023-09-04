
import { _saveQuestion, _saveQuestionAnswer } from './_DATA.js'

describe('_saveQuestion', () => {
	it(
		'saved question is returned, all expected fields are populated',
		async() => {
			const question = {
				optionOneText: 'a',
				optionTwoText: 'b',
				author: '1c',
			};
			const result = await _saveQuestion(question);

			expect(result.id).toEqual(expect.anything());
			expect(result.timestamp).toEqual(expect.any(Number));
			expect(result.author).toEqual(question.author);
			expect(result.optionOne.votes).toEqual([]);
			expect(result.optionOne.text).toEqual('a');
			expect(result.optionTwo.votes).toEqual([]);
			expect(result.optionTwo.text).toEqual('b');
		}
	);

	it(
		'an error is returned if no author.',
		async() => {
			const question = {
				optionOneText: 'a',
				optionTwoText: 'b',
			};
			const expected = "Please provide optionOneText, optionTwoText, and author";
			
			await expect(_saveQuestion(question))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no option one.',
		async() => {
			const question = {
				optionTwoText: 'b',
				author: '1c',
			};
			const expected = "Please provide optionOneText, optionTwoText, and author";
			
			await expect(_saveQuestion(question))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no option two.',
		async() => {
			const question = {
				optionOneText: 'a',
				author: '1c',
			};
			const expected = "Please provide optionOneText, optionTwoText, and author";
			
			await expect(_saveQuestion(question))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no option one, option two.',
		async() => {
			const question = {
				author: '1c',
			};
			const expected = "Please provide optionOneText, optionTwoText, and author";
			
			await expect(_saveQuestion(question))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no option one, author.',
		async() => {
			const question = {
				optionTwoText: 'b',
			};
			const expected = "Please provide optionOneText, optionTwoText, and author";
			
			await expect(_saveQuestion(question))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no option two, author.',
		async() => {
			const question = {
				optionOneText: 'a',
			};
			const expected = "Please provide optionOneText, optionTwoText, and author";
			
			await expect(_saveQuestion(question))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no option one, option two, author.',
		async() => {
			const question = {};
			const expected = "Please provide optionOneText, optionTwoText, and author";
			
			await expect(_saveQuestion(question))
				.rejects
				.toEqual(expected);
		}
	);
});

describe('_saveQuestionAnswer()', () => {
	it(
		'true is returned when correctly formatted data is passed to the function',
		async() => {
			const vote = {
				authedUser: 'tylermcginnis',
				qid: '8xf0y6ziyjabvozdd253nd',
				answer: 'optionOne',
			};
			const result = await _saveQuestionAnswer(vote);

			expect(result).toEqual(true);
		}
	);

	it(
		'an error is returned if no authedUser',
		async() => {
			const vote = {
				qid: '8xf0y6ziyjabvozdd253nd',
				answer: 'optionOne',
			};
			const expected = "Please provide authedUser, qid, and answer";

			await expect(_saveQuestionAnswer(vote))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no qid',
		async() => {
			const vote = {
				authedUser: 'tylermcginnis',
				answer: 'optionOne',
			};
			const expected = "Please provide authedUser, qid, and answer";

			await expect(_saveQuestionAnswer(vote))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no answer',
		async() => {
			const vote = {
				authedUser: 'tylermcginnis',
				qid: '8xf0y6ziyjabvozdd253nd',
			};
			const expected = "Please provide authedUser, qid, and answer";

			await expect(_saveQuestionAnswer(vote))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no authedUser, qid',
		async() => {
			const vote = {
				answer: 'optionOne',
			};
			const expected = "Please provide authedUser, qid, and answer";

			await expect(_saveQuestionAnswer(vote))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no authedUser, answer',
		async() => {
			const vote = {
				qid: '8xf0y6ziyjabvozdd253nd',
			};
			const expected = "Please provide authedUser, qid, and answer";

			await expect(_saveQuestionAnswer(vote))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no qid, answer',
		async() => {
			const vote = {
				authedUser: 'tylermcginnis',
			};
			const expected = "Please provide authedUser, qid, and answer";

			await expect(_saveQuestionAnswer(vote))
				.rejects
				.toEqual(expected);
		}
	);

	it(
		'an error is returned if no authedUser, qid, answer',
		async() => {
			const vote = {};
			const expected = "Please provide authedUser, qid, and answer";

			await expect(_saveQuestionAnswer(vote))
				.rejects
				.toEqual(expected);
		}
	);
});