const questions = [
  {
    question:
      "Which of the following cloud providers offers Cloud Spanner, a horizontally scalable relational database?",
    options: ["AWS", "Azure", "Google Cloud", "Oracle Cloud"],
    answer: "Google Cloud",
  },
  {
    question:
      "Which feature allows Amazon DynamoDB to automatically adjust throughput capacity as traffic grows?",
    options: [
      "Horizontal scaling",
      "Auto Scaling",
      "Read Replica",
      "Vertical scaling",
    ],
    answer: "Auto Scaling",
  },
  {
    question:
      "Which Azure service is designed to provide globally distributed NoSQL databases?",
    options: [
      "Azure SQL Database",
      "Azure Cosmos DB",
      "Azure Blob Storage",
      "Azure Data Lake",
    ],
    answer: "Azure Cosmos DB",
  },
  {
    question:
      "Which of the following is a main advantage of cloud databases over on-premise databases?",
    options: [
      "Lower network latency",
      "Higher maintenance cost",
      "Elastic scaling",
      "Fixed pricing",
    ],
    answer: "Elastic scaling",
  },
  {
    question:
      "Which AWS database service is optimized for OLAP (Online Analytical Processing) workloads?",
    options: [
      "Amazon RDS",
      "Amazon Aurora",
      "Amazon Redshift",
      "Amazon DynamoDB",
    ],
    answer: "Amazon Redshift",
  },
  {
    question:
      "What type of data is best suited for storage in a NoSQL database?",
    options: [
      "Highly structured data",
      "Transaction-heavy data",
      "Unstructured or semi-structured data",
      "Financial data",
    ],
    answer: "Unstructured or semi-structured data",
  },
  {
    question:
      "Which of the following database engines is NOT supported by Amazon RDS?",
    options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
    answer: "MongoDB",
  },
  {
    question:
      "What is the primary purpose of database replication in cloud environments?",
    options: [
      "Improving security",
      "Providing backup and recovery",
      "Increasing data redundancy and availability",
      "Reducing storage costs",
    ],
    answer: "Increasing data redundancy and availability",
  },
  {
    question:
      "Which of the following is a common method for increasing read performance in cloud databases?",
    options: [
      "Vertical scaling",
      "Read replicas",
      "Backup replication",
      "Encryption",
    ],
    answer: "Read replicas",
  },
  {
    question: "What is the purpose of database partitioning in cloud services?",
    options: [
      "Enhancing security",
      "Distributing data across multiple servers for scalability",
      "Reducing data availability",
      "Eliminating backups",
    ],
    answer: "Distributing data across multiple servers for scalability",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let wrongAnswers = [];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const submitAnswerButton = document.getElementById("submit-answer");
const nextQuestionButton = document.getElementById("next-question");
const scoreElement = document.getElementById("score");

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.textContent = option;
    optionElement.classList.add("option");
    optionElement.addEventListener("click", () => {
      document
        .querySelectorAll(".option")
        .forEach((opt) => opt.classList.remove("selected"));
      optionElement.classList.add("selected");
    });
    optionsContainer.appendChild(optionElement);
  });

  feedbackElement.textContent = "";
  scoreElement.textContent = `Score: ${score}`;
}

function checkAnswer() {
  const selectedOption = document.querySelector(".option.selected");
  if (!selectedOption) {
    feedbackElement.textContent = "Please select an answer.";
    feedbackElement.style.color = "red";
    return;
  }

  const userAnswer = selectedOption.textContent;
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "green";
    score++;
  } else {
    feedbackElement.textContent = `Incorrect! The correct answer is: "${correctAnswer}"`;
    feedbackElement.style.color = "red";
    wrongAnswers.push(questions[currentQuestionIndex]);
  }

  submitAnswerButton.disabled = true;
  nextQuestionButton.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    gameOver();
  } else {
    displayQuestion();
    submitAnswerButton.disabled = false;
    nextQuestionButton.disabled = true;
  }
}

function gameOver() {
  questionElement.textContent = "Game Over!";
  optionsContainer.innerHTML = "";
  feedbackElement.textContent = `Final Score: ${score}`;
  feedbackElement.style.color = "blue";
  nextQuestionButton.style.display = "none";
  if (wrongAnswers.length > 0) {
    let wrongText = "Review these questions:<br>";
    wrongAnswers.forEach((q) => {
      wrongText += `${q.question} Correct answer: ${q.answer}<br>`;
    });
    feedbackElement.innerHTML += `<br>${wrongText}`;
  }
  downloadJSON(wrongAnswers);
}

function downloadJSON(data, filename = "wrong_answers.json") {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

submitAnswerButton.addEventListener("click", checkAnswer);
nextQuestionButton.addEventListener("click", nextQuestion);

// Initialize the first question
displayQuestion();
nextQuestionButton.disabled = true;
