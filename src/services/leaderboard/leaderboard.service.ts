import {Injectable} from '@angular/core';
import {LeaderboardTableItem} from "../../app/leaderboard/leaderboard-table/leaderboard-table-datasource";
import {StandardGameStringEnum} from "../game/standard-game.enum";

export type Entry = {
  name: string,
  score: number,
  questionsAnswered: number,
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private easyLeaderboardItems: LeaderboardTableItem[];
  private normalLeaderboardItems: LeaderboardTableItem[];
  private hardLeaderboardItems: LeaderboardTableItem[];

  constructor() {
    this.easyLeaderboardItems = this.getSavedLeaderboardItems(StandardGameStringEnum.EASY);
    this.normalLeaderboardItems = this.getSavedLeaderboardItems(StandardGameStringEnum.NORMAL);
    this.hardLeaderboardItems = this.getSavedLeaderboardItems(StandardGameStringEnum.HARD);
  }

  public getLeaderboardItems(difficulty: StandardGameStringEnum) {
    switch (difficulty) {
      case StandardGameStringEnum.EASY:
        return this.easyLeaderboardItems;
      case StandardGameStringEnum.NORMAL:
        return this.normalLeaderboardItems;
      case StandardGameStringEnum.HARD:
        return this.hardLeaderboardItems;
    }
  }

  public postScoreToLeaderboard(entry: Entry, difficulty: StandardGameStringEnum) {
    const currentLeaderboardItems: LeaderboardTableItem[] = this.getLeaderboardItems(difficulty);

    this.insertEntry(entry, currentLeaderboardItems);

    this.saveLeaderboardItems(this.buildLeaderboardKey(difficulty), currentLeaderboardItems);

    switch (difficulty) {
      case StandardGameStringEnum.EASY:
        this.easyLeaderboardItems = [...currentLeaderboardItems];
        break;
      case StandardGameStringEnum.NORMAL:
        this.normalLeaderboardItems = [...currentLeaderboardItems];
        break;
      case StandardGameStringEnum.HARD:
        this.hardLeaderboardItems = [...currentLeaderboardItems];
        break;
    }
  }

  private buildLeaderboardKey(difficulty: StandardGameStringEnum) {
    return `LEADERBOARDS_${difficulty}`;
  }

  private getSavedLeaderboardItems(difficulty: StandardGameStringEnum): LeaderboardTableItem[] {
    const key = this.buildLeaderboardKey(difficulty);
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];
  }

  private saveLeaderboardItems(key: string, items: LeaderboardTableItem[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  public loadExampleData() {
    this.saveLeaderboardItems(this.buildLeaderboardKey(StandardGameStringEnum.EASY), this.EASY_EXAMPLE_DATA);
    this.easyLeaderboardItems = this.EASY_EXAMPLE_DATA;

    this.saveLeaderboardItems(this.buildLeaderboardKey(StandardGameStringEnum.EASY), this.NORMAL_EXAMPLE_DATA);
    this.normalLeaderboardItems = this.NORMAL_EXAMPLE_DATA;

    this.saveLeaderboardItems(this.buildLeaderboardKey(StandardGameStringEnum.EASY), this.HARD_EXAMPLE_DATA);
    this.hardLeaderboardItems = this.HARD_EXAMPLE_DATA;
  }

  private insertEntry(entry: Entry, items: LeaderboardTableItem[]) {
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

  private incrementRanks(startIndex: number, items: LeaderboardTableItem[]) {
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
