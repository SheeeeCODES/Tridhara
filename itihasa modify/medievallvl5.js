const quizData = [
    {
        question: "Which battle marked the beginning of Mughal rule in India?",
        options: [
            "Battle of Khanwa",
            "First Battle of Panipat",
            "Battle of Haldighati",
            "Second Battle of Panipat"
        ],
        correct: 1,
        fact: "The First Battle of Panipat in 1526 saw Babur's smaller but artillery-equipped force defeat Ibrahim Lodi, marking the start of Mughal rule in India."
    },
    {
        question: "Which administrative system formed an important part of Akbar's military and civil administration?",
        options: [
            "Iqta System",
            "Mansabdari System",
            "Zamindari System",
            "Ryotwari System"
        ],
        correct: 1,
        fact: "The Mansabdari System assigned every officer a rank (mansab) indicating both civil status and the number of troops they were obligated to maintain."
    },
    {
        question: "Who was the author of 'Baburnama'?",
        options: [
            "Abul Fazl",
            "Babur",
            "Jahangir",
            "Gulbadan Begum"
        ],
        correct: 1,
        fact: "Babur's memoir, the Baburnama, written in Chagatai Turkish, is remarkably candid and personal, covering his conquests as well as his love of gardens and nature."
    },
    {
        question: "Which Mughal princess wrote the 'Humayun-nama'?",
        options: [
            "Jahanara Begum",
            "Gulbadan Begum",
            "Nur Jahan",
            "Mumtaz Mahal"
        ],
        correct: 1,
        fact: "Gulbadan Begum, Humayun's half-sister, wrote the Humayun-nama, offering a rare women's perspective on Mughal court life."
    },
    {
        question: "Which battle in 1565 severely weakened the Vijayanagara Empire?",
        options: [
            "Battle of Talikota",
            "Battle of Haldighati",
            "Battle of Khanwa",
            "Battle of Plassey"
        ],
        correct: 0,
        fact: "The Battle of Talikota in 1565 saw a coalition of Deccan Sultanates crush Vijayanagara's forces, leading to the sack of its capital, Hampi."
    },
    {
        question: "Which ruler is associated with the construction of the city of Fatehpur Sikri?",
        options: [
            "Humayun",
            "Akbar",
            "Jahangir",
            "Shah Jahan"
        ],
        correct: 1,
        fact: "Akbar built the planned city of Fatehpur Sikri as his new capital, though it was abandoned within years, reportedly due to water shortages."
    },
    {
        question: "Which Mughal emperor's religious policy included the establishment of the Ibadat Khana at Fatehpur Sikri?",
        options: [
            "Akbar",
            "Jahangir",
            "Shah Jahan",
            "Aurangzeb"
        ],
        correct: 0,
        fact: "Akbar established the Ibadat Khana ('House of Worship') at Fatehpur Sikri to host debates among scholars of different religions."
    },
    {
        question: "Who was the Maratha ruler who established an independent kingdom in western India and was crowned at Raigad?",
        options: [
            "Shivaji Maharaj",
            "Sambhaji",
            "Baji Rao I",
            "Balaji Vishwanath"
        ],
        correct: 0,
        fact: "Shivaji Maharaj was formally crowned Chhatrapati at his hill fort of Raigad in 1674, establishing an independent Maratha kingdom."
    },
    {
        question: "Which Sufi tradition became particularly influential in medieval North India through saints such as Nizamuddin Auliya?",
        options: [
            "Chishti Order",
            "Suhrawardi Order",
            "Naqshbandi Order",
            "Qadiri Order"
        ],
        correct: 0,
        fact: "The Chishti Order, brought to India by Khwaja Moinuddin Chishti, became one of the most influential Sufi traditions, known for its emphasis on love and service."
    },
    {
        question: "Which Mughal emperor reimposed the jizya tax in 1679?",
        options: [
            "Akbar",
            "Jahangir",
            "Shah Jahan",
            "Aurangzeb"
        ],
        correct: 3,
        fact: "Aurangzeb reimposed the jizya tax on non-Muslim subjects in 1679, reversing a long-standing policy of religious tolerance from Akbar's era."
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
            localStorage.setItem("medievalLevel5Unlocked", "true");

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