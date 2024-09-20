import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIcon} from "@angular/material/icon";
import { MatAnchor, MatButton } from "@angular/material/button";
import { SettingsComponent } from "../settings/settings.component";
import { RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";
import { AudioPlayerComponent } from "../audio-player/audio-player.component";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatIcon,
      MatAnchor,
      MatButton,
      SettingsComponent,
      RouterLink,
      RouterOutlet,
      AudioPlayerComponent,
    ],
})
export class HomeComponent {}
