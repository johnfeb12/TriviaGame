var triviaQuestions = [{
	question: " Which Tom Hanks movie won the Academy Award for Best Picture in 1994?",
	answerList: ["forest gump", "World war z", "Toy story", "Jaws"],
	answer: 0
},{
	question: "Who  was the voice behind Woody, the cowboy doll in Toy Story?",
	answerList: ["Tom Hanks", "Bill Gates", "Peter Thiel", "Mark Zuckerberg"],
	answer: 0
},{
	question: "What was the first Arnold Schwarzenegger movie to win four Academy Awards?",
	answerList: ["Terminator 2", "A Bug's Life", "Scarface", "Finding Nemo"],
	answer: 0
},{
	question: "In “The Godfather,” what does Jack Wolz find in his bed when he wakes up?",
	answerList: ["A dog head", "A horse head", "A cow head", "A Human head"],
	answer: 1
},{
	question: "The Quote “We’re counting cards.”",
	answerList: ["ParentHood", "RainMan", "21", "Jaws"],
	answer: 1
},{
	question: "In “Inception,” the spinning top is an example of a/an:",
	answerList: ["Totem", "Idol", "Good luck charm", "Phill"],
	answer: 0
},{
	question: "Which film won Pixar's first Academy Award for Best Animated Feature?",
	answerList: ["Toy Story", "Finding Nemo", "Up", "Wall-E"],
	answer: 1
},{
	question: "Who directed Pixar's first three feature films?",
	answerList: ["Peter Docter", "Brad Bird", "John Lasseter", "Peter Sohn"],
	answer: 2
},{
	question: "Who voiced Sadness in 'Inside Out'?",
	answerList: ["Amy Poehler", "Phyllis Smith", "Mindy Kaling", "Phyllis Vance"],
	answer: 1
},{
	question: "Billy Crystal voices Mike Wazowski in 'Monster, Inc.' but what role did he originally turn down from Pixar?",
	answerList: ["Hopper", "Woody", "Marlin", "Buzz Lightyear"],
	answer: 3
},{
	question: "The voice of WALL-E, Ben Burtt, also voiced what other famous robot?",
	answerList: ["R2-D2", "Alpha 5", "C-3PO", "Astro Boy"],
	answer: 0
},{
	question: "Woody and Buzz Lightyear are two of Andy’s toys. Who is the next door neighbor that Andy’s toys fear?",
	answerList: ["mike", "sid", "Tarzan", "Jorge"],
	answer: 1
},{
	question: "Pixar was originally a division of which studio?",
	answerList: ["Dreamworks", "Industrial Light & Magic", "Disney", "Lucasfilm"],
	answer: 3
},{
	question: "In Saving Private Ryan, how many of James Francis Ryan’s brothers have been killed in combat?",
	answerList: ["3", "1", "6", "4"],
	answer: 0
},{
	question: "'What specific creature does Indiana Jones hate?",
	answerList: ["Birds", "Hawks", "Snakes", "spiders"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
