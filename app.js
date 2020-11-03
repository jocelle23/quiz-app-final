/**
 * Example store structure
 */
const STORE = {
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  userAnswer: null,
  view: 'home',
  submittedAnswer: false,
  // 5 or more questions required
  questions: [
    {
      question: 'What is the capital of Italy?',
      answers: [
        'A. Naples',
        'B. Rome',
        'C. Milan',
        'D. Genoa'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is the capital of Madagascar?',
      answers: [
        'A. Toliary',
        'B. Paris',
        'C. Antananarivo',
        'D. Mahajanga'
      ],
      correctAnswer: 2
    },
    {
      question: 'What is the capital of Chile?',
      answers: [
        'A. Santiago',
        'B. Castro',
        'C. Valdivia',
        'D. Temuco'
      ],
      correctAnswer: 0
    },
    {
      question: 'What is the capital of India?',
      answers: [
        'A. Mumbai',
        'B. Chennai',
        'C. Dwarka',
        'D. New Delhi'
      ],
      correctAnswer: 3
    },
    {
      question: 'What is the capital of New Zealand?',
      answers: [
        'A. Auckland',
        'B. Dunedin',
        'C. Hamilton',
        'D. Wellington'
      ],
      correctAnswer: 3
    },
    {
      question: 'What is the capital of Canada?',
      answers: [
        'A. Vancouver',
        'B. Ottawa',
        'C. Montreal',
        'D. Quebec'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is the capital of Ireland?',
      answers: [
        'A. Galway',
        'B. Limerick',
        'C. Dublin',
        'D. Westport'
      ],
      correctAnswer: 2
    },
    {
      question: 'What is the capital of Latvia?',
      answers: [
        'A. Sigulda',
        'B. Jelgava',
        'C. Ventspils',
        'D. Riga'
      ],
      correctAnswer: 3
    },
    {
      question: 'What is the capital of China?',
      answers: [
        'A. Shanghai',
        'B. Beijing',
        'C. Guangzhou',
        'D. Hong Kong'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is the capital of Norway?',
      answers: [
        'A. Oslo',
        'B. Bergen',
        'C. Tromso',
        'D. Kristiansand'
      ],
      correctAnswer: 0
    }
  ],
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

// HTML for welcome page and provides 'Start Button'
function welcomePage() {
  return `
  <section class="center">
    <h2>Welcome to the quiz!</h2>
    <p class="pSpace">How well do you know the world's countries and their capitals?</p> 
    <button id='startQuiz'> Start </button>
  </section>
  `
}

// Displays questions for user to answer
function questionAsked() {
  const currentQuestion = STORE.questions[STORE.questionNumber]
  return `
  <div class="center">
    <h2>${currentQuestion.question}</h2>
  </div>
  `;
}

// Answers are provided to user to choose from
function generateAnswers() {
  let answerList = '';
  const answerArray = STORE.questions[STORE.questionNumber].answers
  let i = 0;

  answerArray.forEach((answer, index) => {
    answerList += `
    <div class="center">
      <ul>
        <li><pre><input type="radio" name="choice" value="${index}" required><label for="option"> ${answer}</label></pre></li>
      </ul>
    </div>
    `;
    i++;
  });
  return answerList;
}

// Displays question # standing
function questionAndScoreStanding() {
  return `
  <section class="center">
    <button type="submit" id="submit-btn">Submit</button>
    <p>Question Number: ${STORE.questionNumber + 1} of ${STORE.questions.length}</p>
    <p>Score: ${STORE.score} of ${STORE.questions.length}</p>
  </section>
  `;
}

// Validates answer user submitted
function checkAnswer() {
  STORE.view = 'feedback';
  let userSelectedAnswer = STORE.userAnswer;
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  console.log('Checking answer...');
  if (userSelectedAnswer == correctAnswer) {
    STORE.score++;
    STORE.correctAnswer = true;
  }
  else {
    STORE.correctAnswer = false;
  }
}

// Function to display correct answer on results screen
function rightAnswer() {
  let rightAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  let returnRightAnswer = STORE.questions[STORE.questionNumber].answers[rightAnswer];
  return returnRightAnswer;
}

// Gives user feedback after each submission
function answerFeedback() {
  if (STORE.correctAnswer === true) {
    content = `
  <section class="center">
    <p class="pSpace">You got that right!</p>
    <button type="button" id="next-btn">Next</button>
  </section>
  `;
    console.log('Right answer!')
  }
  else {
    content = `
  <section class="center">
    <p class="pSpace">Wrong answer. Maybe next time!</p><br>
    <p>Correct answer is:<br>${rightAnswer()}</p>
    <button type="button" id="next-btn">Next</button>
  </section>
  `;
    console.log('Wrong answer.');
  }
  $('main').html(content);
}

// Displays next question for user
// up until final score screen
function nextQuestion() {
  if (STORE.questionNumber < STORE.questions.length - 1) {
    STORE.submittedAnswer = false;
    STORE.view = 'question';
    STORE.questionNumber++;
  }
  else {
    STORE.view = 'score';
    finalScore();
  }
}

// Final score results page
function finalScore() {
  let content = `
  <div class="center">
    <p class="pSpace"> Your final score is ${STORE.score} out of ${STORE.questions.length}!</p>
    <button type="button" id="try-again-btn">Try Again</button>
  </div>
  `
  $('main').html(content);
}

// Resets object keys in STORE
function restartQuiz() {
  STORE.quizStarted = false;
  STORE.questionNumber = 0;
  STORE.score = 0;
  STORE.view = 'home';
}

/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the 
// contents of the <main> tag based on the state of the STORE.
function render() {
  let content = '';
  if (STORE.view === 'home') {
    $('main').html(welcomePage());
  }
  else if (STORE.view === 'question') {
    content = questionAsked();
    content += generateAnswers();
    content += questionAndScoreStanding();
    $('main').html(`<form>${content}</form>`);
  } else if (STORE.view === 'feedback') {
    answerFeedback();
  } else if (STORE.view === 'score') {
    finalScore();
  }
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

// Toggled when 'Start' button is clicked
function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function (event) {
    STORE.view = 'question';
    console.log('Welcome! Quiz Started!');
    render();
  })
}

// Toggled when 'Submit' answer button is clicked
function handleSubmitAnswer() {
  $('main').on('submit', 'form', function (event) {
    event.preventDefault();
    console.log('User submitted answer');
    STORE.submittedAnswer = true;
    STORE.userAnswer = event.target.choice.value;
    checkAnswer();
    render();
  })
}

// Toggled when 'Next' button is clicked
function handleNextQuestion() {
  $('main').on('click', '#next-btn', function (event) {
    event.preventDefault();
    console.log('Next question');
    nextQuestion();
    render();
  })
}

// Toggled when 'Try Again' button is clicked
function handleRestartQuiz() {
  $('main').on('click', '#try-again-btn', function (event) {
    restartQuiz();
    render();
  });
}

// Renders each event handler function
function main() {
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestion();
  handleRestartQuiz();
  render();
}

$(main);