import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LeaderboardComponent } from 'src/app/leaderboard/leaderboard.component';
import { SettingsComponent } from 'src/app/settings/settings.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    NavbarComponent, 
    SettingsComponent, 
    LeaderboardComponent, 
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

}



