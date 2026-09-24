const quizData = [
    {
        question: "Who introduced the system of branding horses and maintaining a descriptive register of soldiers?",
        options: [
            "Alauddin Khalji",
            "Iltutmish",
            "Balban",
            "Muhammad bin Tughlaq"
        ],
        correct: 0,
        fact: "Alauddin Khalji introduced the 'dagh' (branding) system for cavalry horses and a 'chehra' (descriptive roll) of soldiers to curb corruption and desertion in his army."
    },
    {
        question: "Who was the first woman ruler of the Delhi Sultanate?",
        options: [
            "Nur Jahan",
            "Razia Sultan",
            "Chand Bibi",
            "Rani Durgavati"
        ],
        correct: 1,
        fact: "Razia Sultan became the first and only woman to rule the Delhi Sultanate, governing capably despite strong opposition from the nobility."
    },
    {
        question: "Which Mughal emperor introduced the policy of Sulh-i-kul?",
        options: [
            "Babur",
            "Humayun",
            "Akbar",
            "Aurangzeb"
        ],
        correct: 2,
        fact: "Akbar's policy of Sulh-i-Kul, or 'peace with all,' encouraged dialogue between different faiths and helped him govern a religiously diverse empire."
    },
    {
        question: "The Battle of Plassey was fought in which year?",
        options: [
            "1526",
            "1556",
            "1576",
            "1757"
        ],
        correct: 3,
        fact: "The Battle of Plassey in 1757, where Robert Clive's forces defeated Siraj-ud-Daulah, marked the beginning of British political dominance in India."
    },
    {
        question: "Who wrote the famous work 'Akbarnama'?",
        options: [
            "Abul Fazl",
            "Amir Khusrau",
            "Tansen",
            "Birbal"
        ],
        correct: 0,
        fact: "Abul Fazl, a close courtier of Akbar, wrote the Akbarnama, an official chronicle detailing the emperor's reign and administration in vivid detail."
    },
    {
        question: "Which Mughal emperor is associated with the construction of the Buland Darwaza?",
        options: [
            "Akbar",
            "Jahangir",
            "Shah Jahan",
            "Aurangzeb"
        ],
        correct: 0,
        fact: "Akbar built the towering Buland Darwaza at Fatehpur Sikri to commemorate his military victory in Gujarat, making it one of the largest gateways in the world."
    },
    {
        question: "Who founded the Sikh religion?",
        options: [
            "Guru Arjan",
            "Guru Gobind Singh",
            "Guru Nanak",
            "Guru Tegh Bahadur"
        ],
        correct: 2,
        fact: "Guru Nanak founded Sikhism in the 15th century, emphasizing devotion to one God, equality, and community service."
    },
    {
        question: "Which ruler shifted the capital from Delhi to Daulatabad?",
        options: [
            "Alauddin Khalji",
            "Muhammad bin Tughlaq",
            "Firoz Shah Tughlaq",
            "Iltutmish"
        ],
        correct: 1,
        fact: "Muhammad bin Tughlaq controversially shifted his capital from Delhi to Daulatabad in the Deccan, a decision later reversed due to logistical hardships."
    },
    {
        question: "Who was the famous ruler of the Vijayanagara Empire during its greatest period of prosperity?",
        options: [
            "Krishnadevaraya",
            "Harihara I",
            "Bukka Raya I",
            "Deva Raya II"
        ],
        correct: 0,
        fact: "Under Krishnadevaraya, the Vijayanagara Empire reached its cultural and economic peak, with the capital Hampi becoming a thriving center of trade and art."
    },
    {
        question: "The Battle of Haldighati was fought between Maharana Pratap and the forces of which Mughal emperor?",
        options: [
            "Babur",
            "Akbar",
            "Jahangir",
            "Shah Jahan"
        ],
        correct: 1,
        fact: "At the Battle of Haldighati in 1576, forces led by Akbar's general Man Singh clashed with Maharana Pratap's Rajput army in a fiercely contested battle."
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

            // UNLOCK LEVEL 3
            localStorage.setItem("medievalLevel3Unlocked", "true");

            quiz.innerHTML = `
                <div class="result passed-result">

                    <h2> Level 2 Completed!</h2>

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
                        onclick="window.location.href='medievallvl3.html'">
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