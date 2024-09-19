import { Component } from '@angular/core';
import { SettingsFormComponent } from './settings-form/settings-form.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SettingsFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
