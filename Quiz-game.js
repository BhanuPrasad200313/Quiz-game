let StartScreen =document.querySelector("#start-screen");

let QuizScreen =document.querySelector("#quiz-screen");


let ResultScore =document.querySelector("#result-score");

let StartBtn =document.querySelector("#start-btn");
let reStartBtn =document.querySelector("#restart-btn");


let lstquestion =document.querySelector("#question-txt");

let answerOpt =document.querySelector("#answer-con");


let currQuespan =document.querySelector("#current-question");
let ToQuespan =document.querySelector("#total-question");


let Scorespan =document.querySelector("#score");

let  FinalScorespan  = document.querySelector("#final-score");

let  maxScorespan  = document.querySelector("#max-score");

let timer
let timeLeft = 10;
let timespan = document.querySelector("#time");

const questions = [
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<a>", correct: true },
      { text: "<href>", correct: false },
      { text: "<url>", correct: false }
    ]
  },
  {
    question: "Which HTML attribute is used to provide an alternative text for images?",
    answers: [
      { text: "title", correct: false },
      { text: "src", correct: false },
      { text: "alt", correct: true },
      { text: "href", correct: false }
    ]
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "color", correct: true },
      { text: "background-color", correct: false }
    ]
  },
  {
    question: "Which CSS property is used to create space inside an element?",
    answers: [
      { text: "margin", correct: false },
      { text: "padding", correct: true },
      { text: "border", correct: false },
      { text: "spacing", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "All of the above", correct: true }
    ]
  },
  {
    question: "Which JavaScript method is used to select an element by ID?",
    answers: [
      { text: "getElementById()", correct: true },
      { text: "querySelectorAll()", correct: false },
      { text: "getElementsByClassName()", correct: false },
      { text: "selectElement()", correct: false }
    ]
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    answers: [
      { text: "/* */", correct: false },
      { text: "#", correct: false },
      { text: "//", correct: true },
      { text: "<!-- -->", correct: false }
    ]
  },
  {
    question: "Which keyword is used to define a function in Python?",
    answers: [
      { text: "func", correct: false },
      { text: "function", correct: false },
      { text: "def", correct: true },
      { text: "define", correct: false }
    ]
  },
  {
    question: "Which data type is used to store text in Python?",
    answers: [
      { text: "int", correct: false },
      { text: "float", correct: false },
      { text: "string", correct: false },
      { text: "str", correct: true }
    ]
  },
  {
    question: "Which operator is used for exponentiation in Python?",
    answers: [
      { text: "^", correct: false },
      { text: "**", correct: true },
      { text: "//", correct: false },
      { text: "%%", correct: false }
    ]
  },
  {
    question: "Which SQL command is used to retrieve data from a database?",
    answers: [
      { text: "GET", correct: false },
      { text: "FETCH", correct: false },
      { text: "SELECT", correct: true },
      { text: "READ", correct: false }
    ]
  },
  {
    question: "Which SQL clause is used to filter records?",
    answers: [
      { text: "ORDER BY", correct: false },
      { text: "GROUP BY", correct: false },
      { text: "WHERE", correct: true },
      { text: "HAVING", correct: false }
    ]
  },
  {
    question: "Which MySQL command is used to remove a table?",
    answers: [
      { text: "DELETE TABLE", correct: false },
      { text: "REMOVE TABLE", correct: false },
      { text: "DROP TABLE", correct: true },
      { text: "TRUNCATE DATABASE", correct: false }
    ]
  },
  {
    question: "Which SQL function is used to count rows?",
    answers: [
      { text: "SUM()", correct: false },
      { text: "TOTAL()", correct: false },
      { text: "COUNT()", correct: true },
      { text: "NUMBER()", correct: false }
    ]
  },
  {
    question: "Which language is mainly used to style web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JavaScript", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false }
    ]
  }
];


let  ResMsg =   document.querySelector("#resultMsg");

let progressbar = document.querySelector("#progress");

//    

let currQuesIndx =0;
let score = 0;
let ansdisable = false;



ToQuespan.textContent  = questions.length;

maxScorespan.textContent = questions.length;



//
StartBtn.addEventListener("click",startquiz);
reStartBtn.addEventListener("click",restartquiz)

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function startTimer(){
    timeLeft=10;
    timespan.textContent=timeLeft;

    timer = setInterval(()=>{
        timeLeft--;
        timespan.textContent=timeLeft;

        if(timeLeft === 0){
            clearInterval(timer);
            autoNextQuestion();
        }
    },1000)
}
function stopTimer(){
    clearInterval(timer);
}



function startquiz()
{

    

    currQuesIndx = 0;
    score=0;
    Scorespan.textContent =  score;
     shuffleArray(questions);
    StartScreen.classList.remove("active");   
    QuizScreen.classList.add("active");

    showQuestions()

}


let showQuestions = () => {

    ansdisable = false;
    const currQues = questions[currQuesIndx];

    currQuespan.textContent = currQuesIndx+1;
   const progpercent = ((currQuesIndx + 1) / questions.length) * 100;
    progressbar.style.width = progpercent + "%";


    lstquestion.textContent = currQues.question;


    answerOpt.innerHTML = "";

    currQues.answers.forEach(answer => {
        const button =document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click",selectAns);

        answerOpt.appendChild(button);
  
    });
    stopTimer();
    startTimer();

};


let selectAns = (event)=>{

    if(ansdisable) return;
    stopTimer();

    ansdisable =true;

    const   selectedbtn = event.target;
    const iscorrect = selectedbtn.dataset.correct  ===  "true";
    


Array.from(answerOpt.children).forEach(button => {

    button.disabled = true;

    if (button.dataset.correct === "true") {
        button.classList.add("correct");
    }
    else if (button === selectedbtn && !iscorrect) {
        button.classList.add("wrong");
    }
});

    
     
    if(iscorrect){
        score++;
        Scorespan.textContent = score;

    }

    setTimeout(()=>{
        currQuesIndx++;
        if(currQuesIndx < questions.length){

            showQuestions()

        }
        else {

            showResults()


        }
    },1000);



};

function autoNextQuestion(){
    ansdisable=true;
    Array.from(answerOpt.children).forEach(button=>{
        button.disabled =true;
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
    });
    setTimeout(()=>{
        currQuesIndx++;
        if(currQuesIndx<questions.length){
            showQuestions();
        }
        else{
            showResults();
        }
    },1000);

}


let showResults = () =>{

    QuizScreen.classList.remove("active");
    ResultScore.classList.add("active");

    FinalScorespan.textContent =  score;
    const percentage = (score/questions.length) *100;

    if (percentage === 100)
    {
        ResMsg.textContent = "Perfect! You have strong fundamentals 💪!";

    }   
    else if (percentage >= 80)
    {
        ResMsg.textContent = "GreatJob!";

    }

    else if (percentage >= 60)
    {
        ResMsg.textContent = "Good efforts! keep learning";

    }
    else if (percentage >= 40)
    {
        ResMsg.textContent = "Not Bad ! Improve it ";

    }

    else
    {
        ResMsg.textContent = "better luck next time !";

    }


    
};





function restartquiz(){
    ResultScore.classList.remove("active");

    startquiz();



    
}



