import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeaderboardTableComponent} from "./leaderboard-table/leaderboard-table.component";
import {LeaderboardTableItem} from "./leaderboard-table/leaderboard-table-datasource";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {StandardGameStringEnum} from "../../services/game/standard-game.enum";
import {MatButton} from "@angular/material/button";

type Entry = {
  name: string,
  score: number,
  questionsAnswered: number,
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, LeaderboardTableComponent, MatButtonToggleGroup, MatButtonToggle, MatTabGroup, MatTab, MatButton],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {

  easyLeaderboardItems: LeaderboardTableItem[];
  normalLeaderboardItems: LeaderboardTableItem[];
  hardLeaderboardItems: LeaderboardTableItem[];

  constructor() {
    this.easyLeaderboardItems = this.EASY_EXAMPLE_DATA;
    this.normalLeaderboardItems = this.NORMAL_EXAMPLE_DATA;
    this.hardLeaderboardItems = this.HARD_EXAMPLE_DATA;

    this.saveLeaderboardItems("LEADERBOARDS_EASY", this.EASY_EXAMPLE_DATA);
    this.saveLeaderboardItems("LEADERBOARDS_NORMAL", this.NORMAL_EXAMPLE_DATA);
    this.saveLeaderboardItems("LEADERBOARDS_HARD", this.HARD_EXAMPLE_DATA);
  }

  getLeaderboardItems(key: string): LeaderboardTableItem[] {
    const data = localStorage.getItem(key);

    if (!data) {
      throw new Error(`No data with key ${key} found in local storage`);
    }

    return JSON.parse(data);
  }

  saveLeaderboardItems(key: string, items: LeaderboardTableItem[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  exampleEntry: Entry = {
    name: "Mohamed",
    questionsAnswered: 25,
    score: 60
  }

  postScoreToLeaderboard(entry: Entry, difficulty: StandardGameStringEnum) {
    let currentLeaderboardItems: LeaderboardTableItem[] = this.getLeaderboardItems(`LEADERBOARDS_${difficulty}`);

    this.insertEntry(entry, currentLeaderboardItems);

    this.saveLeaderboardItems(`LEADERBOARDS_${difficulty}`, currentLeaderboardItems);

    switch (difficulty) {
      case StandardGameStringEnum.EASY:
        this.easyLeaderboardItems = currentLeaderboardItems;
        break;
      case StandardGameStringEnum.NORMAL:
        this.normalLeaderboardItems = currentLeaderboardItems;
        break;
      case StandardGameStringEnum.HARD:
        this.hardLeaderboardItems = currentLeaderboardItems;
        break;
    }
  }

  insertEntry(entry: Entry, items: LeaderboardTableItem[]) {
    for (let i = 0; i < items.length; i++) {
      if (entry.score > items[i].score ||
          (entry.score === items[i].score && entry.questionsAnswered >= items[i].questionsAnswered)
      ) {
        items.splice(i, 0, { ...entry, rank: i + 1 });
        this.incrementRanks(i + 1, items);
        return;
      }
    }

    items.push({
      ...entry,
      rank: items.length + 1
    })
  }

  incrementRanks(startIndex: number, items: LeaderboardTableItem[]) {
    for (let i = startIndex; i < items.length; i++) {
      items[i].rank++;
    }
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

  NORMAL_EXAMPLE_DATA: LeaderboardTableItem[] = [
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
  protected readonly StandardGameStringEnum = StandardGameStringEnum;
}
