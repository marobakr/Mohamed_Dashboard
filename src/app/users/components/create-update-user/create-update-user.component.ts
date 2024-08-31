import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss'],
})
export class CreateUpdateUserComponent {
  userForm: FormGroup;
  isEditMode = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Add more fields as required
    });
  }

  // ngOnInit(): void {
  //   this.userId = this.route.snapshot.paramMap.get('id');
  //   this.isEditMode = !!this.userId;

  //   if (this.isEditMode && this.userId) {
  //     this.userService.getUserById(this.userId).subscribe((data) => {
  //       this.userForm.patchValue(data); // Load user data into the form
  //     });
  //   }
  // }

  // onSubmit(): void {
  //   if (this.userForm.valid) {
  //     if (this.isEditMode && this.userId) {
  //       this.userService
  //         .updateUser(this.userId, this.userForm.value)
  //         .subscribe(() => {
  //           alert('User updated successfully!');
  //           this.router.navigate(['/users']);
  //         });
  //     } else {
  //       this.userService.createUser(this.userForm.value).subscribe(() => {
  //         alert('User created successfully!');
  //         this.router.navigate(['/users']);
  //       });
  //     }
  //   }
  // }
}
