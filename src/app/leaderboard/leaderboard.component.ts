import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeaderboardTableComponent} from "./leaderboard-table/leaderboard-table.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {StandardGameStringEnum} from "../../services/game/standard-game.enum";
import {MatButton} from "@angular/material/button";
import {Entry, LeaderboardService} from "../../services/leaderboard/leaderboard.service";


@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, LeaderboardTableComponent, MatButtonToggleGroup, MatButtonToggle, MatTabGroup, MatTab, MatButton],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {

  constructor(private leaderboardService: LeaderboardService) {}

  get easyLeaderboard() {
      return this.leaderboardService.getLeaderboardItems(StandardGameStringEnum.EASY);
  }

  get normalLeaderboard() {
    return this.leaderboardService.getLeaderboardItems(StandardGameStringEnum.NORMAL);
  }

  get hardLeaderboard() {
    return this.leaderboardService.getLeaderboardItems(StandardGameStringEnum.HARD);
  }

  exampleEntry: Entry = {
    name: "Mohamed",
    questionsAnswered: 25,
    score: 60
  }

  postScoreExample() {
    this.leaderboardService.postScoreToLeaderboard(this.exampleEntry, StandardGameStringEnum.HARD);
    console.log(this.leaderboardService.hardLeaderboardItems);
  }
}
