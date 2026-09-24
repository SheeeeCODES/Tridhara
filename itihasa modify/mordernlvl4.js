const quizData = [
    {
        question: "Which Act transferred the administration of India from the East India Company to the British Crown?",
        options: ["Government of India Act, 1858", "Indian Councils Act, 1861", "Government of India Act, 1919", "Regulating Act, 1773"],
        correct: 0,
        fact: "Passed after the Revolt of 1857, the Government of India Act of 1858 abolished East India Company rule and transferred control of India directly to the British Crown."
    },
    {
        question: "Who was the first Governor-General of independent India?",
        options: ["Lord Mountbatten", "C. Rajagopalachari", "Jawaharlal Nehru", "Lord Wavell"],
        correct: 0,
        fact: "Lord Mountbatten served as the last Viceroy and the first Governor-General of independent India, overseeing the transfer of power and the 1947 partition."
    },
    {
        question: "Which agreement provided for reserved seats for the Depressed Classes in provincial legislatures?",
        options: ["Lucknow Pact", "Poona Pact", "Gandhi-Irwin Pact", "Delhi Pact"],
        correct: 1,
        fact: "The 1932 Poona Pact, agreed between Gandhi and B.R. Ambedkar, replaced separate electorates for the Depressed Classes with reserved seats within the general electorate."
    },
    {
        question: "Which Round Table Conference was attended by Mahatma Gandhi as the sole representative of the Indian National Congress?",
        options: ["First", "Second", "Third", "All three"],
        correct: 1,
        fact: "Gandhi attended only the Second Round Table Conference, in 1931, as the Congress's sole representative, though the talks ended largely without agreement."
    },
    {
        question: "Which Act introduced provincial autonomy in British India?",
        options: ["Government of India Act, 1909", "Government of India Act, 1919", "Government of India Act, 1935", "Indian Independence Act, 1947"],
        correct: 2,
        fact: "The Government of India Act of 1935 introduced provincial autonomy and laid out a federal structure, later serving as a template for independent India's Constitution."
    },
    {
        question: "Who founded the Forward Bloc in 1939?",
        options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Sardar Patel", "Maulana Abul Kalam Azad"],
        correct: 1,
        fact: "Subhas Chandra Bose founded the Forward Bloc in 1939 after breaking from the Congress, advocating a more radical and immediate push for independence."
    },
    {
        question: "Which mission proposed a federal union of India while allowing provinces to retain substantial autonomy?",
        options: ["Cripps Mission", "Cabinet Mission", "Simon Commission", "Hunter Commission"],
        correct: 1,
        fact: "The 1946 Cabinet Mission proposed a loose federal union of India with significant provincial autonomy, an attempt to avoid partition that ultimately failed."
    },
    {
        question: "Who was the British Prime Minister who announced the transfer of power to India by June 1948?",
        options: ["Winston Churchill", "Clement Attlee", "Anthony Eden", "Neville Chamberlain"],
        correct: 1,
        fact: "British Prime Minister Clement Attlee announced in 1947 that Britain would transfer power to India by June 1948, a timeline later moved up to August 1947."
    },
    {
        question: "The Indian Independence Act was passed by the British Parliament in which year?",
        options: ["1945", "1946", "1947", "1950"],
        correct: 2,
        fact: "The Indian Independence Act, passed by the British Parliament in 1947, formally ended British rule and created the independent dominions of India and Pakistan."
    },
    {
        question: "Who was the first Indian Governor-General of independent India?",
        options: ["Rajendra Prasad", "C. Rajagopalachari", "Sardar Patel", "Jawaharlal Nehru"],
        correct: 1,
        fact: "C. Rajagopalachari became the first and only Indian to serve as Governor-General of India, holding the largely ceremonial post from 1948 to 1950."
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
            localStorage.setItem("mordernLevel5Unlocked", "true");

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
                        onclick="window.location.href='mordernlvl5.html'">
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