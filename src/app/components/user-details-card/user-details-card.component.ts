import {Component, Input} from '@angular/core';
import {RepositoryAPI} from "../../services/types/repo.type";

@Component({
  selector: 'app-user-details-card',
  standalone: true,
  imports: [],
  templateUrl: './user-details-card.component.html',
  styleUrl: './user-details-card.component.scss'
})
export class UserDetailsCardComponent {
  @Input() repo: RepositoryAPI | undefined;
  @Input() loading: boolean|undefined;
}
