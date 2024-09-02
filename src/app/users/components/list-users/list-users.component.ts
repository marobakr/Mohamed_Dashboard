import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { IUserList } from 'src/app/core/interface/IUserList';
import { UsersService } from '../../services/users.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

/**
 * Component for displaying and managing a list of users.
 * Provides functionality for filtering, pagination, and CRUD operations on user data.
 */
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  providers: [DatePipe],
})
export class ListUsersComponent implements OnInit {
  /**
   * Columns to be displayed in the user table.
   */
  displayedColumns: string[] = [
    'id',
    'name',
    'father_name',
    'grandfather_name',
    'family_branch_name',
    'tribe',
    'image',
    'gender',
    'date_of_birth',
    'country',
    'phone',
    'email',
    'type',
    'active',
    'is_premium',
    'created_at',
    'updated_at',
    'actions',
    'Update',
  ];

  /**
   * Data source for the MatTable containing user data.
   */
  dataSource!: MatTableDataSource<IUserList>;

  /**
   * Array of users to be displayed.
   */
  userList: IUserList[] = [];

  /**
   * Total number of users.
   */
  totalUsers = 0;

  /**
   * Number of users to be displayed per page.
   */
  pageSize = 10;

  /**
   * Current page index.
   */
  currentPage = 0;

  /**
   * Stores the previous data of a user.
   */
  prevDataUser!: IUserList;

  /**
   * Reference to the MatPaginator component.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Reference to the MatSort component.
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Constructor for ListUsersComponent.
   *
   * @param usersService - Service to fetch user data.
   * @param dialog - Service to manage dialogs.
   * @param datePipe - Service to format dates.
   * @param notifierService - Service to display notifications.
   */
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private notifierService: NotifierService
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Fetches the list of users when the component is initialized.
   */
  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Fetches the list of users from the UsersService and initializes the MatTableDataSource.
   */
  loadUsers() {
    this.usersService
      .getUsers(this.currentPage + 1, this.pageSize)
      .subscribe((data: any) => {
        this.totalUsers = data.total;
        this.dataSource = new MatTableDataSource(data.data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * Handles page change events from the paginator.
   *
   * @param event - The page event triggered by the paginator.
   */
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadUsers();
  }

  /**
   * Applies a filter to the user list based on the input value.
   *
   * @param event - The input event triggered by the filter input field.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Opens a dialog for creating a new user.
   * After the dialog is closed, the user data is sent to the UsersService to create a new user.
   */
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '75%',
      data: { user: {} as IUserList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formattedDate = this.datePipe.transform(
          result.date_of_birth,
          'yyyy-MM-dd'
        );
        const formData = {
          ...result,
          date_of_birth: formattedDate,
        };
        console.error(formData);
        this.usersService.createUser(formData).subscribe(
          () => {
            this.loadUsers();
            this.notifierService.notify('success', 'User created successfully');
          },
          (error) => {
            this.notifierService.notify('error', error.error.message);
            console.error('error', error);
          }
        );
      }
    });
  }

  /**
   * Fetches the previous data of a user by ID and executes a callback with the data.
   *
   * @param userId - The ID of the user to retrieve.
   * @param callback - A callback function to be executed with the user data.
   */
  getPrevDataUser(userId: number, callback: (user: IUserList) => void): void {
    this.usersService.getUserById(userId).subscribe((response) => {
      this.prevDataUser = response.data;
      callback(this.prevDataUser);
    });
  }

  /**
   * Opens a dialog for updating an existing user.
   * After the dialog is closed, the updated user data is sent to the UsersService to update the user.
   *
   * @param userId - The ID of the user to update.
   */
  openUpdateDialog(userId: number): void {
    this.getPrevDataUser(userId, (user) => {
      const dialogRef = this.dialog.open(UserDialogComponent, {
        width: '75%',
        data: { user },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const formattedDate = this.datePipe.transform(
            result.date_of_birth,
            'yyyy-MM-dd'
          );
          const formData = {
            ...result,
            date_of_birth: formattedDate,
          };
          this.usersService.updateUser(formData, user.id).subscribe(
            () => {
              this.loadUsers();
              this.notifierService.notify(
                'success',
                'User updated successfully'
              );
            },
            (error) => {
              this.notifierService.notify('error', error.error.message);
              console.error('error', error);
            }
          );
        }
      });
    });
  }
}
