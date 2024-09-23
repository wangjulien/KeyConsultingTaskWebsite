import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Key Consulting - Task Management Website';
}
