const quizData = [
    {
        question: "Which civilization is also known as the Harappan Civilization?",
        options: [
            "Indus Valley Civilization",
            "Vedic Civilization",
            "Mauryan Civilization",
            "Gupta Civilization"
        ],
        correct: 0,
        fact: "The Indus Valley Civilization is also called the Harappan Civilization after Harappa, the first site discovered in the 1920s, and its cities show remarkably advanced urban planning for their time."
    },
    {
        question: "Which of the following was an important city of the Indus Valley Civilization?",
        options: [
            "Pataliputra",
            "Mohenjo-daro",
            "Delhi",
            "Ujjain"
        ],
        correct: 1,
        fact: "Mohenjo-daro, meaning \"Mound of the Dead,\" was one of the largest cities of the Bronze Age world, with organized streets and an advanced drainage system."
    },
    {
        question: "The Great Bath was discovered at which Indus Valley site?",
        options: [
            "Harappa",
            "Lothal",
            "Mohenjo-daro",
            "Dholavira"
        ],
        correct: 2,
        fact: "The Great Bath at Mohenjo-daro, built of tightly fitted bricks sealed with natural tar, is considered the earliest known public water tank in the ancient world."
    },
    {
        question: "Who founded the Mauryan Empire?",
        options: [
            "Ashoka",
            "Chandragupta Maurya",
            "Samudragupta",
            "Harshavardhana"
        ],
        correct: 1,
        fact: "Chandragupta Maurya founded the Mauryan Empire around 321 BCE with the guidance of his mentor Chanakya, uniting much of the Indian subcontinent for the first time."
    },
    {
        question: "Which Mauryan ruler is famous for spreading Buddhism after the Kalinga War?",
        options: [
            "Chandragupta Maurya",
            "Bindusara",
            "Ashoka",
            "Bimbisara"
        ],
        correct: 2,
        fact: "After witnessing the bloodshed of the Kalinga War, Emperor Ashoka renounced violence and dedicated the rest of his reign to spreading the message of Buddhism."
    },
    {
        question: "Which religion was founded by Gautama Buddha?",
        options: [
            "Jainism",
            "Buddhism",
            "Hinduism",
            "Sikhism"
        ],
        correct: 1,
        fact: "Buddhism was founded by Siddhartha Gautama, who attained enlightenment under the Bodhi tree at Bodh Gaya and became known as the Buddha."
    },
    {
        question: "Who is traditionally regarded as the founder of Jainism in its present form?",
        options: [
            "Mahavira",
            "Gautama Buddha",
            "Ashoka",
            "Chanakya"
        ],
        correct: 0,
        fact: "Mahavira, the 24th Tirthankara, is regarded as the last and most influential teacher who shaped Jainism into the tradition practiced today."
    },
    {
        question: "Which ancient university was located in present-day Bihar?",
        options: [
            "Takshashila",
            "Nalanda",
            "Vikramashila",
            "Vallabhi"
        ],
        correct: 1,
        fact: "Nalanda, in present-day Bihar, was one of the world's earliest residential universities, drawing scholars from as far as China and Central Asia."
    },
    {
        question: "Which period is often called the 'Golden Age' of ancient India?",
        options: [
            "Mauryan Period",
            "Gupta Period",
            "Vedic Period",
            "Harappan Period"
        ],
        correct: 1,
        fact: "The Gupta Period (4th-6th century CE) is often called India's Golden Age due to remarkable achievements in mathematics, astronomy, art, and literature."
    },
    {
        question: "Which language was commonly used in many inscriptions of Emperor Ashoka?",
        options: [
            "Prakrit",
            "English",
            "Persian",
            "Tamil"
        ],
        correct: 0,
        fact: "Most of Ashoka's edicts were inscribed in Prakrit using the Brahmi script, making them among the earliest deciphered written records of ancient India."
    }
];

const quiz = document.querySelector("#quiz");

const answerElm = document.querySelectorAll(".answer");

const questionElm = document.querySelector("#question");
const option_1 = document.querySelector("#option_1");
const option_2 = document.querySelector("#option_2");
const option_3 = document.querySelector("#option_3");
const option_4 = document.querySelector("#option_4");

const submitBtn = document.querySelector("#submit");

const optionLabels = [option_1, option_2, option_3, option_4];
const answerListElm = document.querySelector("ul");
const factPanel = document.querySelector("#factPanel");
const factText = document.querySelector("#factText");

let currentQuiz = 0;
let score = 0;


// LOAD QUIZ
const loadQuiz = () => {

    const currentQuizData = quizData[currentQuiz];

    questionElm.innerText = `${currentQuiz + 1}. ${currentQuizData.question}`;

    option_1.innerText = currentQuizData.options[0];
    option_2.innerText = currentQuizData.options[1];
    option_3.innerText = currentQuizData.options[2];
    option_4.innerText = currentQuizData.options[3];
};

loadQuiz();


// GET SELECTED ANSWER
const getSelectedOption = () => {

    let answer;

    answerElm.forEach((currentOption, index) => {

        if (currentOption.checked) {
            answer = index;
        }

    });

    return answer;
};


// REMOVE PREVIOUS SELECTION
const deselectedAnswer = () => {

    answerElm.forEach((curElem) => {
        curElem.checked = false;
    });

};


// SHOW ANSWER FEEDBACK (green/red borders + historical fact panel)
const showAnswerFeedback = (selectedIndex) => {

    const correctIndex = quizData[currentQuiz].correct;

    if (selectedIndex === correctIndex) {
        optionLabels[selectedIndex].classList.add("correct-answer");
    } else {
        optionLabels[selectedIndex].classList.add("wrong-answer");
        optionLabels[correctIndex].classList.add("correct-answer");
    }

    if (answerListElm) {
        answerListElm.classList.add("locked");
    }

    if (factPanel && factText) {
        factText.textContent = quizData[currentQuiz].fact || "";
        factPanel.classList.add("visible");
    }
};


// RESET ANSWER FEEDBACK (called right before the next question loads)
const clearAnswerFeedback = () => {

    optionLabels.forEach((label) => {
        label.classList.remove("correct-answer", "wrong-answer");
    });

    if (answerListElm) {
        answerListElm.classList.remove("locked");
    }

    if (factPanel) {
        factPanel.classList.remove("visible");
    }
};


let answered = false;

// SUBMIT / NEXT BUTTON
submitBtn.addEventListener("click", () => {

    if (!answered) {

        const selectedOptionIndex = getSelectedOption();

        // If no option is selected
        if (selectedOptionIndex === undefined) {
            alert("Please select an answer!");
            return;
        }

        answered = true;

        // Apply green/red border feedback + show the historical fact panel
        showAnswerFeedback(selectedOptionIndex);

        // Check answer
        if (selectedOptionIndex === quizData[currentQuiz].correct) {
            score++;
        }

        // Let the Submit button double as the "continue" control
        submitBtn.textContent = (currentQuiz + 1 < quizData.length) ? "Next Question" : "See Result";

        return;
    }

    // Second click: clear feedback and move on with the existing flow
    answered = false;
    submitBtn.textContent = "Submit";
    clearAnswerFeedback();

    currentQuiz++;

    // Load next question
    if (currentQuiz < quizData.length) {

        deselectedAnswer();
        loadQuiz();

    } 
    
    // Show result
    else {

        // PASSING MARKS = 6
        const passingMarks = 6;

        if (score >= passingMarks) {

            // UNLOCK LEVEL 2
            localStorage.setItem("ancientLevel2Unlocked", "true");

            quiz.innerHTML = `
                <div class="result passed-result">

                    <h2> Level 1 Completed!</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        Congratulations! You have passed Level 1.
                    </p>

                    <p>
                        Level 2 has been unlocked!
                    </p>

                    <button
                        class="reload-button"
                        onclick="window.location.href='ancientlvl2.html'">
                        Next Level →
                    </button>

                </div>
            `;

        } else {

            quiz.innerHTML = `
                <div class="result failed-result">

                    <h2> Level 1 Failed</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        You need at least 6 correct answers to unlock Level 2.
                    </p>

                    <p>
                        Level 2 is still locked.
                    </p>

                    <button
                        class="reload-button"
                        onclick="location.reload()">
                        Try Again
                    </button>

                </div>
            `;

        }
    }

});