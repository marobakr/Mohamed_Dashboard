import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  displayedColumns: string[] = ['icon', 'label', 'value'];
  userDetails: any[] = [];
  defaultImage = '../../../../assets/logo.png';

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(+userId).subscribe((user) => {
        this.user = user.data;
        this.userDetails = [
          {
            icon: 'person',
            label: "Father's Name",
            value: this.user.father_name,
          },
          {
            icon: 'person',
            label: "Grandfather's Name",
            value: this.user.grandfather_name,
          },
          {
            icon: 'group',
            label: 'Family Branch Name',
            value: this.user.family_branch_name,
          },
          { icon: 'group', label: 'Tribe', value: this.user.tribe },
          { icon: 'phone', label: 'Phone', value: this.user.phone },
          { icon: 'email', label: 'Email', value: this.user.email },
          {
            icon: 'calendar_today',
            label: 'Date of Birth',
            value: this.user.date_of_birth,
          },
          {
            icon: 'location_on',
            label: 'Country',
            value: this.user.country.currency_name,
          },
          {
            icon: 'access_time',
            label: 'Created At',
            value: this.user.created_at,
          },
          { icon: 'update', label: 'Updated At', value: this.user.updated_at },
        ];
      });
    }
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }
}
