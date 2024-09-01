import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../services/auth.service';

/**
 * The LoginComponent class handles user login functionality.
 * It provides a form for users to input their credentials and
 * handles validation and submission of the login form.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * The form group for the login form.
   * This form includes controls for `username` and `password` with validators.
   */
  loginForm: FormGroup;

  /**
   * A flag to toggle the visibility of the password field.
   * When true, the password is hidden.
   */
  hidePassword: boolean = true;

  /**
   * Creates an instance of LoginComponent.
   *
   * @param fb - FormBuilder for constructing the login form.
   * @param router - Router service for navigation after a successful login.
   * @param authService - AuthService for handling authentication.
   * @param notifierService - NotifierService for displaying notifications to the user.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifierService: NotifierService
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.email,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Getter for the `username` form control.
   */
  get username() {
    return this.loginForm.get('username');
  }

  /**
   * Getter for the `password` form control.
   */
  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Retrieves an appropriate error message based on the validation errors
   * for the specified form control.
   *
   * @param controlName - The name of the form control to check for errors (e.g., 'username', 'password').
   * @returns A string representing the error message, or an empty string if no error exists.
   */
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
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
      if (controlName === 'username') {
        return 'Username can only contain letters';
      } else if (controlName === 'password') {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      }
    }
    return '';
  }

  /**
   * Toggles the visibility of the password field.
   * When invoked, it changes the value of `hidePassword` to show or hide the password.
   */
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  /**
   * Handles the form submission.
   * If the form is valid, it attempts to log the user in using the AuthService.
   * On success, the user is redirected to the `/users` page.
   * On failure, an error notification is displayed.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/users']);
        },
        () => this.notifierService.notify('error', 'Invalid login credentials')
      );
    }
  }
}
