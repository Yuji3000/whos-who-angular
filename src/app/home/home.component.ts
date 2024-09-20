import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIcon} from "@angular/material/icon";
import { MatAnchor, MatButton } from "@angular/material/button";
import { RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    standalone: true,
    imports: [
        FormsModule,
        MatIcon,
        MatButton,
        MatAnchor,
        MatIcon,
        RouterLink,
        RouterOutlet,
    ],
})
export class HomeComponent {}
