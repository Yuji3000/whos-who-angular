import {Injectable, Injector} from '@angular/core';
import {QuestionType} from "./types/question.type";
import {ChoiceType} from "./types/choice.type";
import {StandardGameEnum, StandardGameStringEnum} from "./standard-game.enum";
import {PlaylistService} from "../playlist/playlist.service";
import {AnswerResponse} from "./types/answer-response.type";
import {Playlist} from "../playlist/playlist.interface";
import {SettingsService} from '../settings/settings.service';
import {CustomPlaylistService} from "../custom-playlist/custom-playlist.service";

interface DifficultyMode {
  mode: StandardGameStringEnum,
  winPercentage: number
}

interface GameSettings {
  mode: DifficultyMode;
  numberOfQuestions: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private playlistService: Playlist;

  private readonly questionsToCache: number = 5;

  // Following properties should be loaded from settings service when that's ready
  private _questionsPreferred: number = 5;
  private _difficultyMode: StandardGameEnum = StandardGameEnum.NORMAL;
  private _difficultyModeString: StandardGameStringEnum = StandardGameStringEnum.NORMAL;
  private questions: QuestionType[] = [];
  private _questionsAnsweredCorrectly: number = 0;
  private questionsRemaining: number = 0;
  private songIndicesToIgnore: Set<number> = new Set<number>;
  private _loadingProgress: number = 0;
  private _acknowledgeGameOver = false;


  constructor(private injector: Injector, private settingsService: SettingsService) {
    this.playlistService = this.injector.get(PlaylistService);

    this.questionsRemaining = this._questionsPreferred;
    this.settingsService.currentSettings.subscribe((settings: GameSettings) => {
      this._questionsPreferred = settings.numberOfQuestions;
      this._difficultyMode = this.mapDifficultyMode(settings.mode.mode);
      this._difficultyModeString = settings.mode.mode;
    });
  }

  private mapDifficultyMode(mode: StandardGameStringEnum): StandardGameEnum {
    switch (mode) {
      case StandardGameStringEnum.EASY:
        return StandardGameEnum.EASY;
      case StandardGameStringEnum.NORMAL:
        return StandardGameEnum.NORMAL;
      case StandardGameStringEnum.HARD:
        return StandardGameEnum.HARD;
    }
  }

  private setPlaylistChoice() {
    if (this.settingsService.getSettings().customPlaylistSelected) {
      this.playlistService = this.injector.get(CustomPlaylistService);
    } else {
      this.playlistService = this.injector.get(PlaylistService);
    }

    this.playlistService.allowExplicit = this.settingsService.getSettings().allowExplicit;
  }

  /**
   * Creates a game by reinitializing all game fields to their default state
   * and adding five questions to memory to help prevent loading times between questions
   */
  async createGame() {
    this.setPlaylistChoice();

    this.questions = [];
    this._questionsAnsweredCorrectly = 0;
    this.questionsRemaining = 0;
    this.songIndicesToIgnore.clear();
    this._loadingProgress = 0;
    this._acknowledgeGameOver = false;

    for (let i = 0; i < this.questionsToCache; i++) {
      this.questionsRemaining = this._questionsPreferred;
      await this.addQuestion();
      this.increaseLoadingProgress();
    }
  }

  increaseLoadingProgress() {
    this._loadingProgress += (100 / this.questionsToCache);
  }

  /**
   * Uses playlist service to fetch a random track from the current playlist and creates a question for that track.
   * Requests four tracks, but only one track url is used and that track name will be the correct answer.
   * Does not choose the same track twice through the help of a set of indices to ignore (passed to playlist service)
   *
   * Note: Spotify has a problem where some tracks in the playlist are null. This is pretty rare, but just in case
   * it happens, there is a retry mechanism here.
   *
   * @private
   */
  private async addQuestion(): Promise<void> {
    const numberOfChoices = 4;
    const answerIndex = Math.floor(Math.random() * numberOfChoices);
    const choices: ChoiceType[] = [];
    const question: Partial<QuestionType> = {};

    const maxAttempts = 5;
    let attempt = 1;

    for (let i = 0; i < numberOfChoices && attempt <= 5; i++) {
      const trackWithMeta = await this.playlistService.getRandomTrackFromPlaylist(this.songIndicesToIgnore);

      if (trackWithMeta.track === null) {
        console.warn(`Spotify API returned a null track within list bounds smh. Trying attempt ${attempt} / ${maxAttempts}`)
        this.songIndicesToIgnore.add(trackWithMeta.index);
        attempt++;
        i--;
        continue;
      }

      const choice = { name: trackWithMeta.track.name, id: trackWithMeta.track.id };
      choices.push(choice);

      if (i == answerIndex) {
        question.answer = choice;
        question.trackUrl = trackWithMeta.track.preview_url;
        this.songIndicesToIgnore.add(trackWithMeta.index);
      }
    }

    if (attempt > maxAttempts) {
      throw new Error(`Could not add question; too many null tracks. Max retry attempts (${maxAttempts}) reached.`);
    }

    question.choices = choices;

    this.questions.push(question as QuestionType);
  }

  private addQuestionToCache() {
    if (this.questions.length < this.questionsRemaining) {
      this.addQuestion()
          .then(() => {
            console.log("Added question to cache");
          })
          .catch((error) => console.log("Could not add question to cache", error));
    }
  }

  /**
   * Used by the component to answer a question. Answered questions automatically remove the question from the
   * question list, and a new question is added to the list if there is space for it.
   *
   * @param answer
   */
  answerCurrentQuestion(answer: ChoiceType): AnswerResponse {
    if (this.questions.length === 0) {
      throw new Error("No more questions");
    }

    const question = this.questions.shift()!;
    this.questionsRemaining--;
    this.addQuestionToCache();

    let answerResponse: AnswerResponse = {
      correct: false,
      correctAnswer: question.answer!,
    }

    if (answer.name === question?.answer?.name) {
      this._questionsAnsweredCorrectly++;

      answerResponse = {
         ...answerResponse,
         correct: true,
       }
    }

    return answerResponse;
  }

  // These getters and setters are meant to be used by other components and services
  // that need information for the current game

  get loadingProgress() {
    return this._loadingProgress;
  }

  get currentQuestion(): QuestionType | undefined {
    return this.questions[0];
  }

  get questionsAnsweredCorrectly() {
    return this._questionsAnsweredCorrectly;
  }

  get totalNumberOfQuestions() {
    return this._questionsPreferred;
  }

  get isGameOver() {
    return this.questionsRemaining === 0;
  }

  get playerWon() {
    const percentageCorrect = this._questionsAnsweredCorrectly / this._questionsPreferred;

    return percentageCorrect >= this._difficultyMode;
  }

  get playerScore() {
    return Math.floor((this._questionsAnsweredCorrectly / this._questionsPreferred) * 100);
  }

  set acknowledgeGameOver(acknowledge: boolean) {
    if (this.isGameOver) {
      this._acknowledgeGameOver = acknowledge;
    }
  }

  get acknowledgeGameOver() {
    return this._acknowledgeGameOver;
  }

  get currentDifficulty(): StandardGameEnum {
    return this._difficultyMode
  }

  get currentDifficultyString(): StandardGameStringEnum {
    return this._difficultyModeString;
  }
}
