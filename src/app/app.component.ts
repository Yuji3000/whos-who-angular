import { Component } from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [RouterOutlet, HomeComponent]
})
export class AppComponent {
  title: String = "angular-whos-who";
}
