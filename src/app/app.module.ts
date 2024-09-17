import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), HomeComponent],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
