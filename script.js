const questions = [
    {
     question: "Which is the Prime Minister of India?" ,
      answers:[
        {text:"Yogi Aaditya Nath ", correct: false },
        {text:"Arvind Kajerivaal", correct: false },
        {text:"Ramnath Kovind", correct: false },
        {text:"Mr. Narendra Damondash Modi", correct: true },
      ]
    },
    {
        question: "Where is Ram Mandir located in Uttar Pradesh?" ,
        answers:[
            {text:"Luchknow ", correct: false },
            {text:"Amroha ", correct: false },
            {text:"Ayodhya ", correct: true },
            {text:"Jhashi", correct: false },
        ]   
    },
    {
        question: "Who is the Chief Minister of Uttarakhand?" ,
        answers:[
            {text:"Mr. Pushkar Dhami ", correct: true },
            {text:" Mr.Harish Rawat ", correct: false },
            {text:"Mr. Trivend Singh Rawat", correct: false },
            {text:"Mr. Tirath Singh Rawat", correct: false },
        ]   
    },
    {
        question: "When did Chandrayaan 3 land on the moon?" ,
        answers:[
            {text:"14 July 2023 ", correct: false },
            {text:"23 August 2023", correct: true },
            {text:"19 July 2023", correct: false },
            {text:"21 August 2023", correct: false },
        ]   
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next";
      showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
      const button =  document.createElement("button");
      button.innerHTML =  answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
    
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}


nextButton.addEventListener("click", () =>{
 if (currentQuestionIndex < questions.length){
    handleNextBtn();
 }else{
    startQuiz();   
 }
});

startQuiz();