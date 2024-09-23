import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatListItem, MatNavList} from "@angular/material/list";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatNavList, MatListItem],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
