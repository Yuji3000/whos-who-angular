import {Component} from '@angular/core';
import {GameService} from "../../../services/game/game.service";

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  gameWon = false;
  
  constructor(private gameService: GameService) {}


  get gameResultText() {
    return this.gameService.playerWon ?
        "You won!"
        : "Aw shucks, you lost!"
  }
}
