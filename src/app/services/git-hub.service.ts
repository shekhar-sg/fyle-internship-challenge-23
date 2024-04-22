import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, combineLatest, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserAPI} from "./types/userAPI";
import {RepositoryAPI} from "./types/repo.type";
import {ActivatedRoute} from "@angular/router";


interface GetReposParams {
  username: string;
  page: number;
  perPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class GitHubService implements OnDestroy {
  private readonly subscriptions = new Subscription()

  constructor(
    private readonly httpClient: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe({
      next: (params: any) => {
        if (params.username || params.page || params.per_page) {
          this.username = params.username;
          this.repoPage = params.page;
          this.repoPerPage = params.per_page;
        }
      }
    });
    this.subscriptions.add(this.username$.subscribe({
      next: (v) => {
        if (v) {
          v && this.getUser(v)
        }
      },
      error: (err) => {
        console.error(`Git Account Fetch Error: ${err}`)
        this.fetchErrors.account = err.message
      }
    }))
    this.subscriptions.add(combineLatest([this.username$, this.repoPage$, this.repoPerPage$]).subscribe({
      next: (v) => {
        if (v) {
          v[0] && this.getRepos({
            username: v[0],
            page: v[1],
            perPage: v[2]
          })
        }
      },
      error: (err) => {
        console.error(`Git Repo Fetch Error: ${err}`)
        this.fetchErrors.repos = err.message
      }
    }))
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private username$ = new BehaviorSubject<string>('');
  private repoPage$ = new BehaviorSubject<number>(1); // user repos page
  private repoPerPage$ = new BehaviorSubject<number>(10); // user repos per page
  private fetchErrors: {
    account: string;
    repos: string;
  } = {
    account: '',
    repos: ''
  };
  private user: UserAPI | undefined;
  private repos: RepositoryAPI[] = [];
  maxPaginationPage = 0;

  get errors() {
    return this.fetchErrors;
  }

  set username(value: string) {
    value && this.username$.next(value);
  }

  get username() {
    return this.username$.getValue();
  }

  get userDetail() {
    return this.user;
  }

  get userRepos() {
    return this.repos;
  }

  set repoPage(value: number) {
    value && this.repoPage$.next(value);
  }

  get repoPage() {
    return this.repoPage$.getValue();
  }

  set repoPerPage(value: number) {
    value && this.repoPerPage$.next(value);
  }

  get repoPerPage() {
    return this.repoPerPage$.getValue();
  }

  getUser(githubUsername: string) {
    return this.httpClient.get<UserAPI>(`https://api.github.com/users/${githubUsername}`, {
    }).subscribe({
      next: (user) => {
        this.user = (user);
        this.fetchErrors.account = '';
        this.maxPaginationPage = Math.ceil(user.public_repos / this.repoPerPage);
      },
      error: (err) => {
        console.log(`result: ${err}`)
        this.fetchErrors.account = err.message;
      }
    });
  }

  getRepos(params: GetReposParams) {
    const {username, page, perPage} = params;
    return this.httpClient.get<RepositoryAPI[]>(`https://api.github.com/users/${username}/repos`, {
      params: {
        page,
        per_page: perPage
      }
    }).subscribe({
      next: (repos) => {
        this.repos = repos;
        this.fetchErrors.repos = '';
      },
      error: (err) => {
        console.log(`result: ${err}`)
        this.fetchErrors.repos = err.message;
      }
    });
  }
}
