import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {QuestionType} from "../../../services/game/types/question.type";
import {ChoiceType} from "../../../services/game/types/choice.type";
import {GameService} from "../../../services/game/game.service";
import {AnswerResponse} from "../../../services/game/types/answer-response.type";
import {NgClass} from "@angular/common";
import {AudioPlayerComponent} from "../../audio-player/audio-player.component";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    NgClass,
    AudioPlayerComponent
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

  questionForm = new FormGroup({
    choiceSelected: new FormControl(null, Validators.required),
  });

  questionAt = 1;
  answered = false;
  question: QuestionType | undefined;
  answeredCorrectly = false;
  correctAnswer: ChoiceType | undefined;

  constructor(private gameService: GameService) {
    this.question = this.gameService.currentQuestion;
  }

  onSubmit() {
    if (!this.answered) {
      this.questionForm.get("choiceSelected")?.disable();
      this.answered = true;

      this.answerQuestion(this.choiceSelected);
    } else {
      if (!this.gameService.isGameOver) {
        this.nextQuestion();
        this.questionAt++;
        this.questionForm.get("choiceSelected")?.enable();
      } else {
        this.gameService.acknowledgeGameOver = true;
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

  get questionTitle() {
    return `Question ${this.questionAt} / ${this.gameService.totalNumberOfQuestions}`
  }
}
