import { Component, OnInit } from '@angular/core';
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
  selector: 'app-profile',
  imports: [
    FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule, MatSnackBarModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileComponent implements OnInit {
  user!: User;
  toyTypes: ToyType[] = [];

  constructor(
    private authService: AuthService,
    private toyService: ToyService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const current = this.authService.getCurrentUser();
    if (current) {
      this.user = { ...current };
    }
    this.toyService.getTypes().subscribe(types => this.toyTypes = types);
  }

  save(): void {
    this.authService.updateProfile(this.user);
    this.snackBar.open('Profil je azuriran.', 'OK', { duration: 2000 });
  }
}
