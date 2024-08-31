import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserList } from 'src/app/core/interface/IUserList';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user: IUserList | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.usersService.getUserById(+userId).subscribe((user) => {
        this.user = user;
      });
    }
  }

  editUser(): void {
    if (this.user) {
      this.router.navigate(['/users/edit', this.user.id]);
    }
  }
}
