import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

/**
 * Component for displaying a user's profile information.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  /**
   * Stores the user data retrieved from the server.
   */
  user: any;

  /**
   * Array of column names to be displayed in the user details table.
   */
  displayedColumns: string[] = ['icon', 'label', 'value'];

  /**
   * Array of user details to be displayed in the user profile.
   */
  userDetails: any[] = [];

  /**
   * Default image to be displayed if the user's image fails to load.
   */
  defaultImage = '../../../../assets/logo.png';

  /**
   * Constructor for `UserProfileComponent`.
   * @param route ActivatedRoute for accessing route parameters.
   * @param userService Service for fetching user data.
   */
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Fetches the user ID from the route, retrieves the user data, and sets up the user details.
   */
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

  /**
   * Event handler for when the user's image fails to load.
   * Replaces the failed image with the default image.
   * @param event The event object for the error event.
   */
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }
}
