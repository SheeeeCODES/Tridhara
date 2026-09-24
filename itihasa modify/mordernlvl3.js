const quizData = [
    {
        question: "Who founded the Servants of India Society?",
        options: ["Gopal Krishna Gokhale", "Bal Gangadhar Tilak", "Dadabhai Naoroji", "Lala Lajpat Rai"],
        correct: 0,
        fact: "Gopal Krishna Gokhale founded the Servants of India Society in 1905 to train dedicated workers for social and political service, and he mentored a young Mahatma Gandhi."
    },
    {
        question: "Who among the following was associated with the Home Rule Movement?",
        options: ["Annie Besant", "Lord Curzon", "Lord Dalhousie", "Warren Hastings"],
        correct: 0,
        fact: "Annie Besant, a British theosophist, co-founded the Home Rule Movement in India, campaigning for self-government within the British Empire."
    },
    {
        question: "Which Act introduced dyarchy in the provinces?",
        options: ["Indian Councils Act, 1909", "Government of India Act, 1919", "Government of India Act, 1935", "Indian Independence Act, 1947"],
        correct: 1,
        fact: "The Government of India Act of 1919, also called the Montagu-Chelmsford Reforms, introduced dyarchy, dividing provincial subjects between elected ministers and British officials."
    },
    {
        question: "Who led the Indian National Army during its major revival in World War II?",
        options: ["Bhagat Singh", "Subhas Chandra Bose", "Chandrashekhar Azad", "Rajendra Prasad"],
        correct: 1,
        fact: "Subhas Chandra Bose revived and led the Indian National Army during World War II, seeking Japanese support to fight British rule and famously declaring, 'Give me blood, and I shall give you freedom.'"
    },
    {
        question: "The Simon Commission was appointed in which year?",
        options: ["1919", "1922", "1927", "1935"],
        correct: 2,
        fact: "The Simon Commission was appointed by the British government in 1927 to review constitutional reforms in India."
    },
    {
        question: "Why was the Simon Commission opposed in India?",
        options: ["It proposed partition of India", "It had no Indian member", "It supported British withdrawal", "It abolished provincial governments"],
        correct: 1,
        fact: "The Simon Commission provoked nationwide protests because it included no Indian members, prompting slogans of 'Simon, Go Back' across the country."
    },
    {
        question: "Who chaired the committee that prepared the Nehru Report?",
        options: ["Motilal Nehru", "Jawaharlal Nehru", "Sardar Patel", "Dr. B.R. Ambedkar"],
        correct: 0,
        fact: "Motilal Nehru chaired the committee that produced the Nehru Report in 1928, one of the first Indian-drafted proposals for a constitutional framework."
    },
    {
        question: "The Lahore Session of the Indian National Congress in 1929 declared which goal?",
        options: ["Dominion Status", "Purna Swaraj", "Separate Electorates", "Provincial Autonomy"],
        correct: 1,
        fact: "At its 1929 Lahore Session, the Indian National Congress declared 'Purna Swaraj' (complete independence) as its goal."
    },
    {
        question: "Which agreement followed the Gandhi-Irwin Pact?",
        options: ["Lucknow Pact", "Poona Pact", "Second Round Table Conference", "Cabinet Mission"],
        correct: 2,
        fact: "Following the Gandhi-Irwin Pact of 1931, Gandhi attended the Second Round Table Conference in London as the Congress's sole representative."
    },
    {
        question: "Who was the Viceroy of India when the Quit India Movement was launched?",
        options: ["Lord Irwin", "Lord Wavell", "Lord Linlithgow", "Lord Mountbatten"],
        correct: 2,
        fact: "Lord Linlithgow was Viceroy of India when the Quit India Movement erupted in 1942, and his administration responded with mass arrests of Congress leaders."
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
            localStorage.setItem("mordernLevel4Unlocked", "true");

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
                        onclick="window.location.href='mordernlvl4.html'">
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