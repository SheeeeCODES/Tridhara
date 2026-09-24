const quizData = [
    {
        question: "Who introduced the Iqta system more systematically in the Delhi Sultanate?",
        options: [
            "Iltutmish",
            "Alauddin Khalji",
            "Balban",
            "Ibrahim Lodi"
        ],
        correct: 0,
        fact: "Iltutmish organized the Iqta system more systematically, assigning land revenue territories to nobles and soldiers in exchange for military service, strengthening Sultanate administration."
    },
    {
        question: "Which ruler introduced strict market control measures in Delhi?",
        options: [
            "Balban",
            "Alauddin Khalji",
            "Firoz Shah Tughlaq",
            "Sikandar Lodi"
        ],
        correct: 1,
        fact: "Alauddin Khalji imposed strict price controls on grain, cloth, and other goods in Delhi's markets to maintain a large, well-supplied standing army at low cost."
    },
    {
        question: "Who was the famous Sufi saint associated with the Chishti order in Delhi?",
        options: [
            "Nizamuddin Auliya",
            "Kabir",
            "Guru Nanak",
            "Ramananda"
        ],
        correct: 0,
        fact: "Sufi saint Nizamuddin Auliya of the Chishti order preached love and devotion to God, and his shrine in Delhi remains a major pilgrimage site today."
    },
    {
        question: "Who founded the Mughal Empire after winning the First Battle of Panipat?",
        options: [
            "Humayun",
            "Akbar",
            "Babur",
            "Sher Shah Suri"
        ],
        correct: 2,
        fact: "Babur's decisive victory at the First Battle of Panipat in 1526, aided by cannons and matchlock guns, ended the Lodi dynasty and founded Mughal rule."
    },
    {
        question: "Who defeated Humayun and established the Sur Empire?",
        options: [
            "Sher Shah Suri",
            "Ibrahim Lodi",
            "Rana Sanga",
            "Bairam Khan"
        ],
        correct: 0,
        fact: "Sher Shah Suri defeated Humayun and briefly established the Sur Empire, introducing administrative reforms like the rupiya coin later adopted by the Mughals."
    },
    {
        question: "Which Mughal emperor introduced the Mansabdari system?",
        options: [
            "Babur",
            "Akbar",
            "Jahangir",
            "Aurangzeb"
        ],
        correct: 1,
        fact: "Akbar introduced the Mansabdari system, ranking nobles and officials by numerical grades that determined their salary, status, and military obligations."
    },
    {
        question: "Who was Akbar's famous revenue minister?",
        options: [
            "Birbal",
            "Todar Mal",
            "Abul Fazl",
            "Man Singh"
        ],
        correct: 1,
        fact: "Todar Mal served as Akbar's revenue minister and devised a systematic land revenue assessment method known as the 'Zabti' system."
    },
    {
        question: "Which battle established Akbar's control over northern India in 1556?",
        options: [
            "First Battle of Panipat",
            "Battle of Haldighati",
            "Second Battle of Panipat",
            "Battle of Khanwa"
        ],
        correct: 2,
        fact: "The Second Battle of Panipat in 1556, won by Akbar's regent Bairam Khan against Hemu, secured young Akbar's control over northern India."
    },
    {
        question: "Who founded the Bahmani Sultanate in the Deccan?",
        options: [
            "Alauddin Bahman Shah",
            "Krishnadevaraya",
            "Harihara I",
            "Mahmud Gawan"
        ],
        correct: 0,
        fact: "Alauddin Bahman Shah founded the Bahmani Sultanate in the Deccan in 1347 after rebelling against the Delhi Sultanate."
    },
    {
        question: "Which Bhakti saint is famous for his devotional songs and teachings that emphasized devotion to God?",
        options: [
            "Kabir",
            "Amir Khusrau",
            "Al-Biruni",
            "Abul Fazl"
        ],
        correct: 0,
        fact: "Kabir, a poet-saint of the Bhakti movement, composed verses blending Hindu and Islamic devotional ideas, emphasizing unity and inner faith over ritual."
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
            localStorage.setItem("medievalLevel4Unlocked", "true");

            quiz.innerHTML = `
                <div class="result passed-result">

                    <h2> Level 3 Completed!</h2>

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
                        onclick="window.location.href='medievallvl4.html'">
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