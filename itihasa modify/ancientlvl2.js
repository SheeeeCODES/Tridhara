const quizData = [
    {
        question: "Which Harappan site is famous for its ancient dockyard?",
        options: [
            "Lothal",
            "Harappa",
            "Kalibangan",
            "Rakhigarhi"
        ],
        correct: 0,
        fact: "Lothal, in present-day Gujarat, had a remarkable dockyard, suggesting the Harappans engaged in maritime trade with distant regions like Mesopotamia."
    },
    {
        question: "Which metal was NOT commonly used by the people of the Indus Valley Civilization?",
        options: [
            "Copper",
            "Bronze",
            "Gold",
            "Iron"
        ],
        correct: 3,
        fact: "The Indus Valley people worked skillfully with copper and bronze, but iron technology did not arrive in the subcontinent until later, during the Vedic period."
    },
    {
        question: "Who was the author of the Arthashastra?",
        options: [
            "Kalidasa",
            "Chanakya",
            "Banabhatta",
            "Panini"
        ],
        correct: 1,
        fact: "Chanakya, also known as Kautilya, wrote the Arthashastra, a detailed treatise on statecraft, economics, and military strategy that guided the Mauryan administration."
    },
    {
        question: "Which ancient Indian ruler adopted Buddhism after the Kalinga War?",
        options: [
            "Chandragupta Maurya",
            "Bindusara",
            "Ashoka",
            "Kanishka"
        ],
        correct: 2,
        fact: "The Kalinga War so deeply moved Ashoka that he adopted Buddhism and had edicts of peace and morality carved on pillars and rocks across his empire."
    },
    {
        question: "The Third Buddhist Council was held during the reign of which ruler?",
        options: [
            "Ashoka",
            "Chandragupta Maurya",
            "Kanishka",
            "Harsha"
        ],
        correct: 0,
        fact: "The Third Buddhist Council, held at Pataliputra during Ashoka's reign, helped standardize Buddhist teachings and organized missions to spread the faith abroad."
    },
    {
        question: "Which ancient Indian scholar is associated with the Sanskrit grammar text Ashtadhyayi?",
        options: [
            "Charaka",
            "Panini",
            "Aryabhata",
            "Sushruta"
        ],
        correct: 1,
        fact: "Panini's Ashtadhyayi is one of the earliest and most systematic works of linguistics in the world, codifying the rules of Sanskrit grammar in under 4,000 verses."
    },
    {
        question: "Who wrote the ancient Indian medical text Charaka Samhita?",
        options: [
            "Charaka",
            "Sushruta",
            "Aryabhata",
            "Varahamihira"
        ],
        correct: 0,
        fact: "Charaka's Charaka Samhita is a foundational text of Ayurveda, covering diagnosis, treatment, and the ethics of medical practice in ancient India."
    },
    {
        question: "Which Gupta ruler is known for his extensive military conquests and is described in the Allahabad Pillar inscription?",
        options: [
            "Chandragupta I",
            "Samudragupta",
            "Chandragupta II",
            "Skandagupta"
        ],
        correct: 1,
        fact: "The Allahabad Pillar inscription, composed by the poet Harisena, praises Samudragupta's military conquests and earned him the nickname 'Napoleon of India' from later historians."
    },
    {
        question: "Which ancient Indian mathematician is famous for his work Aryabhatiya?",
        options: [
            "Aryabhata",
            "Brahmagupta",
            "Varahamihira",
            "Panini"
        ],
        correct: 0,
        fact: "In his work Aryabhatiya, the mathematician Aryabhata calculated the value of pi and explained the causes of solar and lunar eclipses through astronomy rather than mythology."
    },
    {
        question: "Which ruler is associated with the spread of Mahayana Buddhism and the Fourth Buddhist Council?",
        options: [
            "Ashoka",
            "Kanishka",
            "Samudragupta",
            "Harshavardhana"
        ],
        correct: 1,
        fact: "Emperor Kanishka of the Kushan dynasty patronized the Fourth Buddhist Council, which helped spread Mahayana Buddhism into Central Asia and China."
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
            localStorage.setItem("ancientLevel3Unlocked", "true");

            quiz.innerHTML = `
                <div class="result passed-result">

                    <h2>Level 2 Completed!</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        Congratulations! You have passed Level 2.
                    </p>

                    <p>
                        Level 3 has been unlocked!
                    </p>

                    <button
                        class="reload-button"
                        onclick="window.location.href='ancientlvl3.html'">
                        Next Level →
                    </button>

                </div>
            `;

        } else {

            quiz.innerHTML = `
                <div class="result failed-result">

                    <h2> Level 2 Failed</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        You need at least 6 correct answers to unlock Level 3.
                    </p>

                    <p>
                        Level 3 is still locked.
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