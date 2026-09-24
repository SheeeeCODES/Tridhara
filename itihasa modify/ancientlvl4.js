const quizData = [
    {
        question: "Which Harappan site provides evidence of a ploughed agricultural field?",
        options: [
            "Kalibangan",
            "Lothal",
            "Dholavira",
            "Mohenjo-daro"
        ],
        correct: 0,
        fact: "Excavations at Kalibangan revealed the remains of a ploughed field with a distinct furrow pattern, offering rare direct evidence of Harappan farming techniques."
    },
    {
        question: "Which archaeological site is one of the largest known settlements of the Indus Valley Civilization?",
        options: [
            "Rakhigarhi",
            "Sarnath",
            "Taxila",
            "Pataliputra"
        ],
        correct: 0,
        fact: "Rakhigarhi, in Haryana, is considered one of the largest Harappan sites ever discovered, larger even than Mohenjo-daro and Harappa in area."
    },
    {
        question: "Which ruler is credited with establishing the Mauryan Empire after defeating the Nanda dynasty?",
        options: [
            "Ashoka",
            "Bindusara",
            "Chandragupta Maurya",
            "Brihadratha"
        ],
        correct: 2,
        fact: "With Chanakya's strategic guidance, Chandragupta Maurya overthrew the Nanda dynasty and established the vast Mauryan Empire around 321 BCE."
    },
    {
        question: "The Kalinga War is described in which Major Rock Edict of Ashoka?",
        options: [
            "Rock Edict I",
            "Rock Edict VIII",
            "Rock Edict XIII",
            "Rock Edict XIV"
        ],
        correct: 2,
        fact: "Ashoka's Rock Edict XIII openly describes the devastation of the Kalinga War and his consequent turn toward Dhamma, making it a uniquely candid royal confession."
    },
    {
        question: "Which Buddhist text contains accounts of the Buddhist councils and the spread of Buddhism?",
        options: [
            "Dipavamsa",
            "Mahavamsa",
            "Milindapanha",
            "Both Dipavamsa and Mahavamsa"
        ],
        correct: 3,
        fact: "The Dipavamsa and Mahavamsa are Sri Lankan Pali chronicles that preserve valuable early accounts of Ashoka's reign and the spread of Buddhism."
    },
    {
        question: "Which Kushan ruler is strongly associated with the flourishing of Mahayana Buddhism?",
        options: [
            "Kanishka",
            "Menander",
            "Rudradaman",
            "Gautamiputra Satakarni"
        ],
        correct: 0,
        fact: "Under Kanishka's patronage, Mahayana Buddhism flourished and spread along the Silk Road into Central Asia, China, and beyond."
    },
    {
        question: "The Gandhara school of art was strongly influenced by which artistic tradition?",
        options: [
            "Greek and Roman traditions",
            "Chinese tradition",
            "Persian miniature tradition",
            "South Indian temple tradition"
        ],
        correct: 0,
        fact: "The Gandhara school of art blended Greek and Roman sculptural techniques with Buddhist themes, producing some of the earliest realistic images of the Buddha."
    },
    {
        question: "Which Gupta ruler successfully resisted the Hun invasions during the later Gupta period?",
        options: [
            "Chandragupta I",
            "Samudragupta",
            "Skandagupta",
            "Kumaragupta I"
        ],
        correct: 2,
        fact: "Skandagupta is celebrated for successfully repelling invasions by the Huna (Hun) tribes, helping preserve the Gupta Empire in its later years."
    },
    {
        question: "Which ancient Indian astronomer proposed that the Earth rotates on its axis?",
        options: [
            "Aryabhata",
            "Varahamihira",
            "Brahmagupta",
            "Bhaskara I"
        ],
        correct: 0,
        fact: "Aryabhata proposed that the Earth rotates on its axis to explain the apparent motion of the stars, a bold idea centuries ahead of its time."
    },
    {
        question: "Which ancient text is attributed to Patanjali and is associated with the study of yoga?",
        options: [
            "Yoga Sutras",
            "Arthashastra",
            "Manusmriti",
            "Natyashastra"
        ],
        correct: 0,
        fact: "Patanjali's Yoga Sutras systematized the philosophy and practice of yoga into an eight-limbed path still studied and practiced worldwide today."
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
            localStorage.setItem("ancientLevel5Unlocked", "true");

            quiz.innerHTML = `
                <div class="result passed-result">

                    <h2> Level 4 Completed!</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        Congratulations! You have passed Level 4.
                    </p>

                    <p>
                        Level 5 has been unlocked!
                    </p>

                    <button
                        class="reload-button"
                        onclick="window.location.href='ancientlvl5.html'">
                        Next Level →
                    </button>

                </div>
            `;

        } else {

            quiz.innerHTML = `
                <div class="result failed-result">

                    <h2>Level 4 Failed</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        You need at least 6 correct answers to unlock Level 5.
                    </p>

                    <p>
                        Level 5 is still locked.
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