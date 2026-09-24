const quizData = [
    {
        question: "Which Mughal emperor granted the English East India Company permission to trade in Bengal?",
        options: ["Aurangzeb", "Farrukhsiyar", "Akbar II", "Bahadur Shah II"],
        correct: 1,
        fact: "Mughal emperor Farrukhsiyar issued a farman in 1717 granting the East India Company duty-free trading rights in Bengal, a privilege that greatly boosted its commercial power."
    },
    {
        question: "The Battle of Buxar was fought in which year?",
        options: ["1757", "1764", "1773", "1857"],
        correct: 1,
        fact: "The Battle of Buxar in 1764 saw the East India Company defeat a combined force of the Mughal emperor, the Nawab of Awadh, and the Nawab of Bengal, cementing British dominance."
    },
    {
        question: "Who introduced the Permanent Settlement in Bengal?",
        options: ["Lord Dalhousie", "Lord Cornwallis", "Lord Curzon", "Lord Wellesley"],
        correct: 1,
        fact: "Lord Cornwallis introduced the Permanent Settlement in 1793, fixing land revenue rates in Bengal permanently and creating a new class of zamindars."
    },
    {
        question: "Who introduced the Doctrine of Lapse?",
        options: ["Lord Dalhousie", "Lord Curzon", "Lord Cornwallis", "Lord Wellesley"],
        correct: 0,
        fact: "Lord Dalhousie's Doctrine of Lapse allowed the British to annex princely states whose rulers died without a natural heir, fueling resentment that contributed to the 1857 revolt."
    },
    {
        question: "Who founded the Ramakrishna Mission?",
        options: ["Swami Vivekananda", "Raja Ram Mohan Roy", "Dayanand Saraswati", "Sri Aurobindo"],
        correct: 0,
        fact: "Swami Vivekananda founded the Ramakrishna Mission in 1897, combining spiritual teaching with social service, education, and relief work."
    },
    {
        question: "Who started the Aligarh Movement?",
        options: ["Sir Syed Ahmad Khan", "Badruddin Tyabji", "Maulana Azad", "Muhammad Ali Jinnah"],
        correct: 0,
        fact: "Sir Syed Ahmad Khan started the Aligarh Movement to promote modern, Western-style education among Indian Muslims, founding the institution that became Aligarh Muslim University."
    },
    {
        question: "The Partition of Bengal took place in which year?",
        options: ["1905", "1906", "1911", "1919"],
        correct: 0,
        fact: "The 1905 Partition of Bengal, ostensibly for administrative convenience, was widely seen as a 'divide and rule' tactic and sparked the Swadeshi Movement."
    },
    {
        question: "Who gave the slogan 'Swaraj is my birthright and I shall have it'?",
        options: ["Lala Lajpat Rai", "Bal Gangadhar Tilak", "Gopal Krishna Gokhale", "Mahatma Gandhi"],
        correct: 1,
        fact: "Bal Gangadhar Tilak's famous declaration, 'Swaraj is my birthright and I shall have it,' became a rallying cry for the early Indian independence movement."
    },
    {
        question: "Which movement was launched by Mahatma Gandhi in 1920?",
        options: ["Quit India Movement", "Non-Cooperation Movement", "Civil Disobedience Movement", "Swadeshi Movement"],
        correct: 1,
        fact: "Gandhi launched the Non-Cooperation Movement in 1920, urging Indians to boycott British goods, schools, and institutions in a mass campaign of peaceful resistance."
    },
    {
        question: "The Jallianwala Bagh massacre took place in which year?",
        options: ["1915", "1919", "1922", "1930"],
        correct: 1,
        fact: "The Jallianwala Bagh massacre of 1919, in which British troops fired on an unarmed crowd in Amritsar, became a turning point that galvanized the independence movement."
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
            localStorage.setItem("mordernLevel3Unlocked", "true");

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
                        onclick="window.location.href='mordernlvl3.html'">
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