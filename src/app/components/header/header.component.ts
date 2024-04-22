import {Component} from '@angular/core';
import {GitHubService} from "../../services/git-hub.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private apiService: GitHubService,
  ) {
  }
}
