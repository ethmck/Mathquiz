import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //put variables under here
  title:string = 'app';
  start: boolean = false;
  number1: number = null;
  number2: number = null;
  answer: number = null;
  userAnswer: number = null;
  difficulty: string = null;
  question: string = null;
  counter: number = 1;
  points: number = 0;
  sign: string = null;
  finished: boolean = false;
  display: boolean = false;
  name: string = null;
  submitName: string = null;
  operator: string = "";
  count:number = 120;
  countDownTimer;
  totalPoints: number;
  list: any = [];
  questionList: any = [];
  errMsg: string = null;
  error: boolean = false;
  added: boolean = false;
  setData: boolean = false;
  correct: string = null;


takeOffCount(){
  if(this.count == 0) {
    console.log("game is ending")
    clearInterval(this.countDownTimer)

  } else if (this.finished == true){
    console.log("game is ending")
    clearInterval(this.countDownTimer)

  } else {
    return this.count--
  }
}

startTimer(){
  this.countDownTimer = setInterval(() => {this.takeOffCount(); }, 1000);}


  getRndInteger(min, max, sign) {
  console.log("Question:", this.counter)
    this.start = true;
    this.number1 = Math.floor(Math.random() * (max - min)) + min;
    this.number2 = Math.floor(Math.random() * (max - min)) + min;
    this.question = this.number1 + sign + this.number2

console.log(this.sign)

    if (sign == "+"){
        this.answer = this.number1 + this.number2

    } else if (sign == "-"){
        this.answer = this.number1 - this.number2
        if(this.answer < 0){
          this.checkOperator()
      }

    } else if (sign == "*"){
        this.answer = this.number1 * this.number2
        if (this.answer > 100){
          this.checkOperator()
      }


    } else if (sign == "/"){
        this.answer = this.number1 / this.number2
        if (this.number1 % this.number2 != 0){
          this.checkOperator()
      }
  }

console.log("Question is being called")
console.log(this.question)
console.log(this.answer)

 }

checkOperator(){
  if (this.difficulty == "basic" && this.count > 0){
    var operator = Math.floor(Math.random() * 2)

    if(operator == 0){
       this.sign = "+"
      this.getRndInteger(0, 10, this.sign)

    } else if (operator == 1){
      this.sign = "-"
      this.getRndInteger(0, 10, this.sign)
        }
      }

      else if (this.difficulty == "advanced" && this.count > 0){
        var operator = Math.floor(Math.random() * 4)
            if(operator == 0){
              this.sign = "+"
              this.getRndInteger(0, 10, this.sign)

            } else if (operator == 1){
              this.sign = "-"
              this.getRndInteger(0, 20, this.sign)

            } else if (operator == 2){
              this.sign = "*"
              this.getRndInteger(0, 20, this.sign)

          }  else if (operator == 3){
              this.sign = "/"
              this.getRndInteger(0, 20, this.sign)
        }
      }
    }




setDifficulty(difficulty){
  this.difficulty = difficulty
  console.log(this.difficulty)

  if (difficulty == "basic" && this.name != null){
      this.checkOperator()
      this.startTimer()

  } else if (difficulty == "advanced" && this.name != null){
      this.checkOperator()
      this.startTimer()

  } else {
      this.error = true
      this.errMsg = "You must input your name before the game is to start."
  }
}


setName(){
   this.submitName = this.name
   this.setData = true
}

checkAnswer(){
  console.log(this.userAnswer)
  console.log("checking answer")


if (this.userAnswer == this.answer){
  this.correct = "Correct"
} else{
  this.correct = "Wrong"
}


  var questionReview = {
    questionNum: this.counter,
    question: this.question,
    answer: this.answer,
    userAnswer: this.userAnswer,
    correct: this.correct
  }

  this.questionList.push(questionReview)


if (this.userAnswer == this.answer){
  this.points += 10
  console.log("Correct, points added")
  console.log("Points:", this.points)
  console.log(this.difficulty)

  if (this.difficulty == "basic" && this.counter < 20 && this.count != 0){
    this.counter += 1
    this.userAnswer = null
    this.checkOperator()

  } else if (this.difficulty == "advanced" && this.counter < 20 && this.count != 0){
    this.counter += 1
    this.userAnswer = null
    this.checkOperator()

  } else{
    this.finished = true;
    this.userAnswer = null
    this.checkScore()
  }


} else if (this.userAnswer != this.answer){
    if (this.difficulty == "basic" && this.counter < 20 && this.count != 0){
        console.log("Incorrect")
        this.userAnswer = null
        this.counter += 1
        this.checkOperator()

    } else if (this.difficulty == "advanced" && this.counter < 20 && this.count != 0){
        console.log("Incorrect")
        this.userAnswer = null
        this.counter += 1
        this.checkOperator()

    } else{
        console.log("inside ")
        this.userAnswer = null
        this.finished = true
        clearInterval(this.countDownTimer)
        this.checkScore()
    }
}
}

checkScore(){
  if (this.added != true){
    var submitName = this.name
    var totalPoints = this.points + this.count

    var person = {
      name: submitName,
      score: this.points,
      timeLeft: this.count,
      total: totalPoints,
      questions: this.questionList
    }

    console.log(this.added)
    this.list.push(person)
    this.added=true
    this.display=true
    console.log("done")
    }

  console.log("Done")
  console.log(this.list)
}



// but above here
}
