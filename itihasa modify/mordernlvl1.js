const quizData = [
    {
        question: "Who was the first European to reach India by sea?",
        options: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "Marco Polo"],
        correct: 1,
        fact: "Vasco da Gama became the first European to reach India by sea, landing at Calicut in 1498 after sailing around the Cape of Good Hope."
    },
    {
        question: "In which year did Vasco da Gama reach India?",
        options: ["1492", "1498", "1505", "1510"],
        correct: 1,
        fact: "Vasco da Gama's arrival in Calicut in 1498 opened a direct sea route between Europe and India, reshaping global trade for centuries."
    },
    {
        question: "Which battle marked the beginning of British political rule in Bengal?",
        options: ["Battle of Plassey", "Battle of Buxar", "Battle of Panipat", "Battle of Haldighati"],
        correct: 0,
        fact: "The Battle of Plassey in 1757 ended with the East India Company's victory over Siraj-ud-Daulah, laying the foundation for British colonial rule in Bengal."
    },
    {
        question: "Who founded the Brahmo Samaj?",
        options: ["Swami Vivekananda", "Raja Ram Mohan Roy", "Dayanand Saraswati", "Ishwar Chandra Vidyasagar"],
        correct: 1,
        fact: "Raja Ram Mohan Roy founded the Brahmo Samaj in 1828, campaigning against practices like sati and promoting rational religious reform."
    },
    {
        question: "Who is known as the founder of the Arya Samaj?",
        options: ["Swami Vivekananda", "Raja Ram Mohan Roy", "Swami Dayanand Saraswati", "Ramakrishna Paramahamsa"],
        correct: 2,
        fact: "Swami Dayanand Saraswati founded the Arya Samaj in 1875, advocating a return to Vedic principles and opposing idol worship and caste discrimination."
    },
    {
        question: "In which year did the Revolt of 1857 begin?",
        options: ["1757", "1857", "1885", "1905"],
        correct: 1,
        fact: "The Revolt of 1857 began among sepoys in Meerut before spreading across northern and central India, marking a major challenge to British rule."
    },
    {
        question: "Who was the last Mughal emperor during the Revolt of 1857?",
        options: ["Akbar II", "Bahadur Shah II", "Shah Alam II", "Aurangzeb"],
        correct: 1,
        fact: "Bahadur Shah Zafar, the last Mughal emperor, was proclaimed leader by the rebels of 1857 but was later exiled to Burma after British forces suppressed the revolt."
    },
    {
        question: "Who founded the Indian National Congress in 1885?",
        options: ["A.O. Hume", "Dadabhai Naoroji", "Bal Gangadhar Tilak", "Mahatma Gandhi"],
        correct: 0,
        fact: "A.O. Hume, a retired British civil servant, helped found the Indian National Congress in 1885, which later became the leading vehicle for India's independence movement."
    },
    {
        question: "Who is popularly known as the Father of the Indian Constitution?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
        correct: 2,
        fact: "Dr. B.R. Ambedkar chaired the Constitution's Drafting Committee and is widely honored as the chief architect of India's Constitution."
    },
    {
        question: "Who led the Dandi March in 1930?",
        options: ["Subhas Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
        correct: 1,
        fact: "Mahatma Gandhi led the 1930 Dandi March, walking about 240 miles to the sea to make salt in defiance of the British salt tax."
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
            localStorage.setItem("mordernLevel2Unlocked", "true");

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
                        onclick="window.location.href='mordernlvl2.html'">
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