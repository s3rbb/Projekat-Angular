import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { ToyService } from '../../services/toy.service';
import { ToyType } from '../../models/toy';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule, MatSnackBarModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    favoriteToyTypes: [],
    username: '',
    password: '',
  };
  toyTypes: ToyType[] = [];
  emailValid = true;
  phoneValid = true;
  passwordValid = true;

  constructor(
    private authService: AuthService,
    private toyService: ToyService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.toyService.getTypes().subscribe(types => this.toyTypes = types);
  }

  validateEmail(): void {
    this.emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);
  }

  validatePhone(): void {
    this.phoneValid = /^[\d\s\+\-()]{6,20}$/.test(this.user.phone);
  }

  validatePassword(): void {
    this.passwordValid = this.user.password.length >= 4;
  }

  get formValid(): boolean {
    return !!this.user.firstName && !!this.user.lastName && !!this.user.email
      && !!this.user.username && !!this.user.password && !!this.user.phone
      && this.emailValid && this.phoneValid && this.passwordValid;
  }

  register(): void {
    this.validateEmail();
    this.validatePhone();
    this.validatePassword();
    if (!this.formValid) {
      this.snackBar.open('Ispravite greske u formi.', 'OK', { duration: 3000 });
      return;
    }
    if (this.authService.register({ ...this.user })) {
      this.snackBar.open('Uspesna registracija', 'OK', { duration: 2000 });
      this.router.navigate(['/']);
    } else {
      this.snackBar.open('Korisnicko ime je vec zauzeto', 'OK', { duration: 3000 });
    }
  }
}
