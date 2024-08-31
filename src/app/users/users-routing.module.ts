import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateUserComponent } from './components/create-update-user/create-update-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'create', component: CreateUpdateUserComponent },
  { path: 'edit/:id', component: CreateUpdateUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
