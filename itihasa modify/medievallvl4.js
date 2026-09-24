const quizData = [
    {
        question: "Which ruler is known for building the Alai Darwaza?",
        options: [
            "Iltutmish",
            "Alauddin Khalji",
            "Balban",
            "Muhammad bin Tughlaq"
        ],
        correct: 1,
        fact: "Alauddin Khalji built the Alai Darwaza at the Qutub complex, notable for its horseshoe-shaped arches and being one of the earliest examples of true Islamic architecture in India."
    },
    {
        question: "What was the main purpose of Alauddin Khalji's market regulations?",
        options: [
            "To encourage foreign trade",
            "To maintain low prices and support his large army",
            "To promote agriculture",
            "To reduce the number of soldiers"
        ],
        correct: 1,
        fact: "Alauddin Khalji's market regulations fixed prices on essential goods, ensuring his enormous army could be maintained without draining the treasury."
    },
    {
        question: "Who wrote the Persian work 'Tarikh-i-Firoz Shahi'?",
        options: [
            "Ziauddin Barani",
            "Abul Fazl",
            "Amir Khusrau",
            "Badauni"
        ],
        correct: 0,
        fact: "Ziauddin Barani's Tarikh-i-Firoz Shahi offers a detailed, if opinionated, account of the Delhi Sultanate's political history through the 14th century."
    },
    {
        question: "Which Mughal emperor abolished the jizya tax during his reign?",
        options: [
            "Babur",
            "Humayun",
            "Akbar",
            "Aurangzeb"
        ],
        correct: 2,
        fact: "Akbar abolished the jizya tax on non-Muslims in 1564, a significant step in his broader policy of religious tolerance across the empire."
    },
    {
        question: "The Battle of Khanwa was fought between Babur and which ruler?",
        options: [
            "Rana Sanga",
            "Ibrahim Lodi",
            "Sher Shah Suri",
            "Hemu"
        ],
        correct: 0,
        fact: "At the Battle of Khanwa in 1527, Babur defeated a large confederacy led by Rana Sanga of Mewar, consolidating Mughal control over northern India."
    },
    {
        question: "Which Mughal emperor is associated with the development of Mughal painting during his reign?",
        options: [
            "Jahangir",
            "Babur",
            "Humayun",
            "Aurangzeb"
        ],
        correct: 0,
        fact: "Under Jahangir's patronage, Mughal painting reached new heights of naturalism, particularly in detailed studies of animals, plants, and portraiture."
    },
    {
        question: "Who was the famous Mughal historian and author of the Akbarnama?",
        options: [
            "Abul Fazl",
            "Bairam Khan",
            "Todar Mal",
            "Tansen"
        ],
        correct: 0,
        fact: "Abul Fazl's Akbarnama, along with its statistical appendix the Ain-i-Akbari, remains one of the richest sources for understanding Mughal administration."
    },
    {
        question: "Which ruler built the Grand Trunk Road and introduced important administrative reforms?",
        options: [
            "Sher Shah Suri",
            "Akbar",
            "Iltutmish",
            "Sikandar Lodi"
        ],
        correct: 0,
        fact: "Sher Shah Suri built the Grand Trunk Road, one of Asia's oldest and longest major roads, and introduced reforms like a uniform currency and improved postal system."
    },
    {
        question: "Who was the famous ruler of the Vijayanagara Empire who wrote the work 'Amuktamalyada'?",
        options: [
            "Harihara I",
            "Bukka I",
            "Krishnadevaraya",
            "Deva Raya II"
        ],
        correct: 2,
        fact: "Krishnadevaraya, besides being a great warrior-king, authored the Telugu literary work Amuktamalyada, showcasing his skill as a poet."
    },
    {
        question: "Which Mughal emperor's reign saw the empire reach its greatest territorial extent?",
        options: [
            "Akbar",
            "Jahangir",
            "Shah Jahan",
            "Aurangzeb"
        ],
        correct: 3,
        fact: "Under Aurangzeb, the Mughal Empire reached its largest territorial extent, stretching across nearly the entire Indian subcontinent."
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
            localStorage.setItem("medievalLevel5Unlocked", "true");

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
                        onclick="window.location.href='medievallvl5.html'">
                        Next Level →
                    </button>

                </div>
            `;

        } else {

            quiz.innerHTML = `
                <div class="result failed-result">

                    <h2> Level 4 Failed</h2>

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