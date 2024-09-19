import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeaderboardTableComponent} from "./leaderboard-table/leaderboard-table.component";
import {LeaderboardTableItem} from "./leaderboard-table/leaderboard-table-datasource";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, LeaderboardTableComponent, MatButtonToggleGroup, MatButtonToggle, MatTabGroup, MatTab],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {

  constructor() {
    localStorage.setItem("LEADERBOARDS_EASY", JSON.stringify(this.EASY_EXAMPLE_DATA));
    localStorage.setItem("LEADERBOARDS_MEDIUM", JSON.stringify(this.MEDIUM_EXAMPLE_DATA));
    localStorage.setItem("LEADERBOARDS_HARD", JSON.stringify(this.HARD_EXAMPLE_DATA));
  }

  getLeaderboardItems(key: string): LeaderboardTableItem[] {
    const data = localStorage.getItem(key);

    if (!data) {
      throw new Error(`No data with key ${key} found in local storage`);
    }

    return JSON.parse(data);
  }

  EASY_EXAMPLE_DATA: LeaderboardTableItem[] = [
    {rank: 1, name: 'Hydrogen', questionsAnswered: 10, score: 90 },
    {rank: 2, name: 'Helium', questionsAnswered: 10, score: 80 },
    {rank: 3, name: 'Lithium', questionsAnswered: 10, score: 70 },
    {rank: 4, name: 'Beryllium', questionsAnswered: 5, score: 70 },
    {rank: 5, name: 'Boron', questionsAnswered: 10, score: 60 },
    {rank: 6, name: 'Carbon', questionsAnswered: 10, score: 60 },
    {rank: 7, name: 'Nitrogen', questionsAnswered: 10, score: 60 },
    {rank: 8, name: 'Oxygen', questionsAnswered: 10, score: 50 },
    {rank: 9, name: 'Fluorine', questionsAnswered: 10, score: 50 },
    {rank: 10, name: 'Neon', questionsAnswered: 10, score: 40 },
    {rank: 11, name: 'Sodium', questionsAnswered: 10, score: 30 },
    {rank: 12, name: 'Magnesium', questionsAnswered: 10, score: 30 },
    {rank: 13, name: 'Aluminum', questionsAnswered: 10, score: 30 },
    {rank: 14, name: 'Silicon', questionsAnswered: 10, score: 30 },
    {rank: 15, name: 'Phosphorus', questionsAnswered: 10, score: 20 },
    {rank: 16, name: 'Sulfur', questionsAnswered: 10, score: 20 },
    {rank: 17, name: 'Chlorine', questionsAnswered: 10, score: 10 },
    {rank: 18, name: 'Argon', questionsAnswered: 10, score: 10 },
    {rank: 19, name: 'Potassium', questionsAnswered: 10, score: 10 },
    {rank: 20, name: 'Calcium', questionsAnswered: 10, score: 0 },
  ];

  MEDIUM_EXAMPLE_DATA: LeaderboardTableItem[] = [
    {rank: 1, name: 'Hydrogen', questionsAnswered: 10, score: 90 },
    {rank: 2, name: 'Helium', questionsAnswered: 10, score: 80 },
    {rank: 3, name: 'Lithium', questionsAnswered: 10, score: 70 },
    {rank: 4, name: 'Beryllium', questionsAnswered: 5, score: 70 },
    {rank: 5, name: 'Boron', questionsAnswered: 10, score: 60 },
    {rank: 6, name: 'Carbon', questionsAnswered: 10, score: 60 },
    {rank: 7, name: 'Nitrogen', questionsAnswered: 10, score: 60 },
    {rank: 8, name: 'Oxygen', questionsAnswered: 10, score: 50 },
    {rank: 9, name: 'Fluorine', questionsAnswered: 10, score: 50 },
    {rank: 10, name: 'Neon', questionsAnswered: 10, score: 40 },
    {rank: 11, name: 'Sodium', questionsAnswered: 10, score: 30 },
    {rank: 12, name: 'Magnesium', questionsAnswered: 10, score: 30 },
    {rank: 13, name: 'Aluminum', questionsAnswered: 10, score: 30 },
    {rank: 14, name: 'Silicon', questionsAnswered: 10, score: 30 },
  ];

  HARD_EXAMPLE_DATA: LeaderboardTableItem[] = [
    {rank: 1, name: 'Hydrogen', questionsAnswered: 10, score: 90 },
    {rank: 2, name: 'Helium', questionsAnswered: 10, score: 80 },
    {rank: 3, name: 'Lithium', questionsAnswered: 10, score: 70 },
    {rank: 4, name: 'Beryllium', questionsAnswered: 5, score: 70 },
    {rank: 5, name: 'Boron', questionsAnswered: 10, score: 60 },
    {rank: 6, name: 'Carbon', questionsAnswered: 10, score: 60 },
    {rank: 7, name: 'Nitrogen', questionsAnswered: 10, score: 60 },
    {rank: 8, name: 'Oxygen', questionsAnswered: 10, score: 50 },
    {rank: 9, name: 'Fluorine', questionsAnswered: 10, score: 50 },
    {rank: 10, name: 'Neon', questionsAnswered: 10, score: 40 },
  ];
}
