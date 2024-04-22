import {Component} from '@angular/core';
import {UserDetailsCardComponent} from "../user-details-card/user-details-card.component";
import {Router} from "@angular/router";
import {GitHubService} from "../../services/git-hub.service";
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {UserAPI} from "../../services/types/userAPI";

@Component({
  selector: 'app-user-details-section',
  standalone: true,
  imports: [
    UserDetailsCardComponent,
    NgOptimizedImage,
    DecimalPipe
  ],
  templateUrl: './user-details-section.component.html',
  styleUrl: './user-details-section.component.scss'
})
export class UserDetailsSectionComponent {

  pageSizes = ["10", "20", "50", "100"];
  user: UserAPI | undefined;


  constructor(
    public gitHubService: GitHubService,
    private router: Router
  ) {
  }

  changePage(pageNo: number) {
    this.router.navigate(['/'], {
      queryParams: {page: pageNo},
      replaceUrl: true,
      queryParamsHandling: "merge"
    }).then(r => {
      console.log("navigated", r);
    });
  }

  changePerPage(pageSize: string) {
    const tempMaxPage = Math.ceil((this.gitHubService.userDetail?.public_repos||0) / Number(pageSize));
    this.router.navigate(['/'], {
      queryParams: {
        per_page: pageSize,
        page: tempMaxPage < this.gitHubService.repoPage ? tempMaxPage : this.gitHubService.repoPage
      },
      replaceUrl: true,
      queryParamsHandling: "merge"
    }).then(r => {
      console.log("navigated", r);
    });
  }

  protected readonly Number = Number;
  protected readonly Array = Array;
}
