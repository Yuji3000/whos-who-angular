import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { SettingsComponent } from "./settings/settings.component";

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "leaderboards", component: LeaderboardComponent },
    { path: "settings", component: SettingsComponent },
]