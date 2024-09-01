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

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  providers: [DatePipe],
})
export class ListUsersComponent implements OnInit {
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
  dataSource!: MatTableDataSource<IUserList>;
  userList: IUserList[] = [];
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private NotifierService: NotifierService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService
      .getUsers(this.currentPage + 1, this.pageSize)
      .subscribe((data: any) => {
        this.totalUsers = data.total; // Adjust according to your API response
        this.dataSource = new MatTableDataSource(data.data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '75%',
      data: { user: {} as IUserList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formattedDate = this.datePipe.transform(
          result.date_of_birth,
          'MMM d, yyyy'
        );
        const formData = {
          ...result,
          date_of_birth: formattedDate,
        };
        console.error(formData);
        this.usersService.createUser(formData).subscribe(
          () => {
            this.loadUsers();
            this.NotifierService.notify('success', 'User created successfully');
          },
          (error) => {
            this.NotifierService.notify('error', error.error.message);
            console.error('error', error);
          }
        );
      }
    });
  }

  // openEditDialog(user: IUserList): void {
  //   const dialogRef = this.dialog.open(UserDialogComponent, {
  //     width: '250px',
  //     data: { user },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(result);
  //     if (result) {
  //       this.usersService.updateUser(result).subscribe(() => {
  //         this.loadUsers();
  //       });
  //     }
  //   });
  // }

  // deleteUser(user: IUserList): void {
  //   this.usersService.deleteUser(user.id).subscribe(() => {
  //     this.loadUsers();
  //   });
  // }

  // toggleActivation(user: IUserList): void {
  //   user.active = user.active ? 0 : 1;
  //   this.usersService.updateUser(user).subscribe(() => {
  //     this.loadUsers();
  // });
  // }
}
