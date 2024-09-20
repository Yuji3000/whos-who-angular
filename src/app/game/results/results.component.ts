import {Component} from '@angular/core';
import {GameService} from "../../../services/game/game.service";
import { LeaderboardService } from 'src/services/leaderboard/leaderboard.service';
import { StandardGameEnum, StandardGameStringEnum } from 'src/services/game/standard-game.enum';
import { ResultsFormComponent } from "./results-form/results-form.component";
import { TitleCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Entry } from 'src/services/leaderboard/leaderboard.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ResultsFormComponent, TitleCasePipe, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  playerName: string = ''; 
  currentDifficulty: StandardGameStringEnum | undefined = undefined;
  resultBoolean: boolean = false;

  constructor(private gameService: GameService, private leaderboardService: LeaderboardService) {}

  get gameResultText() {
    this.resultBoolean = this.gameService.playerWon
    return this.gameService.playerWon ? "You won!" : "Aw shucks, you lost!";
  }

  get playerScore() { 
    return this.gameService.playerScore;
  }

  get questionsAnswered() {
    return this.gameService.questionsAnsweredCorrectly; 
  }

  convertToStringEnum(value: StandardGameEnum): StandardGameStringEnum {
    switch (value) {
      case StandardGameEnum.EASY:
        return StandardGameStringEnum.EASY;
      case StandardGameEnum.NORMAL:
        return StandardGameStringEnum.NORMAL;
      case StandardGameEnum.HARD:
        return StandardGameStringEnum.HARD;
      default:
        throw new Error("Invalid difficulty value")
    }
  }

  onPlayerNameChange(name: string) {
    this.playerName = name; 
    this.addToLeaderboard()
  }

  addToLeaderboard() {
    const entry: Entry = {
      name: this.playerName,
      score: this.playerScore,
      questionsAnswered: this.questionsAnswered
    }
    const difficulty = this.convertToStringEnum(this.gameService.currentDifficulty)
    this.leaderboardService.postScoreToLeaderboard(entry, difficulty)
  }
}
