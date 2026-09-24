const quizData = [
    {
        question: "Which Harappan site is located in present-day Gujarat and is known for its sophisticated water reservoirs?",
        options: [
            "Dholavira",
            "Harappa",
            "Kalibangan",
            "Rakhigarhi"
        ],
        correct: 0,
        fact: "Dholavira, in Gujarat, is famous for its sophisticated system of stepwells and reservoirs, showing how the Harappans carefully managed water in a dry region."
    },
    {
        question: "Which feature is considered one of the most distinctive characteristics of Harappan cities?",
        options: [
            "Large stone temples",
            "Planned drainage systems",
            "Pyramids",
            "Rock-cut churches"
        ],
        correct: 1,
        fact: "Harappan cities featured covered drains running alongside streets, with individual houses connected to a shared civic sewage network - remarkably advanced for the Bronze Age."
    },
    {
        question: "Which Veda is mainly associated with melodies and chants?",
        options: [
            "Rigveda",
            "Samaveda",
            "Yajurveda",
            "Atharvaveda"
        ],
        correct: 1,
        fact: "The Samaveda is largely derived from hymns of the Rigveda but set to musical notation, making it central to Vedic chanting and ritual singing."
    },
    {
        question: "What was the main purpose of the Ashokan edicts?",
        options: [
            "To record royal family history",
            "To promote the principles of Dhamma",
            "To describe military strategies",
            "To collect taxes"
        ],
        correct: 1,
        fact: "Ashoka's edicts, carved on rocks and pillars across his empire, urged religious tolerance, non-violence, and moral conduct rather than military glory."
    },
    {
        question: "Who was the Greek ambassador to the court of Chandragupta Maurya?",
        options: [
            "Megasthenes",
            "Fa-Hien",
            "Xuanzang",
            "Pliny"
        ],
        correct: 0,
        fact: "Megasthenes served as a Greek ambassador at the Mauryan court under Chandragupta Maurya and later wrote extensively about Indian society and government."
    },
    {
        question: "Which work by Megasthenes provides information about Mauryan India?",
        options: [
            "Indica",
            "Arthashastra",
            "Rajatarangini",
            "Mudrarakshasa"
        ],
        correct: 0,
        fact: "Megasthenes's Indica, though it survives only in fragments quoted by later writers, remains a key foreign account of Mauryan India's administration and culture."
    },
    {
        question: "Which ancient Indian dynasty was associated with the Satavahana rulers?",
        options: [
            "Deccan region",
            "Kashmir region",
            "Punjab region",
            "Bengal region"
        ],
        correct: 0,
        fact: "The Satavahanas ruled over the Deccan region for nearly four centuries and were notable patrons of Buddhist art, including the caves at Ajanta."
    },
    {
        question: "Which Gupta ruler took the title 'Vikramaditya'?",
        options: [
            "Chandragupta I",
            "Samudragupta",
            "Chandragupta II",
            "Skandagupta"
        ],
        correct: 2,
        fact: "Chandragupta II took the title 'Vikramaditya' ('Sun of Valour') after expanding the Gupta Empire and is remembered as one of its greatest rulers."
    },
    {
        question: "Who was the Chinese pilgrim who visited India during the reign of Chandragupta II?",
        options: [
            "Xuanzang",
            "Fa-Hien",
            "I-Tsing",
            "Megasthenes"
        ],
        correct: 1,
        fact: "The Chinese Buddhist pilgrim Fa-Hien traveled through India during Chandragupta II's reign and left a valuable account of its prosperity and Buddhist institutions."
    },
    {
        question: "Which ancient Indian text is associated with statecraft, economics, and political administration?",
        options: [
            "Arthashastra",
            "Natya Shastra",
            "Charaka Samhita",
            "Ashtadhyayi"
        ],
        correct: 0,
        fact: "The Arthashastra covers taxation, diplomacy, espionage, and law, revealing just how organized and pragmatic ancient Indian statecraft could be."
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
            localStorage.setItem("ancientLevel4Unlocked", "true");

            quiz.innerHTML = `
                <div class="result passed-result">

                    <h2>Level 3 Completed!</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        Congratulations! You have passed Level 3.
                    </p>

                    <p>
                        Level 4 has been unlocked!
                    </p>

                    <button
                        class="reload-button"
                        onclick="window.location.href='ancientlvl4.html'">
                        Next Level →
                    </button>

                </div>
            `;

        } else {

            quiz.innerHTML = `
                <div class="result failed-result">

                    <h2> Level 3 Failed</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        You need at least 6 correct answers to unlock Level 4.
                    </p>

                    <p>
                        Level 4 is still locked.
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