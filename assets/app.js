var card = $("#quiz-area");

// Question set
var questions = [
  {
    question: "What was the first Space Jam movie?",
    answers: ["Space Jam", "Shut Up and Jam", "Slam Jam", "Live Free and Slam Hard"],
    correctAnswer: "Space Jam"
  },
  {
    question: "Who's the main character of Space Jam?",
    answers: ["Michael Jordan", "Michael Jackson", "Elmer Fudd", "The Monstars"],
    correctAnswer: "Michael Jordan"
  },
  {
    question: "What is Space Jam about?",
    answers: ["Basketball", "Baseball", "Volleyball", "Esports"],
    correctAnswer: "Basketball"
  },
  {
    question: "Why am I making a Space Jam quiz?",
    answers: ["Because I'm watching it", "I love Space Jam", "My mom gonna ground me", "Coronavirus made me do it"],
    correctAnswer: "Because I'm watching it"
  },
  {
    question: "What are The Monstars?",
    answers: ["Aliens", "Dogs", "Humans", "Robots"],
    correctAnswer: "Aliens"
  },
  {
    question:
      "How did The Monstars get their powers?",
    answers: ["They stole them", "They practiced", "They watched a video", "They had a dream"],
    correctAnswer: "They stole them"
  },
  {
    question: "What sport does Michael Jordan play in Space Jam?",
    answers: ["Basketball", "Baseball", "Golf", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    question: "Who wins?",
    answers: ["Space", "Jam", "Looney Tunes", "The NBA"],
    correctAnswer: "Looney Tunes"
  }
];

// Variable that will hold the setInterval
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
