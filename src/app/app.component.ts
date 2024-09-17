import { Component } from "@angular/core";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [NavbarComponent, MatButtonModule, RouterOutlet],
})
export class AppComponent {
  title: String = "angular-whos-who";
}
