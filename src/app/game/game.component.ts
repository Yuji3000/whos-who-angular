import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {QuestionType} from "../../services/game/types/question.type";
import {ChoiceType} from "../../services/game/types/choice.type";
import {GameService} from "../../services/game/game.service";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AnswerResponse} from "../../services/game/types/answer-response.type";
import {NgClass} from "@angular/common";
import {StandardGameEnum} from "../../services/game/standard-game.enum";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatRadioGroup,
    MatRadioButton,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    MatProgressBar
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  questionForm = new FormGroup({
    choiceSelected: new FormControl(null, Validators.required),
  });

  loading = true;
  questionAt = 1;
  answered = false;
  question: QuestionType | undefined;
  answeredCorrectly = false;
  correctAnswer: ChoiceType | undefined;

  // Load this from setting service
  private difficultyMode: StandardGameEnum = StandardGameEnum.NORMAL;

  constructor(private gameService: GameService) {
    this.gameService.createGame()
        .then(() => {
          this.question = this.gameService.currentQuestion;
          this.loading = false;
        })
  }

  onSubmit() {
    if (!this.answered) {
      this.questionForm.get("choiceSelected")?.disable();
      this.answered = true;

      this.answerQuestion(this.choiceSelected);
    } else {
      if (!this.gameOver) {
        this.nextQuestion();
        this.questionAt++;
        this.questionForm.get("choiceSelected")?.enable();
      }

      this.answered = false;
    }
  }

  choiceCorrect(choice: ChoiceType) {
    return this.answered && choice.id === this.correctAnswer?.id;
  }

  answerQuestion(choice: ChoiceType) {
    const answerResponse: AnswerResponse = this.gameService.answerCurrentQuestion(choice as ChoiceType);

    this.answeredCorrectly = answerResponse.correct;
    this.correctAnswer = answerResponse.correctAnswer;
  }

  nextQuestion() {
    this.question = this.gameService.currentQuestion;
  }

  choiceStyle(choice: ChoiceType) {
    if (!this.answered) return;

    if (this.choiceCorrect(choice)) {
      return { correct: true };
    } else if (this.choiceSelected.id === choice.id) {
      return { incorrect: true };
    } else {
      return { neutral: true };
    }
  }

  get choiceSelected(): ChoiceType {
    const choice = this.questionForm.get("choiceSelected")?.value;

    if (!choice) {
      throw new Error("No choice selected");
    }

    return choice;
  }

  get loadingProgress() {
    return this.gameService.loadingProgress;
  }

  get questionTitle() {
    return `Question ${this.questionAt} / ${this.gameService.totalNumberOfQuestions}`
  }

  get correctAnswerCount() {
    return this.gameService.questionsAnsweredCorrectly;
  }

  get totalQuestionCount() {
    return this.gameService.totalNumberOfQuestions;
  }

  get gameOver() {
    return this.gameService.isGameOver;
  }

  get playerWon() {
    return this.gameService.playerWon;
  }

  get playerScore() {
    return this.gameService.playerScore;
  }

  get scoreToWinThreshold() {
    return Math.round(this.difficultyMode * 100);
  }

  get difficultyName() {
    switch (this.difficultyMode) {
      case StandardGameEnum.EASY:
        return "Easy";
      case StandardGameEnum.NORMAL:
        return "Normal";
      case StandardGameEnum.HARD:
        return "Hard"
    }
  }
}
