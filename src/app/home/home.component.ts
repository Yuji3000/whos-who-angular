import { Component } from "@angular/core";
import { MatAnchor, MatButton } from "@angular/material/button";
import { RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    standalone: true,
    imports: [
      MatAnchor,
      MatButton,
      RouterLink,
      RouterOutlet,
    ],
})
export class HomeComponent {}
