import { Component } from "@angular/core";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [NavbarComponent, MatButtonModule],
})
export class AppComponent {
  title: String = "angular-whos-who";
}
