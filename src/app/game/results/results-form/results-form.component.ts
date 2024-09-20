
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-results-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './results-form.component.html',
  styleUrl: './results-form.component.css'
})
export class ResultsFormComponent {
  showSuccessMessage = false
  buttonDisabled = false
  @Output() playerNameChange = new EventEmitter<string>();

  nameForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ])
  })

  // constructor(private LeaderboardService: LeaderboardService) {}

  onSubmit() {
    if (this.nameForm.valid) {
      const name = this.nameForm.value.name
      this.playerNameChange.emit(name)

      this.showSuccessMessage = true
      this.buttonDisabled = true
      setTimeout(() => {
        this.showSuccessMessage = false
      }, 2000);
      
    } else {
      console.log("Name Form Error", this.nameForm.controls['name'].errors)
    }
  }
}
