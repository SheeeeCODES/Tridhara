const quizData = [
    {
        question: "Which Charter Act ended the East India Company's monopoly over trade with China?",
        options: ["Charter Act of 1813", "Charter Act of 1833", "Charter Act of 1853", "Regulating Act of 1773"],
        correct: 1,
        fact: "The Charter Act of 1833 ended the East India Company's remaining monopoly on trade with China, turning it into a purely administrative body in India."
    },
    {
        question: "Which Governor-General is associated with the introduction of the Subsidiary Alliance system?",
        options: ["Lord Cornwallis", "Lord Wellesley", "Lord Hastings", "Lord Dalhousie"],
        correct: 1,
        fact: "Lord Wellesley introduced the Subsidiary Alliance system, under which Indian rulers accepted British troops and control over foreign affairs in exchange for protection."
    },
    {
        question: "Who described the economic exploitation of India through the 'Drain of Wealth' theory?",
        options: ["Dadabhai Naoroji", "R.C. Dutt", "Gopal Krishna Gokhale", "M.G. Ranade"],
        correct: 0,
        fact: "Dadabhai Naoroji's 'Drain of Wealth' theory argued that British policies systematically transferred India's wealth to Britain, fueling economic nationalism."
    },
    {
        question: "Which Congress session is associated with the adoption of the resolution on Fundamental Rights and National Economic Programme?",
        options: ["Lahore Session, 1929", "Karachi Session, 1931", "Lucknow Session, 1916", "Calcutta Session, 1920"],
        correct: 1,
        fact: "The 1931 Karachi Session of the Congress adopted a resolution on Fundamental Rights and a National Economic Programme, linking political freedom to social and economic reform."
    },
    {
        question: "Which proposal offered India dominion status after World War II but was rejected by the Congress and other groups?",
        options: ["Cripps Proposals", "Cabinet Mission Plan", "Wavell Plan", "August Offer"],
        correct: 0,
        fact: "The 1942 Cripps Proposals offered India dominion status after the war but were rejected by the Congress for not promising immediate self-government."
    },
    {
        question: "Which plan provided the framework for the partition of British India into India and Pakistan?",
        options: ["Cabinet Mission Plan", "Mountbatten Plan", "Cripps Proposal", "Wavell Plan"],
        correct: 1,
        fact: "The Mountbatten Plan of 1947 laid out the framework for partitioning British India into the independent nations of India and Pakistan."
    },
    {
        question: "Who was the chairman of the Drafting Committee of the Constituent Assembly?",
        options: ["Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Dr. B.R. Ambedkar", "Rajendra Prasad"],
        correct: 2,
        fact: "Dr. B.R. Ambedkar chaired the Constituent Assembly's Drafting Committee, playing the central role in shaping India's Constitution."
    },
    {
        question: "Which event led Mahatma Gandhi to suspend the Non-Cooperation Movement in 1922?",
        options: ["Jallianwala Bagh massacre", "Chauri Chaura incident", "Simon Commission", "Dandi March"],
        correct: 1,
        fact: "After violence broke out at Chauri Chaura in 1922, where a mob killed police officers, Gandhi called off the Non-Cooperation Movement to uphold his commitment to non-violence."
    },
    {
        question: "Which resolution of the Indian National Congress declared that political freedom was incomplete without economic justice?",
        options: ["Karachi Resolution of 1931", "Lahore Resolution of 1929", "Lucknow Pact of 1916", "Surat Resolution of 1907"],
        correct: 0,
        fact: "The Karachi Resolution of 1931 declared that political freedom must go hand in hand with economic justice, outlining social and economic rights for citizens."
    },
    {
        question: "Which statement best describes the main significance of the Government of India Act, 1935?",
        options: [
            "It granted immediate independence to India",
            "It introduced provincial autonomy and proposed a federation",
            "It abolished the office of the Viceroy",
            "It introduced universal adult franchise"
            
        ],
        correct: 1,
        fact: "The Government of India Act of 1935 is significant for introducing provincial autonomy and proposing an all-India federation, ideas that shaped later constitutional design."
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


        // =========================
        // PLAYER PASSED
        // =========================

        if (score >= passingMarks) {

            // UNLOCK LEVEL 5
            localStorage.setItem("mordernLevel5Unlocked", "true");

            quiz.innerHTML = `
                <div class="result passed-result">

                    <h2> Level 5 Completed!</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        Congratulations! You have passed Level 5.
                    </p>

                    <p>
                        You Have Pass This Era.
                    </p>

                    <button
                        class="reload-button"
                        onclick="window.location.href='era.html'">
                        Back to home
                    </button>

                </div>
            `;

        }

        // =========================
        // PLAYER FAILED
        // =========================

        else {

            quiz.innerHTML = `
                <div class="result failed-result">

                    <h2> Level 5 Failed</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        You need at least 6 correct answers pass this era.
                    </p>

                    <p>
                        This era is still incomplete.
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