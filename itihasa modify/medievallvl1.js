const quizData = [
    {
        question: "Who founded the Delhi Sultanate?",
        options: [
            "Qutb-ud-din Aibak",
            "Alauddin Khalji",
            "Muhammad bin Tughlaq",
            "Ibrahim Lodi"
        ],
        correct: 0,
        fact: "Qutb-ud-din Aibak, a former slave-general of Muhammad Ghori, founded the Delhi Sultanate in 1206, beginning the Mamluk (Slave) dynasty."
    },
    {
        question: "Who built the Qutub Minar in Delhi?",
        options: [
            "Akbar",
            "Qutb-ud-din Aibak",
            "Shah Jahan",
            "Aurangzeb"
        ],
        correct: 1,
        fact: "Qutb-ud-din Aibak began construction of the Qutub Minar to commemorate the start of Muslim rule in Delhi, though it was completed by his successors."
    },
    {
        question: "Who was the founder of the Mughal Empire in India?",
        options: [
            "Akbar",
            "Babur",
            "Humayun",
            "Shah Jahan"
        ],
        correct: 1,
        fact: "Babur, a descendant of both Timur and Genghis Khan, founded the Mughal Empire in 1526 after defeating Ibrahim Lodi at the First Battle of Panipat."
    },
    {
        question: "Who was the son of Babur and the second Mughal emperor?",
        options: [
            "Akbar",
            "Aurangzeb",
            "Humayun",
            "Jahangir"
        ],
        correct: 2,
        fact: "Humayun, Babur's son, lost and later regained his throne after years of exile, and his tomb in Delhi became a model for later Mughal architecture, including the Taj Mahal."
    },
    {
        question: "Who was known as the 'Akbar the Great'?",
        options: [
            "Akbar",
            "Babur",
            "Jahangir",
            "Shah Jahan"
        ],
        correct: 0,
        fact: "Akbar earned the title 'the Great' for expanding the Mughal Empire and promoting religious tolerance through policies like Sulh-i-Kul, or 'peace with all.'"
    },
    {
        question: "Who built the Taj Mahal?",
        options: [
            "Akbar",
            "Jahangir",
            "Shah Jahan",
            "Aurangzeb"
        ],
        correct: 2,
        fact: "Shah Jahan commissioned the Taj Mahal in Agra as a mausoleum for his beloved wife Mumtaz Mahal, and it took roughly 20 years to complete."
    },
    {
        question: "Who was the founder of the Vijayanagara Empire?",
        options: [
            "Harihara and Bukka",
            "Shivaji",
            "Rana Pratap",
            "Krishnadevaraya"
        ],
        correct: 0,
        fact: "Brothers Harihara and Bukka founded the Vijayanagara Empire in 1336, which grew into one of South India's greatest Hindu kingdoms."
    },
    {
        question: "Who founded the Maratha Empire?",
        options: [
            "Rani Durgavati",
            "Shivaji Maharaj",
            "Rana Sanga",
            "Prithviraj Chauhan"
        ],
        correct: 1,
        fact: "Shivaji Maharaj founded the Maratha Empire and was crowned Chhatrapati in 1674, known for his innovative guerrilla warfare tactics."
    },
    {
        question: "Who was the famous Rajput ruler associated with the Battle of Haldighati?",
        options: [
            "Rana Pratap",
            "Prithviraj Chauhan",
            "Rana Sanga",
            "Raja Man Singh"
        ],
        correct: 0,
        fact: "Maharana Pratap of Mewar fought Mughal forces at the Battle of Haldighati in 1576 and is remembered as a symbol of Rajput resistance."
    },
    {
        question: "Which Mughal emperor built the Red Fort in Delhi?",
        options: [
            "Babur",
            "Akbar",
            "Shah Jahan",
            "Aurangzeb"
        ],
        correct: 2,
        fact: "Shah Jahan built the Red Fort in Delhi as his new capital's centerpiece, and it later became an iconic symbol of Indian sovereignty."
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
            localStorage.setItem("medievalLevel2Unlocked", "true");

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
                        onclick="window.location.href='medievallvl2.html'">
                        Next Level →
                    </button>

                </div>
            `;

        } else {

            quiz.innerHTML = `
                <div class="result failed-result">

                    <h2>Level 1 Failed</h2>

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