import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {GameService} from "../../services/game/game.service";
import {MatButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {QuestionComponent} from "./question/question.component";
import {ResultsComponent} from "./results/results.component";
import { LeaderboardComponent } from "../leaderboard/leaderboard.component";

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
    MatProgressBar,
    QuestionComponent,
    ResultsComponent,
    LeaderboardComponent
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  playerName: string = ''
  loading = true;

  constructor(private gameService: GameService) {
    this.gameService.createGame()
        .then(() => this.loading = false);
  }

  get loadingProgress() {
    return this.gameService.loadingProgress;
  }

  get gameOverAcknowledged() {
    return this.gameService.acknowledgeGameOver;
  }

  get playerWon() {
    return this.gameService.playerWon;
  }

  onPlayerNameChange(name: string) {
    this.playerName = name
  }
}
