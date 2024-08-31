import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserList } from 'src/app/core/interface/IUserList';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  userForm: FormGroup;
  countries = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'United Kingdom' },
    { id: 4, name: 'Australia' },
    { id: 5, name: 'India' },
  ];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: IUserList },
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      father_name: [''],
      grandfather_name: [''],
      family_branch_name: ['', ,],
      tribe: [''],
      image: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      country_id: ['', Validators.required],
      phone: [
        data.user?.phone || '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^5\d{8}$/), // Saudi Arabian phone number pattern
        ]),
      ],
      // phon code
      // country code
      email: ['', [Validators.required, Validators.email]],
      type: [''],
      active: [false],
      is_premium: [false],
      code: [''],
      verified_at: [''],
      created_at: [''],
      updated_at: [''],
      country: [''],
    });
  }
  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    } else if (control?.hasError('minlength')) {
      return `${
        controlName.charAt(0).toUpperCase() + controlName.slice(1)
      } must be at least ${
        control.errors?.['minlength'].requiredLength
      } characters long`;
    } else if (control?.hasError('maxlength')) {
      return `${
        controlName.charAt(0).toUpperCase() + controlName.slice(1)
      } cannot be more than ${
        control.errors?.['maxlength'].requiredLength
      } characters long`;
    } else if (control?.hasError('pattern')) {
      if (controlName === 'phone') {
        return 'Invalid phone number';
      }
    } else if (control?.hasError('email')) {
      return 'Invalid email address';
    }
    return '';
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.userForm.patchValue({
        image: file,
      });
      this.userForm.get('image')?.updateValueAndValidity();
    }
  }
}
