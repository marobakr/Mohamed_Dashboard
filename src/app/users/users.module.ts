import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserProfileComponent, ListUsersComponent, UserDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    NotifierModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
  ],
})
export class UsersModule {}
