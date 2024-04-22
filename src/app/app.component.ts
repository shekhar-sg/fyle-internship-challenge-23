import {Component} from '@angular/core';
import {GitHubService} from './services/git-hub.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public gitHubService: GitHubService,
    private router: Router
  ) {
  }

  searchUser(username: string) {
    this.router.navigate(['/'], {queryParams: {username: username}, replaceUrl: true,queryParamsHandling:"merge"}).then(r => {
      console.log("navigated", r);
    });
  }

}
