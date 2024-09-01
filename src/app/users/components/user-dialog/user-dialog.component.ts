import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserList } from 'src/app/core/interface/IUserList';
import { UsersService } from './../../services/users.service';

interface CountryOption {
  value: number;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  userForm: FormGroup;
  imageUploaded = false;
  imagePath: string | null = null;
  countries_id: CountryOption[] = [];
  phoneCodes: CountryOption[] = [];
  countryCodes: CountryOption[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: IUserList },
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.userForm = this.fb.group(
      {
        name: ['', Validators.required],
        father_name: [''],
        grandfather_name: [''],
        family_branch_name: ['', ,],
        tribe: [''],
        gender: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        country_id: ['', Validators.required],
        country_code: ['', Validators.required],
        phone: [
          data.user?.phone || '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^50\d{7}$/),
          ]),
        ],
        phone_code: [''],
        email: ['', [Validators.required, Validators.email]],
        type: [''],
        active: [false],
        is_premium: [false],
        verified_at: [''],
        created_at: [''],
        updated_at: [''],
        country: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries(): void {
    this.usersService.getCountries().subscribe(
      (response) => {
        if (response && response.data) {
          response.data.forEach((country: any) => {
            this.countries_id.push({ value: country.id });
            this.phoneCodes.push({ value: country.phonecode });
            this.countryCodes.push({ value: country.iso2 });
          });
        }
      },
      (error) => {
        console.error('Failed to fetch countries', error);
      }
    );
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
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePath = file.name; // Save the file name as the path
        this.userForm.patchValue({
          image: this.imagePath,
        });
        const imageControl = this.userForm.get('image');
        if (imageControl) {
          imageControl.updateValueAndValidity();
        }
        this.imageUploaded = true;
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsDataURL(file);
    } else {
      console.warn('No file selected or file list is empty.');
    }
    console.log(this.userForm.value);
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { mismatch: true };
    }
    return null;
  }
}
password: 'A102030';
phone: '500004002';
phone_code: '966';
