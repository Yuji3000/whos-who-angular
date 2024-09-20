import { Component } from '@angular/core';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import {MatCard} from "@angular/material/card";
import {PlaylistLoaderComponent} from "../playlist-loader/playlist-loader.component";

@Component({
  selector: 'app-settings',
  standalone: true,
    imports: [SettingsFormComponent, MatCard, PlaylistLoaderComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
