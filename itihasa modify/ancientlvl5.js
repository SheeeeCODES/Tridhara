const quizData = [
    {
        question: "Which evidence provides the strongest indication that the Harappans had long-distance trade with Mesopotamia?",
        options: [
            "Mesopotamian references to Meluhha",
            "Ashokan inscriptions",
            "Gupta coins",
            "Buddhist manuscripts"
        ],
        correct: 0,
        fact: "Ancient Mesopotamian texts refer to a trading partner called 'Meluhha,' widely identified by scholars with the Indus Valley Civilization, pointing to long-distance maritime trade."
    },
    {
        question: "Which Harappan site is particularly significant for its large water-management system and reservoirs?",
        options: [
            "Dholavira",
            "Harappa",
            "Mohenjo-daro",
            "Kalibangan"
        ],
        correct: 0,
        fact: "Dholavira's elaborate network of reservoirs and stepwells demonstrates one of the most advanced ancient water-conservation systems found anywhere in the world."
    },
    {
        question: "Which Mauryan ruler sent Buddhist missions to different regions according to Buddhist traditions?",
        options: [
            "Chandragupta Maurya",
            "Bindusara",
            "Ashoka",
            "Dasharatha"
        ],
        correct: 2,
        fact: "Buddhist tradition credits Ashoka with sending missionaries, including his own son Mahinda, to Sri Lanka and other regions to spread Buddhist teachings."
    },
    {
        question: "Which inscription is the main source for understanding Samudragupta's military campaigns?",
        options: [
            "Junagadh inscription",
            "Allahabad Pillar inscription",
            "Hathigumpha inscription",
            "Nasik inscription"
        ],
        correct: 1,
        fact: "Composed by court poet Harisena, the Allahabad Pillar inscription is the principal source detailing Samudragupta's extensive military campaigns."
    },
    {
        question: "The Junagadh inscription of Rudradaman is especially important because it is written in which language?",
        options: [
            "Classical Sanskrit",
            "Pali",
            "Prakrit",
            "Tamil"
        ],
        correct: 0,
        fact: "The Junagadh inscription of Rudradaman is notable as one of the earliest known inscriptions written in polished, classical Sanskrit prose."
    },
    {
        question: "Which ancient Indian mathematical work contains an early systematic treatment of arithmetic and astronomy by Aryabhata?",
        options: [
            "Aryabhatiya",
            "Brihat Samhita",
            "Lilavati",
            "Siddhanta Shiromani"
        ],
        correct: 0,
        fact: "Written when Aryabhata was just 23, the Aryabhatiya condensed advanced mathematics and astronomy into concise verses meant to be memorized."
    },
    {
        question: "Which Gupta-era university became a major centre of Buddhist learning and attracted students from other parts of Asia?",
        options: [
            "Nalanda",
            "Vallabhi",
            "Takshashila",
            "Ujjain"
        ],
        correct: 0,
        fact: "Nalanda flourished as a major Buddhist learning center during the Gupta era, with thousands of resident monks and students from across Asia."
    },
    {
        question: "Which ruler is associated with the Hathigumpha inscription?",
        options: [
            "Kharavela",
            "Rudradaman",
            "Kanishka",
            "Gautamiputra Satakarni"
        ],
        correct: 0,
        fact: "The Hathigumpha inscription, carved in a cave near Bhubaneswar, records the military achievements and public works of King Kharavela of Kalinga."
    },
    {
        question: "Which dynasty is associated with the famous Amaravati school of Buddhist art?",
        options: [
            "Satavahana",
            "Maurya",
            "Gupta",
            "Kushan"
        ],
        correct: 0,
        fact: "The Satavahana dynasty patronized the Amaravati school of art, known for its intricately carved limestone panels depicting scenes from the Buddha's life."
    },
    {
        question: "Which ancient Indian text is considered one of the earliest systematic works on dramaturgy, dance, and performing arts?",
        options: [
            "Natya Shastra",
            "Arthashastra",
            "Ashtadhyayi",
            "Charaka Samhita"
        ],
        correct: 0,
        fact: "The Natya Shastra, traditionally attributed to sage Bharata, is one of the world's oldest surviving treatises on drama, dance, and aesthetics."
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
            localStorage.setItem("ancientLevel5Unlocked", "true");

            quiz.innerHTML = `
                <div class="result passed-result">

                    <h2>  Level 5 Completed!</h2>

                    <h3>
                        Your Score: ${score}/${quizData.length}
                    </h3>

                    <p>
                        Congratulations! You have passed Level 5.
                    </p>

                    <p>
                        You have passed this era.
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
                        You need at least 6 correct answers to pass this era.
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