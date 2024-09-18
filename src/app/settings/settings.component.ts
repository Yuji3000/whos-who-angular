import { Component } from '@angular/core';
import { SettingsService } from 'src/services/settings/settings.service';
import { SettingsFormComponent } from "./settings-form/settings-form.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SettingsFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    // Fetch and log settings
    const settings = this.settingsService.getSettings();
    // console.log('Settings:', settings);

    // Save some new settings and log the updated settings
    // const newSettings = { mode: 'medium', numberOfQuestions: 10 };
    // this.settingsService.saveSettings(newSettings);

    // Fetch and log the updated settings
    const updatedSettings = this.settingsService.getSettings();
    // console.log('Updated Settings:', updatedSettings);
  }
}
