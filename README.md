# Employee Polls Project

This is the implementation of the Employee Polls in a React Redux application that also has unit tests.

In the first section I am going to tell you the sequence of steps you have to execute so that you can start the project and runt the tests.

Then, I will write you the file structure, and a list with some of tools that were used.

I have changed or kept some of the parts of the README.md that came with the starter code, e.g. the section on Data (Questions, Users, Voting Options), the database functions.

Lastly, I will also tell you about the app functionality, tests, and also add some final observations.

## Commands and Useful Steps
* first of all, use `npm install` to get your `node_modules`
* then, you can start the application with `npm start` or
* you can run the tests with `npm test`, `npm run test` 
* observation: the command mentioned in the rubric, `npm start test`, will not work to run the tests, but to start the app

## File Structure
├── README.md # This file.
├── .gitignore
├── package.json # npm package manager file.
├── package-lock.json # generated
├── node_modules # after running `npm install`
├── public
│   └── index.html
│   └── manifest.json
└── src
		├── actions
			├── authedUser.js # for logging in and logging out
			├── pathAfterLogin.js # used with the intention to improve the routing
			├── polls.js # the actions and action factories for polls
			├── shared.js # initialisation
			├── users.js # the actions and the action factories for users
    ├── components
		  ├── app
				├── App.css
				├── App.js # has the routes
		  ├── dashboard
				├── pollsGrid
					├── PollsGrid.js
				├── Dashboard.css
				├── Dashboard.js # has the answered, unanswered polls (grouped, sorted, with links to the details of every poll). This is the home and the is `/`
		  ├── error404
				├── Error404.css
				├── Error404.js # in case a page cannot be found
			├── leaderboard
				├── Leaderboard.css
				├── Leaderboard.js # accessible from at the `/leaderboard` route
			├── login
				├── Login.css
				├── Login.js # a login page where a user can be selected from a list of users
				├── polls_login.jpg 
			├── logout
				├── Logout.css
				├── Logout.js # a logout page
			├── nav
				├── Nav.css
				├── Nav.js # navigation, user avatar & name, logout
			├── newPoll
				├── _snapshots_
				├── NewPoll.css
				├── NewPoll.js # page for the creating a poll (available at the /add route)
				├── NewPoll.test.js
			├── pollPage
				├── PollPage.css
				├── PollPage.js # for displaying the details of a poll, and voting, seeing the voting details of a poll after the authenticated user voted
		├── middleware
			├── index.js # applied the middleware; used React Thunk
			├── logger # from the Twitter-like app; used for debugging
		├── reducers
			├── authedUser.js
			├── index.js # combined the reducers
			├── pathAfterLogin.js
			├── polls.js
			├── users.js
		├── store
		  ├── index.js # the store is created here and used in the app and for tests
		├── utils
			├── _DATA.js
			├── _DATA.test.js
			├── api.js # interface to use the functions form _DATA.js
			├── helpers.js # added the formatDate from the Twitter-like project (I have needed it for the poll cards on the Dashboard which is at Home, on the '/' route)
		├── index.css # Kept for adding global styles.
		└── index.js # Connected the Provider, store, App, Router, and the root element from /src/index.html.

## Tools
Some of the used tools:
* React
* Redux
* React Redux
* Redux Thunk
* Create React App
* React Router
* Jest
* Testing Library
* React Redux Loading Bar
* React Icons

## Data

The `_DATA.js` which is used as fake database was slightly modified so that it has avatar URLs for each of the four users. Two of the users have avatar URLs from one of the previous projects that was used for teaching. The other two users don't have links to actual images, so they will not have avatars, but this will help show the 'alt' text of the 'img' tags in those places they avatars are used.

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| password   | String           | The user’s password in order to log in the application |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database. If one of the parameters are missing, an error is thrown.
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database. If one of the parameters are missing, an error is thrown.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## App Functionality
### Login Page
* it is possible to log in/impersonate a user after selecting one from the dropdown and pressing on the Login button.
* it also has a title and an image.
* a loading bar is displayed to load the initial data.
### Navigation
* for the authenticated user, it is visible at the top.
* after logging in, it is possible to navigate to `Home` (the current page), `Leaderboard`, `Add`. These are displayed on the navigation on the left.
* it is also possible to log out. In this case, a Logout page is displayed and on this page the user can select to go on the Login page. This is displayed on the navigation bar on the right.
* the avatar of the user (or the text 'Avatar of ${name of the user} and the name of the user are displayed on the navigation bar to the left of the logout text.
* on the `Home` page, each poll links to the poll page that contains details of that linked poll
* after a poll is successfully added, the authenticated user is redirected to the home page.
* if the user wants to navigate from the URL, he must first authenticate, and then, if the page exists, it will be displayed. If the page the user wants to navigate to does not exists (or if the poll does not exists), after logging in the 404 error will be displayed.
### Home (Dashboard)
* it is found at the `/` route.
* it can be accessed only by an authenticated user.
* by default, the New Polls (unanswered questions) are displayed by default.
* there is a switch button that can be used to navigate between the New Polls and the Done Polls (answered questions)
* the polls in each group are displayed from the most recent (from left to right from top to bottom).
* this page will contain updated data, e.g. after the user votes,
### Leaderboard
* it is found at the `/leaderboard` route.
* it can be accessed only by an authenticated user.
* the leaderboard contains a table
* the table has a header with 3 cells: Users, Answered, Created.
* every user has displayed the avatar (or the text `Avatar of {the name of the user}), its name and its id in the first column, the number of answered polls in the second column, and the number of created polls in the third column.
* The users are ordered in this table from top to bottom by the sum of answered polls and created polls: the user with the biggest such sum is at the top.
* this page will contain updated data, e.g. after the user votes, after the user creates a new poll
### New Poll
* it is found at the `/add` route.
* it can be accessed only by an authenticated user.
* there is a form with two input fields. If each of them has at least one character, then the poll's submit (`Create`) button becomes enabled.
* while the creation of the poll is processed, the button is disabled in order to prevent the user to create multiple polls by clicking repeatedly on the submit button.
* if the creation of the poll is successful, the user is redirected to the `/` route, i.e. Home (Dashboard). If there is an error, the submit button becomes enabled.
### Poll Page
* it is found at the `/questions/question_id` route.
* it can be accessed only by an authenticated user.
* if the poll is new, then it is possible to vote one of the options.
* after voting, the text of the button below the voted option has its text changed to `Voted!` and the other voting button has its text changed to `Not voted.`.
* these two voting buttons are enabled if the authenticated user is allowed to vote, i.e. he didn't vote it. 
* if the authenticated user already voted, both of these buttons are disabled and information is displayed below these buttons.
* there is also an icon that shows if the user voted (the icon is green and it represents a vote) or not (the icon is a question mark, and is red)


### 404 Error
* if the user is authenticated, it is displayed if route does not have associated a page
* the authenticated user, being authenticated, can navigate from this 404 to any page within the Polls App.

## Tests
* according to the messages displayed when running one of the mentioned test commands, there are 2 test suites, 21 tests, 1 snapshot, and all passed.
### Unit Tests
* there 2 describes with 8 its each
* these tests are for _DATA.test.js _saveQuestion and _saveQuestionAnswer
### Snapshot Test
* There is one snapshot test in the NewPoll.test.js file for the NewPoll component which in the NewPoll.js file
* the snapshot is in /src/components/newPoll/_snapshots_
* used toMatchSnapshot()
### DOM Tests
* added 4 DOM tests
* used, render, the fireEvent function, fireEvent.change(), and expect()

# Other Observations

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contributing

This repository will not accept contributions. For now, its development will be continued only by myself.
